import CardIcon from "@/components/Presentational/CardIcon";
import TopUsersByCreatedAt from "./TopUsersByCreatedAt";
import TopTransactionsSpent from "./TopTransactionsSpent";
import TopTransactionsReceived from "./TopTransactionsReceived";
import TopProductsByStock from "./TopProductsByStock";
import TopAwardsByRelated from "./TopAwardsByRelated";
import TotalDistributorsByCluster from "./TotalDistributorsByCluster";

const DashboardFull = ({
  spinner,
  totalUsers = 0,
  totalProducts = 0,
  totalDistributors = 0,
  totalTransactionsReceived = 0,
  totalTransactionsSpent = 0,
  topUsersByCreatedAt = [],
  topTransactionsSpent = [],
  topTransactionsReceived = [],
  topProductsByStock = [],
  topAwardsByRelated = [],
  totalDistributorsByCluster = [],
}) => {
  return (
    <>
      <div className="row">
        <CardIcon
          title="Usuários ativos"
          value={totalUsers}
          color="primary"
          icon="users"
          spinner={spinner}
        />
        <CardIcon
          title="Total de distribuidores"
          value={totalDistributors}
          color="success"
          icon="truck"
          spinner={spinner}
        />
        <CardIcon
          title="Total de produtos"
          value={totalProducts}
          color="success"
          icon="dollar-sign"
          spinner={spinner}
        />
        <CardIcon
          title="Total de Transações Recebidas"
          value={totalTransactionsReceived}
          color="warning"
          icon="list"
          spinner={spinner}
        />
        <CardIcon
          title="Total de Transações Gastas"
          value={totalTransactionsSpent}
          color="info"
          icon="plus"
          spinner={spinner}
        />
      </div>

      <div className="row">
        <TopUsersByCreatedAt spinner={spinner} rows={topUsersByCreatedAt} />
        <TopTransactionsSpent spinner={spinner} rows={topTransactionsSpent} />
      </div>

      <div className="row">
        <TopTransactionsReceived
          spinner={spinner}
          rows={topTransactionsReceived}
        />
        <TopProductsByStock spinner={spinner} rows={topProductsByStock} />
      </div>

      <div className="row">
        <TopAwardsByRelated rows={topAwardsByRelated} spinner={spinner} />
        <TotalDistributorsByCluster
          rows={totalDistributorsByCluster}
          spinner={spinner}
        />
      </div>
    </>
  );
};

export default DashboardFull;
