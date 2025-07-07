import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WatchlistItem from '../components/WatchlistItem';

const Watchlist = ({ showToast, setLoading }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        loadWatchlist();
    }, []);

    const loadWatchlist = () => {
        const data = JSON.parse(localStorage.getItem('watchlist') || '[]');
        setWatchlist(data);
    };

    const removeFromWatchlist = (movieId) => {
        if (!window.confirm('Remove this movie from your watchlist?')) return;

        const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        setWatchlist(updatedWatchlist);
        showToast('Movie removed from watchlist', 'Success');
    };

    return (
        <div className="watchlist-view">
            <h1 className="mb-4">Your Watchlist</h1>

            <div className="mb-4">
                <Link to="/add-movie" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>Add Movie to Watchlist
                </Link>
            </div>

            <div className="row g-4">
                {watchlist.length === 0 ? (
                    <div className="col-12">
                        <div className="empty-state">
                            <i className="fas fa-film"></i>
                            <h4 className="mt-3">Your watchlist is empty</h4>
                            <p className="empty-state-text">Add some movies to watch later!</p>
                        </div>
                    </div>
                ) : (
                    watchlist.map((movie) => (
                        <div key={movie.id} className="col-md-6">
                            <WatchlistItem
                                movie={movie}
                                onRemove={removeFromWatchlist}
                                showToast={showToast}
                                onUpdate={loadWatchlist}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Watchlist;