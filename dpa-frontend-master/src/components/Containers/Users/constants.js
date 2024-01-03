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
      ) : (
        ""
      ),
  },
  {
    name: "Nome Pex",
    selector: (row) => row.name,
  },
  {
    name: "Nome Completo",
    selector: (row) => row.fullName,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Telefone",
    selector: (row) => row.phoneNumber,
  },
  {
    name: "Perfil",
    selector: (row) => row.role.name,
  },
  {
    name: "Criado em",
    selector: (row) => maskDate(row.createdAt),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Nome PEX", key: "name" },
  { label: "Nome Completo", key: "fullName" },
  { label: "Email", key: "email" },
  { label: "Telefone", key: "phoneNumber" },
  { label: "Perfil", key: "role.name" },
  { label: "Criado em", key: "createdAt" },
  { label: "Status", key: "status" },
];

export const FILTERS = [
  "id",
  "name",
  "email",
  "phoneNumber",
  "role.name",
  "createdAt",
];
