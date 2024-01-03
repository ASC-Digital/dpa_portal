import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";

const Sale = ({ modal, title, amount, onChange, onSubmit, onClose }) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <form className="user was-validated" onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="form-group row">
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Quantidade
              </label>
              <InputText
                type="number"
                name="amount"
                id="amount"
                value={amount}
                onChange={onChange}
                placeholder="Informe uma quantidade"
                required
              />
            </div>
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
          <button type="submit" className="btn btn-primary">
            Comprar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Sale;
