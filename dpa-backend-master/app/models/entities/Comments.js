const Sequelize = require("sequelize");
const database = require("../db");

module.exports = database.define("comments", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  postId: {
    type: Sequelize.UUID,
    field: "post_id",
    allowNull: false,
  },
  userId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: "user_id",
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
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
