import { maskDate } from "@/utils/Mask/Date";

export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Usuário",
    selector: (row) => `${row.user.name} <${row.user.email}>`,
  },
  {
    name: "Tipo",
    selector: (row) => row.type,
  },
  {
    name: "Formato",
    selector: (row) => row.format,
  },
  {
    name: "Título",
    selector: (row) => row.title,
  },
  {
    name: "ID do Grupo",
    selector: (row) => row.powerbiGroupId,
  },
  {
    name: "ID do Relatório",
    selector: (row) => row.powerbiReportId,
  },
  {
    name: "Link",
    selector: (row) =>
      row.embeddedLink && (
        <a href={row.embeddedLink} target="_blank" rel="noopener noreferrer">
          clique aqui
        </a>
      ),
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
  { label: "Usuário", key: "user.name" },
  { label: "Tipo", key: "type" },
  { label: "Formato", key: "format" },
  { label: "Título", key: "title" },
  { label: "ID do Grupo", key: "powerbiGroupId" },
  { label: "ID do Relatório", key: "powerbiReportId" },
  { label: "Link", key: "embeddedLink" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "user.name",
  "type",
  "format",
  "powerbiGroupId",
  "powerbiReportId",
  "embeddedLink",
  "createdAt",
];
