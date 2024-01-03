const methodOverride = require("method-override");
const express = require("express");
const _ = require("underscore");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

const init = require("./init");
const AuthRouter = require("../routers/AuthRouter");
const MeRouter = require("../routers/MeRouter");
const IndexRouter = require("../routers/IndexRouter");
const DashboardRouter = require("../routers/DashboardRouter");
const PermissionsRouter = require("../routers/PermissionsRouter");
const RolesRouter = require("../routers/RolesRouter");
const UsersRouter = require("../routers/UsersRouter");
const ClustersRouter = require("../routers/ClustersRouter");
const CompanyBranchesRouter = require("../routers/CompanyBranchesRouter");
const DistributorsRouter = require("../routers/DistributorsRouter");
const ProductsRouter = require("../routers/ProductsRouter");
const AwardsRouter = require("../routers/AwardsRouter");
const TransactionsRouter = require("../routers/TransactionsRouter");
const StorageRouter = require("../routers/StorageRouter");
const ReportsRouter = require("../routers/ReportsRouter");
const BannersRouter = require("../routers/BannersRouter");
const ViewRouter = require("../routers/ViewRouter");
const ConfigsRouter = require("../routers/ConfigsRouter");
const PowerBIRouter = require("../routers/PowerBIRouter");
const AccessControlRouter = require("../routers/AccessControlRouter");
const PostsRouter = require("../routers/PostsRouter");
const CommentsRouter = require("../routers/CommentsRouter");
const LikesRouter = require("../routers/LikesRouter");
const AdvertisingMaterialRouter = require("../routers/AdvertisingMaterialRouter");
const DownloadedAdvertisingMaterialRouter = require("../routers/DownloadedAdvertisingMaterialRouter");

module.exports = async (callback) => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.json());
  app.use(express.urlencoded(_.extend({ extended: true })));
  app.use(fileupload());

  await init();

  app.use("/", IndexRouter);
  app.use("/auth", AuthRouter);
  app.use("/view", ViewRouter);
  app.use("/api/me", MeRouter);
  app.use("/api/dashboard", DashboardRouter);
  app.use("/api/permissions", PermissionsRouter);
  app.use("/api/roles", RolesRouter);
  app.use("/api/users", UsersRouter);
  app.use("/api/clusters", ClustersRouter);
  app.use("/api/company-branches", CompanyBranchesRouter);
  app.use("/api/distributors", DistributorsRouter);
  app.use("/api/products", ProductsRouter);
  app.use("/api/awards", AwardsRouter);
  app.use("/api/transactions", TransactionsRouter);
  app.use("/api/storage", StorageRouter);
  app.use("/api/reports", ReportsRouter);
  app.use("/api/banners", BannersRouter);
  app.use("/api/configs", ConfigsRouter);
  app.use("/api/powerbi", PowerBIRouter);
  app.use("/api/access-control", AccessControlRouter);
  app.use("/api/posts", PostsRouter);
  app.use("/api/comments", CommentsRouter);
  app.use("/api/likes", LikesRouter);
  app.use("/api/advertisingMaterial", AdvertisingMaterialRouter);
  app.use(
    "/api/downloadedAdvertisingMaterial",
    DownloadedAdvertisingMaterialRouter
  );

  callback(app);
};
