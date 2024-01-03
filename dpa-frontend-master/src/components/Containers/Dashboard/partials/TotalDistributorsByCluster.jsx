import PieChart from "@/components/Presentational/Charts/PieChart";
import Spinner from "@/components/Presentational/Spinner";

const TotalDistributorsByCluster = ({ rows, spinner }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Total de Distribuidores por Classificação
          </h6>
        </div>
        {spinner ? (
          <div className="card-body text-center">
            <Spinner />
          </div>
        ) : (
          <div className="card-body text-center">
            <PieChart data={rows} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalDistributorsByCluster;
