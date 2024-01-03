const Users = require("../models/entities/Users");
const Comments = require("../models/entities/Comments");

const CrudFactory = require("./CrudFactory");

class CommentsFactory extends CrudFactory {
  constructor() {
    super(Comments);
    this.defaultOptions = {
      include: [
        {
          model: Users,
        },
      ],
    };
  }

  async create(row, body) {
    try {
      const comment = await super.create(row);

      return comment.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async read(id = null, showDisabled = false, options = {}) {
    const results = await super.read(null, false, {
      order: [["createdAt", "DESC"]],
      ...options,
    });

    return results;
  }

  async delete(id) {
    return await super.delete(id, false);
  }
}

module.exports = CommentsFactory;
