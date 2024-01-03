import axios from "axios";
/**
 * Function Get IP Address
 */
export async function getIPAddress() {
  try {
    const response = await axios.get("https://api.ipify.org/?format=json");
    console.log("[getIPAddress-response]:", response.data);
    return { status: true, ip: response.data.ip };
  } catch (error) {
    console.log("[getIPAddress-error]: ", error.message);
    return { status: false, ip: "" };
  }
}
