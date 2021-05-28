import db from '../../models';
import dotenv from 'dotenv';

const User = db.user;

dotenv.config({
  path: '../.env'
});

const add = async(req, res) => {
  const dataParsed = req.body.data;
  const money = dataParsed.money;
  const userId = dataParsed.userId;
  console.log(' ');
  console.log('  >> money ::', money);
  console.log('  >> userId ::', userId);
  console.log(' ');

  await User.findOne({
    where: {
      id: userId
    }
  })
    .then(
      success => {

        const newMoney = money + success.moneyBalance;
        console.log(' ');
        console.log('   >> newMoney ::', newMoney);
        console.log(' ');

        const updateValue = {
          moneyBalance: newMoney
        };

        success.update(updateValue)
          .then(
            self => {
              console.log(' ');
              console.log('   >> Success! Money was updated ::');
              console.log(' ');

              res.status(200).send({
                result: true,
                message: 'ok',
                money: newMoney,
              });
            }
          )
            .catch(
              error => {
                console.log(' ');
                console.log('   >> Error! Money did not updated ::');
                console.log(' ');

                res.status(200).send({
                  result: false,
                  message: 'notUpdated',
                });
              }
            );


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


export default add;