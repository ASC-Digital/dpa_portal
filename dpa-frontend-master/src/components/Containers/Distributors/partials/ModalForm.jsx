/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Modal from "@/components/Presentational/Modal";
import InputText from "@/components/Presentational/Inputs/Text";
import CNPJ from "@/components/Presentational/Inputs/CNPJ";
import SelectCityAndState from "@/components/Containers/SelectCityAndState";
import SelectBranch from "@/components/Containers/SelectBranch";
import SelectClusters from "@/components/Containers/SelectClusters";

const Forms = ({
  modal,
  title,
  name,
  cnpj,
  shortName,
  mainCity,
  uf,
  companyBranchId,
  clusterId,
  soldTo,
  onChangeState,
  onChangeCity,
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
                Nome curto
              </label>
              <InputText
                type="text"
                name="shortName"
                id="shortName"
                value={shortName}
                onChange={onChange}
                placeholder="Informe um nome curto"
                required={required}
              />
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                CNPJ
              </label>
              <CNPJ
                type="text"
                name="cnpj"
                id="cnpj"
                value={cnpj}
                onChange={onChange}
                placeholder="Informe um CNPJ"
                required={required}
              />
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Código
              </label>
              <InputText
                type="text"
                name="soldTo"
                id="soldTo"
                value={soldTo}
                onChange={onChange}
                placeholder="Informe um código"
                required={required}
              />
            </div>
            <SelectCityAndState
              nameCity={"mainCity"}
              nameState={"uf"}
              city={mainCity}
              state={uf}
              onChange={onChange}
              required={required}
            />
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Filial
              </label>
              <SelectBranch
                name={"companyBranchId"}
                value={companyBranchId}
                onChange={onChange}
                required={required}
              />
            </div>
            <div className="col-sm-12 mb-3 mb-sm-0">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Classificação
              </label>
              <SelectClusters
                name={"clusterId"}
                value={clusterId}
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
