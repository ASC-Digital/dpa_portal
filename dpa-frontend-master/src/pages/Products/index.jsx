import Layout from "@/layout";
import ProductsContainers from "@/components/Containers/Products";

const Products = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Produtos</h1>
      </div>
      <ProductsContainers />
    </Layout>
  );
};

export default Products;
