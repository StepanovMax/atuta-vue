import db from '../models';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

const User = db.user;

// Create and Save a new User
const createUser = async (req, res, file) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  const userData = req.body.userData;
  const saltRounds = parseInt(process.env.db_salt_rounds);
  const saltCommon = parseInt(process.env.db_salt);

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

  const hash = bcrypt.hashSync(userDataParsed.password, userDataParsed.salt);
  console.log(' ');
  console.log('   >> hash', hash);
  console.log(' ');

  userDataParsed.password = bcrypt.hashSync(hash, saltCommon);
  console.log(' ');
  console.log('   >> userDataParsed.password', userDataParsed.password);
  console.log(' ');

  bcrypt.compare(userDataParsed.password, userDataParsed.password, function(err, result) {
    console.log(' ');
    console.log('   >> result', result);
    console.log(' ');
  });

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

const mul = (a, b) => {
  return a * b
};

export {createUser, mul};