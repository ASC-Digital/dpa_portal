import CardIcon from "@/components/Presentational/CardIcon";
import TopAwardsByRelated from "./TopAwardsByRelated";
import TopTransactionsReceived from "./TopTransactionsReceived";
import TopTransactionsSpent from "./TopTransactionsSpent";

const DashboardMe = ({
  totalProducts = 0,
  totalTransactionsReceived = 0,
  totalTransactionsSpent = 0,
  topTransactionsReceived = [],
  topAwardsByRelated = [],
  topTransactionsSpent = [],
  spinner,
}) => {
  return (
    <>
      <div className="row">
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
        <TopTransactionsReceived
          spinner={spinner}
          rows={topTransactionsReceived}
        />
        <TopTransactionsSpent spinner={spinner} rows={topTransactionsSpent} />
      </div>

      <div className="row">
        <TopAwardsByRelated spinner={spinner} rows={topAwardsByRelated} />
      </div>
    </>
  );
};

export default DashboardMe;
