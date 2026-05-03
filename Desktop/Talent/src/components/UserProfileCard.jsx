import { Link } from 'react-router-dom';

function formatExperience(workExperiences = []) {
  if (!workExperiences.length) return '0 years';
  const sorted = [...workExperiences].sort(
    (a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0)
  );
  let totalMonths = 0;
  for (const we of sorted) {
    const start = we.startDate ? new Date(we.startDate) : new Date();
    const end = we.isCurrent ? new Date() : (we.endDate ? new Date(we.endDate) : new Date());
    totalMonths += (end - start) / (1000 * 60 * 60 * 24 * 30.44);
  }
  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);
  if (years === 0) return `${months} months`;
  return months ? `${years} yrs ${months} mo` : `${years} yrs`;
}

export default function UserProfileCard({ profile }) {
  const currentJob = profile?.workExperiences?.find((w) => w.isCurrent)?.jobTitle
    || profile?.workExperiences?.[0]?.jobTitle
    || '—';
  const totalExp = formatExperience(profile?.workExperiences);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{profile?.userName || 'Unknown'}</h3>
          <p className="text-sm text-gray-600">Current role: {currentJob}</p>
          <p className="text-xs text-gray-500 mt-1">
            Working: {profile?.isCurrentlyWorking ? 'Yes' : 'No'} • Relocate: {profile?.openToRelocate ? 'Yes' : 'No'}
          </p>
          <p className="text-xs text-gray-500">
            📍 {profile?.currentLocation || '—'} • {profile?.h1Status || '—'} • Exp: {totalExp}
          </p>
        </div>
        <Link
          to={`/dashboard/owner/users/${profile?.userId}`}
          className="text-sm font-medium text-primary-600 hover:underline"
        >
          View full profile
        </Link>
      </div>
    </div>
  );
}
