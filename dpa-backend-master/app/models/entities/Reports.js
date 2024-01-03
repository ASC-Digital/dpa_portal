const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('reports', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'user_id',
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('pex', 'training'),
    allowNull: false,
  },
  format: {
    type: Sequelize.ENUM('powerbi', 'embedded'),
    allowNull: false,
    defaultValue: 'embedded',
  },
  embeddedLink: {
    type: Sequelize.STRING,
    field: 'embedded_link',
    allowNull: true,
  },
  powerbiGroupId: {
    type: Sequelize.STRING,
    field: 'powerbi_group_id',
    allowNull: true,
  },
  powerbiReportId: {
    type: Sequelize.STRING,
    field: 'powerbi_report_id',
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
