import React from "react";
import { Card, Avatar } from "../ui";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

const PostHeader = ({ author, createdAt, category }) => {
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            src={author?.profilePic}
            alt={author?.username}
            size="lg"
            fallback={author?.username?.[0]?.toUpperCase() || "?"}
          />
          <div>
            <h3 className="font-semibold text-gray-900">@{author?.username}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FaCalendarAlt className="w-3 h-3" />
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {category && (
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            <FaTag className="w-3 h-3" />
            {category}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
