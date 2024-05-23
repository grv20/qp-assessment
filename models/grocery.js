"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Grocery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Grocery.hasMany(models.Log, {
        foreignKey: "groceryId",
        as: "logs",
      });
    }
  }

  Grocery.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      available_quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Grocery",
    }
  );

  return Grocery;
};
