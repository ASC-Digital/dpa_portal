const Configs = require('../models/entities/Configs');
const CRUDAction = require('./abstract/CRUDAction');

class ConfigsAction {
  static async list(req, res) { await CRUDAction.list(req, res, Configs); }

  static async create(req, res) { await CRUDAction.create(req, res, Configs); }

  static async get(req, res) { await CRUDAction.get(req, res, Configs); }

  static async update(req, res) { await CRUDAction.update(req, res, Configs); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Configs); }

  static async active(req, res) { await CRUDAction.active(req, res, Configs); }

  static async disable(req, res) { await CRUDAction.disable(req, res, Configs); }
}

module.exports = ConfigsAction;
