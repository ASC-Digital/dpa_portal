const { Op } = require("sequelize");
const { hash } = require("../services/Hash");
const { isNumeric } = require("../utils/IsNumeric");
const { listKeys } = require("../utils/EntityKeys");

const generateFilter = (entity, filters) => {
  const avaliableKeys = listKeys(entity);
  let options = { where: {} };
  Object.keys(filters).forEach((key) => {
    if (avaliableKeys.indexOf(key) >= 0) {
      if (isNumeric(filters[key])) {
        options.where[key] = filters[key];
      } else {
        options.where[key] = { [Op.like]: `%${filters[key]}%` };
      }
    }
  });

  //If filters includes a where clause, merge it to the options
  if (filters["where"]) {
    options = { where: { ...options.where, ...filters["where"] } };
  }

  if ("page" in filters && "limit" in filters) {
    options.order = [["id", "DESC"]];
    options.limit = Number(filters.limit);
    options.offset = options.limit * (Number(filters.page) - 1);
    options.subQuery = false;
  }

  if ("filterDistributors" in filters) {
    options.where[filters.filterDistributors.key] =
      filters.filterDistributors.value;
  }

  if ("customFilters" in filters) {
    for (let i = 0; i < filters.customFilters.length; i += 1) {
      const filter = filters.customFilters[i];
      options.where[filter.key] = filter.value;
    }
  }

  return options;
};

const generateData = async (entity, raw, exclude = []) => {
  const rawData = raw;
  if (entity.name === "users" && "password" in rawData) {
    rawData.password = await hash(rawData.password);
  }
  const excludeFields = ["id", "createdAt", "updatedAt", "deletedAt"];
  const avaliableKeys = listKeys(entity, [...excludeFields, ...exclude]);
  const data = {};
  Object.keys(rawData).forEach((key) => {
    if (avaliableKeys.indexOf(key) >= 0) {
      data[key] = rawData[key];
    }
  });
  return data;
};

module.exports = {
  generateFilter,
  generateData,
};
