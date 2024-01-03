const DropdownButton = () => {
  return (
    <div className="dropdown mb-4">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Dropdown
      </button>
      <div
        className="dropdown-menu animated--fade-in"
        aria-labelledby="dropdownMenuButton"
      >
        <a className="dropdown-item" href="/#">
          Action
        </a>
        <a className="dropdown-item" href="/#">
          Another action
        </a>
        <a className="dropdown-item" href="/#">
          Something else here
        </a>
      </div>
    </div>
  );
};

export default DropdownButton;
