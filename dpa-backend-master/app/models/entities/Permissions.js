const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('permissions', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  entity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  action: {
    type: Sequelize.STRING,
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
