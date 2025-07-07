import { useEffect } from 'react';

const Toast = ({ message, title, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div className="toast show" role="alert">
                <div className="toast-header">
                    <strong className="me-auto">{title}</strong>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="toast-body">{message}</div>
            </div>
        </div>
    );
};

export default Toast;