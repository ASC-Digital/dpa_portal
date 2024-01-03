import BarChart from "@/components/Presentational/Charts/BarChart";
import Spinner from "@/components/Presentational/Spinner";

const TopAwardsByRelated = ({ rows, spinner }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Top Principais Prêmios Relacionados
          </h6>
        </div>
        {spinner ? (
          <div className="card-body text-center">
            <Spinner />
          </div>
        ) : (
          <div className="card-body text-center">
            <BarChart data={rows} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopAwardsByRelated;
