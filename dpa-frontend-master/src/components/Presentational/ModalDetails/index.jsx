import React from "react";
import Modal from "../Modal";

const ModalDetails = ({ modal = false, title, children, onClick, onClose }) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <div className="modal-body">
        <div>{children}</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" onClick={onClick}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ModalDetails;
