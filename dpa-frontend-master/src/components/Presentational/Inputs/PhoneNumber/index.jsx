import NumberFormat from "react-number-format";
import Input from "../Text";

const InputPhone = ({
  id,
  type = "text",
  placeholder = "(XX) XXXXX-XXXX",
  name,
  value,
  required = false,
  onChange,
}) => {
  return (
    <NumberFormat
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      format="(##) #####-####"
      mask="_"
      placeholder={placeholder}
      required={required}
      customInput={Input}
    />
  );
};

export default InputPhone;
