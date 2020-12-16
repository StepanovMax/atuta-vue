import db from '../models';

const User = db.user;
// const Op = db.Sequelize.Op;

// Create and Save a new User
const createUser = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const userData = {
    email: req.body.email,
  };

  try {
    let findUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    console.log(' ');
    console.log('-= findUser =-', findUser);
    console.log(' ');
    if (!findUser) {
      // Save User in the database
      try {
        let createData = await User.create(userData)
          .then(data => {
            res.send(data);
            console.log('Send method in action ::', data);
          })
          .catch(err => {
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