import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AIHelperButton from "../components/AIHelperButton";
import ImageUploader from "../components/ImageUploader";

const CreatePostPage = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/"); // redirect to HomePage
    } catch (err) {
      console.error("Post creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-md mb-4"
            placeholder="What's on your mind?"
            rows="4"
            required={!image}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <ImageUploader onUpload={(url) => setImageUrl(url)} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-4 w-full rounded shadow"
            />
          )}

          <AIHelperButton
            onResult={(text) => setContent((prev) => prev + "\n" + text)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
