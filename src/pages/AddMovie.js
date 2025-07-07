import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddMovie = ({ showToast }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const searchMovies = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        // Use environment variable or fallback key for academic evaluation
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '9f2b028ce22af8da1914ab744e3df31c';
        if (!API_KEY) {
            showToast('TMDB API key not configured. Please check your .env file.', 'Error');
            return;
        }

        setSearching(true);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`)
            .then(response => {
                console.log('API Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response data:', data);
                try {
                    // Check if data exists and is an object
                    if (!data || typeof data !== 'object') {
                        console.warn('Invalid data received:', data);
                        showToast('Invalid response from movie database', 'Error');
                        setSearchResults([]);
                        return;
                    }
                    
                    // Check if there's an error in the response
                    if (data.error || data.status_code) {
                        console.error('API error:', data.error || data.status_message);
                        showToast(data.status_message || 'API error occurred', 'Error');
                        setSearchResults([]);
                        return;
                    }
                    
                    // Ensure results is an array
                    const results = Array.isArray(data.results) ? data.results : [];
                    console.log(`Found ${results.length} movies`);
                    setSearchResults(results);
                    
                    if (results.length === 0) {
                        showToast('No movies found for your search', 'Info');
                    }
                    
                } catch (error) {
                    console.error('Error processing search results:', error);
                    showToast('Error processing search results', 'Error');
                    setSearchResults([]);
                }
            })
            .catch(error => {
                console.error('Error searching movies:', error);
                showToast(`Failed to search movies: ${error.message}`, 'Error');
                setSearchResults([]);
            })
            .finally(() => {
                setSearching(false);
            });
    };

    const addToWatchlist = (movie) => {
        try {
            console.log('Adding movie to watchlist:', movie);
            const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

            // Check if movie already in watchlist
            if (watchlist.some(item => item.id === movie.id)) {
                showToast('Movie already in watchlist', 'Info');
                return;
            }

            const movieToAdd = {
                ...movie,
                dateAdded: new Date().toISOString()
            };

            watchlist.push(movieToAdd);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            console.log('Movie added successfully to watchlist');
            showToast(`"${movie.title || 'Unknown Title'}" added to your watchlist!`, 'Success');
        } catch (error) {
            console.error('Error adding movie to watchlist:', error);
            showToast('Failed to add movie to watchlist', 'Error');
        }
    };

    return (
        <div className="add-movie-view">
            <h1 className="mb-4">Add Movie to Watchlist</h1>

            <div className="alert alert-info mb-4">
                <i className="fas fa-info-circle me-2"></i>
                Search for movies and add them to your watchlist.
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={searchMovies}>
                        <div className="mb-3">
                            <label htmlFor="search-term" className="form-label">Search Movies</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="search-term"
                                    placeholder="Enter movie title..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-primary" type="submit" disabled={searching}>
                                    {searching ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {searchResults.length > 0 && (
                        <div className="mt-4">
                            <h5>Search Results</h5>
                            <div className="row g-3">
                                {searchResults.map((movie) => (
                                    <div key={movie.id} className="col-md-6 col-lg-4">
                                        <div className="card">
                                            <img
                                                src={movie.poster_path ?
                                                    `https://image.tmdb.org/t/p/w300${movie.poster_path}` :
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='
                                                }
                                                className="card-img-top"
                                                alt={movie.title || 'Movie poster'}
                                                style={{ height: '300px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body">
                                                <h6 className="card-title">{movie.title || 'Unknown Title'}</h6>
                                                <p className="card-text small">
                                                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
                                                </p>
                                                <div className="d-flex gap-2">
                                                    <Link 
                                                        to={`/movie/${movie.id}`}
                                                        state={{ from: '/add-movie' }}
                                                        className="btn btn-outline-secondary btn-sm flex-fill"
                                                    >
                                                        <i className="fas fa-info-circle me-1"></i>
                                                        Details
                                                    </Link>
                                                    <button
                                                        className="btn btn-primary btn-sm flex-fill"
                                                        onClick={() => addToWatchlist(movie)}
                                                    >
                                                        <i className="fas fa-plus me-1"></i>
                                                        Add to Watchlist
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddMovie;