const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  console.log(' ');
  console.log('Create controller ::');
  console.log(' ');
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  try {
    let loadedData = await Tutorial.create(tutorial)
      .then(data => {
        res.send(data);
        console.log('Send method in action ::', data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });

    if (loadedData) {
      console.log('-= loadedData =-', loadedData);
    }
  } catch(error) {
    console.error('error ::', error)
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  console.log(' ');
  console.log('-= findAll =-');
  console.log(' ');
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  try {
    let loadedData = await Tutorial.findAll()
      .then(data => {
        console.log('-= then =-', data);
        res.send(data);
        return data;
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });

    if (loadedData) {
      console.log('-= loadedData =-', loadedData);
    }
  } catch(error) {
    console.error('error ::', error)
  }

  // User.findByLogin = async login => {
  //   let user = await User.findOne({
  //     where: { username: login },
  //   });
 
  //   if (!user) {
  //     user = await User.findOne({
  //       where: { email: login },
  //     });
  //   }
 
  //   return user;
  // };
};