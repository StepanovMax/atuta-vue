import dotenv from 'dotenv';
import Sequelize from "sequelize";

dotenv.config({
  path: `env/.env.${process.env.NODE_ENV}`
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

let Employee = require("./employee.model.js")(sequelize, Sequelize);
let User = require("./user.model.js")(sequelize, Sequelize);
// let Tutorial = require("./tutorial.model.js")(sequelize, Sequelize);

db.employee = Employee;
db.user = User;
// db.tutorial = Tutorial;

User.hasOne(Employee);
Employee.belongsTo(User);


/* */
// const Company = sequelize.define('company', {
//   name: Sequelize.STRING,
// });

// const Product = sequelize.define('product', {
//   name: Sequelize.STRING,
// });

// Company.hasMany(Product);
// Product.belongsTo(Company);

// db.company = Company;
// db.product = Product;
/* */


export default db;
