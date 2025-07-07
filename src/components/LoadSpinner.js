import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner-container">
                <div className="custom-spinner">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;