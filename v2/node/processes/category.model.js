const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
      typeCategory: { type: DataTypes.STRING},
      subTypeCategory: {type: DataTypes.STRING},
      code: {type: DataTypes.STRING},
      extensionCode: {type: DataTypes.STRING},
      exampleCode: {type: DataTypes.STRING}
    };
  
    return sequelize.define('category', attributes);
}