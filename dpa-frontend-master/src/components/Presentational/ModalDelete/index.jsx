import React from "react";
import Modal from "../Modal";

const ModalDelete = ({
  modal = false,
  title,
  value = "",
  onClick,
  onClose,
}) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <div className="modal-body">
        <div>
          <p>{`Tem certeza de que deseja excluir ${value}?`}</p>
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-secondary"
          type="button"
          data-dismiss="modal"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button type="button" className="btn btn-primary" onClick={onClick}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
