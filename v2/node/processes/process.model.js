const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Process = sequelize.define("process", {
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    });
  
    return Process;
  };