import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner-container">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;