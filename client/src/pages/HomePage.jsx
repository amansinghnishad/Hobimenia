import React from "react";
import CreatePostButton from "../components/CreatePostButton";
import DevelopmentBanner from "../components/HomePage/DevelopmentBanner";
import MainContent from "../components/HomePage/MainContent";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <DevelopmentBanner />
      <MainContent />
      <CreatePostButton />
    </div>
  );
};

export default HomePage;
