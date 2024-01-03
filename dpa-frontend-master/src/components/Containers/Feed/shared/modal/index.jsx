import React from "react";

export const Modal = ({ onClose, modal, children, title }) => {
  return (
    <div
      className={`modal fade ${modal ? "show" : ""}`}
      id="logoutModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{
        fontFamily: "sans-serif",
        color: "black",
        display: `${modal ? "block" : "none"}`,
      }}
    >
      <div
        className="modal-dialog shadowAdded"
        role="document"
        style={{ minWidth: "60%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title || "Criar Publicação"}
            </h5>
            <button
              className="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {children}
          <hr />
        </div>
      </div>
    </div>
  );
};
