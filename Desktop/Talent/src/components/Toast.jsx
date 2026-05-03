import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 5000 }) {
  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const bg = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${bg} flex items-center gap-2`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={onClose} className="text-white/90 hover:text-white text-xl leading-none">
        ×
      </button>
    </div>
  );
}
