const path = require('path');

const dote = require('dotenv').config({
  path: path.resolve('../', '.env')
});


// console.log('dotenv', dote);
// console.log('   __', process.env.pg_username);


module.exports = {
  "development": {
    "username": progress.env.pg_username,
    "password": progress.env.pg_password,
    "database": progress.env.pg_database,
    "host": progress.env.pg_host,
    "dialect": progress.env.pg_dialect,
    "operatorsAliases": progress.env.pg_operatorsAliases,
    "pool": {
      "max": progress.env.pg_max,
      "min": progress.env.pg_min,
      "acquire": progress.env.pg_acquire,
      "idle": progress.env.pg_idle,
    }
  },
}
