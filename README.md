# Hobimenia

Hobimenia is a full-stack web application designed to help users discover, share, and collaborate on hobbies and interests. The platform features a modern React frontend and a Node.js/Express backend, with MongoDB for data storage and Cloudinary for media uploads. AI-powered features are integrated for enhanced user experience.

## Features

- User authentication (signup, login, JWT-based sessions)
- Create, edit, and delete posts about hobbies
- Comment on posts and interact with the community
- AI helper for content suggestions
- Media uploads (images, videos)
- Responsive UI with reusable components

## Tech Stack

### Frontend (client/)
- React (with Context API for state management)
- Vite (build tool)
- Axios (API requests)
- CSS Modules for component/page styling
- Deployed with Vercel

### Backend (server/)
- Node.js & Express
- MongoDB (via Mongoose)
- JWT Authentication
- Cloudinary (media uploads)
- AI integration (Gemini)

## Folder Structure

- `client/` - Frontend source code
  - `src/components/` - Reusable UI components
  - `src/pages/` - Page-level components
  - `src/contexts/` - React Contexts
  - `src/services/` - API and auth logic
  - `src/api/` - Axios instance
  - `src/css/` - CSS for components and pages
  - `public/assets/` - Static assets
- `server/` - Backend source code
  - `controllers/` - Route logic
  - `models/` - Mongoose models
  - `routes/` - Express routes
  - `middlewares/` - Auth and upload middleware
  - `utils/` - Utility files (AI, uploads)
  - `config/` - Database config

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Hobimenia
   ```
2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Configure environment variables as needed (e.g., MongoDB URI, JWT secret, Cloudinary keys).
4. Start the backend server:
   ```bash
   npm start
   ```
5. Start the frontend dev server:
   ```bash
   cd ../client
   npm run dev
   ```

## Deployment
- Frontend: Vercel
- Backend: Can be deployed to any Node.js-compatible host

## License
MIT
