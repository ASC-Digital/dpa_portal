const InputFile = ({
  id = "",
  name = "",
  onChange = () => {},
  accept,
  required,
}) => {
  return (
    <input
      className="form-control mb-1"
      id={id}
      name={name}
      type="file"
      accept={accept}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputFile;
