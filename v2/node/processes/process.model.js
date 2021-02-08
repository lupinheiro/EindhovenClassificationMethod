const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
      name: {type: DataTypes.STRING},
      description: {type: DataTypes.STRING}
    };
  
    return sequelize.define('process', attributes);
}