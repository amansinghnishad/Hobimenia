import PostFeed from "../components/PostFeed";
import CreatePostButton from "../components/CreatePostButton";
import "../css/pagesCSS/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-outer">
      <div className="dev-banner-homepage">
        <p>
          🚧 Some features are currently under development. Stay tuned for
          updates! 🚧
        </p>
      </div>
      <div className="homepage-inner">
        <h1 className="homepage-title">Recent Posts</h1>
        <div className="homepage-feed">
          <PostFeed />
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
};

export default HomePage;
