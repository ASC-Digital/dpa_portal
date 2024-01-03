const { login } = require('../services/Azure');
const { generateToken, reportEmbedUrl } = require('../services/PowerBI');
const { OK } = require('../server/http/response');

class PowerBIAction {
  static async getEmbedData(req, res) {
    const { groupId, reportId } = req.body;
    const { access_token: azureAccessToken } = await login();
    const { token: accessToken } = await generateToken(groupId, reportId, azureAccessToken);
    const { embedUrl } = await reportEmbedUrl(groupId, reportId, azureAccessToken);

    const data = {
      id: reportId,
      embedUrl,
      accessToken,
    };

    return OK(res, { data });
  }
}

module.exports = PowerBIAction;
