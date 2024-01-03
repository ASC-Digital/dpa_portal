const Users = require('../models/entities/Users');
const Wallets = require('../models/entities/Wallets');
const Awards = require('../models/entities/Awards');
const Transactions = require('../models/entities/Transactions');
const AwardsFactory = require('../factory/AwardsFactory');
const databaseFactory = require('../models/dbFactory');
const CRUDAction = require('./abstract/CRUDAction');
const { OK, BadRequest, NotFound } = require('../server/http/response');

class AwardsAction {
  static async list(req, res) {
    const options = {
      include: [{
        model: Transactions,
        include: [{
          model: Wallets,
          include: [
            { model: Users },
          ],
        }],
      }],
    };
    await CRUDAction.list(req, res, Awards, options);
  }

  static async create(req, res) { await CRUDAction.create(req, res, Awards); }

  static async get(req, res) {
    const options = {
      include: [{
        model: Transactions,
        include: [{
          model: Wallets,
          include: [
            { model: Users },
          ],
        }],
      }],
    };
    await CRUDAction.get(req, res, Awards, options);
  }

  static async update(req, res) {
    let award;
    const options = {};
    if (!req.showDisabled) {
      options.where = { deletedAt: null };
    }

    try {
      award = await Awards.findByPk(req.params.key, options);
      if (!award) {
        return NotFound(res, {
          message: 'Failure to update',
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      if ('profit' in req.body && Number(req.body.profit) !== Number(award.profit)) {
        const transaction = await award.getTransaction();
        transaction.totalPrice = req.body.profit;
        await transaction.save();

        const wallet = await transaction.getWallet();
        wallet.balance -= award.profit;
        wallet.balance += Number(req.body.profit);
        await wallet.save();
      }

      const data = await databaseFactory.generateData(Awards, req.body);
      await award.set(data).save();
    } catch (error) {
      const errorMessage = (error.original) ? error.original.message : error.message;
      return BadRequest(res, { message: 'Failure to update', errors: [errorMessage] });
    }

    return OK(res, { data: award });
  }

  static async delete(req, res) {
    let award;
    const options = {};
    if (!req.showDisabled) {
      options.where = { deletedAt: null };
    }

    try {
      award = await Awards.findByPk(req.params.key, options);
      if (!award) {
        return NotFound(res, {
          message: 'Failure to delete',
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      const transaction = await award.getTransaction();
      const wallet = await transaction.getWallet();
      wallet.balance -= award.profit;
      await wallet.save();

      await transaction.destroy();
      await award.destroy();
    } catch (error) {
      const errorMessage = (error.original) ? error.original.message : error.message;
      return BadRequest(res, { message: 'Failure to delete', errors: [errorMessage] });
    }

    return OK(res, { data: award });
  }

  static async import(req, res) {
    if (!req.files) {
      return BadRequest(res, { errors: ['File was not found'] });
    }

    const { file } = req.files;
    const lines = AwardsFactory.fileContentToObject(file);
    if (lines.length < 1) {
      return BadRequest(res, { errors: ['The file is blank'] });
    }

    const lineByUser = AwardsFactory.groupLinesByUser(lines, file.name);
    if (!lineByUser) {
      return BadRequest(res, { errors: ['The file is out of standard'] });
    }

    Object.keys(lineByUser).forEach(async (userEmail) => {
      await AwardsFactory.executeTransaction(userEmail, lineByUser[userEmail]);
    });

    return OK(res, { message: 'Successfully imported awards!' });
  }
}

module.exports = AwardsAction;
