import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('name');
    }
    return Promise.reject(err);
  }
);

// Auth
export const checkEmail = (email) => api.post('/api/auth/check-email', { email });
export const sendOtp = (email) => api.post('/api/auth/send-otp', { email });
export const resendOtp = (email) => api.post('/api/auth/resend-otp', { email });
export const verifyOtp = (email, otp) => api.post('/api/auth/verify-otp', { email, otp });
export const completeRegistration = (email, name, password) =>
  api.post('/api/auth/complete-registration', { email, name, password });
export const checkEmailLogin = (email) => api.post('/api/auth/check-email-login', { email });
export const login = (email, password) => api.post('/api/auth/login', { email, password });
export const logout = () => api.post('/api/auth/logout');

// Jobs (public)
export const getJobs = (params = {}) => api.get('/api/jobs', { params });
export const searchJobs = (skill) => api.get('/api/jobs/search', { params: { skill } });
export const getJobById = (id) => api.get(`/api/jobs/${id}`);
export const getSimilarJobs = (id) => api.get(`/api/jobs/similar/${id}`);
export const getFilterLocations = () => api.get('/api/jobs/filters/locations');
export const getFilterJobTitles = () => api.get('/api/jobs/filters/job-titles');

// Resume (protected)
export const getResume = () => api.get('/api/resume');
export const updateResume = (data) => api.put('/api/resume', data);
export const uploadResumeFile = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/api/resume/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
};

// Applications (protected)
export const applyForJob = (jobId) => api.post('/api/applications/apply', { jobId });
export const getMyApplications = (page = 0, size = 10) =>
  api.get('/api/applications/my', { params: { page, size } });
export const hasApplied = (jobId) => api.get('/api/applications/has-applied', { params: { jobId } });

// Owner - Jobs
export const getOwnerJobs = () => api.get('/api/owner/jobs');
export const getOwnerJob = (id) => api.get(`/api/owner/jobs/${id}`);
export const createJob = (data) => api.post('/api/owner/jobs', data);
export const updateJob = (id, data) => api.put(`/api/owner/jobs/${id}`, data);
export const toggleJob = (id) => api.patch(`/api/owner/jobs/${id}/toggle`);
export const deleteJob = (id) => api.delete(`/api/owner/jobs/${id}`);
export const getJobApplicants = (id, page = 0, size = 10) =>
  api.get(`/api/owner/jobs/${id}/applicants`, { params: { page, size } });

// Owner - Users
export const getOwnerUsers = (params = {}) => api.get('/api/owner/users', { params });
export const getOwnerUserProfile = (id) => api.get(`/api/owner/users/${id}`);
export const updateOwnerUserProfile = (id, data) => api.put(`/api/owner/users/${id}/profile`, data);
export const uploadOwnerUserResume = (id, file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post(`/api/owner/users/${id}/resume`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default api;
