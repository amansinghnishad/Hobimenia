import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import CreatePostHeader from "../components/CreatePostPage/CreatePostHeader";
import CreatePostForm from "../components/CreatePostPage/CreatePostForm";

const CreatePostPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <CreatePostHeader />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CreatePostForm token={token} navigate={navigate} />
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostPage;
