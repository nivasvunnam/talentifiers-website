import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const links = [
  { to: '/dashboard/user/jobs', label: 'Search for Jobs' },
  { to: '/dashboard/user/resume', label: 'Update Resume' },
];

export default function UserDashboard() {
  return (
    <ProtectedRoute requireUser>
      <Navbar title="Job Portal — User" links={links} showLogout />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
