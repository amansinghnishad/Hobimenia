// CreatePostButton component
import { useNavigate } from "react-router-dom";

const CreatePostButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl hover:bg-blue-700 transition"
      onClick={() => navigate("/create-post")}
      title="Create Post"
    >
      +
    </button>
  );
};

export default CreatePostButton;
