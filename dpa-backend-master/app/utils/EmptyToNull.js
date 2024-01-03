const _ = require('lodash');

const EmptyToNull = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj === '' ? null : obj;
  }

  return _.mapValues(obj, (v) => {
    if (typeof v === 'object' && Array.isArray(v)) {
      return v.map((vv) => EmptyToNull(vv));
    }

    if (typeof v === 'object' && v !== null) {
      return EmptyToNull(v);
    }

    return v === '' ? null : v;
  });
};

module.exports = {
  EmptyToNull,
};
