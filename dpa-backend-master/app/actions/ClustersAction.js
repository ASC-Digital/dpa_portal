const Clusters = require('../models/entities/Clusters');
const CRUDAction = require('./abstract/CRUDAction');

class ClustersAction {
  static async list(req, res) { await CRUDAction.list(req, res, Clusters); }

  static async create(req, res) { await CRUDAction.create(req, res, Clusters); }

  static async get(req, res) { await CRUDAction.get(req, res, Clusters); }

  static async update(req, res) { await CRUDAction.update(req, res, Clusters); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Clusters); }

  static async active(req, res) { await CRUDAction.active(req, res, Clusters); }

  static async disable(req, res) { await CRUDAction.disable(req, res, Clusters); }
}

module.exports = ClustersAction;
