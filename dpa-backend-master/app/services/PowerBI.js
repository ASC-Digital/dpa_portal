const axios = require('axios');
const env = require('../config/environment');

const generateToken = async (groupId, reportId, azureAccessToken) => {
  const config = {
    method: 'POST',
    url: `${env.powerbi.host}/groups/${groupId}/reports/${reportId}/GenerateToken`,
    headers: {
      Authorization: `Bearer ${azureAccessToken}`,
      'Content-Type': 'application/json',
    },
    data: { accessLevel: 'View' },
  };

  let data = false;
  try {
    const response = await axios(config);
    if (response.status === 200) {
      data = response.data;
    } else {
      console.error(`Failure in request: ${response.data}`);
    }
  } catch (error) {
    console.error(`Failure to login in Azure AD: ${error}`);
  }

  return data;
};

const reportEmbedUrl = async (groupId, reportId, azureAccessToken) => {
  const config = {
    method: 'GET',
    url: `${env.powerbi.host}/groups/${groupId}/reports/${reportId}`,
    headers: {
      Authorization: `Bearer ${azureAccessToken}`,
    },
  };

  let data = false;
  try {
    const response = await axios(config);
    if (response.status === 200) {
      data = response.data;
    } else {
      console.error(`Failure in request: ${response.data}`);
    }
  } catch (error) {
    console.error(`Failure to login in Azure AD: ${error}`);
  }

  return data;
};

module.exports = { generateToken, reportEmbedUrl };
