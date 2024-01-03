const Sequelize = require("sequelize");
const database = require("../db");

module.exports = database.define("downloadedAdvertisingMaterials", {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  advertisingMaterialId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: "advertising_material_id",
    allowNull: false,
  },
  userId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: "user_id",
    allowNull: false,
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
