import axios from "axios";
import { URL_BACKEND, APP_API_KEY_VALUE } from "@/constants";
import { translateMessage } from "@/utils/Translator";
import { getToken, removeToken } from "@/utils/Token";

export async function request({
  urlBackend = URL_BACKEND,
  endpoint = "",
  method = "",
  body = "",
  headers = { "X-CW-AK": APP_API_KEY_VALUE },
  params = "",
  token = true,
}) {
  let url = urlBackend + endpoint;

  let config = {
    method,
    headers: headers,
  };

  if (params) {
    url = url + `${params}`;
  }

  if (body) {
    config.data = body;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${getToken("token")}`;
  }

  try {
    const response = await axios(url, config);
    return response;
  } catch (error) {
    if (error.response.data.error.includes("Invalid Authorization Header")) {
      removeToken();
      window.location.href = "/login";
      return;
    }

    return {
      status: false,
      message: translateMessage(error.response.data.message),
    };
  }
}
