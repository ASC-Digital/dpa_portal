const _ = require("lodash");
const databaseFactory = require("../../models/dbFactory");
const { OK, BadRequest, NotFound } = require("../../server/http/response");

class CRUDAction {
  static async list(req, res, modelEntity, options = {}) {
    const listOptions = databaseFactory.generateFilter(modelEntity, req.query);
    let allOptions = _.merge(listOptions, options);
    if (!req.showDisabled) {
      allOptions = _.merge(listOptions, { where: { deletedAt: null } });
    }
    const entity = await modelEntity.findAll(allOptions);
    return OK(res, { data: entity });
  }

  static async get(req, res, modelEntity, options = {}) {
    let allOptions = options;
    if (!req.showDisabled) {
      allOptions = _.merge(allOptions, { where: { deletedAt: null } });
    }
    const entity = await modelEntity.findByPk(req.params.key, allOptions);

    if (!entity) {
      return NotFound(res, {
        message: "Failure to get",
        errors: [`ID '${req.params.key}' not found`],
      });
    }

    return OK(res, { data: entity });
  }

  static async create(req, res, modelEntity) {
    let entity;

    try {
      const data = await databaseFactory.generateData(modelEntity, req.body);
      entity = await modelEntity.create(data);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to create",
        errors: [errorMessage],
      });
    }

    return OK(res, { data: entity });
  }

  static async update(req, res, modelEntity, options = {}) {
    let entity;
    let allOptions = options;
    if (!req.showDisabled) {
      allOptions = _.merge(allOptions, { where: { deletedAt: null } });
    }

    try {
      entity = await modelEntity.findByPk(req.params.key, allOptions);
      if (!entity) {
        return NotFound(res, {
          message: "Failure to update",
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      const data = await databaseFactory.generateData(modelEntity, req.body, [
        "email",
        "profit",
      ]);
      await entity.set(data).save();
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to update",
        errors: [errorMessage],
      });
    }

    return OK(res, { data: entity });
  }

  static async delete(
    req,
    res,
    modelEntity,
    options = {},
    force_delete = false
  ) {
    let entity;
    let allOptions = options;
    if (!req.showDisabled) {
      allOptions = _.merge(allOptions, { where: { deletedAt: null } });
    }

    try {
      entity = await modelEntity.findByPk(req.params.key, allOptions);
      if (!entity) {
        return NotFound(res, {
          message: "Failure to delete",
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      if (req.query.force_delete === "true" || force_delete) {
        await entity.destroy();
      } else {
        entity.deletedAt = new Date();
        await entity.save();
      }
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to delete",
        errors: [errorMessage],
      });
    }

    return OK(res, { data: entity });
  }

  static async active(req, res, modelEntity, options = {}) {
    let entity;

    try {
      entity = await modelEntity.findByPk(req.params.key, options);
      if (!entity) {
        return NotFound(res, {
          message: "Failure to active",
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      entity.deletedAt = null;
      await entity.save();
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to active",
        errors: [errorMessage],
      });
    }

    return OK(res, { data: entity });
  }

  static async disable(req, res, modelEntity, options = {}) {
    let entity;

    try {
      entity = await modelEntity.findByPk(req.params.key, options);
      if (!entity) {
        return NotFound(res, {
          message: "Failure to disable",
          errors: [`ID '${req.params.key}' not found`],
        });
      }

      entity.deletedAt = new Date();
      await entity.save();
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return BadRequest(res, {
        message: "Failure to disable",
        errors: [errorMessage],
      });
    }

    return OK(res, { data: entity });
  }
}

module.exports = CRUDAction;
