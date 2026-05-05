import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const REDIRECT_COUNTDOWN = 15;

export default function ProtectedRoute({ children, requireOwner = false, requireUser = false }) {
  const { user, isOwner, isUser } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_COUNTDOWN);

  useEffect(() => {
    if (!user?.token) {
      setShowPopup(true);
    }
  }, [user]);

  useEffect(() => {
    if (!showPopup) return;
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          navigate('/login', { replace: true });
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [showPopup, navigate]);

  if (!user?.token) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md mx-4 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            🔒 You must be logged in to access this page. Redirecting to login...
          </p>
          <p className="text-2xl font-bold text-primary-600">{countdown}</p>
          <p className="text-sm text-gray-500 mt-2">seconds remaining</p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (requireOwner && !isOwner()) {
    navigate('/login', { replace: true });
    return null;
  }
  if (requireUser && !isUser()) {
    navigate('/login', { replace: true });
    return null;
  }

  return children;
}
