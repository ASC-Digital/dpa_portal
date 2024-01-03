import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";
import Upload from "@/components/Presentational/Inputs/File";
import SelectPages from "@/components/Containers/SelectPages";

const Forms = ({
  modal,
  title,
  page,
  imageUrl,
  link,
  descriptionImageUrl,
  order,
  onChange,
  onChangeImageFile,
  onChangeDescriptionImageFile,
  onSubmit,
  onClose,
  required,
  bannerDescription,
}) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <form className="user was-validated" onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="form-group row">
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Página
              </label>
              <SelectPages
                name="page"
                id="page"
                value={page}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Link
              </label>
              <InputText
                type="text"
                name="link"
                id="link"
                value={link}
                onChange={onChange}
                placeholder="Informe um link"
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Imagem
              </label>
              <Upload
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={onChangeImageFile}
                accept="image/png, image/jpeg"
                required={required}
              />
              <small style={{ fontWeight: "bold", color: "red" }}>
                Obs.: o tamanho padrão do banner deve ser de 1600px x 760px
              </small>
            </div>
            <div className="col-sm-12 mb-3 mt-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Descrição de Imagem
              </label>
              <Upload
                id="descriptionImageUrl"
                name="descriptionImageUrl"
                value={descriptionImageUrl}
                onChange={onChangeDescriptionImageFile}
                accept="image/png, image/jpeg"
              />
              <small style={{ fontWeight: "bold", color: "red" }}>
                Obs.: o tamanho maximo do banner da descrição de imagem deve ser
                de 500px x 500px
              </small>
            </div>
            <div className="col-sm-12 mb-3 mt-3 mb-sm-0">
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
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Descrição
              </label>
              <InputText
                type="text"
                name="bannerDescription"
                id="bannerDescription"
                value={bannerDescription}
                onChange={onChange}
                placeholder="Informe uma descrição para o Banner"
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
