import db from '../../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
const sendinblue = require('../../../sendinblue');

dotenv.config({
  path: '../.env'
});

const User = db.user;
const jwtSecret = process.env.jwt_secret;

const clearUserData = data => {
  // Remove an important info.
  delete data.salt;
  delete data.regKey;
  delete data.password;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.expireRegDate;

  return data;
};


const recoverPassword = async(req, res) => {
  const userDataParsed = req.body.data;
  console.log('userDataParsed ::', userDataParsed);

  let expireRecoverSecretCode = jwt.sign(
    {
      id: userDataParsed.id,
      email: userDataParsed.email,
      website: userDataParsed.website,
      address: userDataParsed.address,
      description: userDataParsed.description,
      expireDate: userDataParsed.expireRegDate,
    },
    jwtSecret
  );
  expireRecoverSecretCode = expireRecoverSecretCode.replace(/\./g,'');

  console.log(' ');
  console.log('   >> userDataParsed ::', userDataParsed);
  console.log(' ');

  await User.findOne({
    where: {
      [Op.and]: [
        { email: userDataParsed.email },
        { phone: userDataParsed.phone }
      ]
    }
  })
    .then(
      success => {
        const recoverPasswordlink = process.env.host_front + '/change-password/' + success.id + '/' + expireRecoverSecretCode;
        const responseUser = JSON.parse(JSON.stringify(success.dataValues));
        console.log(' ');
        console.log('   >> responseUser ::', responseUser);
        console.log('   >> expireRecoverSecretCode ::', expireRecoverSecretCode);
        console.log(' ');

        try {
          const configEmail = {
            to: [{
              email: success.email
            }],
            templateId: 6,
            params: {
              FIRSTNAME: success.name,
              CODE: recoverPasswordlink,
            },
          };

          sendinblue(configEmail);

          // Remove an important info.
          const clearedData = clearUserData(responseUser);

          const dateNow = new Date().getTime() / 1000 | 0;

          const expireRecoverDate = dateNow + 600;

          const updateValue = {
            expireRecoverPasswordDate: expireRecoverDate,
            expireRecoverSecretCode: expireRecoverSecretCode,
          };

          success.update(updateValue)
            .then(
              self => {
                console.log(' ');
                console.log('   >> Success! expireRecoverPasswordDate was updated ::');
                console.log(' ');

                res.status(200).send({
                  result: 'success',
                  data: clearedData,
                });
              }
            )
              .catch(
                error => {
                  console.log(' ');
                  console.log('   >> Error! expireRecoverPasswordDate was updated ::');
                  console.log(' ');

                  res.status(400).send({
                    result: 'error',
                    data: error.message,
                  });
                }
              );

        } catch(error) {
          console.error(' ');
          console.error('[Sendinblue error]', error.message);
          console.error(' ');

          res.status(400).send({
            result: 'error',
            data: error.message,
          });

        }
      }
    )
      .catch(
        error => {
          console.log(' ');
          console.log('Catch find user for recoverPassword error ::', error.message);
          console.log(' ');
          res.status(501).send({
            result: 'error',
          });
        }
      );
};


export default recoverPassword;