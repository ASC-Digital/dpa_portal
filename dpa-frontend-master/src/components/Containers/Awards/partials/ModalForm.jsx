import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";

const Forms = ({
  modal,
  title,
  name,
  expected,
  accomplished,
  related,
  profit,
  onChange,
  onSubmit,
  onClose,
  required,
}) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <form className="user was-validated" onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="form-group row">
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nome
              </label>
              <InputText
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Informe um nome"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Esperada
              </label>
              <InputText
                type="text"
                name="expected"
                id="expected"
                value={expected}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Feita
              </label>
              <InputText
                type="text"
                name="accomplished"
                id="accomplished"
                value={accomplished}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Competência
              </label>
              <InputText
                type="text"
                name="related"
                id="related"
                value={related}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Valor
              </label>
              <InputText
                type="number"
                name="profit"
                id="profit"
                value={profit}
                onChange={onChange}
                required={required}
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
          <button type="submit" className="btn btn-success">
            Confirmar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Forms;
