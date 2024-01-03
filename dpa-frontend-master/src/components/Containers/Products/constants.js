import { maskDate } from "@/utils/Mask/Date";

export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Imagem",
    selector: (row) =>
      row.photoUrl ? (
        <img
          src={row.photoUrl}
          alt=""
          width="50"
          height="50"
          style={{ margin: 10 }}
          className="img-profile rounded-circle"
        />
      ) : null,
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
    selector: (row) => (row.price ? row.price + "p" : ""),
  },
  {
    name: "Estoque",
    selector: (row) => row.stock,
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

export const COLUMNS_PROFILE = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Imagem",
    selector: (row) =>
      row.photoUrl ? (
        <img
          src={row.photoUrl}
          alt=""
          width="50"
          height="50"
          style={{ margin: 10 }}
          className="img-profile rounded-circle"
        />
      ) : null,
  },
  {
    name: "Nome",
    selector: (row) => row.name,
  },
  {
    name: "Valor",
    selector: (row) => (row.price ? row.price + "p" : ""),
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
  { label: "Valor", key: "price" },
  { label: "Estoque", key: "stock" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = ["id", "name", "price", "stock", "createdAt"];
