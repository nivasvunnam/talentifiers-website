import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOwnerJobs, toggleJob, deleteJob } from '../services/api';
import Toast from '../components/Toast';

export default function OwnerJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadJobs = () => {
    setLoading(true);
    getOwnerJobs()
      .then((r) => setJobs(r.data || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => loadJobs(), []);

  const handleToggle = async (id) => {
    try {
      await toggleJob(id);
      setToast({ message: 'Visibility updated', type: 'success' });
      loadJobs();
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    try {
      await deleteJob(id);
      setToast({ message: 'Job deleted', type: 'success' });
      setDeleteConfirm(null);
      loadJobs();
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed', type: 'error' });
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Profiles</h1>
        <Link
          to="/dashboard/owner/jobs/new"
          className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
        >
          + Add New Job
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No jobs yet. Add your first job.</div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">{job.jobTitle}</h3>
                <p className="text-sm text-gray-600">
                  📍 {job.location || 'N/A'} • {job.remoteOrOffline || 'N/A'} • Min exp: {job.minExperienceRequired ?? 0} yrs
                </p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                  {job.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleToggle(job.id)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {job.isActive ? 'Hide from Users' : 'Show to Users'}
                </button>
                <Link
                  to={`/dashboard/owner/jobs/${job.id}/edit`}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Edit JD
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  {deleteConfirm === job.id ? 'Confirm Delete?' : 'Delete Job'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
