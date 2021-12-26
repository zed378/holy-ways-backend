"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class funds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      funds.belongsTo(models.user, {
        as: "userFund",
        foreignKey: {
          name: "userId",
        },
      });

      funds.hasMany(models.donations, {
        as: "userDonate",
        foreignKey: {
          name: "fundId",
        },
      });
    }
  }

  funds.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      goal: DataTypes.INTEGER(15),
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "funds",
    }
  );
  return funds;
};
