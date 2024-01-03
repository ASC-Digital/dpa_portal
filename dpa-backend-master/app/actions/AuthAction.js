const jwt = require("jsonwebtoken");
const {
  OK,
  Unauthorized,
  InternalServerError,
} = require("../server/http/response");
const Users = require("../models/entities/Users");
const Roles = require("../models/entities/Roles");
const AccessControl = require("../models/entities/AccessControl");
const env = require("../config/environment");
const hash = require("../services/Hash");
const sendGrid = require("../services/Sendgrid");

const verifyToken = async (token) => {
  const verifyResponse = { status: null, data: null, errors: null };
  return jwt.verify(token, env.auth.secret, (err, decoded) => {
    verifyResponse.status = true;
    verifyResponse.data = decoded;

    if (err) {
      verifyResponse.status = false;
      verifyResponse.errors = err;
    }

    return verifyResponse;
  });
};

class AuthAction {
  static async login(req, res) {
    const user = await Users.findOne({
      where: {
        email: req.body.user,
        deletedAt: null,
        "$role.deleted_at$": null,
      },
      include: [Roles],
    });
    if (!user) {
      return Unauthorized(res, {
        message: "User authentication failed",
        errors: ["Error code 1"],
      });
    }

    if ((await hash.verify(req.body.password, user.password)) !== true) {
      return Unauthorized(res, {
        message: "User authentication failed",
        errors: ["error code 2"],
      });
    }

    const role = await user.getRole();
    if (!role || role.deletedAt !== null) {
      return InternalServerError(res, {
        message: "Failure to get user informations",
        errors: ["Error code 1"],
      });
    }

    const permissions = await role.getPermissions();
    if (!permissions) {
      return InternalServerError(res, {
        message: "Failure to get user informations",
        errors: ["Error code 2"],
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        roleId: user.roleId,
        fullName: user.fullName,
        showDisabled: [1, 2, 3].includes(role.id),
        permissions: permissions
          .filter((p) => p.deletedAt === null)
          .map((p) => `${p.entity}-${p.action}`),
      },
      env.auth.secret,
      {
        expiresIn: 43200, // expires in seconds
      }
    );

    await new AccessControl({ userId: user.id }).save();
    return OK(res, { message: "Authentication Successfully", data: { token } });
  }

  static logout(req, res) {
    res.send("To-do...");
  }

  static async forgotPassword(req, res) {
    const user = await Users.findOne({
      where: {
        email: req.body.user,
        deletedAt: null,
        "$role.deleted_at$": null,
      },
      include: [Roles],
    });
    if (!user) {
      return Unauthorized(res, {
        message: "User authentication failed",
        errors: ["Error code 3"],
      });
    }

    const token = jwt.sign({ id: user.id }, env.auth.secret, {
      expiresIn: 300,
    });
    const resetPasswordUrl = `${env.app.url}/recover-password?t=${token}`;

    let emailText = `Olá ${user.name},\n`;
    emailText += `Para criar uma nova senha, clique no link abaixo:\n${resetPasswordUrl}`;

    const sendMailResult = await sendGrid.sendMail(
      user.email,
      "Esqueci minha senha",
      emailText,
      emailText
    );
    if (!sendMailResult) {
      return InternalServerError(res, {
        errors: ["Failure to send email to user"],
      });
    }
    return OK(res);
  }

  static async resetPassword(req, res) {
    const tokenDecoded = await verifyToken(req.body.token);
    if (tokenDecoded.status === false) {
      return Unauthorized(res, { errors: ["Invalid Token"] });
    }

    const user = await Users.findByPk(tokenDecoded.data.id);
    user.password = await hash.hash(req.body.password);
    await user.save();

    return OK(res, { message: "Successfully reset password" });
  }
}

module.exports = AuthAction;
