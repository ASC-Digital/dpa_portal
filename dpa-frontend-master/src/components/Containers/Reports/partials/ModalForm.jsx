import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";
import SelectUsers from "@/components/Containers/SelectUsers";

const Forms = ({
  modal,
  title,
  type,
  userId,
  format,
  reportTitle,
  embeddedLink,
  powerbiGroupId,
  powerbiReportId,
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
                Tipo
              </label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  value="pex"
                  name="type"
                  checked={type === "pex" ? true : false}
                  onChange={onChange}
                  required
                />
                <label className="form-check-label">PEX</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={type === "training" ? true : false}
                  value="training"
                  name="type"
                  onChange={onChange}
                  required
                />
                <label className="form-check-label">Treinamento</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Formato
              </label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  value="embedded"
                  name="format"
                  checked={format === "embedded" ? true : false}
                  onChange={onChange}
                  required
                />
                <label className="form-check-label">Embedded Link</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={format === "powerbi" ? true : false}
                  value="powerbi"
                  name="format"
                  onChange={onChange}
                  required
                />
                <label className="form-check-label">Power BI</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Titulo
              </label>
              <InputText
                type="text"
                name="reportTitle"
                id="reportTitle"
                value={reportTitle}
                onChange={onChange}
                placeholder="Informe um titulo"
                required={required}
              />
            </div>
            {format === "embedded" && (
              <div className="col-sm-12 mb-3 mb-sm-0">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Link
                </label>
                <InputText
                  type="text"
                  name="embeddedLink"
                  id="embeddedLink"
                  value={embeddedLink}
                  onChange={onChange}
                  placeholder="Informe um link"
                  required={required}
                />
              </div>
            )}

            {format === "powerbi" && (
              <>
                <div className="col-sm-12 mb-3 mb-sm-0">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    ID do Grupo
                  </label>
                  <InputText
                    type="text"
                    name="powerbiGroupId"
                    id="powerbiGroupId"
                    value={powerbiGroupId}
                    onChange={onChange}
                    placeholder="Informe o id do grupo"
                    required={required}
                  />
                </div>
                <div className="col-sm-12 mb-3 mb-sm-0">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    ID do Relatório
                  </label>
                  <InputText
                    type="text"
                    name="powerbiReportId"
                    id="powerbiReportId"
                    value={powerbiReportId}
                    onChange={onChange}
                    placeholder="Informe um id do relatório"
                    required={required}
                  />
                </div>
              </>
            )}

            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Usuário
              </label>
              <SelectUsers
                name="userId"
                value={userId}
                onChange={onChange}
                required={required}
              />
            </div>
          </div>

          {/* <div className="form-group row">
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Titulo
              </label>
              <InputText
                type="text"
                name="reportTitle"
                id="reportTitle"
                value={reportTitle}
                onChange={onChange}
                placeholder="Informe um titulo"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Link
              </label>
              <InputText
                type="text"
                name="embeddedLink"
                id="embeddedLink"
                value={embeddedLink}
                onChange={onChange}
                placeholder="Informe um link"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Usuário
              </label>
              <SelectUsers
                name="userId"
                value={userId}
                onChange={onChange}
                required={required}
              />
            </div>
          </div> */}
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
