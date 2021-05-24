import db from '../../models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const User = db.user;
const saltRounds = parseInt(process.env.db_salt_rounds);
const saltLocal = process.env.db_salt;

dotenv.config({
  path: '../.env'
});

const changePassword = async(req, res) => {
  const dataParsed = req.body.data;
  const userId = dataParsed.userId;
  const password = dataParsed.password;
  console.log(' ');
  console.log('  >> ChangePassword ::');
  console.log('  >> userId ::', dataParsed.userId);
  console.log(' ');
  console.log(' ');

  await User.findOne({
    where: {
      id: userId
    }
  })
    .then(
      success => {
        const dateNow = new Date().getTime() / 1000 | 0;

        // qwertyuI2@

        if (success.dataValues.expireRecoverPasswordDate > dateNow) {

          console.log(' ');
          console.log('  >> success.dataValues ::', success.dataValues);
          console.log(' ');

          const salt = bcrypt.genSaltSync(saltRounds);
          const passwordHashed = bcrypt.hashSync(password, salt + saltLocal);

          console.log(' ');
          console.log('  >> passwordHashed ::', passwordHashed);
          console.log(' ');

          bcrypt.compare(password, passwordHashed, function(err, result) {
            console.log(' ');
            console.log('  >>> Change pass ::', password, passwordHashed, result);
            console.log(' ');
            // If passwords equal.
            if (result) {
              console.log(' ');
              console.log('  >>> Password is equal ::', result);
              console.log(' ');
            } else {
              console.error(' ');
              console.error('  >>> Passwords is NOT equal ::', password, passwordHashed, result);
              console.error(' ');
            }
          });

          const updateValue = {
            salt: salt,
            password: passwordHashed,
          };

          success.update(updateValue)
            .then(
              self => {
                console.log(' ');
                console.log('   >> Success! Password was updated ::');
                console.log(' ');

                res.status(200).send({
                  result: true,
                  message: 'ok',
                });
              }
            )
              .catch(
                error => {
                  console.log(' ');
                  console.log('   >> Error! Password did not updated ::');
                  console.log(' ');

                  res.status(200).send({
                    result: false,
                    message: 'notUpdated',
                  });
                }
              );

        } else {
          res.status(200).send({
            result: false,
            message: 'expired',
          });
        }

      }
    )
      .catch(
        error => {
          console.log(' ');
          console.log('Error User not found ::', error.message);
          console.log(' ');

          res.status(200).send({
            result: false,
            message: 'userNotFound',
          });
        }
      );

};


export default changePassword;