'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customers.hasMany(models.Sales, {
        foreignKey: 'customerId'
      })
    }
  }
  Customers.init({
    customerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    alamat: {
      type: DataTypes.TEXT
    },
    diskon: {
      type: DataTypes.INTEGER
    },
    type_diskon: {
      type: DataTypes.STRING
    },
    ktp: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};