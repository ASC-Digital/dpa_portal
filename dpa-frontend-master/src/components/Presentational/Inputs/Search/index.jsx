const InputSearch = ({
  id = "",
  name = "",
  onChange = () => {},
  onClear = () => {},
  value,
}) => {
  return (
    <div className="input-group" style={{ width: "30%", cursor: "pointer" }}>
      <input
        id={id}
        name={name}
        type="text"
        className="form-control"
        placeholder="Pesquisar"
        value={value}
        onChange={onChange}
      />
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon2" onClick={onClear}>
          x
        </span>
      </div>
    </div>
  );
};

export default InputSearch;
