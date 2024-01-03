const CompanyBranches = require('../models/entities/CompanyBranches');
const CRUDAction = require('./abstract/CRUDAction');

class CompanyBranchesAction {
  static async list(req, res) { await CRUDAction.list(req, res, CompanyBranches); }

  static async create(req, res) { await CRUDAction.create(req, res, CompanyBranches); }

  static async get(req, res) { await CRUDAction.get(req, res, CompanyBranches); }

  static async update(req, res) { await CRUDAction.update(req, res, CompanyBranches); }

  static async delete(req, res) { await CRUDAction.delete(req, res, CompanyBranches); }

  static async active(req, res) { await CRUDAction.active(req, res, CompanyBranches); }

  static async disable(req, res) { await CRUDAction.disable(req, res, CompanyBranches); }
}

module.exports = CompanyBranchesAction;
