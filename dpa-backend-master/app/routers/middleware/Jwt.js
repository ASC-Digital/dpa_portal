const jwt = require("jsonwebtoken");
const env = require("../../config/environment");
const { Unauthorized } = require("../../server/http/response");

module.exports = (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Bearer ") === -1
  ) {
    return Unauthorized(res, {
      errors: ["Missing or Invalid Authorization Header"],
    });
  }

  return jwt.verify(
    req.headers.authorization.replace("Bearer ", ""),
    env.auth.secret,
    (err, decoded) => {
      if (err) {
        return Unauthorized(res, { errors: ["Invalid Authorization Header"] });
      }

      req.userId = decoded.id;
      req.showDisabled = decoded.showDisabled;
      req.userPermissions = decoded.permissions;
      req.roleId = decoded.roleId;
      return next();
    }
  );
};
