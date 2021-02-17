module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING
    },
  });

  const Employee = require("./employee.model.js")(sequelize, Sequelize);

  Tutorial.associate = () => {
    Tutorial.hasMany(Employee);
    Employee.belongsTo(Tutorial);
  };

  return Tutorial;
};