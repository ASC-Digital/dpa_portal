const Posts = require("../models/entities/Posts");
const Users = require("../models/entities/Users");
const Likes = require("../models/entities/Likes");
const Attachments = require("../models/entities/Attachments");
const Comments = require("../models/entities/Comments");

const CrudFactory = require("./CrudFactory");
const { Op } = require("sequelize");
const sequelize = require("../models/db");

class PostsFactory extends CrudFactory {
  constructor() {
    super(Posts);
    this.defaultOptions = {
      include: [
        {
          model: Users,
          required: true,
        },
        {
          model: Likes,
          required: false,
          separate: true,
        },
        {
          model: Attachments,
          required: false,
          separate: true,
        },
        {
          model: Comments,
          attributes: ["id"],
          required: false,
          separate: true,
        },
      ],
    };
  }

  async create(row, body) {
    try {
      const post = await super.create(row);

      const attachments = body?.attachments || [];

      for await (let item of attachments) {
        await Attachments.create({ ...item, postId: post?.id });
      }

      return post.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, raw, showDisabled = false, options = {}, body = {}) {
    const post = await super.update(id, raw, showDisabled, options);
    const attachments = body?.attachments || [];

    for await (let item of attachments) {
      await Attachments.create({ ...item, postId: post?.id });
    }

    return post.reload();
  }

  async read(id = null, showDisabled = false, options = {}) {
    let newOptions = { ...options };
    const results = await super.read(null, null, {
      where: {
        [Op.or]: [
          { userId: newOptions?.userId },
          { targetRole: newOptions?.roleId },
          { targetRole: null },
          { targetUser: newOptions?.userId },
          { targetUser: null },
        ],
      },
      page: newOptions?.page,
      limit: newOptions?.limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: results?.rows,
      page: newOptions?.page,
      totalItems: results?.count,
    };
  }

  async delete(id) {
    return await super.delete(id, false);
  }
}

module.exports = PostsFactory;
