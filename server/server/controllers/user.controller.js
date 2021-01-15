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
  console.log(' ');
  console.log('   >> salt', userDataParsed.salt);
  console.log(' ');

  userDataParsed.password = bcrypt.hashSync(userDataParsed.password, userDataParsed.salt + saltLocal);
  console.log(' ');
  // console.log('   >> hash', hash);
  console.log(' ');

  // userDataParsed.password = bcrypt.hashSync(hash, saltLocal);
  console.log(' ');
  console.log('   >> userDataParsed.password', userDataParsed.password);
  console.log(' ');

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
      console.log('file ::', req.files['file'][0]);
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
const findUser = async (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Credentials', true);

  console.log(' ');
  console.log('accessToken ::', req.cookies.accessToken);
  console.log('refreshToken ::', req.cookies.refreshToken);
  console.log(' ');

  const accessTokenExpiredIn = 86400;
  const refreshTokenExpiredIn = accessTokenExpiredIn * 30;
  const accessTokenDate = Date.now() + accessTokenExpiredIn;
  const refreshTokenDate = Date.now() + refreshTokenExpiredIn;

  const { body } = req;

  const findUser = await User.findOne({
    where: {
      login: body.login,
    }
  })
    .then(function(user) {
      console.log(' ');
      console.log('   >> user ::', user);
      console.log(' ');

      // Creation access tokens.
      const accessToken = jwt.sign(
        {
          name: user.name,
          login: user.login,
          role: user.role,
          email: user.email,
          expireDate: accessTokenDate,
        },
        jwtSecret
      );

      // Creation refresh tokens.
      const refreshToken = jwt.sign(
        {
          name: user.name,
          login: user.login,
          role: user.role,
          email: user.email,
          expireDate: refreshTokenDate,
        },
        jwtSecret
      );

      // Comparison of the founded password and entered password.
      bcrypt.compare(body.password, user.password, function(err, result) {
        // If password the same.
        if (result) {
          console.log(' ');
          console.log('   >> Password is the same ::', result);
          console.log(' ');
          // Add tokens.
          user.dataValues.accessToken = accessToken;
          user.dataValues.refreshToken = refreshToken;
          // Set the cookie.
          res.cookie(
            'accessToken',
            accessToken,
            {
              expiresIn: accessTokenDate,
              httpOnly: true,
            }
          );
          // Set the cookie.
          res.cookie(
            'refreshToken',
            refreshToken,
            {
              expiresIn: refreshTokenDate,
              httpOnly: true
            }
          );
          // Update the user in the DB.
          user.save().then( function() {
            console.log(' ');
            console.log('   >> User has been updated ::');
            console.log(' ');
          });
          // Send user to the client.
          res.status(200).send(user);
        } else {
          console.log(' ');
          console.log('   >> Password is NOT the same ::', body.password, user.password, result);
          console.log(' ');
          res.status(404).send(false);
        }
      });
    });

  if (findUser) {
  } else {
    console.log(' ');
    console.log('   >> Nothing founded...');
    console.log(' ');
  }

  // (req, res) => {
  //   const { body } = req;
  //   let userData = null;
  //   testUsers.forEach(
  //     (item, index) => {
  //       if (
  //         body.login === item.login &&
  //         body.password === item.password
  //       ) {
  //         userData = testUsers[index];
  //       }
  //     }
  //   )
  //   if (userData) {
  //     res.status(200).send(userData);
  //   } else {
  //     res.status(404).send(false);
  //   }
  // }
}


// Create and Save a new User
const checkToken = async (req, res) => {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Credentials', true);

  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  let decodedAccessToken;
  let decodedRefreshToken;
  console.log(' ');
  console.log('   >> jwtSecret ::', jwtSecret);
  console.log('   >> accessToken ::', accessToken);

  try {
    decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    console.log(' ');
    console.log('   >> decodedAccessToken ::', decodedAccessToken);
  } catch(error) {
    console.error('Error [Backend :: user controller :: checkToken] ::', error);
  }

  // try {
  //   decodedRefreshToken = jwt.verify(refreshToken, jwtSecret);
  //   console.log(' ');
  //   console.log('   >> decodedRefreshToken ::', decodedRefreshToken);
  // } catch(error) {
  //   console.error('Error [Backend :: user controller :: checkToken] ::', error);
  // }
}

export {createUser, findUser, checkToken};