const Permissions = require('../models/entities/Permissions');
const CRUDAction = require('./abstract/CRUDAction');

class PermissionsAction {
  static async list(req, res) { await CRUDAction.list(req, res, Permissions); }

  static async create(req, res) { await CRUDAction.create(req, res, Permissions); }

  static async get(req, res) { await CRUDAction.get(req, res, Permissions); }

  static async update(req, res) { await CRUDAction.update(req, res, Permissions); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Permissions); }
}

module.exports = PermissionsAction;
