const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('roles', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50],
    },
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
