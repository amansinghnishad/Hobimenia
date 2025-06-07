import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import AIHelperButton from "../components/AIHelperButton";
import ImageUploader from "../components/ImageUploader";
import { Card, Button, Input } from "../components/ui";
import { FaImage, FaTag, FaPen, FaArrowLeft, FaMagic } from "react-icons/fa";
import { toast } from "react-toastify";

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

const CreatePostPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);

  // Handle image selection from ImageUploader
  const handleImageUpload = (file) => {
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  // Clean up the object URL
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

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
    if (imageFile) formData.append("image", imageFile);

    try {
      setLoading(true);
      await api.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post created successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error("Failed to create post", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <FaArrowLeft />
              <span>Back</span>
            </Button>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaPen className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Post
            </h1>
            <p className="text-gray-600">
              Share your thoughts and creativity with the community
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload Section */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                  <FaImage className="text-purple-500" />
                  <span>Add an Image (Optional)</span>
                </label>
                <ImageUploader onUpload={handleImageUpload} />
                {imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                )}
              </div>

              {/* Category Selection */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                  <FaTag className="text-purple-500" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 bg-white"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption Section */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                  <FaPen className="text-purple-500" />
                  <span>Write your thoughts</span>
                </label>
                <textarea
                  placeholder="Share your thoughts, ideas, or stories..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-900 placeholder-gray-500"
                  required
                />
                <div className="mt-2 text-sm text-gray-500">
                  {caption.length} characters
                </div>
              </div>

              {/* AI Helper Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
                {" "}
                <div className="flex items-center space-x-2 mb-4">
                  <FaMagic className="text-purple-500" />
                  <span className="font-semibold text-gray-900">
                    AI Writing Assistant
                  </span>
                </div>
                <AIHelperButton
                  currentCaption={caption}
                  onSuggestionClick={(text) => setCaption(caption + text)}
                />
                <p className="text-xs text-purple-600 mt-2">
                  ✨ More AI features coming soon!
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  disabled={loading || !caption.trim()}
                  loading={loading}
                >
                  {loading ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostPage;
