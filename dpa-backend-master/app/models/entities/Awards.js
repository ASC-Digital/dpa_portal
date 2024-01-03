const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('awards', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  filename: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  expected: {
    type: Sequelize.STRING,
  },
  accomplished: {
    type: Sequelize.STRING,
  },
  related: {
    type: Sequelize.STRING,
  },
  profit: {
    type: Sequelize.FLOAT,
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
