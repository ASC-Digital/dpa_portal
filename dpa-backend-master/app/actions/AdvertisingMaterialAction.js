const AdvertisingMaterialFactory = require("../factory/AdvertisingMaterialFactory");
const absAction = require("./AbstractAction");
const factory = new AdvertisingMaterialFactory();

class CommentsActions {
  static async list(req, res) {
    await absAction.read(req, res, factory);
  }

  static async create(req, res) {
    await absAction.create(req, res, factory);
  }

  static async get(req, res) {
    await absAction.get(req, res, factory);
  }

  static async update(req, res) {
    await absAction.update(req, res, factory);
  }

  static async delete(req, res) {
    await absAction.delete(req, res, factory);
  }

  static async active(req, res) {
    await absAction.active(req, res, factory);
  }

  static async disable(req, res) {
    await absAction.disable(req, res, factory);
  }

  static async listDigitalAdvertisingMaterial(req, res) {
    await absAction.readDigitalAdvertisingMaterial(req, res, factory);
  }
}

module.exports = CommentsActions;
