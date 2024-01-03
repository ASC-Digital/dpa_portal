const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('distributors_x_users', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  distributorId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'distributor_id',
    allowNull: false,
  },
  userId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'user_id',
    allowNull: false,
  },
}, { timestamps: false });
