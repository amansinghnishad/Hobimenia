import "../css/componentCSS/Loader.css";

const Loader = () => (
  <div className="loader-shimmer">
    {[...Array(3)].map((_, idx) => (
      <div key={idx} className="loader-shimmer-card">
        <div className="loader-shimmer-avatar" />
        <div className="flex-1 space-y-3 py-2">
          <div className="loader-shimmer-line1" />
          <div className="loader-shimmer-line2" />
          <div className="loader-shimmer-line3" />
        </div>
      </div>
    ))}
  </div>
);

export default Loader;
