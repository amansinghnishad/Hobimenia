# Hobimenia Client (Frontend)

The client/ folder contains the frontend code for Hobimenia, built with React and Vite. It provides a modern, responsive user interface for discovering, sharing, and collaborating on hobbies.

## Folder Structure

```
client/
├── public/
│   └── assets/           # Static assets (SVGs, MP4s, images)
├── src/
│   ├── api/              # Axios instance for API requests
│   ├── components/       # Reusable UI components (Navbar, Footer, PostCard, etc.)
│   ├── contexts/         # React Contexts (e.g., AuthContext)
│   ├── css/              # CSS Modules for components and pages
│   │   ├── componentCSS/ # Styles for individual components
│   │   └── pagesCSS/     # Styles for page components
│   ├── pages/            # Page-level components (Home, Login, Profile, etc.)
│   ├── services/         # API and authentication logic
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── vercel.json           # Vercel deployment config
```

## Key Components

- **Navbar.jsx**: Top navigation bar for site navigation.
- **Footer.jsx**: Footer with site info and links.
- **PostCard.jsx**: Displays individual posts with images, text, and user info.
- **PostFeed.jsx**: Shows a list of posts in a feed layout.
- **ProfileCard.jsx**: User profile summary with avatar and details.
- **CommentSection.jsx**: Allows users to view and add comments to posts.
- **AIHelperButton.jsx**: Integrates AI-powered suggestions for content creation.
- **ImageUploader.jsx**: Handles image uploads to Cloudinary.

## Pages

- **HomePage.jsx**: Landing page with featured content and posts.
- **LoginPage.jsx / SignupPage.jsx**: User authentication pages.
- **ProfilePage.jsx**: User profile and their posts.
- **CreatePostPage.jsx / EditPostPage.jsx**: Forms for creating and editing posts.
- **PostDetailPage.jsx**: Detailed view of a single post with comments.

## Styling

- CSS is organized into `componentCSS` (for individual components) and `pagesCSS` (for full pages).
- All styles are modular and scoped to their respective components/pages.

## Assets

- Located in `public/assets/`.
- Includes SVGs for illustrations and MP4s for feature highlights (e.g., AboutMe.mp4, collaboratefeature.svg).

### Example: PostCard Component

![PostCard Example](../public/assets/sharePassion.svg)

The PostCard component displays a post with an image, title, description, and user info. It uses styles from `PostCard.css` and assets from the `assets/` folder.

---

For more details, see the main [README.md](../README.md) in the project root.
