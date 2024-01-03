import axios from "axios";

/**
 * Function Get City
 */
export async function getCity(uf) {
  try {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    console.log("[getCity-response]:", response.data);
    return { status: true, city: response.data };
  } catch (error) {
    console.log("[getCity-error]: ", error.message);
    return { status: false };
  }
}

/**
 * Function Get State
 */
export async function getState() {
  try {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    console.log("[getState-response]:", response.data);
    return { status: true, state: response.data };
  } catch (error) {
    console.log("[getState-error]: ", error.message);
    return { status: false };
  }
}
