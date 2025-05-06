import "../css/componentCSS/AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <section className="about-section fade-in-section">
        <div className="about-media">
          <video
            className="about-video"
            src="/assets/AboutMe.mp4"
            loop
            muted
            playsInline
            autoPlay
            poster="/assets/about-poster.png"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="about-content">
          <h2 className="about-title-animated">About Hobimenia</h2>
          <p className="about-text-animated">
            Hobimenia is built for hobbyists, makers, and lifelong learners. Our
            mission is to foster a welcoming space for everyone to share, learn,
            and grow together.
          </p>
        </div>
      </section>
      ;
    </>
  );
};

export default AboutUs;
