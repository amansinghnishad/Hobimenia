import React from "react";
import { Link } from "react-router-dom";
import "../css/pagesCSS/HeroPage.css";

const HeroPage = () => {
  return (
    <div className="landing-root">
      {/* Hero Section */}
      <section className="hero-section fade-in-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Hobimenia</h1>
          <p className="hero-subtitle">
            The place to <span className="hero-keyword">connect</span>,{" "}
            <span className="hero-keyword">share</span>, and{" "}
            <span className="hero-keyword">discover</span> hobbies with a
            vibrant community.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="hero-btn hero-btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="hero-btn hero-btn-secondary">
              Log In
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <video
            className="hero-img"
            src="/assets/hero-illustration.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero-poster.png"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section fade-in-section">
        <h2 className="features-title">Features</h2>
        <div className="features-list">
          <div className="feature-card">
            <img
              src="/assets/feature1.png"
              alt="Feature 1"
              className="feature-img"
            />
            <h3>Share Your Passion</h3>
            <p>
              Post about your hobbies, projects, and connect with like-minded
              people.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="/assets/feature2.png"
              alt="Feature 2"
              className="feature-img"
            />
            <h3>Discover New Interests</h3>
            <p>
              Explore trending hobbies and find inspiration from the community.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="/assets/feature3.png"
              alt="Feature 3"
              className="feature-img"
            />
            <h3>Collaborate & Learn</h3>
            <p>Join groups, comment, and learn together with others.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section fade-in-section">
        <div className="about-content">
          <h2>About Hobimenia</h2>
          <p>
            Hobimenia is built for hobbyists, makers, and lifelong learners. Our
            mission is to foster a welcoming space for everyone to share, learn,
            and grow together.
          </p>
        </div>
        <div className="about-media">
          <video
            className="about-video"
            controls
            poster="/assets/about-poster.png"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
