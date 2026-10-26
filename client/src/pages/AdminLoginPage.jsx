import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, ShieldAlert } from 'lucide-react';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { loginAdmin } from '../services/api';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@syspoly.in');
  const [password, setPassword] = useState('Admin@2026!');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await loginAdmin({ email, password });
      if (res.data.success) {
        localStorage.setItem('syspoly_token', res.data.token);
        localStorage.setItem('syspoly_user', JSON.stringify(res.data.user));
        setToast({ type: 'success', message: 'Authentication successful! Redirecting...' });
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 600);
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Invalid admin credentials'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal Login | System Polygon</title>
      </Helmet>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-slate-50 bg-grid-pattern px-4">
        <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-slate-200 bg-white shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-electric-600 to-violetAccent-500 flex items-center justify-center shadow-md">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Syspoly Admin Access</h2>
            <p className="text-xs text-slate-500">
              Sign in to manage company services, portfolio projects, and customer enquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
                {loading ? <Loader size="sm" /> : 'Authenticate & Enter Dashboard'}
              </Button>
            </div>
          </form>

          <div className="p-3.5 rounded-xl bg-electric-50 border border-electric-200 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-electric-700">
              <ShieldAlert className="w-4 h-4" /> Default Seed Credentials:
            </div>
            <div>Email: <span className="font-mono text-slate-900 font-bold">admin@syspoly.in</span></div>
            <div>Password: <span className="font-mono text-slate-900 font-bold">Admin@2026!</span></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
