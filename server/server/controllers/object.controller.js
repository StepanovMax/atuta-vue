import db from '../models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config({
  path: `../env/.env.${process.env.NODE_ENV}`
});
const Item = db.item;
const jwtSecret = process.env.jwt_secret;


const create = async (req, res, file) => {
  const { body } = req.body;
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
      order: [['createdDate', 'DESC']]
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


export { create, getLast32Objects };