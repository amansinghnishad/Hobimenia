// Navbar component
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  // if (isAuthPage) return null;

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="text-indigo-600 font-bold text-xl">
        Hobimenia
      </Link>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-indigo-600">
          Login
        </Link>
        <Link to="/signup" className="text-gray-700 hover:text-indigo-600">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
