import { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';

const MovieNotes = ({ showToast }) => {
    const [formData, setFormData] = useState({
        movieTitle: '',
        director: '',
        genre: '',
        rating: 0,
        notes: '',
        watchDate: ''
    });
    const [errors, setErrors] = useState({});
    const [movieNotes, setMovieNotes] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadMovieNotes();
    }, []);

    const loadMovieNotes = () => {
        const savedNotes = JSON.parse(localStorage.getItem('movieNotes') || '[]');
        setMovieNotes(savedNotes);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.movieTitle.trim()) {
            newErrors.movieTitle = 'Movie title is required';
        } else if (formData.movieTitle.trim().length < 2) {
            newErrors.movieTitle = 'Movie title must be at least 2 characters';
        }

        if (!formData.director.trim()) {
            newErrors.director = 'Director name is required';
        } else if (formData.director.trim().length < 2) {
            newErrors.director = 'Director name must be at least 2 characters';
        }

        if (!formData.genre.trim()) {
            newErrors.genre = 'Genre is required';
        }

        if (formData.rating === 0) {
            newErrors.rating = 'Please provide a rating';
        }

        if (!formData.notes.trim()) {
            newErrors.notes = 'Notes are required';
        } else if (formData.notes.trim().length < 10) {
            newErrors.notes = 'Notes must be at least 10 characters';
        }

        if (!formData.watchDate) {
            newErrors.watchDate = 'Watch date is required';
        } else {
            const selectedDate = new Date(formData.watchDate);
            const today = new Date();
            if (selectedDate > today) {
                newErrors.watchDate = 'Watch date cannot be in the future';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));

        if (errors.rating) {
            setErrors(prev => ({
                ...prev,
                rating: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Please fix the validation errors', 'Error');
            return;
        }

        const noteData = {
            ...formData,
            id: editingId || Date.now(),
            dateAdded: editingId ? movieNotes.find(note => note.id === editingId)?.dateAdded : new Date().toISOString()
        };

        let updatedNotes;
        if (editingId) {
            updatedNotes = movieNotes.map(note => 
                note.id === editingId ? noteData : note
            );
            showToast('Movie note updated successfully!', 'Success');
        } else {
            updatedNotes = [...movieNotes, noteData];
            showToast('Movie note added successfully!', 'Success');
        }

        localStorage.setItem('movieNotes', JSON.stringify(updatedNotes));
        setMovieNotes(updatedNotes);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            movieTitle: '',
            director: '',
            genre: '',
            rating: 0,
            notes: '',
            watchDate: ''
        });
        setErrors({});
        setEditingId(null);
    };

    const handleEdit = (note) => {
        setFormData({
            movieTitle: note.movieTitle,
            director: note.director,
            genre: note.genre,
            rating: note.rating,
            notes: note.notes,
            watchDate: note.watchDate
        });
        setEditingId(note.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie note?')) {
            const updatedNotes = movieNotes.filter(note => note.id !== id);
            localStorage.setItem('movieNotes', JSON.stringify(updatedNotes));
            setMovieNotes(updatedNotes);
            showToast('Movie note deleted successfully!', 'Success');

            if (editingId === id) {
                resetForm();
            }
        }
    };

    const genreOptions = [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
        'Drama', 'Family', 'Fantasy', 'Horror', 'Music', 'Mystery',
        'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
    ];

    return (
        <div className="movie-notes-view">
            <h1 className="mb-4">Movie Notes</h1>

            <div className="alert alert-info mb-4">
                <i className="fas fa-info-circle me-2"></i>
                Keep track of your personal movie thoughts and ratings. All data is saved locally in your browser.
            </div>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">
                                {editingId ? 'Edit Movie Note' : 'Add New Movie Note'}
                            </h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="movieTitle" className="form-label">
                                        Movie Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.movieTitle ? 'is-invalid' : ''}`}
                                        id="movieTitle"
                                        name="movieTitle"
                                        value={formData.movieTitle}
                                        onChange={handleInputChange}
                                        placeholder="Enter movie title"
                                    />
                                    {errors.movieTitle && (
                                        <div className="invalid-feedback">{errors.movieTitle}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="director" className="form-label">
                                        Director <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.director ? 'is-invalid' : ''}`}
                                        id="director"
                                        name="director"
                                        value={formData.director}
                                        onChange={handleInputChange}
                                        placeholder="Enter director name"
                                    />
                                    {errors.director && (
                                        <div className="invalid-feedback">{errors.director}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="genre" className="form-label">
                                        Genre <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
                                        id="genre"
                                        name="genre"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a genre</option>
                                        {genreOptions.map(genre => (
                                            <option key={genre} value={genre}>{genre}</option>
                                        ))}
                                    </select>
                                    {errors.genre && (
                                        <div className="invalid-feedback">{errors.genre}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Your Rating <span className="text-danger">*</span>
                                    </label>
                                    <div>
                                        <StarRating
                                            rating={formData.rating}
                                            onRatingChange={handleRatingChange}
                                        />
                                        {errors.rating && (
                                            <div className="text-danger small mt-1">{errors.rating}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="watchDate" className="form-label">
                                        Watch Date <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.watchDate ? 'is-invalid' : ''}`}
                                        id="watchDate"
                                        name="watchDate"
                                        value={formData.watchDate}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.watchDate && (
                                        <div className="invalid-feedback">{errors.watchDate}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">
                                        Your Notes <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                                        id="notes"
                                        name="notes"
                                        rows="4"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        placeholder="Share your thoughts about this movie (minimum 10 characters)"
                                    />
                                    {errors.notes && (
                                        <div className="invalid-feedback">{errors.notes}</div>
                                    )}
                                    <div className="form-text">
                                        {formData.notes.length}/10 characters minimum
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        <i className={`fas ${editingId ? 'fa-save' : 'fa-plus'} me-1`}></i>
                                        {editingId ? 'Update Note' : 'Add Note'}
                                    </button>
                                    {editingId && (
                                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                            <i className="fas fa-times me-1"></i>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Your Movie Notes ({movieNotes.length})</h5>
                            {movieNotes.length > 0 && (
                                <small className="text-muted">
                                    {movieNotes.length} note{movieNotes.length !== 1 ? 's' : ''} saved
                                </small>
                            )}
                        </div>
                        <div className="card-body">
                            {movieNotes.length === 0 ? (
                                <div className="text-center py-4">
                                    <div className="empty-state">
                                        <i className="fas fa-sticky-note"></i>
                                        <h4 className="mt-3">No movie notes yet</h4>
                                        <p className="empty-state-text">Add your first movie note using the form!</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="movie-notes-list">
                                    {movieNotes
                                        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
                                        .map((note) => (
                                        <div key={note.id} className="movie-note-item mb-3 p-3 border rounded">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h6 className="mb-1">{note.movieTitle}</h6>
                                                <div className="d-flex gap-1">
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => handleEdit(note)}
                                                        title="Edit note"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(note.id)}
                                                        title="Delete note"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="small text-muted mb-2">
                                                <span className="me-3">
                                                    <i className="fas fa-user-tie me-1"></i>
                                                    {note.director}
                                                </span>
                                                <span className="me-3">
                                                    <i className="fas fa-tags me-1"></i>
                                                    {note.genre}
                                                </span>
                                                <span>
                                                    <i className="fas fa-calendar me-1"></i>
                                                    {new Date(note.watchDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="mb-2">
                                                <StarRating rating={note.rating} readOnly={true} />
                                            </div>
                                            <p className="mb-1 small">{note.notes}</p>
                                            <div className="text-muted small">
                                                Added: {new Date(note.dateAdded).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieNotes;