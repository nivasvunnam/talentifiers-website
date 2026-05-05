import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout as apiLogout } from '../services/api';

export default function Navbar({ title = 'Job Portal', links = [], showLogout = true }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (_) {}
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-primary-600">
              {title}
            </Link>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-gray-600 hover:text-primary-600 font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {user?.name && (
              <span className="text-gray-600 text-sm">Hi, {user.name}</span>
            )}
            {showLogout && user?.token && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
