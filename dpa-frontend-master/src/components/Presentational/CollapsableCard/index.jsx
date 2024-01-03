const CollapsableCard = ({ children }) => {
  return (
    <div className="card shadow mb-4">
      <a
        href="/#collapseCardExample"
        className="d-block card-header py-3 collapsed"
        data-toggle="collapse"
        role="button"
        aria-expanded="true"
        aria-controls="collapseCardExample"
      >
        <h6 className="m-0 font-weight-bold text-primary">
          Collapsable Card Example
        </h6>
      </a>
      <div className="collapse" id="collapseCardExample" style={{}}>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default CollapsableCard;
