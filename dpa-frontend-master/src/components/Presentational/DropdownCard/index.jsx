const DropdownCard = () => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">
          Dropdown Card Example
        </h6>
        <div className="dropdown no-arrow">
          <a
            className="dropdown-toggle"
            href="/#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
            aria-labelledby="dropdownMenuLink"
            style={{}}
          >
            <div className="dropdown-header">Dropdown Header:</div>
            <a className="dropdown-item" href="/#">
              Action
            </a>
            <a className="dropdown-item" href="/#">
              Another action
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="/#">
              Something else here
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        Dropdown menus can be placed in the card header in order to extend the
        functionality of a basic card. In this dropdown card example, the Font
        Awesome vertical ellipsis icon in the card header can be clicked on in
        order to toggle a dropdown menu.
      </div>
    </div>
  );
};

export default DropdownCard;
