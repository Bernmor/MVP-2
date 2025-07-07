import { useEffect, useState } from 'react';
import WatchedItem from '../components/WatchedItem';

const Watched = ({ showToast, setLoading }) => {
    const [watched, setWatched] = useState([]);

    useEffect(() => {
        loadWatched();
    }, []);

    const loadWatched = () => {
        const data = JSON.parse(localStorage.getItem('watched') || '[]');
        const sortedData = data.sort((a, b) => new Date(b.dateWatched) - new Date(a.dateWatched));
        setWatched(sortedData);
    };

    const removeFromWatched = (movieId) => {
        if (!window.confirm('Remove this movie from your watched list?')) return;

        const updatedWatched = watched.filter(movie => movie.id !== movieId);
        localStorage.setItem('watched', JSON.stringify(updatedWatched));
        setWatched(updatedWatched);
        showToast('Movie removed from watched list', 'Success');
    };

    return (
        <div className="watched-view">
            <h1 className="mb-4">Movies You've Watched</h1>

            <div className="row g-4">
                {watched.length === 0 ? (
                    <div className="col-12">
                        <div className="empty-state">
                            <i className="fas fa-film"></i>
                            <h4 className="mt-3">No movies watched yet</h4>
                            <p className="empty-state-text">Start watching some movies!</p>
                        </div>
                    </div>
                ) : (
                    watched.map((movie) => (
                        <div key={`${movie.id}-${movie.dateWatched}`} className="col-md-6">
                            <WatchedItem
                                movie={movie}
                                onRemove={removeFromWatched}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Watched;