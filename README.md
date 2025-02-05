# SocialApp - Modern Social Media Application

A modern social media application built with React, TypeScript, Firebase, Supabase, and GraphQL. This application allows users to create accounts, share posts, mention other users, and interact with content in real-time.

## Features

### Authentication
- Custom email/password registration and login
- Username selection during registration
- Secure authentication using Firebase
- User data synchronization with Supabase

### Posts and Content
- Create text posts with image attachments
- Real-time feed updates
- Rich text formatting
- User mentions using @ symbol
- Image upload and preview

### User Interface
- Modern, responsive design
- Clean and intuitive user experience
- Real-time username suggestions when mentioning
- Loading states and error handling
- Profile picture support with fallback avatars

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS for styling
- Apollo Client for GraphQL

### Backend & Services
- Firebase Authentication
- Supabase for user data
- GraphQL for API queries
- PostgreSQL database (via Supabase)

## Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/socialapp.git
cd socialapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory with the following variables:
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server**
```bash
npm start
```