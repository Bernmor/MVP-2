import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import StarRating from '../components/StarRating';

const MovieDetail = ({ showToast, setLoading }) => {
    const { id: movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [userStatus, setUserStatus] = useState({ inWatchlist: false, isWatched: false });
    const [watchedMovie, setWatchedMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isEditingReview, setIsEditingReview] = useState(false);
    const loadingRef = useRef(false);
    const currentMovieId = useRef(null);

    const backButtonInfo = useMemo(() => {
        const referrer = location.state?.from || document.referrer;
        
        if (referrer.includes('/add-movie')) {
            return { text: 'Back to Add Movie', path: '/add-movie' };
        } else if (referrer.includes('/watched')) {
            return { text: 'Back to Watched', path: '/watched' };
        } else if (referrer.includes('/dashboard')) {
            return { text: 'Back to Dashboard', path: '/dashboard' };
        } else {
            return { text: 'Back to Watchlist', path: '/watchlist' };
        }
    }, [location.state?.from]);

    const handleSaveRating = useCallback((newRating, newComment) => {
        try {
            const watched = JSON.parse(localStorage.getItem('watched') || '[]');
            const updatedWatched = watched.map(m => {
                if (String(m.id) === String(movieId) || String(m.imdbID) === String(movieId)) {
                    return {
                        ...m,
                        userRating: newRating,
                        userComment: newComment,
                        reviewDate: new Date().toISOString()
                    };
                }
                return m;
            });

            localStorage.setItem('watched', JSON.stringify(updatedWatched));
            
            // Update the component state with the new values
            setRating(newRating);
            setComment(newComment);
            setWatchedMovie(prev => ({
                ...prev,
                userRating: newRating,
                userComment: newComment,
                reviewDate: new Date().toISOString()
            }));
            setIsEditingReview(false);
            showToast('Rating and review saved successfully!', 'Success');
        } catch (error) {
            showToast('Failed to save rating and review', 'Error');
        }
    }, [movieId, showToast]);

    const loadMovieDetails = useCallback(() => {
        console.log('loadMovieDetails called for movieId:', movieId, 'loadingRef.current:', loadingRef.current);
        // Prevent duplicate calls and ensure we're loading the correct movie
        if (loadingRef.current || !movieId || currentMovieId.current === movieId) {
            console.log('loadMovieDetails early return - already loading or duplicate call');
            return;
        }
        
        // Use environment variable or fallback key for academic evaluation
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '9f2b028ce22af8da1914ab744e3df31c';
        if (!API_KEY) {
            showToast('TMDB API key not configured. Please check your .env file.', 'Error');
            return;
        }
        
        console.log('Starting to load movie details for:', movieId);
        loadingRef.current = true;
        currentMovieId.current = movieId;
        setLoading(true);

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Movie data received for:', movieId, 'currentMovieId:', currentMovieId.current);
                // Only update state if this is still the current movie
                if (currentMovieId.current === movieId) {
                    setMovie(data);
                    console.log('Setting movie data and stopping loading');
                }
                // Immediately stop loading - no setTimeout
                setLoading(false);
                loadingRef.current = false;
            })
            .catch(error => {
                console.error('Error loading movie details:', error);
                showToast('Failed to load movie details', 'Error');
                // Stop loading on error
                console.log('Error occurred, stopping loading');
                setLoading(false);
                loadingRef.current = false;
            });
    }, [movieId, showToast, setLoading]);

    const checkUserStatus = useCallback(() => {
        if (!movieId) return;
        
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const watched = JSON.parse(localStorage.getItem('watched') || '[]');

        const watchedItem = watched.find(item => 
            String(item.id) === String(movieId) || String(item.imdbID) === String(movieId)
        );
        
        setUserStatus({
            inWatchlist: watchlist.some(item => 
                String(item.id) === String(movieId) || String(item.imdbID) === String(movieId)
            ),
            isWatched: !!watchedItem
        });

        if (watchedItem) {
            setWatchedMovie(watchedItem);
            setRating(watchedItem.userRating || 0);
            setComment(watchedItem.userComment || '');
        }
    }, [movieId]);



    useEffect(() => {
        if (movieId) {
            console.log('MovieDetail useEffect triggered for movieId:', movieId);
            // Reset state for new movie
            setMovie(null);
            setUserStatus({ inWatchlist: false, isWatched: false });
            setWatchedMovie(null);
            setRating(0);
            setComment('');
            setIsEditingReview(false);
            
            // Reset loading state
            loadingRef.current = false;
            currentMovieId.current = null;
            
            // Load movie details and check user status
            loadMovieDetails();
            checkUserStatus();
        }
    }, [movieId]); // Remove functions from dependency array to prevent infinite loops

    if (!movie) {
        return <div className="text-center py-5">Loading...</div>;
    }

    return (
        <div className="movie-detail-view">
            <div className="mb-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="btn btn-outline-secondary btn-sm me-2"
                >
                    <i className="fas fa-arrow-left me-1"></i> Back
                </button>
                <Link to={backButtonInfo.path} className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-1"></i> {backButtonInfo.text}
                </Link>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <h1>{movie.title}</h1>
                    <div className="movie-meta">
                        <span className="me-3">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</span>
                        <div className="genre-pills">
                            {movie.genres && movie.genres.map(genre => (
                                <span key={genre.id} className="genre-pill">{genre.name}</span>
                            ))}
                        </div>
                    </div>

                    <p className="movie-description mt-3">{movie.overview}</p>

                    <div className="mb-4">
                        {!userStatus.isWatched && !userStatus.inWatchlist && (
                            <button className="btn btn-primary me-2">
                                <i className="fas fa-bookmark me-1"></i> Add to Watchlist
                            </button>
                        )}

                        {userStatus.inWatchlist && (
                            <div className="alert alert-info">
                                <i className="fas fa-bookmark me-2"></i> This movie is in your watchlist
                            </div>
                        )}

                        {userStatus.isWatched && (
                            <div className="alert alert-success">
                                <i className="fas fa-check-circle me-2"></i> You've watched this movie
                            </div>
                        )}
                    </div>

                    {userStatus.isWatched && (
                        <div className="rating-review-section mt-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Your Rating & Review</h5>
                                    {(rating > 0 || comment) && !isEditingReview && (
                                        <button 
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => setIsEditingReview(true)}
                                        >
                                            <i className="fas fa-edit me-1"></i> Edit
                                        </button>
                                    )}
                                </div>
                                <div className="card-body">
                                    {!isEditingReview && (rating > 0 || comment) ? (
                                        <div>
                                            {rating > 0 && (
                                                <div className="mb-3">
                                                    <strong>Your Rating:</strong>
                                                    <div className="mt-1">
                                                        <StarRating rating={rating} readOnly={true} />
                                                        <span className="ms-2 text-muted">({rating}/5 stars)</span>
                                                    </div>
                                                </div>
                                            )}
                                            {comment && (
                                                <div>
                                                    <strong>Your Review:</strong>
                                                    <p className="mt-2 mb-0">{comment}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <RatingForm 
                                            rating={rating}
                                            comment={comment}
                                            onSave={handleSaveRating}
                                            onCancel={() => setIsEditingReview(false)}
                                            isEditing={isEditingReview}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="movie-poster">
                        <img
                            src={movie.poster_path ?
                                `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                            }
                            alt={movie.title}
                            className="img-fluid rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const RatingForm = ({ rating, comment, onSave, onCancel, isEditing }) => {
    const [localRating, setLocalRating] = useState(rating);
    const [localComment, setLocalComment] = useState(comment);

    // Update local state when props change (for editing existing ratings)
    useEffect(() => {
        setLocalRating(rating);
        setLocalComment(comment);
    }, [rating, comment]);

    const handleSave = () => {
        onSave(localRating, localComment);
    };

    const handleCancel = () => {
        setLocalRating(rating);
        setLocalComment(comment);
        onCancel();
    };

    // Check if there are unsaved changes
    const hasChanges = localRating !== rating || localComment !== comment;

    return (
        <div>
            <div className="mb-3">
                <label className="form-label">Your Rating</label>
                <div>
                    <StarRating
                        rating={localRating}
                        onRatingChange={setLocalRating}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                    Your Review (Optional)
                </label>
                <textarea
                    id="comment"
                    className="form-control"
                    rows="4"
                    value={localComment}
                    onChange={(e) => setLocalComment(e.target.value)}
                    placeholder="Share your thoughts about this movie..."
                />
            </div>

            {hasChanges && (
                <div className="alert alert-info py-2 mb-3">
                    <small><i className="fas fa-info-circle me-1"></i>You have unsaved changes</small>
                </div>
            )}

            <div className="d-flex gap-2">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={localRating === 0}
                >
                    <i className="fas fa-save me-1"></i>
                    {isEditing ? 'Update' : 'Save'} Rating & Review
                </button>
                {isEditing && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;