const Users = require('../models/entities/Users');
const Reports = require('../models/entities/Reports');
const CRUDAction = require('./abstract/CRUDAction');

const defaultOptions = {
  include: [
    {
      model: Users,
      attributes: ['id', 'name', 'email', 'photoUrl'],
      required: true,
    },
  ],
};

class ReportsAction {
  static async list(req, res) { await CRUDAction.list(req, res, Reports, defaultOptions); }

  static async create(req, res) { await CRUDAction.create(req, res, Reports, defaultOptions); }

  static async get(req, res) { await CRUDAction.get(req, res, Reports, defaultOptions); }

  static async update(req, res) { await CRUDAction.update(req, res, Reports, defaultOptions); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Reports, defaultOptions); }

  static async active(req, res) { await CRUDAction.active(req, res, Reports, defaultOptions); }

  static async disable(req, res) { await CRUDAction.disable(req, res, Reports, defaultOptions); }
}

module.exports = ReportsAction;
