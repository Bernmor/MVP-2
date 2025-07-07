import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-view text-center py-5">
            <h1 className="display-1">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead mb-4">The page you are looking for does not exist.</p>
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
    );
};

export default NotFound;