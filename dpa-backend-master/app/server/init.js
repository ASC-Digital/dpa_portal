const database = require("../models/db");
const Roles = require("../models/entities/Roles");
const Users = require("../models/entities/Users");
const Permissions = require("../models/entities/Permissions");
const RolesXPermissions = require("../models/entities/RolesXPermissions");
const Products = require("../models/entities/Products");
const Wallets = require("../models/entities/Wallets");
const Awards = require("../models/entities/Awards");
const Transactions = require("../models/entities/Transactions");
const Clusters = require("../models/entities/Clusters");
const CompanyBranches = require("../models/entities/CompanyBranches");
const Distributors = require("../models/entities/Distributors");
const DistributorsXUsers = require("../models/entities/DistributorsXUsers");
const Reports = require("../models/entities/Reports");
const AccessControl = require("../models/entities/AccessControl");
const Posts = require("../models/entities/Posts");
const Comments = require("../models/entities/Comments");
const Likes = require("../models/entities/Likes");
const Attachments = require("../models/entities/Attachments");
const DownloadedAdvertisingMaterials = require("../models/entities/DownloadedAdvertisingMaterials");
const AdvertisingMaterial = require("../models/entities/AdvertisingMaterial");

const loadDB = async () => {
  console.log("Init Load Database");

  // FK Users
  Roles.hasOne(Users);
  Users.belongsTo(Roles);

  // FK Roles X Permissions
  Roles.belongsToMany(Permissions, { through: RolesXPermissions });
  Permissions.belongsToMany(Roles, { through: RolesXPermissions });

  // FK Wallets
  Users.hasOne(Wallets);
  Wallets.belongsTo(Users);

  // FK Transactions
  Wallets.hasOne(Transactions);
  Products.hasOne(Transactions);
  Awards.hasOne(Transactions);
  Transactions.belongsTo(Wallets);
  Transactions.belongsTo(Products);
  Transactions.belongsTo(Awards);

  // FK Clusters
  Clusters.hasOne(Distributors);
  Distributors.belongsTo(Clusters);

  // FK Company Branches
  CompanyBranches.hasOne(Distributors);
  Distributors.belongsTo(CompanyBranches);

  // FK Distributors X Users
  Distributors.belongsToMany(Users, { through: DistributorsXUsers });
  Users.belongsToMany(Distributors, { through: DistributorsXUsers });

  // FK Reports
  Users.hasMany(Reports);
  Reports.belongsTo(Users);

  // FK Advertising Materials
  AdvertisingMaterial.hasMany(DownloadedAdvertisingMaterials);
  DownloadedAdvertisingMaterials.belongsTo(AdvertisingMaterial);
  Users.hasMany(DownloadedAdvertisingMaterials);
  DownloadedAdvertisingMaterials.belongsTo(Users);

  // FK Posts and Comments
  Users.hasMany(Posts);
  Posts.belongsTo(Users);
  Posts.hasMany(Comments);
  Users.hasMany(Comments);
  Comments.belongsTo(Users);
  Comments.belongsTo(Posts);
  Posts.hasMany(Attachments);
  Attachments.belongsTo(Posts);
  Posts.hasMany(Likes);
  Likes.belongsTo(Posts);

  // FK Access Control
  Users.hasMany(AccessControl);
  AccessControl.belongsTo(Users);

  try {
    await database.sync();
  } catch (error) {
    console.log(error);
    throw Error(`Failure to connect to database: ${error}`);
  }
};

module.exports = async () => {
  loadDB();
};
