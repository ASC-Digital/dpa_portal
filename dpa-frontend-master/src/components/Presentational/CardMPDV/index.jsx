const Card = ({ title, buttonRight, buttonRight2,children }) => {
    return (
      <div className="card mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          {title ? title : <div />}
          <div className="dropdown no-arrow">{buttonRight}</div>
          <div className="dropdown no-arrow">{buttonRight2}</div>
        </div>
        <div className="card-body">{children}</div>
      </div>
    );
  };
  
  export default Card;
  