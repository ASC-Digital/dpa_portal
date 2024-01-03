const _ = require("lodash");
const { EmptyToNull } = require("../utils/EmptyToNull");
const DBFactory = require("./DBFactory");

class CrudFactory {
  constructor(modelEntity) {
    this.entity = modelEntity;
  }

  getFilter(filters) {
    return DBFactory.generateFilter(this.entity, filters);
  }

  getData(rawData) {
    return DBFactory.generateData(this.entity, rawData);
  }

  async create(raw) {
    const data = EmptyToNull(raw);
    try {
      const entity = this.entity.build();
      return entity.set(data).save();
    } catch (error) {
      const errors = error.original ? error.original.message : error.message;
      return { errors };
    }
  }

  async read(id = null, showDisabled = false, options = {}) {
    let allOptions = this.getFilter(options);
    allOptions = _.merge(allOptions, { ...this.defaultOptions });

    if (showDisabled === false) {
      allOptions = _.merge(allOptions, { where: { deletedAt: null } });
    }

    if (id !== null) {
      allOptions = _.merge(allOptions, { where: { id } });
    }

    if (options?.order) {
      allOptions = _.merge(allOptions, { order: options?.order });
    }

    try {
      if (id) {
        return await this.entity.findOne(allOptions);
      }

      if (options.limit) {
        return await this.entity.findAndCountAll(allOptions);
      }

      return await this.entity.findAll(allOptions);
    } catch (error) {
      const errors = error.original ? error.original.message : error.message;
      return { errors };
    }
  }

  async update(id, raw, showDisabled = false, options = {}) {
    let allOptions = this.getFilter(options);
    allOptions = _.merge({ ...this.defaultOptions }, allOptions);

    if (showDisabled === false) {
      allOptions = _.merge(allOptions, { where: { deletedAt: null } });
    }
    allOptions = _.merge(allOptions, { where: { id } });
    const data = EmptyToNull(raw);

    try {
      const entity = await this.entity.findOne(allOptions);
      return await entity.set(data).save();
    } catch (error) {
      const errors = error.original ? error.original.message : error.message;
      return { errors };
    }
  }

  async delete(id, softDelete = true, options = {}) {
    let allOptions = this.getFilter(options);
    allOptions = _.merge({ ...this.defaultOptions }, allOptions);
    allOptions = _.merge(allOptions, { where: { id } });

    try {
      const entity = await this.entity.findOne(allOptions);
      if (softDelete === false) {
        await entity.destroy();
      } else {
        entity.deletedAt = new Date();
        await entity.save();
      }
      return entity;
    } catch (error) {
      const errors = error.original ? error.original.message : error.message;
      return { errors };
    }
  }
}

module.exports = CrudFactory;
