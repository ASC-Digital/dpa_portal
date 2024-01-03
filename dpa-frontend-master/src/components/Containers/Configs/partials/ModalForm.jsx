import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";
import InputSelect from "@/components/Presentational/Inputs/Select";
import Upload from "@/components/Presentational/Inputs/File";

const Forms = ({
  modal,
  title,
  name,
  text,
  order,
  imageUrl,
  link,
  onChange,
  onChangeFile,
  onSubmit,
  onClose,
  required,
}) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <form className="user was-validated" onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="form-group row">
            <div className="col-sm-12 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Tipo de Configuração
              </label>
              <InputSelect
                name="name"
                value={name}
                options={[
                  {
                    label: 'Link Rápido',
                    value: 'link-rapido',
                  },
                  {
                    label: 'Rede Social',
                    value: 'rede-social',
                  }
                ]}
                onChange={onChange}
                placeholder="Selecione um tipo de configuração"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Título
              </label>
              <InputText
                type="text"
                name="text"
                id="text"
                value={text}
                onChange={onChange}
                placeholder="Informe o título"
              />
            </div>
            <div className="col-sm-12 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Link
              </label>
              <InputText
                type="text"
                name="link"
                id="link"
                value={link}
                onChange={onChange}
                placeholder="Informe o título"
              />
            </div>

            <div className="col-sm-12 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Imagem / Arquivo
              </label>
              <Upload
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={onChangeFile}
                accept="image/png, image/jpeg, application/pdf"
              />
            </div>
            <div className="col-sm-12 mb-sm-0 mt-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Ordem
              </label>
              <InputText
                type="number"
                name="order"
                id="order"
                value={order}
                onChange={onChange}
                placeholder="Informe a ordem"
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
