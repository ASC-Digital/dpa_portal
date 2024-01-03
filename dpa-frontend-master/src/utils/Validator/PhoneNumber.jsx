/**
 * Function Validator Phone Numer
 * @param {int} phone
 */
export function validatorPhoneNumber(value) {
  const string = value.toString();
  const phone = string.replace(/[^0-9]+/g, "");

  if (phone.length < 11) {
    return {
      status: false,
      message: "Por favor, digite um numero de celular válido!",
    };
  }

  if (
    ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].indexOf(
      phone.substring(0, 2)
    ) !== -1
  ) {
    return {
      status: false,
      message: "Por favor, digite um numero de celular válido!",
    };
  }

  if (["6", "7", "8", "9"].indexOf(phone.substring(2, 3)) === -1) {
    return {
      status: false,
      message: "Por favor, digite um numero de celular válido!",
    };
  }

  return { status: true, phone: phone };
}
