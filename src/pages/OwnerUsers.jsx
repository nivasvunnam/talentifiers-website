import { useState, useEffect } from 'react';
import { getOwnerUsers } from '../services/api';
import UserProfileCard from '../components/UserProfileCard';
import Toast from '../components/Toast';

const PAGE_SIZE = 10;

export default function OwnerUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    skills: '',
    h1Status: '',
    jobTitle: '',
    currentlyWorking: '',
    openToRelocate: '',
  });
  const [toast, setToast] = useState(null);

  const loadUsers = () => {
    setLoading(true);
    const params = {
      page,
      size: PAGE_SIZE,
      name: filters.name || undefined,
      location: filters.location || undefined,
      skills: filters.skills || undefined,
      h1Status: filters.h1Status || undefined,
      jobTitle: filters.jobTitle || undefined,
      currentlyWorking: filters.currentlyWorking === 'yes' ? true : filters.currentlyWorking === 'no' ? false : undefined,
      openToRelocate: filters.openToRelocate === 'yes' ? true : filters.openToRelocate === 'no' ? false : undefined,
    };
    getOwnerUsers(params)
      .then((r) => setUsers(r.data || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => loadUsers(), [page, filters.name, filters.location, filters.skills, filters.h1Status, filters.jobTitle, filters.currentlyWorking, filters.openToRelocate]);

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profiles</h1>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
        <h2 className="font-medium text-gray-900">Search & Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Name"
            value={filters.name || ''}
            onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Location"
            value={filters.location || ''}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Skills"
            value={filters.skills || ''}
            onChange={(e) => setFilters((f) => ({ ...f, skills: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <select
            value={filters.h1Status || ''}
            onChange={(e) => setFilters((f) => ({ ...f, h1Status: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">H1 Status</option>
            <option value="H1B">H1B</option>
            <option value="H1B Transfer">H1B Transfer</option>
            <option value="Green Card">Green Card</option>
            <option value="Citizen">Citizen</option>
            <option value="OPT">OPT</option>
            <option value="CPT">CPT</option>
            <option value="TN Visa">TN Visa</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Job Title"
            value={filters.jobTitle || ''}
            onChange={(e) => setFilters((f) => ({ ...f, jobTitle: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <select
            value={filters.currentlyWorking || ''}
            onChange={(e) => setFilters((f) => ({ ...f, currentlyWorking: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Currently Working</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <select
            value={filters.openToRelocate || ''}
            onChange={(e) => setFilters((f) => ({ ...f, openToRelocate: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Open to Relocate</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No user profiles found.</div>
      ) : (
        <>
          <div className="grid gap-4">
            {users.map((profile) => (
              <UserProfileCard key={profile.userId} profile={profile} />
            ))}
          </div>
          {users.length === PAGE_SIZE && (
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="px-4 py-2 border rounded-lg disabled:opacity-50">
                Previous
              </button>
              <button onClick={() => setPage((p) => p + 1)} className="px-4 py-2 border rounded-lg">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
