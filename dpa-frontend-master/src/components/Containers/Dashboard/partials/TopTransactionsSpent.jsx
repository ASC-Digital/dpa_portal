import { Link } from "react-router-dom";
import { maskDate } from "@/utils/Mask/Date";
import Spinner from "@/components/Presentational/Spinner";

const TopTransactionsSpent = ({ rows, spinner }) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Top Principais Transações Gastas
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
                  <th>Usuário</th>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Quantidade</th>
                  <th>Criado em</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, key) => (
                  <tr key={key}>
                    <td>{row.wallet.user.name}</td>
                    <td>{row.name}</td>
                    <td>{row.totalPrice}</td>
                    <td>{row.totalAmount}</td>
                    <td>{maskDate(row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center">
              <Link to="/gifts/transactions">ver mais +</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopTransactionsSpent;
