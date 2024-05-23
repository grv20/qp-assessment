"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Log.belongsTo(models.Grocery, {
        foreignKey: "groceryId",
        as: "grocery",
      });
    }
  }

  Log.init(
    {
      action: {
        type: DataTypes.ENUM,
        values: ["added", "removed", "price changed", "name changed", "sold"],
        allowNull: false,
      },
      details: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      user: {
        type: DataTypes.INTEGER, // Assuming user ID is an integer
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      groceryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Groceries",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Log",
    }
  );

  return Log;
};
