import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";
import TextArea from "@/components/Presentational/Inputs/TextArea";
import Upload from "@/components/Presentational/Inputs/File";

const Forms = ({
  modal,
  title,
  name,
  photoUrl,
  price,
  stock,
  description,
  onChangeFile,
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
                Valor
              </label>
              <InputText
                type="number"
                name="price"
                id="price"
                step="0.01"
                value={price}
                onChange={onChange}
                placeholder="Informe uma quantidade"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Estoque
              </label>
              <InputText
                type="number"
                name="stock"
                id="stock"
                value={stock}
                onChange={onChange}
                placeholder="Informe a quantidade do estoque"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Descrição
              </label>
              <TextArea
                name="description"
                rows="6"
                placeholder="Insira uma descrição do produto"
                id="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Imagem
              </label>
              <Upload
                id="photoUrl"
                name="photoUrl"
                value={photoUrl}
                onChange={onChangeFile}
                accept="image/png, image/jpeg"
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
