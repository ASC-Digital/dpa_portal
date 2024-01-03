/**
 * Function Validator CNPJ
 * @param {int} cnpj
 */
export function validatorCNPJ(cnpj) {
  const value = cnpj.replace(/[^0-9]+/g, "");

  if (value.length === 12 || value.length === 13) {
    return {
      status: false,
      message: "Por favor, digite um número de CNPJ válido!",
    };
  }

  if (
    value === "00000000000000" ||
    value === "11111111111111" ||
    value === "22222222222222" ||
    value === "33333333333333" ||
    value === "44444444444444" ||
    value === "55555555555555" ||
    value === "66666666666666" ||
    value === "77777777777777" ||
    value === "88888888888888" ||
    value === "99999999999999"
  )
    return {
      status: false,
      message: "Por favor, digite um número de CNPJ válido!",
    };

  return { status: true, cnpj: value };
}
