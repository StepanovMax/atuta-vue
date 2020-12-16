module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      }
    },
    login: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 4) {
            throw new Error('Login should be at least 4 characters');
          }
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      allowNull: {
        args: false,
        msg: 'Please enter your email'
      }
    },
    phone: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Phone already exists'
      },
      allowNull: {
        args: false,
        msg: 'Please enter your phone'
      }
    },
    website: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a website'
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter an address'
      },
    },
  });

  return User;
};