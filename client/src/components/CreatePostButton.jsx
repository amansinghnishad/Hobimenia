// CreatePostButton component
import { useNavigate } from "react-router-dom";
import "../css/componentCSS/CreatePostButton.css";

const CreatePostButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="create-post-btn"
      onClick={() => navigate("/create-post")}
      title="Create Post"
      aria-label="Create Post"
    >
      <span className="-mt-1">+</span>
    </button>
  );
};

export default CreatePostButton;
