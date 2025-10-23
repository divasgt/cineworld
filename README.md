# 🎬 CineWorld

CineWorld is your one-stop website made for cinema enthusiasts exploring the vast universe of movies and TV shows. Discover latest blockbusters to timeless classics, manage your watchlists, and even chat with an AI cinebot for finding perfect recommendations!

### 🔗 Live Link: https://cineworld-app.vercel.app/


## 🚀 Tech Stack

*   **Frontend**: [Next.js](https://nextjs.org/), [React.js](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
*   **API Integration**: [TMDB API](https://www.themoviedb.org/documentation/api) (for content data), [Google Gemini API](https://ai.google.dev/) (for AI features)
*   **Authentication & Database**: [Supabase](https://supabase.com/) (for user authentication, and user lists storage)
*   **Deployment**: [Vercel](https://vercel.com/)
*   **Style**: [Tailwind CSS](https://tailwindcss.com)

## ✨ Core Features

### 🎥📺 Movie & TV Show Exploration
*   **Dynamic Layouts**: Content displayed in dynamic grid and horizontal layouts.
*   **Comprehensive Data**: Utilizes the TMDB API to fetch extensive media information.
*   **Homepage Sections**: Dedicated sections for trending, popular, and top-rated movies and TV shows.
*   **Loading Skeletons**: Enhanced user experience with global loading skeletons.
*   **Global Error Handling**: Graceful error handling with dedicated error pages.
*   **Toast Notifications**: Informative toast popups for user actions.
*   **Fully Responsive**: Optimized for seamless viewing across all devices, including a separate header for mobile screens.

### 🔍 Search Implementation
*   **Responsive Search Bar**: Features a debounced search bar to optimize API calls.
*   **Live Search Results**: Displays real-time search results as the user types.
*   **Robust Handling**: Includes loading states and error handling for search queries.

### 📄 Media's Details Pages
*   **Dynamic Routing**: Dedicated pages for individual movie and TV show details.
*   **Rich Information**: Displays release year, length/number of seasons, star rating, age rating, genres, overview, creators, directors, writers, and similar content recommendations.
*   **Trailer Playback**: Integrated [YouTube API](https://developers.google.com/youtube/v3) for playing trailers in a modal.
*   **Streaming Options**: Shows available streaming platforms with direct links.
*   **Cast Section**: Horizontal cast section, initially loading 15 cast members with an option to "show all".

### 🔒👤 User Authentication & Personalization
*   **Secure Authentication**: Implemented using [Supabase](https://supabase.com/) for secure sign-in and sign-up.
*   **Form Validation**: Sign-in and sign-up forms with comprehensive error checks.
*   **Dynamic Header**: Sign-in button dynamically changes to a profile photo icon and sign-out button upon successful authentication.
*   **Persistent Sessions**: Maintains user sessions across visits.
*   **Email Verification**: Sends confirmation emails for user verification, with dynamic instant sign-in upon redirection to the app.
*   **Protected Routes**: Ensures only authenticated users can access certain parts of the application.

### 🔖📝 Watchlist Feature
*   **Personalized Lists**: Users can add content to a watchlist, mark as watched, and view their history.
*   **Supabase Integration**: All user lists are managed and stored using [Supabase](https://supabase.com/).
*   **Toggle Functionality**: Easy add/remove functionality for watchlist and watched items.
*   **Dynamic UI**: Button icons and text change upon interaction, accompanied by toast popups (e.g., "Added to watchlist" with a link to the watchlist page).
*   **Persistent Storage**: Watchlist data is stored persistently across user sessions.
*   **Categorized Lists**: Separate sections for movies and TV shows within watchlist, watched, and history pages.

### 🤖💡 Cinema AI Integration
*   **Google Gemini API**: Integrated for an interactive Cinema AI chat page.
*   **Intelligent Recommendations**: Users can chat with the AI to ask cinema-related questions or get personalized recommendations.
*   **Robust System Instructions**: Utilizes detailed system instructions for accurate and relevant AI responses.
*   **Recommendation Cards**: AI recommendations are presented in a card format, linking directly to their respective details pages (fetched via TMDB API).
*   **Error Handling**: Provides links to search by content name if TMDB data cannot be found for an AI recommendation.
*   **Context Preservation**: Maintains chat context for a more natural conversation flow.
*   **Guest Limitations**: Unauthenticated users are limited to 3 AI queries.
*   **Rate Limiting**: Implemented to manage API usage efficiently.

### 🎨✨ UI/UX Features
*   **Responsive Design**: Built with [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) and [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) for optimal viewing on any screen size.
*   **Custom Loading Skeletons**: Enhances user experience during data fetching.
*   **Smooth Animations**: Seamless state transitions for a polished feel.
*   **Error Boundaries**: Graceful error handling to prevent app crashes.
*   **Toast Notifications**: Provides timely feedback for user actions.

### 🚀⚡ Performance Optimizations
*   **Image Optimization**: Utilizes image optimization and lazy loading techniques.
*   **Code Splitting**: Improves initial load times by splitting code into smaller chunks.
*   **React `useMemo`**: Leverages `useMemo` for memoizing expensive computations.
*   **Error Boundaries**: Implemented for robust error handling and improved stability.

### 🔌🌐 API Integration
*   **Custom Hooks**: Developed custom hooks for streamlined API calls.
*   **Comprehensive Error Handling**: Robust error handling for all API interactions.
*   **Retry Logic**: Implemented retry mechanisms for failed requests.
*   **Rate Limiting**: Manages API usage to prevent hitting rate limits.
*   **Data Caching**: Strategies for efficient data caching.
*   **Efficient State Management**: Optimized state management for API data.

### ✨➕ Additional Features
*   **Custom Hooks**: Reusable custom hooks for common functionalities.
*   **Loading States**: Clear loading indicators for all asynchronous operations.
*   **Cross-Browser Compatibility**: Tested for consistent performance across various browsers.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
