'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      salesId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code_transaksi: {
        type: Sequelize.STRING
      },
      tanggal_transaksi: {
        type: Sequelize.DATE
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      total_diskon: {
        type: Sequelize.INTEGER
      },
      total_harga: {
        type: Sequelize.INTEGER
      },
      total_bayar: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};