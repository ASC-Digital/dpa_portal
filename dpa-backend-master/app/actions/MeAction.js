const Users = require("../models/entities/Users");
const Roles = require("../models/entities/Roles");
const Wallets = require("../models/entities/Wallets");
const Awards = require("../models/entities/Awards");
const Products = require("../models/entities/Products");
const Transactions = require("../models/entities/Transactions");
const Reports = require("../models/entities/Reports");

const DashboardFactory = require("../factory/DashboardFactory");
const databaseFactory = require("../models/dbFactory");
const { OK, BadRequest, NotFound } = require("../server/http/response");

class MeAction {
  static async get(req, res) {
    const user = await Users.findOne({
      where: { id: req.userId },
      include: { model: Roles },
    });

    if (!user) {
      return NotFound(res, {
        message: "Failure to get",
        errors: [`ID '${req.userId}' not found`],
      });
    }

    return OK(res, { data: user });
  }

  static async update(req, res) {
    let user;

    try {
      user = await Users.findByPk(req.userId, { include: [Roles] });
      if (!user) {
        return NotFound(res, {
          message: "Failure to update",
          errors: [`ID '${req.userId}' not found`],
        });
      }

      const data = await databaseFactory.generateData(Users, req.body, [
        "email",
      ]);
      await user.set(data).save();
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to update",
        errors: [errorMessage],
      });
    }

    return OK(res, { data: user });
  }

  static async get_dashboard(req, res) {
    const wallet = await Wallets.findOne({ where: { userId: req.userId } });

    const limit = 10;

    // About Products
    const productsWhere = { deletedAt: null };
    const totalProducts = await DashboardFactory.totalProducts(productsWhere);

    // About Transactions
    const transactionInclude = [{ model: Wallets, include: [Users] }];

    const receivedWhere = {
      productId: null,
      walletId: wallet.id,
      deletedAt: null,
    };
    const totalTransactionsReceived = await DashboardFactory.totalTransactions(
      receivedWhere
    );
    const topTransactionsReceived = await DashboardFactory.topTransactions(
      transactionInclude,
      receivedWhere,
      limit,
      [["total_price", "DESC"]]
    );

    const spentWhere = { awardId: null, walletId: wallet.id, deletedAt: null };
    const totalTransactionsSpent = await DashboardFactory.totalTransactions(
      spentWhere
    );
    const topTransactionsSpent = await DashboardFactory.topTransactions(
      transactionInclude,
      spentWhere,
      limit,
      [["total_price", "ASC"]]
    );

    // About Awards
    const topAwardsByRelated = await DashboardFactory.topAwardsByRelated({
      userId: req.userId,
    });

    const data = {
      totalProducts,
      totalTransactionsReceived,
      topTransactionsReceived,
      totalTransactionsSpent,
      topTransactionsSpent,
      topAwardsByRelated,
    };

    return OK(res, { data });
  }

  static async get_wallet(req, res) {
    const wallet = await Wallets.findOne({ where: { userId: req.userId } });

    if (!wallet) {
      return NotFound(res, {
        message: "Failure to get",
        errors: [`ID '${req.userId}' not found`],
      });
    }

    return OK(res, { data: wallet });
  }

  static async get_reports(req, res) {
    const { query } = req;
    const options = { where: { userId: req.userId, deletedAt: null } };
    if (query.type) {
      options.where.type = query.type;
    }
    console.log(options);
    const reports = await Reports.findAll(options);

    if (!reports) {
      return NotFound(res, {
        message: "Failure to get",
        errors: [`ID '${req.userId}' not found`],
      });
    }

    return OK(res, { data: reports });
  }

  static async list_transactions(req, res) {
    const options = {
      include: [
        {
          model: Wallets,
          include: [{ model: Users }],
        },
        { model: Awards },
        { model: Products },
      ],
      where: { "$wallet->user.id$": req.userId },
    };

    const transactions = await Transactions.findAll(options);
    return OK(res, { data: transactions });
  }
}

module.exports = MeAction;
