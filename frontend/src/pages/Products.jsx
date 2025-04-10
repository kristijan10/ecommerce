import { Link } from "react-router";
import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const products = await apiCall("/products", { method: "GET" });
        setData(products);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Proizvodi
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data && data.map((d) => <ProductCard data={d} key={d.id} />)}
        </div>

        <Link
          to="/"
          className="mt-10 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default Products;
