const Banners = require('../models/entities/Banners');
const Configs = require('../models/entities/Configs');
const { OK } = require('../server/http/response');

class BannersAction {
  static async bannerLogin(req, res) {
    const loginBanner = await Banners.findOne({ where: { page: 'login', deletedAt: null } });
    return OK(res, { data: loginBanner });
  }

  static async bannersHome(req, res) {
    const bannersHome = await Banners.findAll({ where: { page: 'home', deletedAt: null } });
    return OK(res, { data: bannersHome });
  }

  static async configs(req, res) {
    const configs = await Configs.findAll({ where: { deletedAt: null } });
    return OK(res, { data: configs });
  }
}

module.exports = BannersAction;
