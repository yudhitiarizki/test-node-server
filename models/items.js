'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Items.hasMany(models.SalesItems, {
        foreignKey: 'itemId'
      })
    }
  }
  Items.init({
    itemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_item: {
      type: DataTypes.STRING
    },
    unit: {
      type: DataTypes.STRING
    },
    stok: {
      type: DataTypes.INTEGER
    },
    harga_satuan: {
      type: DataTypes.INTEGER
    },
    barang: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};