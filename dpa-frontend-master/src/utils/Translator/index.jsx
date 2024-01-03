const MESSAGES = {
  "User authentication failed":
    "Não encontramos uma conta vinculada a este email.",
  "Firebase: Error (auth/wrong-password).":
    "Sua senha está errada, por favor tente novamente.",
  "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
    "Máximo de tentativas excedido. Tente novamente mais tarde.",
  "Firebase: Error (auth/invalid-action-code).":
    "Sua solicitação para login expirou ou o link já foi usado, tente login novamente.",
  "User not found": "Ops, ocorreu um erro, tente novamente mais tarde.",
  "Request failed with status code 401": "Token invalido.",
  "Failure to buy product": "Saldo insuficiente.",
};

export function translateMessage(message) {
  return (
    MESSAGES[message] || `Ops, ocorreu um erro, tente novamente mais tarde.`
  );
}
