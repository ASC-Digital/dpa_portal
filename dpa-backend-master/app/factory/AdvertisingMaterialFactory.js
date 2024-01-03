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
}

module.exports = AdvertisingMaterialFactory;
