/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import usePermissions from "@/hooks/usePermissions";
import InputText from "@/components/Presentational/Inputs/Text";
import Spinner from "@/components/Presentational/Spinner";

const Forms = ({
  title,
  name,
  perms,
  onChange,
  onChangePermissions,
  onSubmit,
  onClose,
  required,
}) => {
  const { getData } = usePermissions();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const listData = async () => {
    try {
      const getDataResponse = await getData();

      const groups = getDataResponse.reduce(
        (groups, item) => ({
          ...groups,
          [item.entity]: [...(groups[item.entity] || []), item],
        }),
        {}
      );

      setData(groups);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
    }
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-header">{title}</div>
          <div className="card-body">
            <form className="user was-validated" onSubmit={onSubmit}>
              <div className="modal-body">
                <div className="form-group row">
                  <div className="col-sm-12 mb-3 mb-sm-0">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
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
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 mb-3 mb-sm-0">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Permissões
                    </label>
                    {spinner ? (
                      <div>
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        {Object.keys(data).map((item, key) => (
                          <div
                            className="row"
                            style={{ border: "1px solid #ccc", padding: 10 }}
                          >
                            <div className="col-2">
                              <strong>{item.toUpperCase()}</strong>
                            </div>
                            <div className="col-10">
                              {data[item].map((row) => (
                                <div
                                  className="form-check form-check-inline"
                                  key={row.id}
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="permissions"
                                    value={row.id}
                                    defaultChecked={perms.includes(row.id)}
                                    onChange={onChangePermissions}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineCheckbox1"
                                  >
                                    {row.action}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
