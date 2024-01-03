import { maskDate } from "@/utils/Mask/Date";

export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Nome",
    selector: (row) => row.gridName,
  },
  {
    name: "Título",
    selector: (row) => row.title,
  },
  {
    name: "Ordem",
    selector: (row) => row.order,
  },
  {
    name: "Imagem",
    selector: (row) =>
      row.imageUrl ? (
        <a href={row.imageUrl} target="_blank" rel="noopener noreferrer">
          clique aqui
        </a>
      ) : null,
  },
  {
    name: "Link",
    selector: (row) =>
      row.link ? (
        <a href={row.link} target="_blank" rel="noopener noreferrer">
          clique aqui
        </a>
      ) : null,
  },
  {
    name: "Criado",
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
  { label: "Título", key: "title" },
  { label: "Ordem", key: "order" },
  { label: "Imagem", key: "imageUrl" },
  { label: "Link", key: "link" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "name",
  "title",
  "order",
  "imageUrl",
  "link",
  "createdAt",
];
