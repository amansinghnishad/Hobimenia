import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async () => {
    if (!input.trim()) return;
    try {
      const res = await api.post(`/comments/${postId}`, { text: input });
      setComments([...comments, res.data]);
      setInput("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.map((c) => (
        <div key={c._id} className="border-b py-2">
          <p className="text-sm font-semibold">{c.user.username}</p>
          <p className="text-gray-700">{c.text}</p>
        </div>
      ))}

      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
