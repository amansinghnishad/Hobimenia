import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../css/pagesCSS/HeroPage.css";

const HeroPage = () => {
  return (
    <section className="hero-section">
      {/* Text Section */}
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Welcome to <span className="hero-title-highlight">Hobimenia</span>
        </h1>
        <p className="hero-desc">
          Express your creativity through{" "}
          <span className="hero-desc-highlight-blue">photos</span>,{" "}
          <span className="hero-desc-highlight-purple">blogs</span>,{" "}
          <span className="hero-desc-highlight-pink">thoughts</span>, and more.
          <br />
          Built for hobbyists, powered by{" "}
          <span className="hero-desc-highlight-blue">AI</span>.
        </p>
        <div className="hero-btn-row">
          <Link to="/login">
            <button className="hero-btn-primary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="hero-btn-secondary">Sign Up</button>
          </Link>
        </div>
      </motion.div>
      {/* Illustration */}
      <motion.div
        className="hero-illustration"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="hero-illustration-card">
          <img
            src="https://picsum.photos/200/300"
            alt="Random Creative"
            className="hero-illustration-img"
            style={{ aspectRatio: "4/3", objectFit: "cover" }}
          />
          <div className="hero-illustration-caption">
            Random creative photo from Unsplash
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroPage;
