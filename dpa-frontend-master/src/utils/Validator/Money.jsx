export const moneyMask = (value) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}