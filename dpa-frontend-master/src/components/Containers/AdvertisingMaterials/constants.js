import { maskDate } from "@/utils/Mask/Date";

const types = {
  video: "Vídeo",
  image: "Imagem",
  document: "Documento",
};
export const COLUMNS = [
  {
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Arquivo",
    selector: (row) =>
      row?.thumbnail ? (
        <img
          src={row.thumbnail}
          alt=""
          width="100"
          height="100"
          className="my-2"
        />
      ) : row?.type === "image" ? (
        <img
          src={row.uploadedUrl}
          alt=""
          width="100"
          height="100"
          className="my-2"
        />
      ) : row?.type === "video" ? (
        <div class="fas fa-video" style={{ fontSize: 20, marginLeft: 12 }} />
      ) : (
        <div class="fas fa-file" style={{ fontSize: 20, marginLeft: 12 }} />
      ),
  },
  {
    name: "Tipo Arquivo",
    selector: (row) => types[row.type],
  },
  {
    name: "Marca",
    selector: (row) => row.brand,
  },
  {
    name: "Tipo MPDV",
    selector: (row) => row.typeOfMpdv,
  },
  {
    name: "MPDV Digital",
    selector: (row) => <div>{row?.digitalMPDV === true ? [<div>SIM</div>] : [<div>NÃO</div>]}</div>,
  },
  {
    name: "Descrição do arquivo",
    selector: (row) => <div>{row?.description}</div>,
  },

  {
    name: "Criado ",
    selector: (row) => maskDate(row.createdAt),
  },
];

export const EXPORTS = [
  { label: "#", key: "id" },
  { label: "Arquivo", key: "uploadedUrl" },
  { label: "Tipo Arquivo", key: "type" },
  { label: "Marca", key: "brand" },
  { label: "Tipo MPDV", key: "typeOfMpdv" },
  { label: "MPDV Digital", key: "digitalMPDV" },
  { label: "Descrição do Arquivo", key: "description" },
  { label: "Link", key: "link" },
  { label: "Status", key: "status" },
  { label: "Baixado por", key: "downloadedBy" },
  { label: "Criado em", key: "createdAt" },
];

export const FILTERS = [
  "id",
  "uploadedUrl",
  "type",
  "description",
  "link",
  "createdAt",
];
