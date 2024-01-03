import NumberFormat from "react-number-format";
import Input from "../Text";

const InputCNPJ = ({
  id,
  type = "text",
  placeholder = "00.000.000/0000-00",
  name,
  value,
  required = false,
  maxLength = 18,
  onChange,
}) => {
  return (
    <NumberFormat
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      format={"##.###.###/####-##"}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
      customInput={Input}
    />
  );
};

export default InputCNPJ;
