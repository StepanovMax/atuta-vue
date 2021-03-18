'use strict';
module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define('user', {
    roleLabel: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your role label'
      }
    },
    roleSlug: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your role slug'
      }
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
      allowNull: {
        args: true,
      }
    },
    website: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
      }
    },
    favorites: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: {
        args: true,
      },
    },
    accessToken: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
      },
    },
    refreshToken: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: {
        args: true,
      },
    },
    expireRegDate: {
      type: Sequelize.INTEGER,
      allowNull: {
        args: true,
      },
    },
    regKey: {
      type: Sequelize.TEXT,
      allowNull: {
        args: true,
      },
    },
    agencyBuyDate: {
      type: Sequelize.INTEGER,
      allowNull: {
        args: true,
      },
    },
  }, {});

  return User;
};