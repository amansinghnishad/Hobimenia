import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ProfileCard from "../components/ProfileCard";
import { AuthContext } from "../contexts/AuthContext";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?._id === userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          api.get(`/users/${userId}`),
          api.get(`/posts/user/${userId}`),
        ]);
        setProfile(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <Loader />;
  if (!profile) return <div className="text-center py-10">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ProfileCard user={profile} isOwnProfile={isOwnProfile} />

      <h2 className="text-lg font-semibold mt-6 mb-2">Posts</h2>
      <div className="grid gap-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
