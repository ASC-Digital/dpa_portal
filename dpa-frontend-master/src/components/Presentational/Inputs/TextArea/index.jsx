const TextArea = ({
  id = "",
  name = "",
  placeholder = "",
  value = "",
  onChange = () => {},
  required,
}) => {
  return (
    <>
      <textarea
        id={id}
        className="form-control mb-1"
        value={value}
        name={name}
        rows={6}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};

export default TextArea;
