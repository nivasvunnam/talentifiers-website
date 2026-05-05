import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const links = [
  { to: '/dashboard/owner/jobs', label: 'Job Profiles' },
  { to: '/dashboard/owner/users', label: 'User Profiles' },
];

export default function OwnerDashboard() {
  return (
    <ProtectedRoute requireOwner>
      <Navbar title="Job Portal — Owner" links={links} showLogout />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
