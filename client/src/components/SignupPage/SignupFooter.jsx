import React from "react";
import { Link } from "react-router-dom";

const SignupFooter = () => {
  return (
    <>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Sign in
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

export default SignupFooter;
