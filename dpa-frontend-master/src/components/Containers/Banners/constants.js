import { maskDate } from "@/utils/Mask/Date";

export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Página",
    selector: (row) => row.page,
  },
  {
    name: "Ordem",
    selector: (row) => row.order,
  },
  {
    name: "Imagem",
    selector: (row) => (
      <a href={row.imageUrl} target="_blank" rel="noopener noreferrer">
        clique aqui
      </a>
    ),
  },
  {
    name: "Descrição da Imagem",
    selector: (row) =>
      row.descriptionImageUrl ? (
        <a
          href={row.descriptionImageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          clique aqui
        </a>
      ) : null,
  },
  {
    name: "Descrição Banner",
    selector: (row) => row.bannerDescription,
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
    name: "Criado ",
    selector: (row) => maskDate(row.createdAt),
  },
  {
    name: "Status",
    selector: (row) => (row.deletedAt ? "Inativo" : "Ativo"),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Página", key: "page" },
  { label: "Ordem", key: "order" },
  { label: "Imagem", key: "imageUrl" },
  { label: "Descrição da Imagem", key: "descriptionImageUrl" },
  { label: "Descrição do Banner", key: "bannerDescription" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "page",
  "order",
  "imageUrl",
  "bannerDescription",
  "createdAt",
];
