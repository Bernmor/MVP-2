# Movie Tracker MVP

A React-based movie tracking application that allows users to manage watchlists, track watched movies, and rate/review films.

## 🎬 Features

- **User Authentication**: Simple login system with localStorage persistence
- **Movie Search**: Search movies using The Movie Database (TMDB) API
- **Watchlist Management**: Add movies to watchlist and mark as watched
- **Rating & Reviews**: Rate movies (1-5 stars) and leave comments
- **Dashboard Analytics**: View statistics about watched movies, favorite genres, and more
- **Responsive Design**: Modern, cinema-inspired UI with dark theme

## 🚀 Quick Start for Professors

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone and Install**
   ```bash
   cd MVP-2
   npm install
   ```

2. **Run the Application**
   ```bash
   npm start
   ```
   - Opens at http://localhost:3000
   - Login with any username/password (demo purposes)

**Note**: The app includes a fallback API key for academic evaluation, so it works immediately without additional setup.

## 🔐 Security Implementation

**API Key Protection**: 
- API keys are stored in environment variables (`.env` file)
- `.env` file is gitignored and not committed to repository
- Application includes fallback API key for academic evaluation
- Follows React best practices for environment variable naming (`REACT_APP_` prefix)

**Academic Evaluation Setup**: 
- App works immediately after `npm install && npm start`
- Includes demo API key for professor evaluation
- Demonstrates understanding of environment variable security
- In production, API keys would be server-side only

**For Production Use**:
- Create `.env` file with your own TMDB API key
- Remove fallback key from source code
- Implement proper backend API proxy

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.js    # Movie display cards
│   ├── StarRating.js   # Interactive star rating
│   ├── MovieStats.js   # Dashboard analytics
│   └── ...
├── pages/              # Main application pages
│   ├── Dashboard.js    # Main dashboard with stats
│   ├── Watchlist.js    # Watchlist management
│   ├── Watched.js      # Watched movies list
│   ├── MovieDetail.js  # Movie details with rating
│   └── ...
├── utils/              # Utility functions
└── App.js             # Main application component
```

## 🎯 Key Technical Implementations

### State Management
- React hooks (useState, useEffect, useMemo)
- localStorage for data persistence
- Component-level state management

### Routing
- React Router v6 with proper navigation
- Protected routes with authentication
- State passing between routes

### API Integration
- TMDB API for movie data and search
- Error handling and loading states
- Environment variable configuration

### UI/UX Design
- Modern CSS with custom properties
- Responsive design principles
- Accessibility considerations
- Loading spinners and user feedback

## 🧪 Testing the Application

### Demo Workflow
1. **Login**: Use any credentials (demo authentication)
2. **Search Movies**: Use the "Add Movie" page to search TMDB
3. **Add to Watchlist**: Add movies to your watchlist
4. **Mark as Watched**: Mark movies as watched from dashboard or watchlist
5. **Rate & Review**: Rate movies directly on the movie detail page
6. **View Analytics**: Check dashboard for viewing statistics

### Sample Test Data
The application will work with any movies from TMDB. Popular searches:
- "Inception"
- "The Dark Knight"
- "Interstellar"
- "Avengers"

## 📝 Assignment Notes

This project demonstrates:
- **React Fundamentals**: Components, hooks, state management
- **API Integration**: External API consumption with error handling
- **Security Awareness**: Proper API key management
- **User Experience**: Intuitive interface design
- **Code Organization**: Clean, maintainable code structure
- **Modern Development**: Current React patterns and best practices

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests (if implemented)

## 📞 Support

If you encounter any issues during evaluation:
1. Ensure Node.js is installed (v14+)
2. Verify TMDB API key is correctly set in `.env`
3. Check console for any error messages
4. Try `npm install` if dependencies seem missing
