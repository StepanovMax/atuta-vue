import db from '../models';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

const User = db.user;
const jwtSecret = process.env.jwt_secret;
const saltRounds = parseInt(process.env.db_salt_rounds);
const saltLocal = process.env.db_salt;

const accessTokenExpiredIn = parseInt(process.env.access_token_life_time);
const refreshTokenExpiredIn = parseInt(process.env.refresh_token_life_time);

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

  // userDataParsed.password = bcrypt.hashSync(hash, saltLocal);
  // console.log(' ');
  // console.log('   >> userDataParsed.password', userDataParsed.password);
  // console.log(' ');

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
      login: body.login,
    }
  })
    .then(function(user) {
      // Create a copy of the founed user.
      const responseUser = Object.assign({}, user.dataValues);

      // Remove an important info.
      delete responseUser.id;
      delete responseUser.salt;
      delete responseUser.password;
      delete responseUser.createdAt;
      delete responseUser.updatedAt;

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


const logout = async (req, res) => {
  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  console.log(' ');
  console.log('   >> Logout > accessToken ::', accessToken);
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
          console.log('   >> Auth tokens has been cleared ::');
          console.log(' ');
        });
        res.status(200).send(true);
      });
    } catch(error) {
      console.error('Error [Backend :: user.controller :: logout] ::', error);
    }
  }
}


// Cheking the token.
const checkToken = async (req, res) => {
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
      delete decodedAccessToken.expireDate;
      delete decodedAccessToken.iat;

      // Check if the users browser token is equal to DB users token.
      await User.findOne({
        where: {
          id: decodedAccessToken.id,
        }
      })
        .then(function(user) {
          console.error(' ');
          console.error('   >> >', user.dataValues);
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
              res.status(200).send(decodedAccessToken);
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
                console.log('   >> Auth tokens has been cleared ::');
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
        });
    } catch(error) {
      console.error('Error [Backend :: user.controller :: checkToken] ::', error);
    }
  } else {
    res.status(200).send(false);
  }
}

export {createUser, login, logout, checkToken};