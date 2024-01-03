const listKeys = (entity, excludeFields = []) => {
  const keys = [];
  Object.keys(entity.rawAttributes).forEach((key) => {
    if (excludeFields.indexOf(key) === -1) {
      keys.push(key);
    }
  });
  return keys;
};

module.exports = {
  listKeys,
};
