import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import ImageUploader from "../components/ImageUploader";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setContent(res.data.content);
        setImageUrl(res.data.imageUrl || "");
      } catch (err) {
        console.error("Error loading post", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/posts/${id}`, { content, imageUrl });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Error updating post", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="w-full border rounded p-2 mb-4"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <ImageUploader onUpload={(url) => setImageUrl(url)} />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="mt-4 w-full rounded shadow"
        />
      )}
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditPostPage;
