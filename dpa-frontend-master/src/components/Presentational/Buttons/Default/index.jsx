const Button = ({
  type = "button",
  title = "",
  onClick = () => {},
  color = "primary",
  block = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${color} btn-user ${block && "btn-block"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
