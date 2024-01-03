const moment = require('moment');
const AccessControl = require('../models/entities/AccessControl');
const Users = require('../models/entities/Users');
const Roles = require('../models/entities/Roles');
const CrudFactory = require('./CrudFactory');

class AccessControlFactory extends CrudFactory {
  constructor() {
    super(AccessControl);
    this.defaultOptions = {
      include: [
        {
          model: Users,
          required: true,
          include: [
            {
              model: Roles,
              required: true,
            }
          ]
        },
      ],
    };
  }

  async read(id = null, showDisabled = false, options = {}) {
    const allData = await super.read(id, showDisabled, options);

    const data = [];
    allData.rows.map(row => {
      const ac = {...row.toJSON()};
      const dt = moment(ac.createdAt).tz('America/Sao_Paulo');
      ac.accessedAt = dt.format('DD/MM/YYYY HH:mm:ss');
      data.push(ac);
    });

    return {total: allData.count, data};
  }

  async export(filters = {}, showDisabled = false, filterDistributors = '*') {
    const result = await this.read(null, showDisabled, filters, filterDistributors);
    const data = [];

    result.forEach((accessControl) => {
      const content = {};
      content.id = accessControl.id;
      content.Nome = accessControl.user.name;
      content.Email = accessControl.user.email;
      content.AcessadoEm = accessControl.createdAt;
      data.push(content);
    });

    return data;
  }
}

module.exports = AccessControlFactory;
