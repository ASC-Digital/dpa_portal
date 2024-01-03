const Sequelize = require('sequelize');
const database = require('../db');

module.exports = database.define('roles_x_permissions', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  roleId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'role_id',
    allowNull: false,
  },
  permissionId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: 'permission_id',
    allowNull: false,
  },
}, { timestamps: false });
