import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobApplicants } from '../services/api';
import OwnerJobForm from './OwnerJobForm';
import ApplicantList from '../components/ApplicantList';

export default function OwnerJobEdit() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 10;

  useEffect(() => {
    if (!id) return;
    getJobApplicants(id, page, PAGE_SIZE)
      .then((r) => setApplicants(r.data || []))
      .catch(() => setApplicants([]))
      .finally(() => setLoading(false));
  }, [id, page]);

  return (
    <div className="space-y-8">
      <OwnerJobForm />
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Applicants for this Job</h2>
        {loading ? (
          <p className="text-gray-500">Loading applicants...</p>
        ) : (
          <>
            <ApplicantList applicants={applicants} />
            {applicants.length === PAGE_SIZE && (
              <div className="mt-4 flex gap-2">
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
    </div>
  );
}
