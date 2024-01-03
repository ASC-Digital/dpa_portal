const Distributors = require('../models/entities/Distributors');
const Clusters = require('../models/entities/Clusters');
const CompanyBranches = require('../models/entities/CompanyBranches');
const CRUDAction = require('./abstract/CRUDAction');

const defaultOptions = {
  include: [
    { model: Clusters },
    { model: CompanyBranches },
  ],
};

class DistributorsAction {
  static async list(req, res) { await CRUDAction.list(req, res, Distributors, defaultOptions); }

  static async create(req, res) { await CRUDAction.create(req, res, Distributors, defaultOptions); }

  static async get(req, res) { await CRUDAction.get(req, res, Distributors, defaultOptions); }

  static async update(req, res) { await CRUDAction.update(req, res, Distributors, defaultOptions); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Distributors, defaultOptions); }

  static async active(req, res) { await CRUDAction.active(req, res, Distributors, defaultOptions); }

  static async disable(req, res) {
    await CRUDAction.disable(req, res, Distributors, defaultOptions);
  }
}

module.exports = DistributorsAction;
