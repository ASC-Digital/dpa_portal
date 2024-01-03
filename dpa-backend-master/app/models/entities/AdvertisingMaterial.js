const Sequelize = require("sequelize");
const database = require("../db");
const sequelize = require("../db");

module.exports = database.define("advertisingMaterials", {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  uploadedUrl: {
    type: Sequelize.STRING,
    field: "uploaded_url",
    allowNull: false,
  },

  thumbnail: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  typeOfMpdv: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  digitalMPDV: {
    type: Sequelize.BOOLEAN,
    field: "isDigital",
    allowNull: false
  },

  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
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
