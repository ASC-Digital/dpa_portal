const Banners = require('../models/entities/Banners');
const CRUDAction = require('./abstract/CRUDAction');

class BannersAction {
  static async list(req, res) { await CRUDAction.list(req, res, Banners); }

  static async create(req, res) { await CRUDAction.create(req, res, Banners); }

  static async get(req, res) { await CRUDAction.get(req, res, Banners); }

  static async update(req, res) { await CRUDAction.update(req, res, Banners); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Banners); }

  static async active(req, res) { await CRUDAction.active(req, res, Banners); }

  static async disable(req, res) { await CRUDAction.disable(req, res, Banners); }
}

module.exports = BannersAction;
