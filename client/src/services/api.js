import axiosInstance from '../api/axios';

// API service functions

// Post API functions
export const getPosts = async (category = '') => {
  try {
    const response = await axiosInstance.get(`/posts${category ? `?category=${category}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${postId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post('/posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating post ${postId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post ${postId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const toggleLikePost = async (postId) => {
  try {
    const response = await axiosInstance.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling like for post ${postId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Comment API functions
export const getCommentsByPost = async (postId) => {
  try {
    const response = await axiosInstance.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createComment = async (postId, text) => {
  try {
    const response = await axiosInstance.post('/comments', { postId, text });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// User API functions
export const getUserProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile ${userId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axiosInstance.put(`/users/profile/${userId}`, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data', // If handling image uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile ${userId}:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Notification API functions
export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axiosInstance.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${notificationId} as read:`, error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axiosInstance.patch('/notifications/read-all');
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


// Contact Us API function
export const submitContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post('/contact/submit', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// AI Helper API function
export const getAIResponse = async (prompt) => {
  try {
    const response = await axiosInstance.post('/ai/generate-text', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error getting AI response:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
