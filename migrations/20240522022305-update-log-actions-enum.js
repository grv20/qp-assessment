"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Logs", "action", {
      type: Sequelize.ENUM,
      values: ["added", "removed", "price changed", "name changed", "sold"],
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Define the previous state of the ENUM if you need to rollback
    await queryInterface.changeColumn("Logs", "action", {
      type: Sequelize.ENUM,
      values: ["added", "removed", "price changed", "name changed"],
      allowNull: false,
    });
  },
};
