import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      className="hover:bg-white/80 mb-4"
    >
      <FaArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
};

export default BackButton;
