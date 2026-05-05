export default function WorkExperienceForm({ items = [], onChange, onAdd, onRemove }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Work Experience</h4>
        <button
          type="button"
          onClick={onAdd}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          + Add Work Experience
        </button>
      </div>
      {items.map((item, index) => (
        <div key={item._key ?? index} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Company Name"
              value={item.companyName || ''}
              onChange={(e) => onChange(index, 'companyName', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={item.jobTitle || ''}
              onChange={(e) => onChange(index, 'jobTitle', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={item.startDate || ''}
              onChange={(e) => onChange(index, 'startDate', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <div className="flex items-center gap-2">
              <input
                type="date"
                placeholder="End Date"
                value={item.endDate || ''}
                onChange={(e) => onChange(index, 'endDate', e.target.value)}
                disabled={item.isCurrent}
                className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
              />
              <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={item.isCurrent || false}
                  onChange={(e) => {
                    onChange(index, 'isCurrent', e.target.checked);
                    if (e.target.checked) onChange(index, 'endDate', null);
                  }}
                />
                Current
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="mt-2 text-sm text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
