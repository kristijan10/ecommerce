import { Link } from "react-router";

const PageNotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
    <h1 className="text-4xl font-bold text-blue-600 mb-4">404</h1>
    <p className="text-xl mb-6">Stranica nije pronađena</p>
    <Link
      to="/"
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Nazad na početnu
    </Link>
  </div>
);

export default PageNotFound;
