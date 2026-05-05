export default function FilterPanel({
  locations = [],
  jobTitles = [],
  selectedLocation,
  selectedRemote,
  selectedExp,
  selectedJobTitle,
  onLocationChange,
  onRemoteChange,
  onExpChange,
  onJobTitleChange,
  onClear,
}) {
  const expOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '0-1 yr' },
    { value: '3', label: '1-3 yrs' },
    { value: '5', label: '3-5 yrs' },
    { value: '6', label: '5+ yrs' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-gray-900">Filters</h3>

      {locations.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={selectedLocation || ''}
            onChange={(e) => onLocationChange(e.target.value || null)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Remote / Offline</label>
        <select
          value={selectedRemote || ''}
          onChange={(e) => onRemoteChange(e.target.value || null)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="remote">Remote</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
        <select
          value={selectedExp || ''}
          onChange={(e) => onExpChange(e.target.value || null)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          {expOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {jobTitles.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <select
            value={selectedJobTitle || ''}
            onChange={(e) => onJobTitleChange(e.target.value || null)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={onClear}
        className="w-full py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        Clear All Filters
      </button>
    </div>
  );
}
