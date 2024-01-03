/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "@/components/Presentational/Inputs/Select";
import { getCity, getState } from "@/services/IBGE";
import { toastrMessage } from "@/utils/Toastr";

const SelectCity = ({
  city,
  state,
  nameCity,
  nameState,
  onChange,
  required,
}) => {
  const [stateData, setState] = useState([]);
  const [cityData, setCity] = useState([]);

  const listState = async () => {
    const getStateResponse = await getState();

    if (!getStateResponse.status) {
      toastrMessage("error", getStateResponse.message);
      return;
    }

    const data = [];

    getStateResponse.state.map((state) =>
      data.push({
        label: state.nome,
        value: state.sigla,
      })
    );

    setState(data);
  };

  const listCity = async (uf) => {
    const getCityResponse = await getCity(uf);

    if (!getCityResponse.status) {
      toastrMessage("error", getCityResponse.message);
      return;
    }

    const data = [];

    getCityResponse.city.map((row) =>
      data.push({
        label: row.nome,
        value: row.nome,
      })
    );

    setCity(data);
  };

  useEffect(() => {
    listState();
  }, []);

  return (
    <>
      <div className="col-6  mb-3 mb-sm-0">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Estado
        </label>
        <Select
          value={state}
          name={nameState}
          options={stateData}
          placeholder="Selecione um estado"
          onChange={(e) => {
            listCity(e.target.value);
            onChange(e);
          }}
          required={required}
        />
      </div>
      <div className="col-6  mb-3 mb-sm-0">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Cidade
        </label>
        <Select
          name={nameCity}
          value={city}
          options={cityData}
          placeholder={"Selecione uma cidade"}
          onChange={onChange}
          required={required}
        />
      </div>
    </>
  );
};

export default SelectCity;
