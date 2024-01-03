const { Op } = require('sequelize');
const Roles = require('../models/entities/Roles');
const RolesXPermissions = require('../models/entities/RolesXPermissions');
const Permissions = require('../models/entities/Permissions');
const CrudFactory = require('./CrudFactory');

class RolesFactory extends CrudFactory {
  constructor() {
    super(Roles);
    this.defaultOptions = {
      include: [
        {
          model: Permissions,
          required: true,
        },
      ],
    };
  }

  async create(raw, body) {
    const role = await super.create(raw);
    const { permissionsId } = body;
    if (permissionsId) {
      const promises = permissionsId.map(async (permissionId) => {
        await RolesXPermissions.create({ roleId: role.id, permissionId });
      });
      await Promise.all(promises);
    }
    return role.reload();
  }

  async update(id, raw, showDisabled = false, options = {}, body = {}) {
    const role = await super.update(id, raw, showDisabled, options);
    const { permissionsId } = body;
    if (permissionsId !== undefined) {
      await RolesXPermissions.destroy({
        where: {
          roleId: id,
          permissionId: { [Op.notIn]: permissionsId },
        },
      });

      let create;
      const rxps = await RolesXPermissions.findAll({ where: { roleId: id } });
      const promises = permissionsId.map(async (permissionId) => {
        create = true;
        rxps.forEach((rxp) => {
          if (rxp.permissionId === permissionId) { create = false; }
        });

        if (create) {
          await RolesXPermissions.create({ roleId: id, permissionId });
        }
      });
      await Promise.all(promises);
    }

    return role.reload();
  }

  async export(filters = {}, showDisabled = false, filterDistributors = '*') {
    const result = await this.read(null, showDisabled, filters, filterDistributors);
    const data = [];

    result.forEach((role) => {
      const content = {};
      content.id = role.id;
      content.Nome = role.name;
      content.CriadoEm = role.createdAt;
      data.push(content);
    });

    return data;
  }

  async approvedChanges(content, id = null) {
    let entity;
    if (id) {
      entity = await this.update(id, content);
    } else {
      entity = await this.create(content);
    }

    return entity;
  }
}

module.exports = RolesFactory;
