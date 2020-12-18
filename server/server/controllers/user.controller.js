import db from '../models';

const User = db.user;
// const Op = db.Sequelize.Op;

// Create and Save a new User
const createUser = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.log(' ');
  console.log('createUser 1 ::', req.body.data);

  // Validate request
  if (!req.body.data) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(' ');
  console.log('createUser 2 ::');

  // Create a User
  const userData = req.body.data;

  console.log(' ');
  console.log('-= userData =-', userData);
  console.log(' ');

  try {
    let findUser = await User.findOne({
      where: {
        email: userData.email
      }
    });

    console.log(' ');
    console.log('-= findUser =-', findUser);

    if (!findUser) {
      // Save User in the database
      try {
        let createData = await User.create(userData)
          .then(data => {
            res.send(data);
            console.log('Send method in action ::', data);
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
      console.log('else ::');
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