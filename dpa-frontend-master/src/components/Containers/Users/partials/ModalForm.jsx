import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";
import PhoneNumber from "@/components/Presentational/Inputs/PhoneNumber";
import Upload from "@/components/Presentational/Inputs/File";
import CPF from "@/components/Presentational/Inputs/CPF";
import Select from "@/components/Containers/SelectRoles";
import SelectDistributors from "@/components/Containers/SelectDistributors";

const Forms = ({
  actualUserRoleId,
  modal,
  title,
  name,
  fullName,
  email,
  phoneNumber,
  document,
  password,
  roleId,
  photoUrl,
  distributors,
  onChangeFile,
  onChange,
  onChangeDistributors,
  onSubmit,
  actions,
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
                Nome PEX
              </label>
              <InputText
                disabled={![1, 2, 3].includes(actualUserRoleId)}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Informe um nome pex"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nome Completo
              </label>
              <InputText
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={onChange}
                placeholder="Informe nome completo"
                required={required}
              />
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <InputText
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                placeholder="Informe um email"
                required={required}
              />
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Telefone
              </label>
              <PhoneNumber
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
                placeholder="Informe um telefone"
              />
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                CPF
              </label>
              <CPF
                type="text"
                name="document"
                id="document"
                value={document}
                onChange={onChange}
                placeholder="Informe um CPF"
              />
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Perfil
              </label>
              <Select
                name="roleId"
                id="roleId"
                value={roleId}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Senha
              </label>
              <InputText
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Informe uma senha"
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Distribuidores
              </label>
              <SelectDistributors
                name="distributors"
                value={distributors}
                onChange={onChangeDistributors}
                required={required}
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
