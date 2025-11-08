import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!adminPassword) {
      setError('Admin password not configured. Please set VITE_ADMIN_PASSWORD in .env file.');
      return;
    }

    if (password === adminPassword) {
      sessionStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg text-light-text dark:bg-darkTheme-bg dark:text-darkTheme-text">
      <div className="w-full max-w-md p-8 bg-light-surface dark:bg-darkTheme-surface rounded-lg shadow-lg border border-light-border dark:border-darkTheme-border">
        <h1 className="text-2xl font-bold mb-6 text-center text-dark dark:text-cream">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-dark/70 dark:text-beige/80">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-colors font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

