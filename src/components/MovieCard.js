import { useNavigate, Link } from 'react-router-dom';

export default function MovieCard ({ movie, showToast, onUpdate }) {
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
        
        navigate(`/movie/${movie.id}`, { state: { from: '/dashboard' } });
        
        // Call onUpdate after navigation to avoid interference
        if (onUpdate) {
            setTimeout(() => onUpdate(), 100);
        }
    };

    return (
        <div className="movie-card">
                <Link 
                    to={`/movie/${movie.id || movie.imdbID}`} 
                    state={{ from: '/dashboard' }}
                    className="text-decoration-none"
                >
                <div className="movie-poster-container">
                    <img
                        src={movie.poster_path ?
                            `https://image.tmdb.org/t/p/w300${movie.poster_path}` :
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                        }
                        alt={movie.title}
                        className="img-fluid"
                    />
                </div>
                <div className="movie-card-body">
                    <h5 className="movie-card-title">{movie.title}</h5>
                    <div className="movie-card-meta">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
                    </div>
                </div>
                </Link>
            <div className="movie-card-actions">
                <button className="btn btn-sm btn-outline-success" onClick={handleMarkWatched}>
                    <i className="fas fa-check-circle me-1"></i> Watched it
                </button>
            </div>
        </div>
    );
};