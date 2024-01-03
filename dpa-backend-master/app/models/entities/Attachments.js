const Sequelize = require("sequelize");
const database = require("../db");

module.exports = database.define("attachments", {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  postId: {
    type: Sequelize.UUID,
    field: "post_id",
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
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
