import React from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaEdit, FaTag, FaQuoteLeft } from "react-icons/fa";
import { Button, Input, Card } from "../ui";

const ProfileBioInterests = ({
  profile,
  currentUser,
  isEditingProfile,
  tempBio,
  setTempBio,
  tempInterests,
  setTempInterests,
  onSaveProfile,
  onCancelEdit,
}) => {
  if (!profile) return null;
  const isOwnProfile = currentUser?._id === profile._id;
  return isEditingProfile && isOwnProfile ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-2 sm:mx-0"
    >
      <Card className="p-4 sm:p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <FaEdit className="text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaQuoteLeft className="text-gray-400" />
            Bio (Max 250 characters)
          </label>
          <div className="relative">
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              placeholder="Tell us about yourself..."
              maxLength={250}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {tempBio.length}/250
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <FaTag className="text-gray-400" />
            Interests (comma-separated)
          </label>
          <Input
            value={tempInterests}
            onChange={(e) => setTempInterests(e.target.value)}
            placeholder="e.g., Photography, Gaming, Tech"
            className="bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onSaveProfile}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <FaSave className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            onClick={onCancelEdit}
            variant="outline"
            className="hover:bg-gray-50"
          >
            <FaTimes className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </Card>{" "}
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mx-4 sm:mx-0"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        {/* Bio Section */}
        {profile.bio && (
          <motion.div
            className="p-6 border-b border-gray-100/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-900">About</h3>
            </div>
            <div className="relative">
              <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-200 text-lg" />
              <p className="text-gray-700 leading-relaxed pl-4 italic text-base">
                "{profile.bio}"
              </p>
            </div>
          </motion.div>
        )}

        {/* Interests Section */}
        {profile.interests && profile.interests.length > 0 && (
          <motion.div
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mt-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-900">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:shadow-sm transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                >
                  #{interest.trim()}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!profile.bio &&
          (!profile.interests || profile.interests.length === 0) && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                <FaQuoteLeft className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">
                No bio or interests added yet
              </p>
              {isOwnProfile && (
                <button
                  onClick={onEditProfile}
                  className="mt-2 text-blue-600 hover:text-blue-700 underline font-medium transition-colors duration-200"
                >
                  Add your info
                </button>
              )}
            </div>
          )}

        {/* Edit Button for Own Profile */}
        {isOwnProfile &&
          !isEditingProfile &&
          (profile.bio ||
            (profile.interests && profile.interests.length > 0)) && (
            <motion.div
              className="p-4 border-t border-gray-100/50 bg-gray-50/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            ></motion.div>
          )}
      </div>
    </motion.div>
  );
};

export default ProfileBioInterests;
