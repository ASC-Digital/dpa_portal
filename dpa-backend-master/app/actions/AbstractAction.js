/* eslint-disable class-methods-use-this */
const {
  OK,
  BadRequest,
  NotFound,
  InternalServerError,
} = require("../server/http/response");

class AbstractAction {
  static async create(req, res, factory) {
    let data = { ...req.body };
    let entity;

    try {
      data = await factory.getData(data);
      entity = await factory.create(data, req.body);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to create",
        errors: [errorMessage],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to create",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async read(req, res, factory) {
    const showDisabled = req.showDisabled === true;
    const filterDistributors = req.onlyDistributors;
    const id = req.params.key ? Number(req.params.key) : null;
    const filters = req.query;
    let entity;

    try {
      entity = await factory.read(
        id,
        showDisabled,
        filters,
        filterDistributors
      );
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to read",
        errors: [errorMessage],
      });
    }

    if (id && !entity) {
      return NotFound(res, {
        message: "Empty to get",
        errors: [`ID '${id}' not found`],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to read",
        errors: [entity.errors],
      });
    }

    const content = {};
    if ("count" in entity) {
      content.page = Number(filters.page);
      content.per_page = Number(filters.limit);
      content.total = entity.count;
      content.total_pages = Math.ceil(entity.count / filters.limit);
      content.data = entity.rows;
    } else {
      content.data = entity;
    }

    return OK(res, content);
  }

  static async update(req, res, factory, options = {}) {
    const showDisabled = req.showDisabled === true;
    const id = isNaN(Number(req.params.key))
      ? req?.params?.key
      : Number(req?.params?.key);
    let data = { ...req.body };
    let entity;

    try {
      data = await factory.getData(data);
      entity = await factory.update(id, data, showDisabled, options, req.body);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to update",
        errors: [errorMessage],
      });
    }

    if (!entity) {
      return NotFound(res, {
        message: "Failure to update",
        errors: [`ID '${id}' not found`],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to update",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async delete(req, res, factory) {
    const softDelete = req.query.force_delete !== "true";
    const id = isNaN(Number(req.params.key))
      ? req?.params?.key
      : Number(req?.params?.key);
    let entity;

    try {
      entity = await factory.delete(id, softDelete);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to delete",
        errors: [errorMessage],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to delete",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async active(req, res, factory) {
    const showDisabled = true;
    const id = Number(req.params.key);
    const data = { deletedAt: null };
    let entity;

    try {
      entity = await factory.update(id, data, showDisabled);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to active",
        errors: [errorMessage],
      });
    }

    if (!entity) {
      return NotFound(res, {
        message: "Failure to active",
        errors: [`ID '${id}' not found`],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to active",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async disable(req, res, factory) {
    const softDelete = true;
    const id = Number(req.params.key);
    let entity;

    try {
      entity = await factory.delete(id, softDelete);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to disable",
        errors: [errorMessage],
      });
    }

    if (!entity) {
      return NotFound(res, {
        message: "Failure to disable",
        errors: [`ID '${id}' not found`],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to disable",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async approval(req, res, factory) {
    const showDisabled = req.showDisabled === true;
    const id = Number(req.params.key);
    const data = {
      status: "approved",
      reason: req.body.reason || null,
    };
    let entity;

    try {
      entity = await factory.update(id, data, showDisabled);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to approval",
        errors: [errorMessage],
      });
    }

    if (!entity) {
      return NotFound(res, {
        message: "Failure to approval",
        errors: [`ID '${id}' not found`],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to approval",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async disapproval(req, res, factory) {
    const showDisabled = req.showDisabled === true;
    const id = Number(req.params.key);
    const data = {
      status: "disapproved",
      reason: req.body.reason || null,
    };
    let entity;

    try {
      entity = await factory.update(id, data, showDisabled);
    } catch (error) {
      const errorMessage = error.original
        ? error.original.message
        : error.message;
      return InternalServerError(res, {
        message: "Failure to disapproval",
        errors: [errorMessage],
      });
    }

    if (!entity) {
      return NotFound(res, {
        message: "Failure to disapproval",
        errors: [`ID '${id}' not found`],
      });
    }

    if ("errors" in entity) {
      return BadRequest(res, {
        message: "Failure to disapproval",
        errors: [entity.errors],
      });
    }

    return OK(res, { data: entity });
  }

  static async import(req, res, factory, inParallel = true) {
    const { file } = req.files;
    let headers = [];
    const content = [];
    const fileData = file.data.toString();
    const rows = fileData.replace(/[\r]/gm, "").split("\n");

    if (inParallel) {
      await Promise.all(
        rows.map(async (row, line) => {
          if (!row.replace(/;/g, "")) return row;

          const columns = row.split(";");
          if (headers.length < 1) {
            headers = columns;
            return row;
          }

          const data = {};
          for (let i = 0; i < headers.length; i += 1) {
            data[headers[i]] = columns[i] ? columns[i].trim() : null;
          }

          const result = await factory.import(data);
          content.push({ line, data, result });

          return row;
        })
      );
    } else {
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];

        // eslint-disable-next-line no-continue
        if (!row.replace(/;/g, "")) continue;

        const columns = row.split(";");
        if (headers.length < 1) {
          headers = columns;
          // eslint-disable-next-line no-continue
          continue;
        }

        const data = {};
        for (let j = 0; j < headers.length; j += 1) {
          data[headers[j]] = columns[j] ? columns[j].trim() : null;
        }

        // eslint-disable-next-line no-await-in-loop
        const result = await factory.import(data);
        content.push({ line: i + 1, data, result });
      }
    }

    return OK(res, { data: content });
  }

  static async export(req, res, factory) {
    const showDisabled = req.showDisabled === true;
    const filterDistributors = req.onlyDistributors;
    const filters = req.query;

    const data = await factory.export(
      filters,
      showDisabled,
      filterDistributors
    );
    return OK(res, { data });
  }

  static async readDigitalAdvertisingMaterial(req, res, factory) {
    const showDisabled = req.showDisabled === true;
    const filterDistributors = req.onlyDistributors;
    const filters = req.query;

    try {
        const entity = await factory.readDigitalAdvertisingMaterial(
            showDisabled,
            filters,
            filterDistributors
        );

        if ("errors" in entity) {
            return BadRequest(res, {
                message: "Failure to read digital advertising material",
                errors: [entity.errors],
            });
        }

        const content = {};
        if ("count" in entity) {
            content.page = Number(filters.page);
            content.per_page = Number(filters.limit);
            content.total = entity.count;
            content.total_pages = Math.ceil(entity.count / filters.limit);
            content.data = entity.rows;
        } else {
            content.data = entity;
        }

        return OK(res, content);
    } catch (error) {
        const errorMessage = error.original
            ? error.original.message
            : error.message;
        return InternalServerError(res, {
            message: "Failure to read digital advertising material",
            errors: [errorMessage],
        });
    }
  }
}

module.exports = AbstractAction;
