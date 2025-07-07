import { useNavigate, Link } from 'react-router-dom';

const WatchlistItem = ({ movie, onRemove, showToast, onUpdate }) => {
    const navigate = useNavigate();

    const handleMarkWatched = () => {
        const watched = JSON.parse(localStorage.getItem('watched') || '[]');
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

        const watchedMovie = {
            ...movie,
            dateWatched: new Date().toISOString(),
            userRating: 0,
            userComment: ''
        };

        watched.push(watchedMovie);
        const updatedWatchlist = watchlist.filter(item => item.id !== movie.id);

        localStorage.setItem('watched', JSON.stringify(watched));
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));

        showToast('Movie marked as watched', 'Success');
        
        navigate(`/movie/${movie.id}`, { state: { from: '/watchlist' } });
        
        // Call onUpdate after navigation to avoid interference
        setTimeout(() => onUpdate(), 100);
    };

    return (
        <div className="list-item-card">
            <div className="list-item-header">
                <h5 className="list-item-title">{movie.title}</h5>
                <div className="list-item-date">
                    Added: {new Date(movie.dateAdded).toLocaleDateString()}
                </div>
            </div>
            <div className="list-item-body">
                <div className="list-item-poster">
                    <img
                        src={movie.poster_path ?
                            `https://image.tmdb.org/t/p/w200${movie.poster_path}` :
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                        }
                        alt={movie.title}
                    />
                </div>
                <div className="list-item-content">
                    <div className="list-item-meta">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'} •
                        {movie.genres && movie.genres.length > 0 ? movie.genres.slice(0, 2).join(', ') : 'Unknown'}
                    </div>
                    <div className="list-item-actions">
                        <Link 
                            to={`/movie/${movie.id || movie.imdbID}`} 
                            state={{ from: '/watchlist' }}
                            className="btn btn-sm btn-outline-secondary"
                        >
                            <i className="fas fa-info-circle me-1"></i> Details
                        </Link>
                        <button className="btn btn-sm btn-success" onClick={handleMarkWatched}>
                            <i className="fas fa-check-circle me-1"></i> Watched it
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(movie.id)}>
                            <i className="fas fa-trash me-1"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchlistItem;