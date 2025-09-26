import React from "react";
import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
      <div className="mt-4 text-center">
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </>
  );
};

export default LoginFooter;
