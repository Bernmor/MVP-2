import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import MovieStats from '../components/MovieStats';

const Dashboard = ({ showToast, setLoading }) => {
    const [stats, setStats] = useState({
        watchlistCount: 0,
        watchedCount: 0,
        recentMovies: [],
        watchlistPreview: []
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const watched = JSON.parse(localStorage.getItem('watched') || '[]');

        const recentMovies = watched
            .sort((a, b) => new Date(b.dateWatched) - new Date(a.dateWatched))
            .slice(0, 5);

        const watchlistPreview = watchlist.slice(0, 4);

        setStats({
            watchlistCount: watchlist.length,
            watchedCount: watched.length,
            recentMovies,
            watchlistPreview
        });
    };

    return (
        <div className="dashboard-view">
            <h1 className="mb-4">Your Movie Dashboard</h1>

            {/* Movie Statistics Section */}
            <MovieStats />

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="stat-card">
                        <div className="stat-value">{stats.watchlistCount}</div>
                        <div className="stat-label">In Watchlist</div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="stat-card">
                        <div className="stat-value">{stats.watchedCount}</div>
                        <div className="stat-label">Movies Watched</div>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Your Watchlist</h5>
                    <div>
                        <Link to="/add-movie" className="btn btn-sm btn-primary me-2">
                            <i className="fas fa-plus me-1"></i>Add Movie
                        </Link>
                        <Link to="/watchlist" className="btn btn-sm btn-outline-primary">View All</Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row g-4">
                        {stats.watchlistPreview.length === 0 ? (
                            <div className="col-12 text-center py-4">
                                <div className="empty-state">
                                    <i className="fas fa-film"></i>
                                    <h4 className="mt-3">Your watchlist is empty</h4>
                                    <p className="empty-state-text">Add some movies to watch later!</p>
                                </div>
                            </div>
                        ) : (
                            stats.watchlistPreview.map((movie) => (
                                <div key={movie.id} className="col-sm-6 col-md-3">
                                    <MovieCard movie={movie} showToast={showToast} onUpdate={loadDashboardData} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Recently Watched</h5>
                            <Link to="/watched" className="btn btn-sm btn-outline-primary">View All</Link>
                        </div>
                        <div className="card-body">
                            {stats.recentMovies.length === 0 ? (
                                <div className="empty-state">
                                    <i className="fas fa-film"></i>
                                    <h4 className="mt-3">No movies watched yet</h4>
                                    <p className="empty-state-text">Start watching some movies!</p>
                                </div>
                            ) : (
                                stats.recentMovies.map((movie) => (
                                    <div key={movie.id} className="recent-item">
                                        <div>
                                            <div className="recent-item-title">
                                                <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                                                    {movie.title}
                                                </Link>
                                            </div>
                                            <div className="recent-item-date">
                                                {new Date(movie.dateWatched).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {movie.rating && (
                                            <div className="recent-item-rating">
                                                {'★'.repeat(movie.rating)}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;