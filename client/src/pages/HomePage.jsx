import PostFeed from "../components/PostFeed";
import CreatePostButton from "../components/CreatePostButton";
import "../css/pagesCSS/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-outer">
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
