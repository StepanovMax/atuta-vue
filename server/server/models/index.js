// import config from "../config/config";
const config = require("../config/config");
import Sequelize from "sequelize";

const sequelize = new Sequelize(config.localhost.database, config.localhost.username, config.localhost.password, {
  host: config.localhost.host,
  dialect: config.localhost.dialect,
  operatorsAliases: false,

  pool: {
    max: config.localhost.pool.max,
    min: config.localhost.pool.min,
    acquire: config.localhost.pool.acquire,
    idle: config.localhost.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./newuser.js")(sequelize, Sequelize);

export default db;
