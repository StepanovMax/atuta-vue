import db from '../models';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
const sendinblue = require('../../sendinblue');

dotenv.config({
  path: `../env/.env.${process.env.NODE_ENV}`
});

const User = db.user;
const jwtSecret = process.env.jwt_secret;
const saltRounds = parseInt(process.env.db_salt_rounds);
const saltLocal = process.env.db_salt;
const accessTokenExpiredIn = parseInt(process.env.access_token_life_time);
const refreshTokenExpiredIn = parseInt(process.env.refresh_token_life_time);


const handlePasswordHashing = (plainPassword, salt) => {
  let hashed = bcrypt.hashSync(plainPassword, salt)

  if (hashed.includes("/")) {
    hashed = this.handlePasswordHashing(plainPassword, salt)
  }

  return hashed;
}


const verifyRegistrationLink = async (req, res) => {
  try {
    const findUser = await User.findOne({
      where: {
        id: req.params.userId,
      }
    });
    if (!findUser) {
      res.status(200).send({
        message: 'not found'
      });
    } else {
      const dateNow = new Date().getTime() / 1000 | 0;
      if (req.params.secretCode === findUser.regKey) {
        if (findUser.expireRegDate > dateNow) {
          if (findUser.status === 'pending') {
            const userData = findUser.dataValues;
            // console.log('   userData 1 ::', userData);
            // Create a copy of the founed user.
            let responseUser = Object.assign({}, userData);
            delete responseUser.salt;
            delete responseUser.regKey;
            delete responseUser.password;
            delete responseUser.accessToken;
            delete responseUser.refreshToken;
            // console.log('   responseUser 2 ::', responseUser);
            const updateValues = {
              status: 'active',
            };
            findUser.update(updateValues).then( function(self) {
              console.log(' ');
              console.log('   >> Status changed to active ::');
              console.log(' ');
            });
            res.status(200).send({
              message: 'ok',
              user: responseUser
            });
          } else if (findUser.status === 'active') {
            res.status(200).send({
              message: 'created'
            });
          }
        } else {
          res.status(200).send({
            message: 'expired'
          });
          findUser.destroy();
        }
      } else {
        res.status(200).send({
          message: 'wrong code'
        });
        findUser.destroy();
      }
    }
  } catch(error) {
    console.error('findUser verifyRegistrationLink error ::', error)
  }
};


const registration = async (req, res, file) => {
  console.log('registration ::', req.body.userData);
  // Collect the user data.
  const userData = req.body.userData;
  // 1. Check for an empty data.
  if (!userData) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } else {
    const userDataParsed = JSON.parse(userData);
    // 2. Check whether this user is present in the DB.
    try {
      let findUser = await User.findOne({
        where: {
          email: userDataParsed.email,
          phone: userDataParsed.phone,
        }
      });
      // 3.1 If user is upsent.
      let regKey = jwt.sign(
        {
          id: userDataParsed.id,
          email: userDataParsed.email,
          website: userDataParsed.website,
          address: userDataParsed.address,
          description: userDataParsed.description,
          expireDate: userDataParsed,
        },
        jwtSecret
      );
      regKey = regKey.replace(/\./g,'')
      // console.log('regKey ::', regKey);
      const dateNow = new Date().getTime() / 1000 | 0;
      const expirateRegDate = dateNow + 600;
      // 3.1.1 then create secret key, expiration date and status 'pending'.
      if (req.suffix) {
        userDataParsed.logo = '/uploads/' + req.suffix;
        console.log('userDataParsed.logo', userDataParsed.logo);
      } else {
        userDataParsed.logo = null;
      }
      userDataParsed.salt = bcrypt.genSaltSync(saltRounds);
      userDataParsed.password = bcrypt.hashSync(userDataParsed.password, userDataParsed.salt + saltLocal);
      userDataParsed.status = 'pending';
      userDataParsed.expireRegDate = expirateRegDate;
      userDataParsed.regKey = regKey;
      // 3.1.2 create user in DB.
      try {
        await User.create(userDataParsed).then(
          data => {
            const reglink = process.env.host_front + '/verify/' + data.id + '/' + regKey;
            console.log(' ');
            console.log("   >> Message sent to " + userDataParsed.email, userDataParsed.name);
            console.log(' ');

            const configEmail = {
              to: [{
                email: userDataParsed.email
              }],
              templateId: 3,
              params: {
                FIRSTNAME: userDataParsed.name,
                CODE: reglink,
              },
            };

            try {
              sendinblue(configEmail);
              // Create a copy of the founed user.
              const responseUser = JSON.parse(JSON.stringify(data));
              // Remove an important info.
              delete responseUser.salt;
              delete responseUser.regKey;
              delete responseUser.password;
              delete responseUser.createdAt;
              delete responseUser.updatedAt;
              delete responseUser.expireRegDate;
              res.status(200).send({
                result: true,
                data: responseUser,
              });
            } catch(error) {
              console.error(' ');
              console.error('[Sendinblue error]', error.message);
              console.error(' ');
              res.status(200).send({
                result: false,
                message: error.message,
              });
            }
          }
        );
      } catch(error) {
        console.error(' ');
        console.error('[Create user error]', error.errors[0].path);
        console.error(' ');
        res.send({
          result: false,
          message: error.message,
          type: error.errors[0].path,
        });
      }
    } catch(error) {
      console.error('[Find user error]', error.message);
      res.send({
        result: false,
        message: error.message,
      });
    }
  }
  // 3.1.4 showing to the user  message to verify his email.
  // 3.2   if user is present in DB.
  // 3.2.1 showing message to user that this email/phone already has been registered.
  // 3.3   waiting 600 seconds.
  // 3.4.1 if the user click on link.
  // 3.4.2 change users status to active.
  // 3.4.3 showing for user message that registration was successfull.
  // 3.4.4 make a redirect for user to home page.
  // 3.4.5 login user to the website.
  // 3.5.1 if the user didn't click on link.
  // 3.5.2 remove users record from DB.
};


// Create and Save a new User
const createUser = async (req, res, file) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const userData = req.body.userData;

  // Validate request
  if (!userData) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const userDataParsed = JSON.parse(userData);
  userDataParsed.logo = '/uploads/' + req.suffix;

  userDataParsed.salt = bcrypt.genSaltSync(saltRounds);

  userDataParsed.password = bcrypt.hashSync(userDataParsed.password, userDataParsed.salt + saltLocal);


  try {
    // console.log(' ');
    // console.log('userDataParsed.email ::', userDataParsed);
    let findUser = await User.findOne({
      where: {
        email: userDataParsed.email,
        phone: userDataParsed.phone,
      }
    });

    if (!findUser) {
      console.log(' ');
      console.log('User not found ::');
      console.log(' ');
      // Save User in the database
      try {
        let createData = await User.create(userDataParsed)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            console.log(' ');
            console.log('Catch error ::', err.message);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          });

        if (createData) {
          console.log('-= createData =-', createData);
        }
      } catch(error) {
        console.error('error ::', error)
      }
    } else {
      console.log(' ');
      console.log('User already exist! ::');
      console.log(' ');
      res.send(false);
    }
  } catch(error) {
    console.error('error ::', error)
  }
};

// Create and Save a new User
const login = async (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Credentials', true);

  const dateNow = new Date().getTime() / 1000 | 0;
  const accessTokenDate = dateNow + accessTokenExpiredIn;
  const refreshTokenDate = dateNow + refreshTokenExpiredIn;

  const { body } = req;

  await User.findOne({
    where: {
      email: body.email,
    }
  })
    .then(function(user) {
      // Create a copy of the founed user.
      const responseUser = Object.assign({}, user.dataValues);

      // Remove an important info.
      delete responseUser.id;
      delete responseUser.salt;
      delete responseUser.regKey;
      delete responseUser.password;
      delete responseUser.createdAt;
      delete responseUser.updatedAt;
      responseUser.expireDate = accessTokenDate;

      // Creation access tokens.
      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
          login: user.login,
          name: user.name,
          email: user.email,
          phone: user.phone,
          logo: user.logo,
          website: user.website,
          address: user.address,
          description: user.description,
          expireDate: accessTokenDate,
        },
        jwtSecret
      );

      // Creation refresh tokens.
      const refreshToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
          login: user.login,
          name: user.name,
          email: user.email,
          phone: user.phone,
          logo: user.logo,
          website: user.website,
          address: user.address,
          description: user.description,
          expireDate: refreshTokenDate,
        },
        jwtSecret
      );

      // Comparison of the founded password and entered password.
      bcrypt.compare(body.password, user.password, function(err, result) {
        // If passwords equal.
        if (result) {
          console.log(' ');
          console.log('   >> Password is equal ::', result);
          console.log(' ');
          // Add tokens.
          // user.accessToken = accessToken;
          // user.refreshToken = refreshToken;
          // Set the cookie.
          res.cookie(
            'accessToken',
            accessToken,
            {
              expiresIn: accessTokenDate,
              httpOnly: true,
            }
          );
          console.log(' ');
          console.log('   >> accessToken ::', accessToken);
          console.log('   >> refreshToken ::', refreshToken);
          console.log(' ');
          let updateValues = {
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
          user.update(updateValues).then( function(self) {
            console.log(' ');
            console.log('   >> Auth tokens has been added ::');
            console.log(' ');
          });
          // Send user to the client.
          res.status(200).send(responseUser);
        } else {
          console.error(' ');
          console.error('   >> Passwords is NOT equal ::', body.password, user.password, result);
          console.error(' ');
          res.status(404).send(false);
        }
      });
    });
}


const removeUser = async (req, res) => {
  console.log('   removeUser ::');
  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  console.log(' ');
  console.log('   >> RemoveUser > accessToken ::', accessToken);
  console.log(' ');
  // If the accessToken is not a null.
  if (accessToken) {
    console.log('   if (accessToken) ::');
    // Checking and decoding the token.
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);

    // Clear cookie.
    res.clearCookie('accessToken');

    try {
      // Find the user in DB.
      const user = await User.findOne({
        where: {
          id: decodedAccessToken.id,
        }
      })
      .then(function(user) {
        console.log('   then ::');
        user.destroy();
        res.status(200).send(true);
      });
    } catch(error) {
      console.error('Error [Backend :: user.controller :: removeUser] ::', error);
    }
  }
}


const logout = async (req, res) => {
  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  console.log(' ');
  console.log('   >> [Logout] accessToken ::', accessToken);
  console.log(' ');
  // If the accessToken is not a null.
  if (accessToken) {
    // Checking and decoding the token.
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);

    // Clear cookie.
    res.clearCookie('accessToken');

    try {
      // Find the user in DB.
      await User.findOne({
        where: {
          id: decodedAccessToken.id,
        }
      })
      .then(function(user) {
        let updateValues = {
          accessToken: null,
          refreshToken: null,
        };
        user.update(updateValues).then( function(self) {
          console.log(' ');
          console.log('   >> [Logout] Auth tokens has been cleared ::');
          console.log(' ');
        });
        res.status(200).send(true);
      });
    } catch(error) {
      console.error('Error [Backend :: user.controller :: logout] ::', error);
    }
  } else {
    res.status(200).send(true);
  }
}


// Cheking the token.
const checkToken = async (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Credentials', true);

  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  let decodedAccessToken;

  console.log(' ');
  console.log('   >> accessToken ::', accessToken);
  console.log(' ');

  // If the accessToken is not a null.
  if (accessToken) {
    // Trying to verify the token and send data back to user.
    try {
      const dateNow = new Date().getTime() / 1000 | 0;
      // Checking and decoding the token.
      decodedAccessToken = jwt.verify(accessToken, jwtSecret);
      const userData = Object.assign({}, decodedAccessToken);
      const accessTokenData = Object.assign({}, decodedAccessToken);
      const refreshTokenData = Object.assign({}, decodedAccessToken);
      const accessTokenDate = dateNow + accessTokenExpiredIn;
      const refreshTokenDate = dateNow + refreshTokenExpiredIn;
      accessTokenData.expireDate = accessTokenDate;
      refreshTokenData.expireDate = refreshTokenDate;

      // Remove an important info.
      delete decodedAccessToken.iat;
      console.error('   decodedAccessToken.id ::', decodedAccessToken.id);

      // Check if the users browser token is equal to DB users token.
      await User.findOne({
        where: {
          id: decodedAccessToken.id,
        }
      })
        .then(function(user) {
          console.error(' ');
          console.error('   [checkToken] > founded user ::');
          console.error(' ');
          // Checking.
          if (user.dataValues.accessToken === accessToken) {
            const decodedRefreshToken = jwt.verify(user.dataValues.refreshToken, jwtSecret);
            console.log(' ');
            console.log('   >> dn ::', dateNow);
            console.log('   >> at ::', userData.expireDate);
            console.log('   >> rt ::', decodedRefreshToken.expireDate);
            console.log(' ');
            // Check if token expire date is moer than now.
            if (dateNow < userData.expireDate && dateNow < decodedRefreshToken.expireDate) {
              console.log(' ');
              console.log('   >> accessToken is OK ::');
              console.log(' ');
              res.status(200).send(decodedAccessToken);
            } else if (userData.expireDate <= dateNow && dateNow < decodedRefreshToken.expireDate) {
              console.log(' ');
              console.log('   >> accessToken is EXPIRED, but refreshToken is OK ::');
              console.log(' ');
  
              // Create tokens.
              const accessToken = jwt.sign(
                accessTokenData,
                jwtSecret
              );
              // Create tokens.
              const refreshToken = jwt.sign(
                refreshTokenData,
                jwtSecret
              );
              // Create a cookie.
              res.cookie(
                'accessToken',
                accessToken,
                {
                  expiresIn: accessTokenDate,
                  httpOnly: true,
                }
              );
  
              const updateValues = {
                accessToken: accessToken,
                refreshToken: refreshToken,
              };
              user.update(updateValues).then( function(self) {
                console.log(' ');
                console.log('   >> Auth tokens has been updated ::');
                console.log(' ');
              });
              userData.expireDate = accessTokenDate;
              res.status(200).send(userData);
            } else if (dateNow > decodedRefreshToken.expireDate) {
              console.log(' ');
              console.log('   >> both tokens has been EXPIRED ::');
              console.log(' ');
              const updateValues = {
                accessToken: null,
                refreshToken: null,
              };
              user.update(updateValues).then( function(self) {
                console.log(' ');
                console.log('   >> [CheckToken] Auth tokens has been cleared ::');
                console.log(' ');
              });
              res.status(200).send(false);
            }
          } else {
            console.error(' ');
            console.error('   >> User access token is not equal to db token.');
            console.error(' ');
            res.status(200).send(false);
          }
        })
          .catch(err => {
            console.log(' ');
            console.log('User from access token not founded ::');
            console.log(' ');
            // Clear cookie.
            res.clearCookie('accessToken');
            res.status(200).send(false);
          });
    } catch(error) {
      // Clear cookie.
      res.clearCookie('accessToken');
      console.error('Error [Backend :: user.controller :: checkToken] ::', error);
      res.status(200).send(false);
    }
  } else {
    res.status(200).send(false);
  }
}


// Update user info
const updateUser = async (req, res) => {
  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  console.log(' ');
  console.log('   >> UpdateUser > accessToken ::');
  console.log(accessToken);
  console.log(' ');
  // If the accessToken is not a null.
  if (accessToken) {
    // Checking and decoding the token.
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    console.log(' ');
    console.log('   >> UpdateUser > decodedAccessToken ::');
    console.log(req.body);
    console.log(' ');
    try {
      const updateValues = req.body;
      const foundedUser = await User.findOne({
        where: {
          id: decodedAccessToken.id
        }
      });
      console.log(' ');
      console.log('   >> Status changed to active ::');
      console.log(' ');
      foundedUser.update(updateValues).then(
        self => {
          console.log(' ');
          console.log('   >> Status changed to active ::');
          console.log(' ');
        }
      );
    } catch(error) {
      console.error('[Error > updateUser] ::', error);
    }
  }
}

export {registration, login, logout, checkToken, verifyRegistrationLink, removeUser, updateUser};