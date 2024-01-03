const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('distributors', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  companyBranchId: {
    type: Sequelize.STRING,
    field: 'company_branch_id',
    allowNull: false,
  },
  clusterId: {
    type: Sequelize.STRING,
    field: 'cluster_id',
    allowNull: false,
  },
  soldTo: {
    type: Sequelize.INTEGER,
    field: 'sold_to',
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortName: {
    type: Sequelize.STRING,
    field: 'short_name',
    allowNull: false,
  },
  mainCity: {
    type: Sequelize.STRING,
    field: 'main_city',
    allowNull: false,
  },
  uf: {
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
