"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("donations", {
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
      fundId: {
        type: Sequelize.INTEGER,
        references: {
          model: "funds",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      donateAmount: {
        type: Sequelize.INTEGER(13),
      },
      status: {
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
    await queryInterface.dropTable("donations");
  },
};
