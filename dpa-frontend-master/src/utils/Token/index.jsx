import Bowser from "bowser";
import { encode, decode } from "@/utils/Crypto";

/**
 * Function Get Data Token
 * @param {string} type
 * @param {string} brand
 */
export function getToken(type) {
  try {
    const decodeToken = decode(localStorage.getItem("st"));

    switch (type) {
      case "token":
        return decodeToken.token;
      case "name":
        return decodeToken.name;
      case "email":
        return decodeToken.email;
      case "phoneNumber":
        return decodeToken.phoneNumber;
      case "document":
        return decodeToken.document;
      case "photoUrl":
        return decodeToken.photoUrl;
      case "roleId":
        return decodeToken.roleId;
      case "permissions":
        return decodeToken.permissions;
      case "balance":
        return decodeToken.balance;

      default:
        return { status: true, profile: decodeToken };
    }
  } catch (error) {
    return false;
  }
}

/**
 * Function Create Token
 */
export async function createToken(
  token,
  name,
  email,
  phoneNumber,
  document,
  photoUrl,
  roleId,
  balance,
  permissions,
  userId,
  fullName
) {
  try {
    const browserParse = Bowser.getParser(window.navigator.userAgent);
    const browser = browserParse.getBrowserName();

    const st = encode({
      token: token,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      document: document,
      photoUrl: photoUrl,
      roleId: roleId,
      balance: balance,
      permissions: permissions,
      browser: browser,
      userId: userId,
      fullName: fullName,
    });

    localStorage.setItem("st", st);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Function Update Token
 */
export async function updateToken({
  name,
  email,
  phoneNumber,
  document,
  photoUrl,
  roleId,
  balance,
  userId,
  fullName,
}) {
  try {
    const token = decode(localStorage.getItem("st"));
    const st = encode({
      ...token,
      name,
      email,
      phoneNumber,
      document,
      photoUrl,
      roleId,
      balance,
      userId,
      fullName,
    });
    localStorage.setItem("st", st);

    console.log("[update-token-success]", decode(localStorage.getItem("st")));

    return { status: true };
  } catch (error) {
    console.log("[update-token-error]", false);
    return { status: false };
  }
}

/**
 * Function Remove Token
 */
export function removeToken() {
  try {
    localStorage.removeItem("st");
    return { status: true };
  } catch (error) {
    return false;
  }
}
