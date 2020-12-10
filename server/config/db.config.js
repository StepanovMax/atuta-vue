module.exports = {
   HOST: "localhost",
   DB: "atuta",
   USER: "maxgresql",
   PASSWORD: "2128506",
   dialect: "postgres",
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
 };
 