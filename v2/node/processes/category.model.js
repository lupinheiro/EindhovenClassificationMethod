const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        typeCategory: { type: DataTypes.STRING, allowNull: false },
        subTypeCategory:  { type: DataTypes.STRING, allowNull: false },
        code:  { type: DataTypes.STRING, allowNull: false },
        extensionCode:  { type: DataTypes.STRING, allowNull: false },
        exampleCode:  { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false
    };

    return sequelize.define('category', attributes, options);
}