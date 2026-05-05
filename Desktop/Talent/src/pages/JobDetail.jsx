import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById, applyForJob, hasApplied } from '../services/api';
import SimilarJobs from '../components/SimilarJobs';
import Toast from '../components/Toast';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!id) return;
    getJobById(id)
      .then((r) => setJob(r.data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
    hasApplied(id)
      .then((r) => setApplied(r.data?.applied === true))
      .catch(() => setApplied(false));
  }, [id]);

  const handleApply = async () => {
    if (applied || applying || !id) return;
    setApplying(true);
    try {
      await applyForJob(Number(id));
      setApplied(true);
      setToast({ message: '✅ Application submitted! Check your email for confirmation.', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to apply', type: 'error' });
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;
  if (!job) return <div className="text-center py-12 text-gray-500">Job not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{job.jobTitle}</h1>
        <p className="text-gray-600 mt-2">
          📍 {job.location || 'N/A'} • {job.remoteOrOffline || 'N/A'} • Min exp: {job.minExperienceRequired ?? 0} years
        </p>
        {job.skillsRequired && (
          <p className="text-gray-600 mt-2"><strong>Skills:</strong> {job.skillsRequired}</p>
        )}
        <div className="mt-4 prose max-w-none">
          <h3 className="font-semibold text-gray-900">Full Job Description</h3>
          <div className="whitespace-pre-wrap text-gray-700 mt-2">{job.fullJd || 'No description.'}</div>
        </div>
        <div className="mt-6">
          {applied ? (
            <button disabled className="px-6 py-3 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed">
              ✅ Already Applied
            </button>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>
          )}
        </div>
      </div>
      <aside className="lg:w-72 flex-shrink-0">
        <SimilarJobs jobId={id} />
      </aside>
    </div>
  );
}
