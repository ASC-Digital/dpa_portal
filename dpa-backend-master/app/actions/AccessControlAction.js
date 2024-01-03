/* eslint-disable class-methods-use-this */
const AccessControlFactory = require('../factory/AccessControlFactory');
const absAction = require('./AbstractAction');

const factory = new AccessControlFactory();

class AccessControlAction {
  async read(req, res) { await absAction.read(req, res, factory); }

  async export(req, res) { await absAction.export(req, res, factory); }
}

module.exports = AccessControlAction;
