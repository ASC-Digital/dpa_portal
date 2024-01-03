const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('products', {
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
  photoUrl: {
    type: Sequelize.STRING,
    field: 'photo_url',
  },
  price: {
    type: Sequelize.FLOAT.UNSIGNED,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  featured: {
    type: Sequelize.BOOLEAN,
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
