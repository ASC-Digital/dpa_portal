const Sequelize = require("sequelize");
const database = require("../db");

module.exports = database.define("banners", {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  page: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    field: "image_url",
    allowNull: false,
  },
  descriptionImageUrl: {
    type: Sequelize.STRING,
    field: "description_image_url",
    allowNull: true,
  },
  bannerDescription: {
    type: Sequelize.STRING,
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
