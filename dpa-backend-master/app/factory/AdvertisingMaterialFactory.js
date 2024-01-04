const moment = require("moment");
const AdvertisingMaterial = require("../models/entities/AdvertisingMaterial");
const Users = require("../models/entities/Users");
const CrudFactory = require("./CrudFactory");
const DownloadedAdvertisingMaterials = require("../models/entities/DownloadedAdvertisingMaterials");

class AdvertisingMaterialFactory extends CrudFactory {
  constructor() {
    super(AdvertisingMaterial);
    this.defaultOptions = {
      include: [
        {
          model: DownloadedAdvertisingMaterials,
          include: [
            {
              model: Users,
            },
          ],
        },
      ],
    };
  }

  async readDigitalAdvertisingMaterial(showDisabled, filters, filterDistributors) {
    const whereClause = {
      isDigital: true, // Filtro para materiais digitais
    };

    if (!showDisabled) {
      whereClause.deletedAt = null; // Não mostrar itens deletados
    }

    if (filterDistributors) {
      whereClause[Op.and] = [
        // Adicione outros filtros conforme necessário
        // Exemplo: { distributorId: filterDistributors },
      ];
    }

    try {
      const result = await this.entity.findAndCountAll({
        where: whereClause,
        ...this.defaultOptions,
        ...filters,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdvertisingMaterialFactory;
