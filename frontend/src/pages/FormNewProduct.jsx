import { Link } from "react-router";

const FormNewProduct = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Forma za dodavanje novog proizvoda</h1>
      </form>

      <Link to="/">home</Link>
    </>
  );
};

export default FormNewProduct;
