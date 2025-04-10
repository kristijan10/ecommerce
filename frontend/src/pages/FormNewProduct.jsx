import { useState } from "react";
import { Link } from "react-router";
import apiCall from "../utils/apiCall";

const FormNewProduct = () => {
  const init = { name: "", desc: "", price: 0, imageUrl: "" };
  const [data, setData] = useState(init);
  const [status, setStatus] = useState(null);

  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiCall("/products", {
        method: "POST",
        body: JSON.stringify({ ...data, price: +data.price }),
      });
      setStatus({ type: "success", message: res.message });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setData(init);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold text-blue-600 text-center mb-4">
          Novi Proizvod
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {["name", "desc", "price", "imageUrl"].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label htmlFor={field} className="capitalize font-medium">
                {field}:
              </label>
              <input
                id={field}
                name={field}
                type={field === "price" ? "number" : "text"}
                step={field === "price" ? 0.1 : undefined}
                value={data[field]}
                onChange={handleChange}
                required={field !== "desc"}
                className="border rounded px-3 py-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Dodaj
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}

        <Link
          to="/"
          className="mt-6 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default FormNewProduct;
