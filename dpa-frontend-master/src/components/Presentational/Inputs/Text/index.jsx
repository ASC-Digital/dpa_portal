const InputText = ({
  type = "text",
  name = "",
  min = 0,
  step = 0,
  id = "input",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = false,
  children,
  disabled,
}) => {
  return (
    <div className="form-group">
      <input
        min={min}
        id={id}
        type={type}
        name={name}
        value={value}
        step={step}
        className="form-control mb-1"
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {children}
    </div>
  );
};

export default InputText;
