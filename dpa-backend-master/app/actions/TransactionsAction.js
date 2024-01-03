const Users = require('../models/entities/Users');
const Wallets = require('../models/entities/Wallets');
const Awards = require('../models/entities/Awards');
const Products = require('../models/entities/Products');
const Transactions = require('../models/entities/Transactions');
const CRUDAction = require('./abstract/CRUDAction');

class TransactionsAction {
  static async list(req, res) {
    const options = {
      include: [
        {
          model: Wallets,
          include: [{ model: Users }],
        },
        { model: Awards },
        { model: Products },
      ],
    };
    await CRUDAction.list(req, res, Transactions, options);
  }

  static async get(req, res) {
    const options = {
      include: [
        {
          model: Wallets,
          include: [{ model: Users }],
        },
        { model: Awards },
        { model: Products },
      ],
    };
    await CRUDAction.get(req, res, Transactions, options);
  }
}

module.exports = TransactionsAction;
