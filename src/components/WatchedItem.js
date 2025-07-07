import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const WatchedItem = ({ movie, onRemove }) => {
    return (
        <div className="list-item-card">
            <div className="list-item-header">
                <h5 className="list-item-title">{movie.title}</h5>
                <div className="list-item-date">
                    Watched: {new Date(movie.dateWatched).toLocaleDateString()}
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
                    {movie.userRating > 0 && (
                        <div className="watched-rating mb-2">
                            <StarRating rating={movie.userRating} readOnly={true} />
                        </div>
                    )}
                    {movie.userComment && (
                        <div className="watched-notes mb-2">
                            <small className="text-muted">Your review:</small>
                            <p className="mb-0">{movie.userComment}</p>
                        </div>
                    )}
                    <div className="list-item-actions mt-2">
                        <Link to={`/movie/${movie.id || movie.imdbID}`} state={{ from: '/watched' }} className="btn btn-sm btn-outline-secondary">
                            <i className="fas fa-info-circle me-1"></i> Details
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(movie.id)}>
                            <i className="fas fa-trash me-1"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchedItem;