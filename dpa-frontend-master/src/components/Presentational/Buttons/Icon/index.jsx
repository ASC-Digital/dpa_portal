const Icon = ({
  type = "button",
  title = "",
  icon = "",
  onClick = () => {},
  color = "primary",
  block = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${color} btn-icon-split ${block && "btn-block"}`}
      onClick={onClick}
    >
      <span className="icon text-white-50">
        <i className={`fas fa-${icon}`}></i>
      </span>
      <span className="text">{title}</span>
    </button>
  );
};

export default Icon;
