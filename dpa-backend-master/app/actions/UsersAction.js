const _ = require("lodash");
const { Op } = require("sequelize");

const Users = require("../models/entities/Users");
const Roles = require("../models/entities/Roles");
const Wallets = require("../models/entities/Wallets");
const DistributorsXUsers = require("../models/entities/DistributorsXUsers");
const Distributors = require("../models/entities/Distributors");
const CompanyBranches = require("../models/entities/CompanyBranches");
const Clusters = require("../models/entities/Clusters");

const databaseFactory = require("../models/dbFactory");

const CRUDAction = require("./abstract/CRUDAction");
const { OK, BadRequest, NotFound } = require("../server/http/response");

const defaultOptions = {
  include: [
    { model: Roles },
    {
      model: Distributors,
      include: [{ model: Clusters }, { model: CompanyBranches }],
    },
  ],
};

class UsersAction {
  static async list(req, res) {
    await CRUDAction.list(req, res, Users, defaultOptions);
  }

  static async create(req, res) {
    let user;

    try {
      const data = await databaseFactory.generateData(Users, req.body);
      user = await Users.create(data);
      await Wallets.create({ userId: user.id });

      const { distributorsId } = req.body;
      if (distributorsId) {
        const promises = distributorsId.map(async (distributorId) => {
          await DistributorsXUsers.create({ userId: user.id, distributorId });
        });
        await Promise.all(promises);
      }
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to create",
        errors: [errorMessage],
      });
    }

    user = await Users.findByPk(user.id, defaultOptions);
    return OK(res, { data: user });
  }

  static async get(req, res) {
    await CRUDAction.get(req, res, Users, defaultOptions);
  }

  static async update(req, res) {
    let user;
    let allOptions = defaultOptions;
    if (!req.showDisabled) {
      allOptions = _.merge(allOptions, { where: { deletedAt: null } });
    }

    try {
      user = await Users.findByPk(req.params.key, allOptions);
      if (!user) {
        return NotFound(res, {
          message: "Failure to update",
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      const { distributorsId } = req.body;
      if (distributorsId !== undefined) {
        await DistributorsXUsers.destroy({
          where: {
            userId: user.id,
            distributorId: { [Op.notIn]: distributorsId },
          },
        });

        let create;
        const dxus = await DistributorsXUsers.findAll({
          where: { userId: user.id },
        });
        await distributorsId.map(async (distributorId) => {
          create = true;
          dxus.forEach((dxu) => {
            if (dxu.distributorId === distributorId) {
              create = false;
            }
          });

          if (create) {
            await DistributorsXUsers.create({ userId: user.id, distributorId });
          }
        });
      }
      const avoidFields = [1, 2].includes(req.roleId)
        ? ["profit"]
        : ["email", "profit"];

      const data = await databaseFactory.generateData(
        Users,
        req.body,
        avoidFields
      );

      await user.set(data).save();

      user = await Users.findByPk(req.params.key, allOptions);
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

  static async delete(req, res) {
    await CRUDAction.delete(req, res, Users, defaultOptions);
  }

  static async active(req, res) {
    await CRUDAction.active(req, res, Users, defaultOptions);
  }

  static async disable(req, res) {
    await CRUDAction.disable(req, res, Users, defaultOptions);
  }
}

module.exports = UsersAction;
