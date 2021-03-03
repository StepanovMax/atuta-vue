import { Router } from 'express';
import multer from 'multer';
import { create } from '../server/controllers/object.controller';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../server/models';

dotenv.config({
  path: `../env/.env.${process.env.NODE_ENV}`
});

const Item = db.item;

const jwtSecret = process.env.jwt_secret;

// console.log(' ');
// console.log('  >> ROUTE PING!');
// console.log(' ');


// console.log('  >> Math.random()', Math.random());


// const userId = '199';
// const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth() + 1;

// let dir;
// const objectDirName = Math.random().toString(36).substring(2).substring(0, 4);
// const dirBase = '../client/uploads/objects/';
// const dirUser = dirBase + userId + '/' ;
// const dirYear = dirUser + currentYear  + '/';
// const dirMonth = dirYear + currentMonth + '/';
// dir = dirMonth;
// const dirObject = dirMonth + objectDirName + '/';


const folderDetecting = () => {
  // Если папки юзера не существует,
  if (!fs.existsSync(dirUser)) {
    // значит cоздаём папку юзер/год/месяц/объект.
    return dirMonth;
  // Если папка юзера существует,
  } else {
    // Если папкеи юзер/год не существует,
    if (!fs.existsSync(dirYear)) {
      // значит cоздаём папку юзер/год/месяц/объект.
      return dirMonth;
    } else {
      return dirMonth;
      // // Если папки юзер/год/месяц не существует,
      // if (!fs.existsSync(dirMonth)) {
      //   // значит cоздаём папку юзер/год/месяц/объект.
      //   return dirMonth;
      // } else {
      //   // Если папки юзер/год/месяц/объект не существует,
      //   console.log('  >> Math.random() 1', Math.random());
      //   const dirObject = dirMonth + Math.random().toString(36).substring(2).substring(0, 4) + '/';
      //   if (!fs.existsSync(dirObject)) {
      //     return dirObject;
      //   } else {
      //     let objectDirNameNewOne;
      //     let path;
      //     do {
      //       objectDirNameNewOne = Math.random().toString(36).substring(2).substring(0, 4);
      //       path = dirMonth + objectDirNameNewOne + '/';
      //     } while (fs.existsSync(path));
      //     return path;
      //   }
      // }
    }
  }
}

let storageConfig;
let imagesArrayCutted = [];
let imagePath;

storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    const accessToken = req.cookies.accessToken;
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    const userId = decodedAccessToken.id;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const dirRoot = '../client';
    const dirFolder = '/uploads/objects/';
    const dirCurrent = dirRoot + dirFolder + userId + '/' + currentYear  + '/' + currentMonth + '/';
    imagePath = dirFolder + userId + '/' + currentYear + '/' + currentMonth + '/';


    fs.mkdirSync(dirCurrent, { recursive: true });

    callback(null, dirCurrent);
    // callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
    // console.log(' ');
    // console.log('  >> FILE', file);
    const name = 'object-' + Date.now();
    imagesArrayCutted.push(name);
    callback(null, name);
  }
});

let upload = multer({
  storage: storageConfig
});

const router = Router();


router.post(
  '/create',
  upload.fields([
    { name: 'file', maxCount: 10 },
    { name: 'object', maxCount: 1 },
  ]),
  async (req, res) => {
    const object = JSON.parse(req.body.object);
    let imagesArray = [];
    imagesArrayCutted.forEach(
      item => {
        imagesArray.push(imagePath + item);
      }
    );
    object.photoGallery = imagesArray;

    let result;
    try {
      result = await Item.create(object).then(
        data => {
          res.status(200).send({
            result: true,
            data: data,
          });
          imagesArray = imagesArrayCutted = [];
          return data;
        }
      );
    } catch(error) {
      console.log(' ');
      console.log('catch ::', error);
      console.log(' ');
      res.status(200).send(false);
    }

  }
);


router.get(
  '/getAll',
  async (req, res) => {
    // Extract the token from cookies.
    const accessToken = req.cookies.accessToken;
    console.log(' ');
    console.log('   >> [Logout] accessToken ::', accessToken);
    console.log(' ');
    // If the accessToken is not a null.
    if (accessToken) {
      // Checking and decoding the token.
      const decodedAccessToken = jwt.verify(accessToken, jwtSecret);

      try {
        let myObjects = [];
        // Find the object in DB.
        await Item.findAll({
          where: {
            userId: decodedAccessToken.id,
          }
        })
          .then(
            objects => {
              objects.forEach(
                item => {
                  console.log('item =>', item);
                  myObjects.push(item.dataValues);
                }
              );
              console.log('myObjects =>', myObjects);
              res.status(200).send(myObjects);
            }
          );
      } catch(error) {
        console.error('Error [Backend :: object.controller :: getAll] ::', error);
      }
    }

    console.log(' ');
    console.log('  >> myObjects');
    // console.log(myObjects);
    console.log(' ');
  }
);

export default router;