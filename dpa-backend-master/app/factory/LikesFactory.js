const Likes = require("../models/entities/Likes");

const CrudFactory = require("./CrudFactory");

class LikesFactory extends CrudFactory {
  constructor() {
    super(Likes);
    this.defaultOptions = {};
  }

  async delete(id) {
    return await super.delete(id, false);
  }
}

module.exports = LikesFactory;
