import { Link } from "react-router-dom";
import { maskDate } from "@/utils/Mask/Date";
import ProfileImage from "@/components/Presentational/ProfileImage";
import Spinner from "@/components/Presentational/Spinner";

const TopProductsByStock = ({ rows, spinner }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Top Principais Produtos por Estoque
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
            <table className="table">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Estoque</th>
                  <th>Criado em</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, key) => (
                  <tr key={key}>
                    <td>
                      <ProfileImage image={row.photoUrl} />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.stock}</td>
                    <td>{maskDate(row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center">
              <Link to="/gifts/products">ver mais +</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProductsByStock;
