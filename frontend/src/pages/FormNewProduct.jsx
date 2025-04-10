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
      setStatus(res);
    } catch (err) {
      setStatus(err);
    } finally {
      setData(init);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {["name", "desc", "price", "imageUrl"].map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}: </label>
            <input
              name={field}
              id={field}
              value={data[field]}
              onChange={handleChange}
              required={field !== "desc"}
              type={field === "price" ? "number" : "text"}
              step={field === "price" ? 0.1 : undefined}
            />
          </div>
        ))}
        <button type="submit">Dodaj</button>
        {status && <p>{status.message}</p>}
      </form>
      <Link to="/">home</Link>
    </>
  );
};

export default FormNewProduct;
