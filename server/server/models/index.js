// import config from "../config/config";
// const config = require("../config/config");
import Sequelize from "sequelize";

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });


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

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./newuser.js")(sequelize, Sequelize);

export default db;
