const Sequelize = require('sequelize');
const env = require('../config/environment');

const options = {
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
  host: env.database.host,
  dialect: env.database.dialect,
  logging: env.app.env !== 'production',
};

if (env.database.cloudsql) {
  options.dialectOptions = { socketPath: env.database.host };
}

if (env.database.ssl) {
  options.ssl = env.database.ssl;
  options.dialectOptions = { ssl: { require: env.database.ssl } };
}

const sequelize = new Sequelize(
  env.database.database,
  env.database.user,
  env.database.password,
  options,
);

module.exports = sequelize;
