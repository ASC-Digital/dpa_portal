const Details = ({ children }) => {
  return (
    <div className="col-xl-8 col-lg-7">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            Detalhe da Conta
          </h6>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

export default Details;
