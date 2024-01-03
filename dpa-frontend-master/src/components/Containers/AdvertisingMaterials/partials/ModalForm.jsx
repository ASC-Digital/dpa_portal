import Upload from "@/components/Presentational/Inputs/File";
import InputText from "@/components/Presentational/Inputs/Text";
import Modal from "@/components/Presentational/Modal";
import SelectMaterialType from "../../SelectMaterialType";
import SelectDigitalMPDV from "../../DigitalMPDV";

const Forms = ({
  modal,
  title,
  type,
  uploadedLink,
  link,
  description,
  onChange,
  onChangeImageFile,
  onSubmit,
  onClose,
  required,
  thumbnail,
  setThumbnail,
  brand,
  typeOfMpdv,
  digitalMPDV
}) => {
  return (
    <Modal title={title} modal={modal} onClose={onClose}>
      <form className="user was-validated" onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="form-group row">
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Tipo de Arquivo
              </label>
              <SelectMaterialType
                name="type"
                id="type"
                value={type}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Marca
              </label>
              <InputText
                type="text"
                name="brand"
                id="brand"
                value={brand}
                onChange={onChange}
                placeholder="Informe uma marca"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Tipo MPDV
              </label>
              <InputText
                type="text"
                name="typeOfMpdv"
                id="typeOfMpdv"
                value={typeOfMpdv}
                onChange={onChange}
                placeholder="Informe um tipo"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                MPDV é Digital?
              </label>
              <SelectDigitalMPDV
                name="digitalMPDV"
                id="digitalMPDV"
                value={digitalMPDV}
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
                Arquivo
              </label>
              <Upload
                id="uploadedLink"
                name="uploadedLink"
                value={uploadedLink}
                onChange={onChangeImageFile}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Imagem Capa
              </label>
              <Upload
                id="thumbnail"
                name="thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.files[0])}
                required={false}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Descrição
              </label>
              <InputText
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={onChange}
                placeholder="Informe uma descrição para o arquivo"
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
