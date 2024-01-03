import React from "react";
import "./style.css";

export const DocumentBtn = ({ handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="d-flex align-items-center hoverBtn"
      style={{ color: "rgb(21, 132, 179)" }}
    >
      <div class="fas fa-file mr-1 fa-md d-flex" />
      <div>Documento</div>
    </div>
  );
};
