const axios = require('axios');
const env = require('../config/environment');

const login = async () => {
  const config = {
    method: 'POST',
    url: env.azure.host,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'password',
      resource: 'https://analysis.windows.net/powerbi/api',
      username: env.azure.username,
      password: env.azure.password,
      client_id: env.azure.clientId,
      client_secret: env.azure.clientSecret,
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

module.exports = { login };
