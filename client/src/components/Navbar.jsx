import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
      >
        Hobimenia
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link
              to={`/profile/${user._id}`}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
