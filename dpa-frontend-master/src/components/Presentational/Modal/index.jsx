import React from "react";

const Modal = ({ children, modal = false, title = "", onClose = () => {} }) => {
  return (
    <>
      {modal && (
        <div
          className={`modal fade ${modal ? "show" : ""}`}
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title}
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
            </div>
          </div>
        </div>
      )}
      {modal && (
        <div className={`modal-backdrop fade ${modal ? "show" : ""}`}></div>
      )}
    </>
  );
};

export default Modal;
