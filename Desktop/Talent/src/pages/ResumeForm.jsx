import { useState, useEffect } from 'react';
import { getResume, updateResume, uploadResumeFile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import WorkExperienceForm from '../components/WorkExperienceForm';
import Toast from '../components/Toast';

const H1_OPTIONS = ['H1B', 'H1B Transfer', 'Green Card', 'Citizen', 'OPT', 'CPT', 'TN Visa', 'Other'];

export default function ResumeForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    userName: user?.name || '',
    age: null,
    currentLocation: '',
    openToRelocate: false,
    contactNumber: '',
    whatsappSameAsContact: true,
    whatsappNumber: '',
    h1Status: '',
    hasWorkExperience: false,
    isCurrentlyWorking: false,
    resumeFileUrl: '',
    skills: '',
    workExperiences: [],
  });

  useEffect(() => {
    getResume()
      .then((r) => {
        const d = r.data;
        if (d) {
          setForm({
            userName: d.userName || user?.name || '',
            age: d.age ?? null,
            currentLocation: d.currentLocation || '',
            openToRelocate: d.openToRelocate ?? false,
            contactNumber: d.contactNumber || '',
            whatsappSameAsContact: d.whatsappSameAsContact ?? true,
            whatsappNumber: d.whatsappNumber || '',
            h1Status: d.h1Status || '',
            hasWorkExperience: d.hasWorkExperience ?? false,
            isCurrentlyWorking: d.isCurrentlyWorking ?? false,
            resumeFileUrl: d.resumeFileUrl || '',
            skills: d.skills || '',
            workExperiences: (d.workExperiences || []).map((w) => ({ ...w, _key: w.id || Math.random() })),
          });
        } else {
          setForm((f) => ({ ...f, userName: user?.name || '' }));
        }
      })
      .catch(() => setForm((f) => ({ ...f, userName: user?.name || '' })))
      .finally(() => setLoading(false));
  }, [user?.name]);

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const updateWorkExp = (index, field, value) => {
    setForm((f) => {
      const next = [...(f.workExperiences || [])];
      next[index] = { ...next[index], [field]: value };
      return { ...f, workExperiences: next };
    });
  };

  const addWorkExp = () => {
    setForm((f) => ({
      ...f,
      workExperiences: [...(f.workExperiences || []), { _key: Date.now(), companyName: '', jobTitle: '', startDate: '', endDate: '', isCurrent: false }],
    }));
  };

  const removeWorkExp = (index) => {
    setForm((f) => ({
      ...f,
      workExperiences: (f.workExperiences || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        workExperiences: (form.workExperiences || []).map(({ _key, ...rest }) => rest),
      };
      await updateResume(payload);
      setToast({ message: '✅ Resume updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to save', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setToast({ message: 'Only PDF files are allowed', type: 'error' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: 'File must be under 5MB', type: 'error' });
      return;
    }
    setUploading(true);
    try {
      const { data } = await uploadResumeFile(file);
      updateField('resumeFileUrl', data.url);
      setToast({ message: 'Resume uploaded successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Upload failed', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Info</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={form.userName || ''}
              onChange={(e) => updateField('userName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age ?? ''}
              onChange={(e) => updateField('age', e.target.value ? parseInt(e.target.value, 10) : null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min={18}
              max={100}
            />
            <input
              type="text"
              placeholder="Current Location (city, state)"
              value={form.currentLocation || ''}
              onChange={(e) => updateField('currentLocation', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <div>
              <span className="text-sm text-gray-700 mr-4">Open to Relocate?</span>
              <label className="inline-flex items-center gap-2 mr-4">
                <input type="radio" name="relocate" checked={form.openToRelocate === true} onChange={() => updateField('openToRelocate', true)} />
                Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="relocate" checked={form.openToRelocate === false} onChange={() => updateField('openToRelocate', false)} />
                No
              </label>
            </div>
            <input
              type="tel"
              placeholder="Contact Number"
              value={form.contactNumber || ''}
              onChange={(e) => updateField('contactNumber', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <div>
              <span className="text-sm text-gray-700 mr-4">WhatsApp same as contact?</span>
              <label className="inline-flex items-center gap-2 mr-4">
                <input type="radio" name="wa" checked={form.whatsappSameAsContact === true} onChange={() => updateField('whatsappSameAsContact', true)} />
                Yes
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="wa" checked={form.whatsappSameAsContact === false} onChange={() => updateField('whatsappSameAsContact', false)} />
                No
              </label>
            </div>
            {!form.whatsappSameAsContact && (
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={form.whatsappNumber || ''}
                onChange={(e) => updateField('whatsappNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status & Skills</h2>
          <select
            value={form.h1Status || ''}
            onChange={(e) => updateField('h1Status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
          >
            <option value="">Select H1 Status</option>
            {H1_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Skills (comma-separated)"
            value={form.skills || ''}
            onChange={(e) => updateField('skills', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h2>
          <div className="mb-4">
            <span className="text-sm text-gray-700 mr-4">Do you have work experience?</span>
            <label className="inline-flex items-center gap-2 mr-4">
              <input type="radio" name="hasExp" checked={form.hasWorkExperience === true} onChange={() => updateField('hasWorkExperience', true)} />
              Yes
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="hasExp" checked={form.hasWorkExperience === false} onChange={() => updateField('hasWorkExperience', false)} />
              No
            </label>
          </div>
          {form.hasWorkExperience && (
            <>
              <div className="mb-4">
                <span className="text-sm text-gray-700 mr-4">Currently working?</span>
                <label className="inline-flex items-center gap-2 mr-4">
                  <input type="radio" name="current" checked={form.isCurrentlyWorking === true} onChange={() => updateField('isCurrentlyWorking', true)} />
                  Yes
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="current" checked={form.isCurrentlyWorking === false} onChange={() => updateField('isCurrentlyWorking', false)} />
                  No
                </label>
              </div>
              <WorkExperienceForm
                items={form.workExperiences || []}
                onChange={updateWorkExp}
                onAdd={addWorkExp}
                onRemove={removeWorkExp}
              />
            </>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Upload (PDF, max 5MB)</h2>
          <input type="file" accept=".pdf" onChange={handleFileUpload} disabled={uploading} className="mb-2" />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.resumeFileUrl && (
            <p className="text-sm">
              Current resume: <a href={form.resumeFileUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">View / Download</a>
            </p>
          )}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Resume'}
        </button>
      </form>
    </div>
  );
}
