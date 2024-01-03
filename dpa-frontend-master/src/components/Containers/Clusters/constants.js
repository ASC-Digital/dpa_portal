import { maskDate } from "@/utils/Mask/Date";

export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Nome",
    selector: (row) => row.name,
  },
  {
    name: "Criado em",
    selector: (row) => maskDate(row.createdAt),
  },
  {
    name: "Status",
    selector: (row) => (row.deletedAt ? "Inativo" : "Ativo"),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Nome", key: "name" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = ["id", "name", "createdAt"];
