const Products = require('../models/entities/Products');
const Wallets = require('../models/entities/Wallets');
const Transactions = require('../models/entities/Transactions');
const CRUDAction = require('./abstract/CRUDAction');
const { OK, Unauthorized, NotFound } = require('../server/http/response');

class ProductsAction {
  static async list(req, res) { await CRUDAction.list(req, res, Products); }

  static async create(req, res) { await CRUDAction.create(req, res, Products); }

  static async get(req, res) { await CRUDAction.get(req, res, Products); }

  static async update(req, res) { await CRUDAction.update(req, res, Products); }

  static async delete(req, res) { await CRUDAction.delete(req, res, Products); }

  static async active(req, res) { await CRUDAction.active(req, res, Products); }

  static async disable(req, res) { await CRUDAction.disable(req, res, Products); }

  static async buy(req, res) {
    const wallet = await Wallets.findOne({ where: { userId: req.userId } });
    if (!wallet) {
      return NotFound(res, {
        message: 'Failure to get user wallet',
        errors: [`userID '${req.userId}' not found`],
      });
    }

    const product = await Products.findByPk(req.params.key, { where: { deletedAt: null } });
    if (!product) {
      return NotFound(res, {
        message: 'Failure to get product',
        errors: [`ID '${req.params.key}' not found`],
      });
    }

    const totalAmount = Number(req.body.amount || 1);
    if (product.stock < totalAmount) {
      return Unauthorized(res, {
        message: 'Failure to buy product',
        errors: ['Product is out of stock'],
      });
    }
    product.stock -= totalAmount;

    let totalPrice = Number(product.price) * totalAmount;
    if (wallet.balance < totalPrice) {
      return Unauthorized(res, {
        message: 'Failure to buy product',
        errors: ['Insufficient funds'],
      });
    }
    wallet.balance -= totalPrice;

    await Transactions.create({
      walletId: wallet.id,
      productId: product.id,
      name: product.name,
      description: product.description,
      totalAmount,
      totalPrice: Number(totalPrice *= -1),
    });

    await product.save();
    await wallet.save();

    return OK(res, { message: 'Product successfully purchased' });
  }
}

module.exports = ProductsAction;
