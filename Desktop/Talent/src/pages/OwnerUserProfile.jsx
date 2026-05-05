import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getOwnerUserProfile,
  updateOwnerUserProfile,
  uploadOwnerUserResume,
} from '../services/api';
import WorkExperienceForm from '../components/WorkExperienceForm';
import Toast from '../components/Toast';

const H1_OPTIONS = ['H1B', 'H1B Transfer', 'Green Card', 'Citizen', 'OPT', 'CPT', 'TN Visa', 'Other'];

export default function OwnerUserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) return;
    getOwnerUserProfile(id)
      .then((r) => {
        const d = r.data;
        setProfile(d);
        setForm({
          userName: d.userName || '',
          age: d.age ?? null,
          currentLocation: d.currentLocation || '',
          openToRelocate: d.openToRelocate ?? false,
          contactNumber: d.contactNumber || '',
          whatsappSameAsContact: d.whatsappSameAsContact ?? true,
          whatsappNumber: d.whatsappNumber || '',
          h1Status: d.h1Status || '',
          hasWorkExperience: d.hasWorkExperience ?? false,
          isCurrentlyWorking: d.isCurrentlyWorking ?? false,
          skills: d.skills || '',
          workExperiences: (d.workExperiences || []).map((w) => ({ ...w, _key: w.id || Math.random() })),
          ownerEditedResumeUrl: d.ownerEditedResumeUrl || '',
        });
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [id]);

  const updateField = (key, value) => setForm((f) => (f ? { ...f, [key]: value } : f));
  const updateWorkExp = (index, field, value) => {
    setForm((f) => {
      if (!f) return f;
      const next = [...(f.workExperiences || [])];
      next[index] = { ...next[index], [field]: value };
      return { ...f, workExperiences: next };
    });
  };
  const addWorkExp = () => {
    setForm((f) =>
      f
        ? {
            ...f,
            workExperiences: [
              ...(f.workExperiences || []),
              { _key: Date.now(), companyName: '', jobTitle: '', startDate: '', endDate: '', isCurrent: false },
            ],
          }
        : f
    );
  };
  const removeWorkExp = (index) => {
    setForm((f) => (f ? { ...f, workExperiences: (f.workExperiences || []).filter((_, i) => i !== index) } : f));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form || !id) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        workExperiences: (form.workExperiences || []).map(({ _key, ...rest }) => rest),
      };
      await updateOwnerUserProfile(id, payload);
      setToast({ message: 'Profile updated (owner-only changes)', type: 'success' });
      getOwnerUserProfile(id).then((r) => setProfile(r.data));
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Failed to save', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleOwnerResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    if (file.type !== 'application/pdf') {
      setToast({ message: 'Only PDF allowed', type: 'error' });
      return;
    }
    setUploading(true);
    try {
      const { data } = await uploadOwnerUserResume(id, file);
      updateField('ownerEditedResumeUrl', data.url);
      setToast({ message: 'Resume uploaded', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.error || 'Upload failed', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  if (loading || !form) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-bold text-gray-900">User Profile (Owner Edit)</h1>
      <p className="text-sm text-gray-500">Changes here are stored separately and are not visible to the user.</p>

      <form onSubmit={handleSave} className="space-y-6">
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
          />
          <input
            type="text"
            placeholder="Current Location"
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
          <select
            value={form.h1Status || ''}
            onChange={(e) => updateField('h1Status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">H1 Status</option>
            {H1_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Skills"
            value={form.skills || ''}
            onChange={(e) => updateField('skills', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-2">Work Experience</h3>
          <WorkExperienceForm items={form.workExperiences || []} onChange={updateWorkExp} onAdd={addWorkExp} onRemove={removeWorkExp} />
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-2">Resumes</h3>
          <p className="text-sm text-gray-600 mb-2">User-uploaded resume:</p>
          {profile?.resumeFileUrl ? (
            <a href={profile.resumeFileUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline block mb-2">
              Download user resume
            </a>
          ) : (
            <span className="text-gray-500">None</span>
          )}
          <p className="text-sm text-gray-600 mt-4 mb-2">Owner-edited resume (replace):</p>
          <input type="file" accept=".pdf" onChange={handleOwnerResumeUpload} disabled={uploading} className="mb-2" />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {form.ownerEditedResumeUrl && (
            <a href={form.ownerEditedResumeUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline block">
              Download owner-edited resume
            </a>
          )}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
