const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    type: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING},
    reportText: {type: DataTypes.STRING},
    };
  
    return sequelize.define('report', attributes);
}