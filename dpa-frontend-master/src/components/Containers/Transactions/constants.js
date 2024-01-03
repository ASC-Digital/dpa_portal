import { maskDate } from "@/utils/Mask/Date";

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
  {
    name: "Criado em",
    selector: (row) => maskDate(row.createdAt),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Usuário", key: "wallet.user.name" },
  { label: "Nome", key: "name" },
  { label: "Descrição", key: "description" },
  { label: "Valor", key: "totalPrice" },
  { label: "Quantidade", key: "totalAmount" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "wallet.user.name",
  "name",
  "description",
  "totalPrice",
  "totalAmount",
  "createdAt",
];
