import React from "react";
import "./style.css";
export const PhotoBtn = ({ handleClick, title }) => {
  return (
    <div
      onClick={handleClick}
      className="d-flex align-items-center ml-3 mr-3 hoverBtn"
      style={{ color: "rgb(21, 132, 179)" }}
    >
      <div class="fas fa-video mr-1 fa-md d-flex" />
      <div>{title || "Foto/Vídeo"}</div>
    </div>
  );
};
