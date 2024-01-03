const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('transactions', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  walletId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'wallet_id',
    allowNull: false,
  },
  productId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'product_id',
  },
  awardId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'award_id',
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  totalAmount: {
    type: Sequelize.FLOAT,
    field: 'total_amount',
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    field: 'total_price',
    allowNull: false,
  },
  createdAt: {
    type: 'TIMESTAMP',
    field: 'created_at',
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    field: 'updated_at',
    allowNull: false,
  },
  deletedAt: {
    type: 'TIMESTAMP',
    field: 'deleted_at',
  },
});
