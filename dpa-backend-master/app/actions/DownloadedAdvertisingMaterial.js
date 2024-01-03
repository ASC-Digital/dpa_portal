const DownloadedAdvertisingMaterials = require("../models/entities/DownloadedAdvertisingMaterials");
const CRUDAction = require("./abstract/CRUDAction");

class DownloadedAdvertisingMaterialsAction {
  static async list(req, res) {
    await CRUDAction.list(req, res, DownloadedAdvertisingMaterials);
  }

  static async create(req, res) {
    await CRUDAction.create(req, res, DownloadedAdvertisingMaterials);
  }

  static async get(req, res) {
    await CRUDAction.get(req, res, DownloadedAdvertisingMaterials);
  }

  static async update(req, res) {
    await CRUDAction.update(req, res, DownloadedAdvertisingMaterials);
  }

  static async delete(req, res) {
    await CRUDAction.delete(req, res, DownloadedAdvertisingMaterials);
  }

  static async active(req, res) {
    await CRUDAction.active(req, res, DownloadedAdvertisingMaterials);
  }

  static async disable(req, res) {
    await CRUDAction.disable(req, res, DownloadedAdvertisingMaterials);
  }
}

module.exports = DownloadedAdvertisingMaterialsAction;
