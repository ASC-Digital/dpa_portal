export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Usuário",
    selector: (row) => row.wallet.user.name,
  },
  {
    name: "Nome",
    selector: (row) => row.name,
  },
  {
    name: "Descrição",
    selector: (row) => row.description,
  },
  {
    name: "Valor",
    selector: (row) => (row.totalPrice ? row.totalPrice + "p" : ""),
  },
  {
    name: "Quantidade",
    selector: (row) => row.totalAmount,
  },
];
