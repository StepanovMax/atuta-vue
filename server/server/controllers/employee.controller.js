import db from '../models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({
  path: `../env/.env.${process.env.NODE_ENV}`
});

const jwtSecret = process.env.jwt_secret;
const Employee = db.employee;

const update = async (req, res) => {
  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  // If the accessToken is not a null.
  if (accessToken) {
    // Checking and decoding the token.
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    try {
      const employees = req.body;
      console.log(' ');
      console.log('   >> updateEmployee > employees ::');
      console.log(employees);
      console.log(' ');
      if (employees.length) {

        if (employees.length >= 1) {
          employees.forEach(
            async item => {
              item.userId = decodedAccessToken.id;
              if (item.isUpdated) {
                try {
                  const updatedItem = {
                    name: item.name,
                    phone: item.phone,
                  };
                  const foundedItem = await Employee.findOne({
                    where: {
                      id: item.id
                    }
                  });
                  foundedItem.update(updatedItem).then(
                    self => {
                      console.log(' ');
                      console.log('   >> Employee has been updated ::');
                      console.log(' ');
                      // res.status(200).send(self);
                    }
                  );
                } catch(error) {
                  console.error('Error update employee] ::', error);
                }
              } else if (item.isDeleted) {
                try {
                  // Find the user in DB.
                  await Employee.findOne({
                    where: {
                      id: item.id,
                    }
                  })
                    .then(function(employee) {
                      console.log('   then ::');
                      employee.destroy();
                    });
                } catch(error) {
                  console.error('Error update employee] ::', error);
                }
              } else if (item.isCreated) {
                const createdItem = {
                  name: item.name,
                  phone: item.phone,
                  userId: item.userId,
                };
                Employee.create(createdItem).then(
                  data => {
                    console.log(' ');
                    console.log("   >> Employee Created :: " + data);
                    console.log(' ');
                  }
                );
              }
            }
          );
        }

      }

      res.status(200).send({
        result: true,
      });

    } catch(error) {
      console.log('[Try/catch error > updateEmployee] ::', error);
      res.status(200).send(false);
    }
  } else {
    console.log('[If/else error > updateEmployee] ::', error);
    res.status(200).send(false);
  }
}

const getAllEmployeesByUserID = async (req, res) => {
  // Extract the token from cookies.
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    // Checking and decoding the token.
    const decodedAccessToken = jwt.verify(accessToken, jwtSecret);
    const userId = decodedAccessToken.id;

    let findEmployee = await Employee.findAll({
      where: {
        userId: userId,
      }
    });

    if (findEmployee) {
      const employeesArray = [];
      findEmployee.forEach(
        item => {
          delete item.dataValues.userId;
          delete item.dataValues.createdAt;
          delete item.dataValues.updatedAt;
          item.dataValues.isEdit = false;
          item.dataValues.isUpdated = false;
          item.dataValues.isDeleted = false;
          item.dataValues.isCreated = false;
          employeesArray.push(item);
        }
      );
      res.status(200).send(findEmployee);
    } else {
      console.log(' ');
      console.log('   >> Get all employees by ID > NO findEmployee NO ::');
      // console.log(findEmployee);
      console.log(' ');
      res.status(200).send(false);
    }

  } else {
    console.log('[If/else error > decodedAccessToken] ::', error);
    res.status(200).send(false);
  }
}

export { update, getAllEmployeesByUserID };