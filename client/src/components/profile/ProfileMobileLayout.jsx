import React from "react";
import { motion } from "framer-motion";
import ProfileStats from "./ProfileStats";
import ProfileBioInterests from "./ProfileBioInterests";
import ProfilePostsGrid from "./ProfilePostsGrid";

const ProfileMobileLayout = ({
  profile,
  posts,
  loadingPosts,
  onPostDeleted,
  currentUser,
  isEditingProfile,
  tempBio,
  setTempBio,
  tempInterests,
  setTempInterests,
  onSaveProfile,
  onCancelEdit,
  onEditProfile,
}) => (
  <div className="lg:hidden space-y-4 sm:space-y-6 pt-6 sm:pt-8 pb-8 sm:pb-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="px-1 sm:px-0"
    >
      <ProfileStats profile={profile} postsCountFromParent={posts.length} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="px-1 sm:px-0"
    >
      <ProfileBioInterests
        profile={profile}
        currentUser={currentUser}
        isEditingProfile={isEditingProfile}
        tempBio={tempBio}
        setTempBio={setTempBio}
        tempInterests={tempInterests}
        setTempInterests={setTempInterests}
        onSaveProfile={onSaveProfile}
        onCancelEdit={onCancelEdit}
        onEditProfile={onEditProfile}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="px-1 sm:px-0"
    >
      <ProfilePostsGrid
        username={profile.username}
        posts={posts}
        loadingPosts={loadingPosts}
        onPostDeleted={onPostDeleted}
      />
    </motion.div>
  </div>
);

export default ProfileMobileLayout;
