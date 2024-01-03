/**
 * Function Validator CPF
 * @param {int} value
 */
export function validatorCPF(value) {
  const string = value.toString();

  const cpf = string.replace(/[^0-9]+/g, "");

  if (cpf.length < 11) {
    return {
      status: false,
      message: "Por favor, digite um número de CPF válido!",
    };
  }

  if (
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return {
      status: false,
      message: "Por favor, digite um número de CPF válido!",
    };

  return { status: true, cpf: parseInt(cpf) };
}
