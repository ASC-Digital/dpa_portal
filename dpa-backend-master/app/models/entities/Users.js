const Sequelize = require("sequelize");
const database = require("../db");

module.exports = database.define("users", {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  roleId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: "role_id",
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      len: [2, 200],
    },
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: "phone_number",
  },
  document: {
    type: Sequelize.BIGINT.UNSIGNED,
  },
  photoUrl: {
    type: Sequelize.STRING,
    field: "photo_url",
  },
  createdAt: {
    type: "TIMESTAMP",
    field: "created_at",
    allowNull: false,
  },
  updatedAt: {
    type: "TIMESTAMP",
    field: "updated_at",
    allowNull: false,
  },
  deletedAt: {
    type: "TIMESTAMP",
    field: "deleted_at",
  },
});
