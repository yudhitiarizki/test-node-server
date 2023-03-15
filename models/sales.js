'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sales.belongsTo(models.Customers, {
        foreignKey: 'customerId'
      }),
      Sales.hasMany(models.SalesItems, {
        foreignKey: 'salesId'
      })
    }
  }
  Sales.init({
    salesId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code_transaksi: {
      type: DataTypes.STRING
    },
    tanggal_transaksi: {
      type: DataTypes.DATE
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    total_diskon: {
      type: DataTypes.INTEGER
    },
    total_harga: {
      type: DataTypes.INTEGER
    },
    total_bayar: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};