import React from "react";
import { motion } from "framer-motion";
import { Card, Loader } from "../ui";

const PostDetailLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailLoader;
