import { Link } from 'react-router-dom';

export default function Navbar({ currentUser, setCurrentUser, showToast }) {
    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        showToast('Logged out successfully', 'Goodbye');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    <img 
                        src="/Gemini_Generated_Image_4gemp04gemp04gem.png" 
                        alt="Movie Tracker Logo" 
                        className="navbar-logo white-bg me-2"
                    />
                    Movie Tracker
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {currentUser && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/watchlist">Watchlist</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/watched">Watched</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-movie">Add Movie</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {currentUser ? (
                            <div className="d-flex align-items-center">
                <span className="navbar-text me-3">
                  Welcome, {currentUser.username}
                </span>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}