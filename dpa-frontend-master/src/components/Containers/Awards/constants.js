import { maskDate } from "@/utils/Mask/Date";
export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Usuário",
    selector: (row) => (row.transaction ? row.transaction.wallet.user.name : ''),
  },
  {
    name: "Meta",
    selector: (row) => row.name,
  },
  {
    name: "Esperada",
    selector: (row) => row.expected,
  },
  {
    name: "Feita",
    selector: (row) => row.accomplished,
  },
  {
    name: "Valor",
    selector: (row) => (row.profit ? row.profit + "p" : ""),
  },
  {
    name: "Competência",
    selector: (row) => row.related,
  },
  {
    name: "Criado em",
    selector: (row) => maskDate(row.createdAt),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Usuário", key: "transaction.wallet.user.name" },
  { label: "Valor", key: "profit" },
  { label: "Meta", key: "name" },
  { label: "Esperada", key: "expected" },
  { label: "Feita", key: "accomplished" },
  { label: "Competência", key: "related" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "transaction.wallet.user.name",
  "name",
  "expected",
  "accomplished",
  "related",
  "createdAt",
];
