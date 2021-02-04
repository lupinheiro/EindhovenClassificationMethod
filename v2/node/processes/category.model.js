const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define("category", {
      typeCategory: {
        type: DataTypes.STRING
      },
      subTypeCategory: {
        type: DataTypes.STRING
      },code: {
        type: DataTypes.STRING
      },
      extensionCode: {
        type: DataTypes.STRING
      },
      exampleCode: {
        type: DataTypes.STRING
      }
    });
  
    return Category;
  };