import db from '../../models';
const User = db.user;

const verifyRecoverPasswordLink = async(req, res) => {
  console.log(' ');
  console.log('  >> verifyRecoverPasswordLink ::');
  console.log(' ');
  console.log('req.params.secretCode ::', req.params.secretCode);
  console.log('req.params.userId ::', req.params.userId);
  console.log(' ');
  const dateNow = new Date().getTime() / 1000 | 0;


  await User.findOne({
    where: {
      id: req.params.userId,
    }
  })
    .then(
      success => {
        const foundedUser = success.dataValues;

        if (req.params.secretCode === foundedUser.expireRecoverSecretCode) {
          console.log(' ');
          console.log('  >> Secret code is equal ::');
          console.log(' ');
          if (foundedUser.expireRecoverPasswordDate > dateNow) {
            console.log(' ', foundedUser.expireRecoverPasswordDate);
            console.log(' ', dateNow);
            console.log('  >> ExpireRecoverPasswordDate is fresh ::');
            console.log(' ');

            res.status(200).send({
              message: "ok",
              result: true,
            });
          } else {
            console.log(' ');
            console.log('  >> ExpireRecoverPasswordDate is EXPIRED ::');
            console.log(' ');

            res.status(200).send({
              message: "expired",
              result: false,
            });
          }
        } else {
          console.log(' ');
          console.log('  >> Secret code is NOT equal ::');
          console.log(' ');

          res.status(200).send({
            message: "wrongCode",
            result: false,
          });
        }
      }
    )
      .catch(
        error => {
          console.log(' ');
          console.log('Error to find a user in VerifyRecoverPasswordLink.js ::', error.message);

          res.status(200).send({
            message: "User not found in VerifyRecoverPasswordLink.js",
            result: false,
          });
        }
      );

};


export default verifyRecoverPasswordLink;