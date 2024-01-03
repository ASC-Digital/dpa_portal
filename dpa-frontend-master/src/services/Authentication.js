import { request } from "./Axios";
import jwt_decode from "jwt-decode";

// Authentication
export async function auth(email, password) {
  const response = await request({
    endpoint: `/auth/login`,
    method: "POST",
    token: false,
    body: {
      user: email,
      password: password,
    },
  });

  if (!response.status) {
    console.log("[getUsers-error]: ", response.message);
    return { status: false, message: response.message };
  }

  console.log("[getUsers-success]: ", response.data);

  const token = jwt_decode(response.data.data.token);
  return {
    status: true,
    token: response.data.data.token,
    name: token.name,
    permissions: token.permissions,
    userId: token?.id,
    fullName: token?.fullName,
  };
}

// Forgot Password
export async function authForgotPassword(email) {
  const response = await request({
    endpoint: `/auth/forgot-password`,
    method: "POST",
    token: false,
    body: {
      user: email,
    },
  });

  if (!response.status) {
    console.log("[authForgotPassword-error]: ", response.message);
    return { status: false, message: response.message };
  }

  console.log("[authForgotPassword-success]: ", response.data);

  return {
    status: true,
    message:
      "Enviamos um link para o email informado, verifique sua caixa de entrada.",
  };
}

// Recover Password
export async function authRecoverPassword(email, token) {
  const response = await request({
    endpoint: `/auth/reset-password`,
    method: "POST",
    token: false,
    body: {
      password: email,
      token: token,
    },
  });

  if (!response.status) {
    console.log("[authRecoverPassword-error]: ", response.message);
    return { status: false, message: response.message };
  }

  console.log("[authRecoverPassword-success]: ", response.data);

  return {
    status: true,
    message: "Senha alterada com sucesso.",
  };
}
