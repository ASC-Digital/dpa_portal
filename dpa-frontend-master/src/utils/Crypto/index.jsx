import CryptoJS from "crypto-js";
import { API_KEY } from "@/constants";

/**
 * @param {any} decrypted 
 * @returns {string}
 */
export const encode = data => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), API_KEY).toString();
};

/**
 * @param {string} encrypted 
 * @returns {string}
 */
export const decode = data => {
    let bytes = CryptoJS.AES.decrypt(data, API_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};