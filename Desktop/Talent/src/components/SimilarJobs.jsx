import { useEffect, useState } from 'react';
import { getSimilarJobs } from '../services/api';
import JobCard from './JobCard';

export default function SimilarJobs({ jobId }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;
    getSimilarJobs(jobId)
      .then((r) => setJobs(r.data || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) return <div className="text-gray-500 text-sm">Loading similar jobs...</div>;
  if (!jobs.length) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-900">Similar Jobs</h4>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} showViewJd />
      ))}
    </div>
  );
}
