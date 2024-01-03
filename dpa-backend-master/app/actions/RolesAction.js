/* eslint-disable class-methods-use-this */
const RolesFactory = require('../factory/RolesFactory');
const absAction = require('./AbstractAction');

const factory = new RolesFactory();

class RolesAction {
  async create(req, res) { await absAction.create(req, res, factory); }

  async read(req, res) { await absAction.read(req, res, factory); }

  async update(req, res) { await absAction.update(req, res, factory); }

  async delete(req, res) { await absAction.delete(req, res, factory); }

  async active(req, res) { await absAction.active(req, res, factory); }

  async disable(req, res) { await absAction.disable(req, res, factory); }

  async export(req, res) { await absAction.export(req, res, factory); }
}

module.exports = RolesAction;
