import React from "react";
import { Card } from "../ui";

const ProfileNotFound = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Card className="p-8 text-center max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        User not found
      </h2>
      <p className="text-gray-600">
        The profile you're looking for doesn't exist or has been removed.
      </p>
    </Card>
  </div>
);

export default ProfileNotFound;
