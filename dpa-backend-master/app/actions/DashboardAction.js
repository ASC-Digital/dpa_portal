const Users = require('../models/entities/Users');
const Roles = require('../models/entities/Roles');
const Wallets = require('../models/entities/Wallets');

const DashboardFactory = require('../factory/DashboardFactory');
const { OK } = require('../server/http/response');

class DashboardAction {
  static async get(req, res) {
    const defaultWhere = { deletedAt: null };
    const limit = 10;

    // About Users
    const totalUsers = await DashboardFactory.totalUsers(defaultWhere);
    const topUsersByCreatedAt = await DashboardFactory.topUsers(
      [Roles],
      defaultWhere,
      limit,
      [['created_at', 'DESC']],
    );

    // About Distributors
    const totalDistributors = await DashboardFactory.totalDistributors(defaultWhere);
    const totalDistributorsByCluster = await DashboardFactory.totalDistributorsByCluster();

    // About Products
    const totalProducts = await DashboardFactory.totalProducts(defaultWhere);
    const topProductsByStock = await DashboardFactory.topProducts(
      [],
      defaultWhere,
      limit,
      [['stock', 'DESC']],
    );

    // About Transactions Received
    const receivedWhere = { productId: null, deletedAt: null };
    const totalTransactionsReceived = await DashboardFactory.totalTransactions(receivedWhere);
    const topTransactionsReceived = await DashboardFactory.topTransactions(
      [{ model: Wallets, include: [Users] }],
      receivedWhere,
      limit,
      [['total_price', 'DESC']],
    );

    // About Transactions Spent
    const spentWhere = { deletedAt: null, awardId: null };
    const totalTransactionsSpent = await DashboardFactory.totalTransactions(spentWhere);
    const topTransactionsSpent = await DashboardFactory.topTransactions(
      [{ model: Wallets, include: [Users] }],
      spentWhere,
      limit,
      [['total_price', 'ASC']],
    );

    // About Awards
    const topAwardsByRelated = await DashboardFactory.topAwardsByRelated();

    const data = {
      totalUsers,
      topUsersByCreatedAt,
      totalDistributors,
      totalDistributorsByCluster,
      totalProducts,
      topProductsByStock,
      totalTransactionsReceived,
      topTransactionsReceived,
      totalTransactionsSpent,
      topTransactionsSpent,
      topAwardsByRelated,
    };

    return OK(res, { data });
  }
}

module.exports = DashboardAction;
