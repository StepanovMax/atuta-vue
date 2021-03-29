const path = require('path');

const dote = require('dotenv').config({
  path: path.resolve('../', '.env')
});


// console.log('dotenv', dote);
// console.log('   __', process.env.pg_username);


module.exports = {
  "development": {
    "username": process.env.pg_username,
    "password": process.env.pg_password,
    "database": process.env.pg_database,
    "host": process.env.pg_host,
    "dialect": process.env.pg_dialect,
    "operatorsAliases": process.env.pg_operatorsAliases,
    "pool": {
      "max": process.env.pg_max,
      "min": process.env.pg_min,
      "acquire": process.env.pg_acquire,
      "idle": process.env.pg_idle,
    }
  },
}
