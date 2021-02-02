'use strict';
module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    role: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your role'
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
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Salt is required'
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your name'
      }
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
      type: Sequelize.BIGINT,
      unique: {
        args: true,
        msg: 'Phone already exists'
      },
      allowNull: {
        args: false,
        msg: 'Please enter your phone'
      }
    },
    logo: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Logo already exists'
      },
      allowNull: {
        args: false,
        msg: 'Please enter your logo'
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
    description: {
      type: Sequelize.TEXT,
      allowNull: {
        args: false,
        msg: 'Please enter your description'
      }
    },
    accessToken: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
        msg: 'Please enter an accessToken'
      },
    },
    refreshToken: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
        msg: 'Please enter an refreshToken'
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
        msg: 'Please enter an status'
      },
    },
    expireRegDate: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
        msg: 'Please enter an expireRegDate'
      },
    },
    regKey: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
        msg: 'Please enter an regKey'
      },
    },
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};