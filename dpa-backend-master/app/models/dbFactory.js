const { Op } = require('sequelize');
const { hash } = require('../services/Hash');

const listKeys = (entity, excludeFields) => {
  const keys = [];
  Object.keys(entity.rawAttributes).forEach((key) => {
    if (excludeFields.indexOf(key) === -1) {
      keys.push(key);
    }
  });
  return keys;
};

const generateFilter = (entity, filters) => {
  const excludeFields = ['id'];
  const avaliableKeys = listKeys(entity, excludeFields);
  const options = { where: {} };
  Object.keys(filters).forEach((key) => {
    if (avaliableKeys.indexOf(key) >= 0) {
      options.where[key] = { [Op.like]: `%${filters[key]}%` };
    }
  });
  return options;
};

const generateData = async (entity, raw, exclude = []) => {
  const rawData = { ...raw };
  if (entity.name === 'users' && 'password' in rawData) {
    if (typeof rawData.password === 'string' && rawData.password.length > 0) {
      rawData.password = await hash(rawData.password);
    } else {
      delete rawData.password;
    }
  }
  const excludeFields = ['id', 'createdAt', 'updatedAt', 'deletedAt'];
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
