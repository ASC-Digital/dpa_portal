const { Unauthorized } = require('../../server/http/response');

const exclusiveActions = [
  'approval',
  'disapproval',
  'import',
  'export',
  'buy',
  'active',
  'disable',
];

module.exports = (req, res, next) => {
  const reqPath = req.originalUrl.split('?').shift().replace('/api/', '').split('/');
  const reqEntity = reqPath[0];
  let reqAction = reqPath[1];

  if (!exclusiveActions.includes(reqAction)) {
    switch (req.method.toLowerCase()) {
      case 'post': reqAction = 'create'; break;
      case 'get': reqAction = 'read'; break;
      case 'put':
      case 'patch': reqAction = 'update'; break;
      case 'delete': reqAction = 'delete'; break;
      default: reqAction = '';
    }
  }

  if (!req.userPermissions.includes(`${reqEntity}-${reqAction}`)) {
    return Unauthorized(res, {
      message: 'Permission Denied',
      errors: [`User has no permission to ${reqAction} ${reqEntity}`],
    });
  }
  return next();
};
