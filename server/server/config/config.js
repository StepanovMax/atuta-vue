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
    "username": "maxgresql",
    "password": 2128506,
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
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
