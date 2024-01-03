const Circle = ({
  type = "button",
  icon = "",
  onClick = () => {},
  color = "primary",
  block = false,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${color} btn-circle ${block && "btn-block"} ml-2`}
      onClick={onClick}
    >
      <span className="icon text-white-50">
        <i className={`fas fa-${icon}`}></i>
      </span>
    </button>
  );
};

export default Circle;
