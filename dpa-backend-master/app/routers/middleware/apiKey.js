module.exports = function (req, res, next) {
  const apiKeyUser = "admin";
  const apiKeyPass = "admin";
  const apiKeyName = "x-cw-ak";

  if (!req.headers[apiKeyName] || req.headers[apiKeyName].indexOf('Key ') === -1) {
    return res.status(401).json({ status: false, message: 'Missing Api Key Header' });
  }

  const base64Credentials =  req.headers[apiKeyName].split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  if (username !== apiKeyUser || password !== apiKeyPass) {
      return res.status(401).json({ status: false, message: 'Invalid Api Key' });
  }

  next();
};