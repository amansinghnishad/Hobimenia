# Hobimenia Server (Backend)

The server/ folder contains the backend code for Hobimenia, built with Node.js and Express. It provides RESTful APIs, handles authentication, manages data storage, and integrates AI-powered features.

## Folder Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection setup
├── controllers/
│   ├── aiController.js    # AI feature logic (Gemini integration)
│   ├── authController.js  # User authentication logic
│   ├── commentController.js # Comment CRUD logic
│   ├── postController.js  # Post CRUD logic
│   └── userController.js  # User profile logic
├── middlewares/
│   ├── authMiddleware.js  # JWT authentication middleware
│   └── uploadMiddleware.js # File upload handling (Cloudinary)
├── models/
│   ├── Comment.js         # Mongoose schema for comments
│   ├── Post.js            # Mongoose schema for posts
│   └── User.js            # Mongoose schema for users
├── routes/
│   ├── aiRoutes.js        # AI-related API routes
│   ├── authRoutes.js      # Auth API routes
│   ├── commentRoutes.js   # Comment API routes
│   ├── postRoutes.js      # Post API routes
│   └── userRoutes.js      # User API routes
├── utils/
│   ├── cloudinary.js      # Cloudinary upload utility
│   └── gemini.js          # Gemini AI utility
├── server.js              # Main Express app entry point
├── package.json           # Backend dependencies and scripts
└── README.md              # This file
```

## Key Features

- **RESTful API**: Provides endpoints for posts, comments, users, and authentication.
- **Authentication**: JWT-based user authentication and protected routes.
- **Database**: MongoDB for persistent storage, managed via Mongoose models.
- **Media Uploads**: Handles image/video uploads using Cloudinary.
- **AI Integration**: Uses Gemini for AI-powered content suggestions and features.
- **Middleware**: Custom middleware for authentication and file uploads.

## Main Files

- **server.js**: Initializes Express app, connects to MongoDB, sets up middleware, and mounts all routes.
- **config/db.js**: Handles MongoDB connection logic.
- **controllers/**: Contains business logic for each resource (posts, users, comments, auth, AI).
- **models/**: Mongoose schemas for data validation and structure.
- **routes/**: Defines API endpoints and links them to controllers.
- **middlewares/**: Contains reusable middleware for authentication and uploads.
- **utils/**: Utility functions for Cloudinary and Gemini AI integration.

## API Overview

- **/api/auth/**: Signup, login, and authentication endpoints.
- **/api/posts/**: CRUD operations for posts.
- **/api/comments/**: CRUD operations for comments.
- **/api/users/**: User profile and management endpoints.
- **/api/ai/**: AI-powered features (e.g., content suggestions).

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance
- Cloudinary account (for media uploads)
- Gemini API key (for AI features)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables (MongoDB URI, JWT secret, Cloudinary keys, Gemini API key).
3. Start the server:
   ```bash
   npm start
   ```

The server will run on the port specified in your environment variables (default: 5000).

## License
MIT
