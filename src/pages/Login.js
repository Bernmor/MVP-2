import { useState } from 'react';

const Login = ({ setCurrentUser, showToast }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setError('Username cannot be empty');
            return;
        }

        const user = { username: username.trim() };
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        showToast('Logged in successfully!', 'Welcome');
    };

    return (
        <div className="login-view text-center py-5">
            <h1 className="mb-4">Welcome to Movie Tracker</h1>
            <p className="lead mb-4">Please enter your username to continue.</p>

            <div className="card mx-auto" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;