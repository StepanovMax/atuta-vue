import db from '../models';
import dotenv from 'dotenv';
import calculateExpiredDate from '../common/calculateExpiredDate';


dotenv.config({
  path: '../.env'
});

const Item = db.item;
const User = db.user;


const create = async (req, res, file) => {
  const object = req.body.object;
  // const { object } = req.object;
  console.log(' ');
  console.log('  >> object');
  console.log(object);
  if (req.suffix) {
    console.log(' ');
    console.log('  >> req.suffix');
    console.log(req.suffix);
  }
  console.log(' ');

  res.status(200).send(true);
};


const getLast32Objects = async (req, res, file) => {
  try {
    // Find the object in DB.
    await Item.findAll({
      limit: 20,
      order: [['createdDate', 'DESC']],
      where: {
        status: 'active',
      },
    })
      .then(
        objects => {
          objects.map(
            item => {
              const object = item.dataValues;
              // if (decodedAccessToken.role === 'personal') {
              //   object.user = {
              //     name: 'Собственник'
              //   }
              // } else if (decodedAccessToken.role === 'agent') {
              //   object.user = {
              //     name: 'Агент'
              //   }
              // } else {
              //   object.user = {
              //     name: decodedAccessToken.name
              //   }
              // }
              // console.log('object =>', object.user);
              return object;
            }
          );
          // objects.forEach(
          //   item => {
          //     console.log('item =>', item);
          //   }
          // );
          res.status(200).send(objects);
        }
      );
  } catch(error) {
    console.error('Error [Backend :: object.controller :: getAll] ::', error);
  }
};


const getObjectById = async (req, res, file) => {
  const { body } = req;
  const objectID = parseInt(body.id);
  try {
    await Item.findOne({
      where: {
        id: objectID,
      }
    })
      .then(
        data => {
          // console.log('data.dataValues ::', data.dataValues);
          res.status(200).send(data.dataValues);
        }
      )
        .catch(
          error => {
            console.log('  >> getObjectById error ::');
            res.status(404).send({
              message: 'Object not found'
            });
          }
        );
  } catch(error) {
    console.error('getObjectById error ::', error);
    res.status(404).send({
      message: 'Object not found'
    });
  }
};


const activate = async(req, res) => {
  const objectId = req.body.data.id;
  const userId = req.body.data.userId;
  const minObjectPrice = 30;
  const objectTarif = req.body.data.tarif;

  console.log(' ');
  console.log('  userId ::', userId);
  console.log(' ');


  const calculatedObjectPrice = calculateObjectPrice(objectTarif, minObjectPrice);

  console.log(' ');
  console.log('  calculatedObjectPrice ::', calculatedObjectPrice);
  console.log(' ');


  /* Start Balance updating */
  const userBalanceUpdated = await updateUserBalance(userId, calculatedObjectPrice);

  console.log(' ');
  console.log('  userBalanceUpdated ::', userBalanceUpdated);
  console.log(' ');
  /* End Balance updating */


  if (userBalanceUpdated) {
    await Item.findOne({
      where: {
        id: objectId
      }
    })
      .then(
        success => {
          const user = success.dataValues;

          console.log(' ');
          console.log('  >> ?  ::', req.body.data.tarif);
          console.log(' ');

          const expiredDate = calculateExpiredDate();
          const object = {
            tarifExpiredDate: expiredDate,
            tarif: objectTarif,
          };

          success.update(object)
            .then(
              self => {
                console.log(' ');
                console.log('   >> Item has been updated ::');
                console.log(' ');
                res.status(200).send({
                  result: true,
                  message: 'messageObjectActivationSuccess',
                });
              }
            )
              .catch(
                error => {
                  console.log(' ');
                  console.log('   >> activate foundedItem error ::');
                  console.log(' ');
                  res.status(400).send({
                    result: false,
                    message: 'messageObjectActivationError',
                  });
                }
              );
        }
      )
        .catch(
          error => {
            console.log(' ');
            console.log('  >> error  ::', error);
            console.log(' ');
            res.status(200).send({
              result: false,
              message: 'messageObjectActivationError',
            });
          }
        );
  } else {
    res.status(200).send({
      result: false,
      message: 'messageObjectActivationMoneyNotEnough',
    });
  }
}


const updateUserBalance = async (userId, calculatedObjectPrice) => {
  // Check user balance
  const result = await User.findOne({
    where: {
      id: userId,
    }
  })
    .then(
      user => {
        const moneyBalanceCurrent = user.dataValues.moneyBalance;
        console.log(' ');
        console.log('  moneyBalanceCurrent ::', moneyBalanceCurrent, calculatedObjectPrice);
        console.log(' ');

        const resultMoneyBalanceEnough = compareMoneyBalanceEnough(moneyBalanceCurrent, calculatedObjectPrice);
        console.log(' ');
        console.log('  resultMoneyBalanceEnough ::', resultMoneyBalanceEnough);
        console.log(' ');

        if (Boolean(resultMoneyBalanceEnough)) {
          const updateValues = {
            moneyBalance: resultMoneyBalanceEnough,
          };

          return user.update(updateValues).then(
            self => {
              console.log(' ');
              console.log('  >> [Success] - [Object payment] ::');
              console.log(' ');

              return true;
            }
          )
            .catch(
              error => {
                console.log(' ');
                console.log('  >> [Error] - [Object payment] ::');
                console.log('  >> ', error);
                console.log(' ');

                return false;
              }
            );

        } else {
          return false;
        }

      }
    )
      .catch(
        error => {
          console.log(' ');
          console.log('  = moneyBalanceCurrent ::');
          console.log(' ');

          return false;
        }
      );
  return result;
}


const calculateObjectPrice = (tarif, defaultPrice) => {
  console.log(' ');
  console.log('  >> calculateObjectPrice  ::', tarif, defaultPrice);
  console.log(' ');
  let resultAmount;
  if (tarif === 'vip') {
    resultAmount = defaultPrice + 100;
  } else if (tarif === 'premium') {
    resultAmount = defaultPrice + 50;
  } else {
    resultAmount = defaultPrice;
  }
  return resultAmount;
}


const compareMoneyBalanceEnough = (moneyBalanceCurrent, calculatedObjectPrice) => {
  let moneyBalanceNew;
  console.log('  compareMoneyBalanceEnough ::', moneyBalanceCurrent >= calculatedObjectPrice);
  if (moneyBalanceCurrent >= calculatedObjectPrice) {
    moneyBalanceNew = moneyBalanceCurrent - calculatedObjectPrice;
    return moneyBalanceNew;
  } else if (moneyBalanceCurrent === calculatedObjectPrice) {
    moneyBalanceNew = moneyBalanceCurrent - calculatedObjectPrice;
    return moneyBalanceNew;
  } else if (moneyBalanceCurrent < calculatedObjectPrice) {
    console.log(' ');
    console.log('  moneyBalanceCurrent ::::', moneyBalanceCurrent, calculatedObjectPrice);
    console.log(' ');
    return false;
  } else {
    return false;
  }
}


export { create, getLast32Objects, getObjectById, activate, updateUserBalance, calculateObjectPrice, compareMoneyBalanceEnough };