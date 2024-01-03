export const STYLE = {
  rows: {
    style: {
      minHeight: "50px",
      fontFamily: "Raleway",
      fontSize: "14px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "10px",
      paddingRight: "8px",
      fontFamily: "Raleway",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      paddingLeft: "10px",
      paddingRight: "8px",
      "div:first-child": {
        whiteSpace: "normal !important",
      },
    },
  },
};

export const PAGINATION = {
  rowsPerPageText: "Listar por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
};

export const MESSAGES = {
  noData: "Nenhum registro encontrado",
  loader: "Carregando"
};
