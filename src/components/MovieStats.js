import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MovieStats() {
    const [stats, setStats] = useState({
        totalWatched: 0,
        watchedThisWeek: 0,
        watchedThisMonth: 0,
        averageRating: 0,
        favoriteGenres: [],
        totalWatchlist: 0,
        mostProductiveDay: '',
        ratedMovies: 0
    });

    useEffect(() => {
        calculateStats();
    }, []);

    const calculateStats = () => {
        const watched = JSON.parse(localStorage.getItem('watched') || '[]');
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        
        // Debug: Log the first watched movie to see its structure
        if (watched.length > 0) {
            console.log('Sample watched movie:', watched[0]);
        }

        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Basic counts
        const totalWatched = watched.length;
        const totalWatchlist = watchlist.length;

        // Time-based statistics
        const watchedThisWeek = watched.filter(movie => 
            new Date(movie.dateWatched) >= oneWeekAgo
        ).length;

        const watchedThisMonth = watched.filter(movie => 
            new Date(movie.dateWatched) >= oneMonthAgo
        ).length;

        // Rating statistics
        const ratedMovies = watched.filter(movie => movie.userRating > 0);
        const averageRating = ratedMovies.length > 0 
            ? (ratedMovies.reduce((sum, movie) => sum + movie.userRating, 0) / ratedMovies.length).toFixed(1)
            : 0;

        // Genre analysis - handle both TMDB API formats
        const genreCount = {};
        
        // TMDB Genre ID to Name mapping (common genres)
        const genreMap = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
            99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
            10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        
        watched.forEach(movie => {
            // Handle detailed genre objects (from movie detail API)
            if (movie.genres && Array.isArray(movie.genres)) {
                movie.genres.forEach(genre => {
                    const genreName = typeof genre === 'string' ? genre : genre.name;
                    if (genreName) {
                        genreCount[genreName] = (genreCount[genreName] || 0) + 1;
                    }
                });
            }
            // Handle genre_ids array (from search API)
            else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
                movie.genre_ids.forEach(genreId => {
                    const genreName = genreMap[genreId];
                    if (genreName) {
                        genreCount[genreName] = (genreCount[genreName] || 0) + 1;
                    }
                });
            }
        });

        const favoriteGenres = Object.entries(genreCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([genre, count]) => ({ genre, count }));

        // Most productive day analysis
        const dayCount = {};
        watched.forEach(movie => {
            const day = new Date(movie.dateWatched).toLocaleDateString('en-US', { weekday: 'long' });
            dayCount[day] = (dayCount[day] || 0) + 1;
        });

        const mostProductiveDay = Object.entries(dayCount)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'No data';

        setStats({
            totalWatched,
            watchedThisWeek,
            watchedThisMonth,
            averageRating,
            favoriteGenres,
            totalWatchlist,
            mostProductiveDay,
            ratedMovies: ratedMovies.length
        });
    };

    const StatCard = ({ icon, title, value, subtitle, color = 'primary' }) => (
        <div className="col-md-6 col-lg-3 mb-3">
            <div className="card h-100">
                <div className="card-body text-center">
                    <div className={`text-${color} mb-2`}>
                        <i className={`${icon} fa-2x`}></i>
                    </div>
                    <h3 className="card-title mb-1">{value}</h3>
                    <p className="card-text text-muted mb-0">{title}</p>
                    {subtitle && <small className="text-muted">{subtitle}</small>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="movie-stats mb-4">
            <h2 className="mb-4">
                <i className="fas fa-chart-bar me-2"></i>
                Your Movie Statistics
            </h2>

            {/* Main Statistics Cards */}
            <div className="row mb-4">
                <StatCard
                    icon="fas fa-film"
                    title="Total Watched"
                    value={stats.totalWatched}
                    color="success"
                />
                <StatCard
                    icon="fas fa-calendar-week"
                    title="This Week"
                    value={stats.watchedThisWeek}
                    subtitle={`${stats.watchedThisWeek > 0 ? 'Keep it up!' : 'Time to watch something!'}`}
                    color="info"
                />
                <StatCard
                    icon="fas fa-calendar-alt"
                    title="This Month"
                    value={stats.watchedThisMonth}
                    color="warning"
                />
                <StatCard
                    icon="fas fa-bookmark"
                    title="In Watchlist"
                    value={stats.totalWatchlist}
                    subtitle={`${stats.totalWatchlist > 0 ? 'Ready to watch!' : 'Add some movies!'}`}
                    color="secondary"
                />
            </div>

            {/* Detailed Statistics */}
            <div className="row">
                {/* Rating Statistics */}
                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-star me-2"></i>
                                Rating Statistics
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row text-center">
                                <div className="col-6">
                                    <h4 className="text-warning">{stats.averageRating}</h4>
                                    <small className="text-muted">Average Rating</small>
                                </div>
                                <div className="col-6">
                                    <h4 className="text-info">{stats.ratedMovies}</h4>
                                    <small className="text-muted">Movies Rated</small>
                                </div>
                            </div>
                            {stats.averageRating > 0 && (
                                <div className="mt-3">
                                    <div className="progress">
                                        <div 
                                            className="progress-bar bg-warning" 
                                            style={{ width: `${(stats.averageRating / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <small className="text-muted">
                                        {stats.averageRating >= 4 ? 'Great taste!' : 
                                         stats.averageRating >= 3 ? 'Good choices!' : 
                                         'Room for better picks!'}
                                    </small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Favorite Genres */}
                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-heart me-2"></i>
                                Favorite Genres
                            </h5>
                        </div>
                        <div className="card-body">
                            {stats.favoriteGenres.length > 0 ? (
                                <div>
                                    {stats.favoriteGenres.map((item, index) => (
                                        <div key={item.genre} className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-bold">
                                                {index === 0 && <i className="fas fa-crown text-warning me-1"></i>}
                                                {item.genre}
                                            </span>
                                            <span className="badge bg-primary">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-muted mb-2">
                                        <i className="fas fa-info-circle me-1"></i>
                                        {stats.totalWatched > 0 
                                            ? 'Genre data not available for your movies' 
                                            : 'Watch more movies to see your favorite genres!'}
                                    </p>
                                    {stats.totalWatched > 0 && (
                                        <small className="text-muted">
                                            Try adding movies from the search page for better genre tracking
                                        </small>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Watching Habits */}
                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-clock me-2"></i>
                                Watching Habits
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <h4 className="text-success">{stats.mostProductiveDay}</h4>
                                <small className="text-muted">Most Active Day</small>
                            </div>
                            {stats.totalWatched > 0 && (
                                <div className="mt-3">
                                    <small className="text-muted">
                                        {stats.watchedThisWeek > stats.watchedThisMonth / 4 
                                            ? "You're on a roll this week! 🔥" 
                                            : "Maybe it's time for a movie night? 🍿"}
                                    </small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">
                                <i className="fas fa-rocket me-2"></i>
                                Quick Actions
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <Link to="/add-movie" className="btn btn-primary btn-sm">
                                    <i className="fas fa-plus me-1"></i>
                                    Add New Movie
                                </Link>
                                <Link to="/watchlist" className="btn btn-outline-secondary btn-sm">
                                    <i className="fas fa-list me-1"></i>
                                    View Watchlist ({stats.totalWatchlist})
                                </Link>
                                <Link to="/watched" className="btn btn-outline-success btn-sm">
                                    <i className="fas fa-check me-1"></i>
                                    View Watched ({stats.totalWatched})
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}