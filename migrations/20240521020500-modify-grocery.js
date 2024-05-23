"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Groceries", "log");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Groceries", "log", {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },
};
