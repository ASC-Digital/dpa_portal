import { Link } from "react-router-dom";
import ProfileImage from "@/components/Presentational/ProfileImage";
import Spinner from "@/components/Presentational/Spinner";

const TopUsersByCreatedAt = ({ rows, spinner }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Top Usuários Criados
          </h6>
        </div>
        {spinner ? (
          <div className="card-body text-center">
            <Spinner />
          </div>
        ) : (
          <div
            className="card-body"
            style={{ height: 380, overflow: "scroll" }}
          >
            <div className="row">
              {rows.map((row, key) => (
                <div className="col-xl-3 col-md-6 mb-4 text-center" key={key}>
                  <ProfileImage image={row.photoUrl} />
                  <p className="mt-2">
                    {row.name} <br /> <small>{row.role.name}</small>
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/gifts/users">ver mais +</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUsersByCreatedAt;
