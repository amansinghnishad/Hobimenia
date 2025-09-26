import React from "react";
import { Loader } from "../ui";

const ProfilePageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <Loader variant="spinner" />
  </div>
);

export default ProfilePageLoader;
