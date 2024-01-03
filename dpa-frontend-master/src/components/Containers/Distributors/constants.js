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
    name: "Nome curto",
    selector: (row) => row.shortName,
  },
  {
    name: "CNPJ",
    selector: (row) => row.cnpj,
  },
  {
    name: "Código",
    selector: (row) => row.soldTo,
  },
  {
    name: "Cidade",
    selector: (row) => row.mainCity,
  },
  {
    name: "Estado",
    selector: (row) => row.uf,
  },
  {
    name: "Filial",
    selector: (row) => row.company_branch.name,
  },
  {
    name: "Classificação",
    selector: (row) => row.cluster.name,
  },

  {
    name: "Criado em",
    selector: (row) => maskDate(row.createdAt),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Nome", key: "name" },
  { label: "Nome curto", key: "shortName" },
  { label: "CNPJ", key: "cnpj" },
  { label: "Código", key: "soldTo" },
  { label: "Cidade", key: "mainCity" },
  { label: "Estado", key: "uf" },
  { label: "Filial", key: "company_branch.name" },
  { label: "Classificação", key: "cluster.name" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "name",
  "shortName",
  "soldTo",
  "mainCity",
  "uf",
  "company_branch.name",
  "cluster.name",
  "createdAt",
];
