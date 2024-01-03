/**
 * Function Validator CPF and CNPJ
 * @param {int} cpfcnpj
 */
export function maskCPFCNPJ(value) {
    value = value.replace(/\D/g, "")
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        return value;
    } else {
        return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1})/, "$1.$2.$3/$4-$5")
    }
}