export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Nome",
    selector: (row) => row.user.name,
  },
  {
    name: "Email",
    selector: (row) => row.user.email,
  },
  {
    name: "Perfil",
    selector: (row) => row.user.role.name,
  },
  {
    name: "Accessado em",
    selector: (row) => row.accessedAt,
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Nome", key: "user.name" },
  { label: "Email", key: "user.email" },
  { label: "Perfil", key: "user.role.name" },
  { label: "AccessadoEm", key: "accessedAt" },
];

export const FILTERS = [
  "id",
  "user.name",
  "user.email",
  "accessedAt",
];
