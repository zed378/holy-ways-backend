"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class donations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      donations.belongsTo(models.user, {
        as: "donateFrom",
        foreignKey: {
          name: "userId",
        },
      });

      donations.belongsTo(models.funds, {
        as: "userDonate",
        foreignKey: {
          name: "fundId",
        },
      });
    }
  }
  donations.init(
    {
      userId: DataTypes.INTEGER,
      fundId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      donateAmount: DataTypes.INTEGER(13),
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "donations",
    }
  );
  return donations;
};
