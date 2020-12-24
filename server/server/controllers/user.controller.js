import db from '../models';

const User = db.user;

// Create and Save a new User
const createUser = async (req, res, file) => {
  console.log('req ::');
  console.log(req.suffix);
  console.log(' ');
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

  try {
    console.log(' ');
    console.log('userDataParsed.email ::', userDataParsed);
    let findUser = await User.findOne({
      where: {
        email: userDataParsed.email,
        phone: userDataParsed.phone,
      }
    });

    if (!findUser) {
      console.log('User not found ::');
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