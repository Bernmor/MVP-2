import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/Watchlist';
import Watched from './pages/Watched';
import AddMovie from './pages/AddMovie';
import MovieDetail from './pages/MovieDetail';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Toast from './components/Toast';
import LoadingSpinner from './components/LoadSpinner';
import { getCurrentUser } from './utils/AuthUtil';
import './index.css';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', title: '' });

    useEffect(() => {
        const user = getCurrentUser();
        console.log('Current user:', user);
        setCurrentUser(user);
    }, []);

    const showToast = (message, title = 'Notification') => {
        setToast({ show: true, message, title });
        setTimeout(() => setToast({ show: false, message: '', title: '' }), 3000);
    };

    const ProtectedRoute = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <div className="App">
                <Navbar
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showToast={showToast}
                />

                <div className="container mt-4 mb-5">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                currentUser ? <Navigate to="/dashboard" /> :
                                    <Login setCurrentUser={setCurrentUser} showToast={showToast} />
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard showToast={showToast} setLoading={setLoading} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/watchlist"
                            element={
                                <ProtectedRoute>
                                    <Watchlist showToast={showToast} setLoading={setLoading} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/watched"
                            element={
                                <ProtectedRoute>
                                    <Watched showToast={showToast} setLoading={setLoading} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-movie"
                            element={
                                <ProtectedRoute>
                                    <AddMovie showToast={showToast} setLoading={setLoading} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/movie/:id"
                            element={
                                <ProtectedRoute>
                                    <MovieDetail showToast={showToast} setLoading={setLoading} />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>

                {loading && <LoadingSpinner />}
                {toast.show && (
                    <Toast
                        message={toast.message}
                        title={toast.title}
                        onClose={() => setToast({ show: false, message: '', title: '' })}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;