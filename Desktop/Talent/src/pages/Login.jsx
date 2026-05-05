import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmailLogin, login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => setToast({ message: msg, type });
  const clearToast = () => setToast(null);

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const { data } = await checkEmailLogin(email.trim());
      if (!data.exists) {
        setError('No account found with this email. Please register.');
        return;
      }
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'No account found with this email. Please register.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setLoading(true);
    try {
      const { data } = await login(email.trim(), password);
      authLogin(data.token, data.userType, data.name);
      if (data.userType === 'owner') {
        navigate('/dashboard/owner', { replace: true });
      } else {
        navigate('/dashboard/user', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h1>

        {step === 1 && (
          <form onSubmit={handleCheckEmail}>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50">
              {loading ? 'Checking...' : 'Continue'}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account? <Link to="/register" className="text-primary-600 hover:underline">Register</Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleLogin}>
            <p className="text-sm text-gray-600 mb-2">Enter password for <strong>{email}</strong></p>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2"
              autoFocus
            />
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
              Show password
            </label>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 mb-2">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button type="button" onClick={() => { setStep(1); setError(''); setPassword(''); }} className="w-full py-2 text-sm text-gray-600">
              Use different email
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account? <Link to="/register" className="text-primary-600 hover:underline">Register</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
