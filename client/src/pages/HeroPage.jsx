import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/pagesCSS/HeroPage.css";
import AboutUs from "../components/AboutUs";
// import ContactUs from "../components/ContactUs";

const HeroPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="landing-root">
      <div className="dev-banner">
        🚧 Some features are currently under development! Stay tuned. 🚧
      </div>

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

          <div className="hero-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🔗</span>
              <span className="benefit-text">Connect with Peers</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💡</span>
              <span className="benefit-text">Share Your Creations</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📚</span>
              <span className="benefit-text">Learn New Skills</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🤝</span>
              <span className="benefit-text">Collaborate on Projects</span>
            </div>
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

      <div
        className="features-header fade-in-section"
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#312e81",
            marginBottom: "0.75rem",
          }}
        >
          Explore Hobimenia's Core Features
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#4b5563",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Discover how our platform helps you connect, share, and grow your
          hobbies.
        </p>
      </div>

      <section
        className="features-section-alt fade-in-section"
        aria-label="Platform Features"
      >
        <div className="feature-item">
          <div className="feature-content">
            <h2 className="feature-title-alt">Share Your Passion</h2>
            <p className="feature-description-alt">
              Post about your hobbies, projects, and connect with like-minded
              people. Showcase your journey and inspire others.
            </p>
          </div>
          <div className="feature-media">
            <video
              src="/assets/sharePassion.mp4"
              alt="Share Your Passion Feature Video"
              className="feature-video-alt"
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/sharePassion.svg"
            />
          </div>
        </div>

        <div className="feature-item feature-item-reversed">
          <div className="feature-content">
            <h2 className="feature-title-alt">Discover New Interests</h2>
            <p className="feature-description-alt">
              Explore trending hobbies and find inspiration from a diverse
              community. Dive into new activities and broaden your horizons.
            </p>
          </div>
          <div className="feature-media">
            <video
              src="/assets/discoverInterest.mp4"
              alt="Discover New Interests Feature Video"
              className="feature-video-alt"
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/InterestsFeature.svg"
            />
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-content">
            <h2 className="feature-title-alt">Collaborate & Learn</h2>
            <p className="feature-description-alt">
              Join groups, participate in discussions, comment on posts, and
              learn together with fellow enthusiasts.
            </p>
          </div>
          <div className="feature-media">
            <video
              src="/assets/collaborationFeature.mp4"
              alt="Collaborate & Learn Feature Video"
              className="feature-video-alt"
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/collaboratefeature.svg"
            />
          </div>
        </div>
      </section>

      <div id="about-us-section">
        <AboutUs />
      </div>
      {/* <div id="contact-us-section">
        <ContactUs />
      </div> */}
    </div>
  );
};

export default HeroPage;
