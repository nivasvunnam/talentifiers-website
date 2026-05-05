import { useState, useEffect } from 'react';
import { getJobs, searchJobs, getFilterLocations, getFilterJobTitles } from '../services/api';
import JobCard from '../components/JobCard';
import FilterPanel from '../components/FilterPanel';
import Toast from '../components/Toast';

const PAGE_SIZE = 10;

export default function JobSearch() {
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSkill, setSearchSkill] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOrOffline, setRemoteOrOffline] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState(null);

  const loadFilters = () => {
    getFilterLocations().then((r) => setLocations(r.data || [])).catch(() => {});
    getFilterJobTitles().then((r) => setJobTitles(r.data || [])).catch(() => {});
  };

  const loadJobs = () => {
    setLoading(true);
    if (searchSkill.trim()) {
      searchJobs(searchSkill.trim())
        .then((r) => setJobs(r.data || []))
        .catch(() => setJobs([]))
        .finally(() => setLoading(false));
    } else {
      const params = {
        page,
        size: PAGE_SIZE,
        location: location || undefined,
        remoteOrOffline: remoteOrOffline || undefined,
        minExperience: minExperience ? parseInt(minExperience, 10) : undefined,
        jobTitle: jobTitle || undefined,
      };
      getJobs(params)
        .then((r) => setJobs(r.data || []))
        .catch(() => setJobs([]))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadJobs();
  }, [searchSkill, location, remoteOrOffline, minExperience, jobTitle, page]);

  const clearFilters = () => {
    setLocation('');
    setRemoteOrOffline('');
    setMinExperience('');
    setJobTitle('');
    setSearchSkill('');
    setPage(0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <aside className="lg:w-64 flex-shrink-0">
        <FilterPanel
          locations={locations}
          jobTitles={jobTitles}
          selectedLocation={location}
          selectedRemote={remoteOrOffline}
          selectedExp={minExperience}
          selectedJobTitle={jobTitle}
          onLocationChange={setLocation}
          onRemoteChange={setRemoteOrOffline}
          onExpChange={setMinExperience}
          onJobTitleChange={setJobTitle}
          onClear={clearFilters}
        />
      </aside>
      <div className="flex-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by skill or keyword..."
            value={searchSkill}
            onChange={(e) => { setSearchSkill(e.target.value); setPage(0); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No jobs found.</div>
        ) : (
          <>
            <div className="grid gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {!searchSkill && jobs.length === PAGE_SIZE && (
              <div className="mt-4 flex justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border rounded-lg"
                >
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
