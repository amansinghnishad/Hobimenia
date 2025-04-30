import PostFeed from "../components/PostFeed";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Recent Posts</h1>
        <PostFeed />
      </div>
    </div>
  );
};

export default HomePage;
