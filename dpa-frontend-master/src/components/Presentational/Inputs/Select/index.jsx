const Select = ({
  name = "",
  value = "",
  options = [],
  onChange = () => {},
  required,
  disabled,
}) => {
  return (
    <div className="form-group">
      <select
        onChange={onChange}
        name={name}
        value={value}
        className="form-control mb-1"
        required={required}
        disabled={disabled}
      >
        <option value="">Selecione uma opção</option>
        {options.map((row, key) => (
          <option key={key} value={row.value}>
            {row.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
