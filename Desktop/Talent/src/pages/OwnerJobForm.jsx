import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getOwnerJob } from '../services/api';
import Toast from '../components/Toast';

export default function OwnerJobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    jobTitle: '',
    location: '',
    remoteOrOffline: '',
    minExperienceRequired: 0,
    skillsRequired: '',
    fullJd: '',
  });

  useEffect(() => {
    if (!isEdit) return;
    getOwnerJob(id)
      .then((r) => {
        const d = r.data;
        setForm({
          jobTitle: d.jobTitle || '',
          location: d.location || '',
          remoteOrOffline: d.remoteOrOffline || '',
          minExperienceRequired: d.minExperienceRequired ?? 0,
          skillsRequired: d.skillsRequired || '',
          fullJd: d.fullJd || '',
        });
      })
      .catch(() => setToast({ message: 'Job not found', type: 'error' }))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.jobTitle.trim()) {
      setToast({ message: 'Job title is required', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await updateJob(id, form);
        setToast({ message: 'Job updated', type: 'success' });
      } else {
        await createJob(form);
        setToast({ message: 'Job created', type: 'success' });
      }
      navigate('/dashboard/owner/jobs');
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to save', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 className="text-xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit Job' : 'Add New Job'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title *"
          value={form.jobTitle || ''}
          onChange={(e) => update('jobTitle', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location || ''}
          onChange={(e) => update('location', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <select
          value={form.remoteOrOffline || ''}
          onChange={(e) => update('remoteOrOffline', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Select</option>
          <option value="remote">Remote</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input
          type="number"
          placeholder="Min Experience (years)"
          value={form.minExperienceRequired ?? ''}
          onChange={(e) => update('minExperienceRequired', parseInt(e.target.value, 10) || 0)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          min={0}
        />
        <input
          type="text"
          placeholder="Skills Required (comma-separated)"
          value={form.skillsRequired || ''}
          onChange={(e) => update('skillsRequired', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <textarea
          placeholder="Full Job Description"
          value={form.fullJd || ''}
          onChange={(e) => update('fullJd', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[200px]"
          rows={8}
        />
        <button type="submit" disabled={saving} className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
