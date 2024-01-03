const Storage = require('../services/Storage');
const { OK } = require('../server/http/response');

class StorageAction {
  static async upload(req, res) {
    const { file } = req.files;
    const url = await Storage.uploadFile(file);
    return OK(res, { data: { url } });
  }
}

module.exports = StorageAction;
