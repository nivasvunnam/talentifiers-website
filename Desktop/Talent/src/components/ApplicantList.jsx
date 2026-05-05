import { Link } from 'react-router-dom';

export default function ApplicantList({ applicants = [] }) {
  if (!applicants.length) {
    return <p className="text-gray-500">No applicants yet.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applicants.map((a) => (
            <tr key={a.id}>
              <td className="px-4 py-2 text-sm text-gray-900">{a.userName}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{a.userEmail}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{a.userPhone || '—'}</td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : '—'}
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/dashboard/owner/users/${a.userId}`}
                  className="text-primary-600 hover:underline text-sm"
                >
                  View profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
