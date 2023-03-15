'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SalesItems.belongsTo(models.Sales, {
        foreignKey: 'salesId'
      }),
      SalesItems.belongsTo(models.Items, {
        foreignKey: 'itemId'
      })
    }
  }
  SalesItems.init({
    salesitemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    salesId: {
      type: DataTypes.INTEGER
    },
    itemId: {
      type: DataTypes.INTEGER
    },
    qty: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'SalesItems',
  });
  return SalesItems;
};