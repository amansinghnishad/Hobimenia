import React from "react";
import EditPostHeader from "../components/EditPostPage/EditPostHeader";
import EditPostForm from "../components/EditPostPage/EditPostForm";

const EditPostPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <EditPostHeader />
        <EditPostForm />
      </div>
    </div>
  );
};

export default EditPostPage;
