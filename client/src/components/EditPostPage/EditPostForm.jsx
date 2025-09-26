import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext";
import AIHelperButton from "../AIHelperButton";
import { Card, Button, Loader } from "../ui";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import { FaImage, FaTag, FaEdit } from "react-icons/fa";

const CATEGORIES = [
  "Tech",
  "Photography",
  "Designing",
  "Drawing",
  "Music",
  "Writing",
  "Gaming",
  "Travel",
  "Food",
  "Lifestyle",
  "Other",
];

const EditPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCaption(res.data.caption);
        setCurrentImage(res.data.imageUrl);
        setCategory(res.data.category || CATEGORIES[0]);
      } catch (err) {
        console.error("Failed to fetch post", err);
        toast.error("Failed to load post data.");
      } finally {
        setInitialLoading(false);
      }
    };
    if (token && id) {
      fetchPost();
    }
  }, [id, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      toast.error("Caption cannot be empty.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await api.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Failed to update post", err);
      toast.error("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader variant="spinner" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {(currentImage || previewImage) && (
            <div>
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                <FaImage className="text-blue-500" />
                <span>Current Image</span>
              </label>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={previewImage || currentImage}
                  alt="Post content"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </div>
          )}

          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
              <FaImage className="text-blue-500" />
              <span>Change Image (Optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
              <FaTag className="text-blue-500" />
              <span>Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
              <FaEdit className="text-blue-500" />
              <span>Edit your content</span>
            </label>
            <textarea
              placeholder="Edit your caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 mb-4"
              required
            />

            {caption && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Preview:
                </h4>
                <div className="prose prose-sm max-w-none text-gray-800">
                  <ReactMarkdown>{caption}</ReactMarkdown>
                </div>
              </div>
            )}

            <div className="mt-2 text-sm text-gray-500">
              {caption.length} characters
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-semibold text-gray-900">
                AI Writing Assistant
              </span>
            </div>
            <AIHelperButton
              currentCaption={caption}
              onSuggestionClick={(text) => setCaption(caption + text)}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading || !caption.trim()}
              loading={loading}
            >
              {loading ? "Updating..." : "Update Post"}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default EditPostForm;
