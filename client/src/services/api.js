import axios from 'axios';

// Ensure base URL is normalized and always includes /api
const getApiBaseUrl = () => {
  let url = (import.meta.env.VITE_API_URL || '').trim();
  if (!url) {
    return '/api';
  }
  url = url.replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url += '/api';
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Authorization Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('syspoly_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services API calls
export const getServices = (admin = false) => api.get(`/services${admin ? '?admin=true' : ''}`);
export const getServiceBySlug = (slug) => api.get(`/services/slug/${slug}`);
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Projects API calls
export const getProjects = (category, admin = false) => {
  let url = `/projects?admin=${admin}`;
  if (category && category !== 'All') {
    url += `&category=${encodeURIComponent(category)}`;
  }
  return api.get(url);
};
export const getProjectBySlug = (slug) => api.get(`/projects/slug/${slug}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Industries API calls
export const getIndustries = () => api.get('/industries');
export const createIndustry = (data) => api.post('/industries', data);
export const updateIndustry = (id, data) => api.put(`/industries/${id}`, data);
export const deleteIndustry = (id) => api.delete(`/industries/${id}`);

// Technologies API calls
export const getTechnologies = (admin = false) => api.get(`/technologies${admin ? '?admin=true' : ''}`);
export const createTechnology = (data) => api.post('/technologies', data);
export const updateTechnology = (id, data) => api.put(`/technologies/${id}`, data);
export const deleteTechnology = (id) => api.delete(`/technologies/${id}`);

// Testimonials API calls
export const getTestimonials = (admin = false) => api.get(`/testimonials${admin ? '?admin=true' : ''}`);
export const createTestimonial = (data) => api.post('/testimonials', data);
export const updateTestimonial = (id, data) => api.put(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

// Contact / Enquiries API calls
export const submitContact = (data) => api.post('/contacts', data);
export const getContacts = () => api.get('/contacts');
export const updateContactStatus = (id, status) => api.put(`/contacts/${id}`, { status });
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Statistics API calls
export const getStatistics = () => api.get('/statistics');
export const updateStatistic = (id, data) => api.put(`/statistics/${id}`, data);
export const createStatistic = (data) => api.post('/statistics', data);

// Auth API calls
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const getAdminMe = () => api.get('/auth/me');

// File Upload
export const uploadImage = (formData) => api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// SEO Metadata API calls
export const getAllSeo = () => api.get('/seo');
export const getSeoByPage = (page) => api.get(`/seo/page/${page}`);
export const createSeo = (data) => api.post('/seo', data);
export const updateSeo = (id, data) => {
  const url = id ? `/seo/${id}` : '/seo';
  return api.put(url, data);
};
export const deleteSeo = (id) => api.delete(`/seo/${id}`);

export default api;
