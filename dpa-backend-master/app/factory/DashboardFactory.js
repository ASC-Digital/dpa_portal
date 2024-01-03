const Sequelize = require('sequelize');
const Users = require('../models/entities/Users');
const Clusters = require('../models/entities/Clusters');
const Distributors = require('../models/entities/Distributors');
const Products = require('../models/entities/Products');
const Transactions = require('../models/entities/Transactions');
const Awards = require('../models/entities/Awards');
const Wallets = require('../models/entities/Wallets');

const totalUsers = (where = {}) => Users.count({ where });
const topUsers = (include = [], where = {}, limit = 10, order = []) => Users.findAll({
  include, where, limit, order,
});

const totalProducts = (where = {}) => Products.count({ where });
const topProducts = (include = [], where = {}, limit = 10, order = []) => Products.findAll({
  include,
  where,
  limit,
  order,
});

const totalDistributors = (where = {}) => Distributors.count({ where });
const totalDistributorsByCluster = async () => {
  const clusters = await Clusters.findAll({ where: { deletedAt: null } });
  const totalDist = await totalDistributors({ deletedAt: null });

  return Promise.all(clusters.map(async (cluster) => {
    const totalDistByCluster = await Distributors.count({
      where: { clusterId: cluster.id, deletedAt: null },
    });

    return {
      cluster: cluster.name,
      percent: Number(((totalDistByCluster / totalDist) * 100).toFixed(2)),
    };
  }));
};

const totalTransactions = (where = {}) => Transactions.count({ where });
const topTransactions = (include = [], where = {}, limit = 10, order = []) => Transactions.findAll({
  include,
  where,
  limit,
  order,
});

const topAwardsByRelated = (options = {}) => {
  const include = [{
    model: Transactions,
    required: true,
    attributes: [],
    include: [{
      model: Wallets,
      required: true,
      attributes: [],
      include: [{
        model: Users,
        required: true,
        attributes: [],
        where: { deletedAt: null },
      }],
    }],
  }];

  const where = options.where || { deletedAt: null };
  const limit = options.limit || 10;
  const order = options.order || [['related', 'ASC']];

  if ('userId' in options) {
    include[0].include[0].include[0].where.id = options.userId;
  }

  return Awards.findAll({
    attributes: [
      'related',
      [Sequelize.fn('sum', Sequelize.col('profit')), 'totalProfit'],
    ],
    group: ['related'],
    include,
    where,
    limit,
    order,

  });
};

module.exports = {
  totalUsers,
  topUsers,
  totalProducts,
  topProducts,
  totalTransactions,
  topTransactions,
  topAwardsByRelated,
  totalDistributors,
  totalDistributorsByCluster,
};
