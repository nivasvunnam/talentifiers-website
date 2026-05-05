import { Link } from 'react-router-dom';

export default function JobCard({ job, showViewJd = true }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900 text-lg">{job.jobTitle}</h3>
      <p className="text-gray-600 text-sm mt-1">
        📍 {job.location || 'Not specified'} • {job.remoteOrOffline || 'N/A'}
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Min experience: {job.minExperienceRequired ?? 0} years
      </p>
      {job.skillsRequired && (
        <p className="text-gray-500 text-xs mt-2 truncate">{job.skillsRequired}</p>
      )}
      {showViewJd && (
        <Link
          to={`/dashboard/user/jobs/${job.id}`}
          className="inline-block mt-3 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
        >
          View JD
        </Link>
      )}
    </div>
  );
}
