import Layout from "@/layout";
import TransactionsContainers from "@/components/Containers/Transactions";

const Transactions = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Transações</h1>
      </div>
      <TransactionsContainers />
    </Layout>
  );
};

export default Transactions;
