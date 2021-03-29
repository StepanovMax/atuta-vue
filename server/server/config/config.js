const path = require('path');

const dote = require('dotenv').config({
  path: path.resolve('../', '.env')
});


console.log('dotenv', dote);
console.log('   __', process.env.pg_username);


module.exports = {
  "localhost": {
    "username": "maxgresql",
    "password": "2128506",
    "database": "atuta",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "development": {
    "username": "maxgresql",
    "password": "2128506",
    "database": "atuta",
    "host": "localhost",
    "dialect": "postgres",
    "operatorsAliases": false,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },

  "stage": {
    "username": "postgres",
    "password": "wMf7R^A^80PV7XezlcRQaFXaPZMrtpM",
    "database": "atuta",
    "host": "atuta-stage.c2knr5rmdqcj.eu-central-1.rds.amazonaws.com",
    "dialect": "postgres",
    "operatorsAliases": false,
    "pool": {
      "max": 5,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
}
