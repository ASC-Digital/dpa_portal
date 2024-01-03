import Toggle from "react-toggle";
import "./styles.css";

const ToggleCheckbox = ({ checked, onChange }) => {
  return <Toggle checked={checked} onChange={onChange} />;
};

export default ToggleCheckbox;
