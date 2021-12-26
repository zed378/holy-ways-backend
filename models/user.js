"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      user.hasMany(models.funds, {
        as: "userFund",
        foreignKey: {
          name: "userId",
        },
      });

      user.hasMany(models.donations, {
        as: "userDonations",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  user.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};