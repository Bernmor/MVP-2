import React, { useState } from 'react';

export default function StarRating({ rating, onRatingChange, readOnly = false }) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (starValue) => {
        if (!readOnly && onRatingChange) {
            onRatingChange(starValue);
        }
    };

    const handleStarHover = (starValue) => {
        if (!readOnly) {
            setHoverRating(starValue);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0);
        }
    };

    const getStarClass = (starValue) => {
        const currentRating = hoverRating || rating;
        if (starValue <= currentRating) {
            return 'fas fa-star text-warning';
        }
        return 'far fa-star text-muted';
    };

    return (
        <div className="star-rating d-flex align-items-center">
            {[1, 2, 3, 4, 5].map((starValue) => (
                <i
                    key={starValue}
                    className={`${getStarClass(starValue)} ${!readOnly ? 'star-clickable' : ''}`}
                    style={{ 
                        fontSize: '1.5rem', 
                        marginRight: '0.25rem',
                        cursor: readOnly ? 'default' : 'pointer'
                    }}
                    onClick={() => handleStarClick(starValue)}
                    onMouseEnter={() => handleStarHover(starValue)}
                    onMouseLeave={handleMouseLeave}
                />
            ))}
            {rating > 0 && (
                <span className="ms-2 text-muted">({rating}/5)</span>
            )}
        </div>
    );
}