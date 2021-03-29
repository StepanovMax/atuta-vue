import dotenv from 'dotenv';
import Sequelize from "sequelize";

dotenv.config({
  path: 'env/.env'
});

console.log('process.env.pg_database ::', process.env.pg_database);

const sequelize = new Sequelize(
  process.env.pg_database,
  process.env.pg_username,
  process.env.pg_password,
  {
    host: process.env.pg_host,
    dialect: process.env.pg_dialect,
    operatorsAliases: process.env.pg_operatorsAliases,

    pool: {
      max: parseInt(process.env.pg_pool_max),
      min: parseInt(process.env.pg_pool_min),
      idle: parseInt(process.env.pg_pool_idle),
      acquire: parseInt(process.env.pg_pool_acquire),
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

let Employee = require('./employee.model.js')(sequelize, Sequelize);
let User = require('./user.model.js')(sequelize, Sequelize);
let Item = require('./item.model.js')(sequelize, Sequelize);

db.employee = Employee;
db.user = User;
db.item = Item;


User.hasOne(Employee);
Employee.belongsTo(User);


User.hasOne(Item);
Item.belongsTo(User);


export default db;
