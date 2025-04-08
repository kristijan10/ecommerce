import { Link } from "react-router";
import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";

const Products = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await apiCall("/products", { method: "GET" });
        setData(products);
      } catch (error) {
        setError(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-2xl capitalize">products</h1>
      <div className="flex gap-5">
        {data &&
          data.map((d) => (
            <div key={d.id} className="border">
              <img src={d.imageUrl} className="w-full" />
              <div className="p-1">
                <h4>{d.name}</h4>
                <h5>{d.desc}</h5>
                <div className="flex flex-row justify-between">
                  <h6 className="font-bold">{d.price}</h6>
                  <button>Kupi</button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {error && <p>{error}</p>}
      <Link to="/">home</Link>
      <br />
    </>
  );
};

export default Products;
