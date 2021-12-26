"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("funds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      goal: {
        type: Sequelize.INTEGER(15),
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        onUpdate: Sequelize.fn("NOW"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("funds");
  },
};
