module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      role: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your role'
        }
      },
      login: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your login'
        }
      },
      password: {
        type: DataTypes.STRING,
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
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your name'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your email address'
        },
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter a valid email address'
          }
        },
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Please enter your phone'
        }
      },
      logo: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your website'
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your website'
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: {
          args: false,
          msg: 'Please enter your website'
        }
      },
    },
    {}
  );

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(
      models.Book,
      {
        foreignKey: 'userId'
      }
    );
  };

  return User;
};