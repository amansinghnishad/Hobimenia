import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col md:flex-row items-center justify-center px-6 py-12">
      {/* Text Section */}
      <motion.div
        className="text-center md:text-left md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to <span className="text-indigo-600">Hobimenia</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Express your creativity through photos, blogs, thoughts, and more.
          Built for hobbyists, powered by AI.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link to="/login">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-xl hover:bg-indigo-50 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Illustration */}
      <motion.div
        className="md:w-1/2 mt-10 md:mt-0"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img
          src="https://undraw.co/api/illustrations/website_posting.svg"
          alt="Hobimenia Illustration"
          className="w-full max-w-md mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default HeroPage;
