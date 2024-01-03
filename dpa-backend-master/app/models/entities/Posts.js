const Sequelize = require("sequelize");
const database = require("../db");

module.exports = database.define("posts", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.BIGINT.UNSIGNED,
    field: "user_id",
    allowNull: false,
  },
  targetRole: {
    type: Sequelize.BIGINT,
  },
  targetUser: {
    type: Sequelize.BIGINT,
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
