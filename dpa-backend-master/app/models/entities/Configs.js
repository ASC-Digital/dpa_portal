const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('configs', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    field: 'image_url',
    allowNull: true,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  order: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
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
