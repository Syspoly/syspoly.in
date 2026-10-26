import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard,
  Code,
  FolderGit2,
  Building2,
  Cpu,
  MessageSquare,
  Mail,
  BarChart3,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  Globe,
  Search
} from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import Loader from '../components/Loader';
import {
  getServices, createService, updateService, deleteService,
  getProjects, createProject, updateProject, deleteProject,
  getIndustries, createIndustry, deleteIndustry,
  getTechnologies, createTechnology, deleteTechnology,
  getTestimonials, createTestimonial, deleteTestimonial,
  getContacts, updateContactStatus, deleteContact,
  getStatistics, updateStatistic,
  getAllSeo, createSeo, updateSeo, deleteSeo
} from '../services/api';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Data states
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [seoPages, setSeoPages] = useState([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'service', 'project', 'industry', 'technology', 'testimonial', 'stat', 'seo'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Verify auth on mount
  useEffect(() => {
    const token = localStorage.getItem('syspoly_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        getServices(true),
        getProjects(null, true),
        getIndustries(),
        getTechnologies(true),
        getTestimonials(true),
        getContacts(),
        getStatistics(),
        getAllSeo()
      ]);

      const [svcRes, projRes, indRes, techRes, testRes, cntRes, statRes, seoRes] = results;

      if (svcRes.status === 'fulfilled' && svcRes.value?.data?.success) {
        setServices(svcRes.value.data.data);
      }
      if (projRes.status === 'fulfilled' && projRes.value?.data?.success) {
        setProjects(projRes.value.data.data);
      }
      if (indRes.status === 'fulfilled' && indRes.value?.data?.success) {
        setIndustries(indRes.value.data.data);
      }
      if (techRes.status === 'fulfilled' && techRes.value?.data?.success) {
        setTechnologies(techRes.value.data.data);
      }
      if (testRes.status === 'fulfilled' && testRes.value?.data?.success) {
        setTestimonials(testRes.value.data.data);
      }
      if (cntRes.status === 'fulfilled' && cntRes.value?.data?.success) {
        setContacts(cntRes.value.data.data);
      } else if (cntRes.status === 'rejected' && (cntRes.reason?.response?.status === 401 || cntRes.reason?.response?.status === 403)) {
        localStorage.removeItem('syspoly_token');
        navigate('/admin/login');
        return;
      }
      if (statRes.status === 'fulfilled' && statRes.value?.data?.success) {
        setStatistics(statRes.value.data.data);
      }
      if (seoRes.status === 'fulfilled' && seoRes.value?.data?.success) {
        setSeoPages(seoRes.value.data.data);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('syspoly_token');
        navigate('/admin/login');
      } else {
        setToast({ type: 'error', message: err.response?.data?.message || 'Error loading dashboard data.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('syspoly_token');
    localStorage.removeItem('syspoly_user');
    navigate('/admin/login');
  };

  // Open modal handler
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      // Default blank templates
      if (type === 'service') {
        setFormData({ title: '', slug: '', shortDescription: '', description: '', icon: 'Code', features: '', isActive: true });
      } else if (type === 'project') {
        setFormData({ title: '', slug: '', category: 'Web', description: '', client: '', industry: 'Technology', technologies: '', image: '', challenge: '', solution: '', results: '', projectUrl: '', isPublished: true });
      } else if (type === 'industry') {
        setFormData({ title: '', slug: '', description: '', icon: 'Building2' });
      } else if (type === 'technology') {
        setFormData({ name: '', category: 'Frontend', logo: '', websiteUrl: '', isActive: true });
      } else if (type === 'testimonial') {
        setFormData({ clientName: '', company: '', designation: 'CEO', message: '', rating: 5, isPublished: true });
      } else if (type === 'stat') {
        setFormData({ title: '', value: '', suffix: '+' });
      } else if (type === 'seo') {
        setFormData({
          page: '',
          pageName: '',
          title: '',
          description: '',
          keywords: '',
          canonicalUrl: '',
          ogTitle: '',
          ogDescription: '',
          robots: 'index, follow',
          isActive: true
        });
      }
    }
    setIsModalOpen(true);
  };

  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'service') {
        const payload = {
          ...formData,
          features: typeof formData.features === 'string' ? formData.features.split(',').map(s => s.trim()).filter(Boolean) : formData.features
        };
        if (editingItem) {
          await updateService(editingItem._id, payload);
          setToast({ type: 'success', message: 'Service updated successfully!' });
        } else {
          await createService(payload);
          setToast({ type: 'success', message: 'Service created successfully!' });
        }
      } else if (modalType === 'project') {
        const payload = {
          ...formData,
          technologies: typeof formData.technologies === 'string' ? formData.technologies.split(',').map(s => s.trim()).filter(Boolean) : formData.technologies
        };
        if (editingItem) {
          await updateProject(editingItem._id, payload);
          setToast({ type: 'success', message: 'Project updated successfully!' });
        } else {
          await createProject(payload);
          setToast({ type: 'success', message: 'Project created successfully!' });
        }
      } else if (modalType === 'industry') {
        if (!editingItem) {
          await createIndustry(formData);
          setToast({ type: 'success', message: 'Industry created!' });
        }
      } else if (modalType === 'technology') {
        await createTechnology(formData);
        setToast({ type: 'success', message: 'Technology added!' });
      } else if (modalType === 'testimonial') {
        await createTestimonial(formData);
        setToast({ type: 'success', message: 'Testimonial added!' });
      } else if (modalType === 'stat') {
        if (editingItem) {
          await updateStatistic(editingItem._id, formData);
          setToast({ type: 'success', message: 'Statistic updated!' });
        }
      } else if (modalType === 'seo') {
        const pageKey = (formData.page || '').trim().toLowerCase();
        const existing = seoPages.find(p => p.page === pageKey);
        const targetId = editingItem?._id || existing?._id;
        const payload = {
          ...formData,
          page: pageKey,
          pageName: formData.pageName || (pageKey.charAt(0).toUpperCase() + pageKey.slice(1))
        };
        if (targetId) {
          await updateSeo(targetId, payload);
          setToast({ type: 'success', message: `SEO for "${payload.pageName}" saved successfully!` });
        } else {
          await createSeo(payload);
          setToast({ type: 'success', message: `SEO for "${payload.pageName}" created successfully!` });
        }
      }

      setIsModalOpen(false);
      fetchAllData();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Operation failed' });
    }
  };

  const handleDeleteSeo = async (id, pageName) => {
    if (!window.confirm(`Delete SEO configuration for "${pageName}"?`)) return;
    try {
      await deleteSeo(id);
      setToast({ type: 'success', message: 'SEO configuration deleted.' });
      fetchAllData();
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.message || 'Failed to delete SEO record.' });
    }
  };

  // Delete handlers
  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service permanently?')) return;
    try {
      await deleteService(id);
      setToast({ type: 'success', message: 'Service deleted.' });
      fetchAllData();
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete service.' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await deleteProject(id);
      setToast({ type: 'success', message: 'Project deleted.' });
      fetchAllData();
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete project.' });
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await updateContactStatus(contactId, newStatus);
      setToast({ type: 'success', message: `Status updated to ${newStatus}` });
      fetchAllData();
    } catch (err) {
      setToast({ type: 'error', message: 'Status update failed.' });
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete enquiry record?')) return;
    try {
      await deleteContact(id);
      setToast({ type: 'success', message: 'Enquiry record removed.' });
      fetchAllData();
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete record.' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | System Polygon</title>
      </Helmet>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-electric-600 flex items-center justify-center font-extrabold text-white shadow-md">
              S
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900">Syspoly Control Center</h1>
              <span className="text-xs text-slate-500 font-semibold">Authenticated Admin Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={handleLogout} variant="danger" size="sm" icon={LogOut}>
              Logout
            </Button>
          </div>
        </header>

        {/* Dashboard Main Layout */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-1 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'dashboard' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'services' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <Code className="w-4 h-4" /> Services ({services.length})
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'projects' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <FolderGit2 className="w-4 h-4" /> Projects ({projects.length})
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'contacts' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4" /> Enquiries ({contacts.length})
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'testimonials' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Testimonials ({testimonials.length})
            </button>

            <button
              onClick={() => setActiveTab('technologies')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'technologies' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-4 h-4" /> Technologies ({technologies.length})
            </button>

            <button
              onClick={() => setActiveTab('statistics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'statistics' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Statistics ({statistics.length})
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'seo' ? 'bg-electric-600 text-white shadow-sm' : 'text-slate-700 hover:text-electric-600 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-4 h-4" /> SEO Meta ({seoPages.length})
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" />
              </div>
            ) : (
              <>
                {/* 1. Dashboard Overview Tab */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-8">
                    {/* Counter Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-electric-500/10 text-electric-600 flex items-center justify-center font-bold">
                          <FolderGit2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-extrabold text-slate-900">{projects.length}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Total Projects</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violetAccent-500/10 text-violetAccent-600 flex items-center justify-center font-bold">
                          <Code className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-extrabold text-slate-900">{services.length}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Total Services</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-extrabold text-slate-900">{contacts.length}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Customer Enquiries</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-extrabold text-slate-900">{testimonials.length}</div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Testimonials</div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action buttons */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-lg font-extrabold text-slate-900">Quick Actions</h3>
                      <div className="flex flex-wrap gap-3">
                        <Button onClick={() => openModal('project')} variant="primary" size="sm" icon={Plus}>
                          Add New Project
                        </Button>
                        <Button onClick={() => openModal('service')} variant="secondary" size="sm" icon={Plus}>
                          Add New Service
                        </Button>
                        <Button onClick={() => openModal('testimonial')} variant="outline" size="sm" icon={Plus}>
                          Add Testimonial
                        </Button>
                      </div>
                    </div>

                    {/* Recent Enquiries Table */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-lg font-extrabold text-slate-900">Recent Customer Enquiries</h3>
                      {contacts.length === 0 ? (
                        <p className="text-xs text-slate-500">No enquiries submitted yet.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-700">
                            <thead className="bg-slate-100 text-slate-600 uppercase font-mono">
                              <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Service</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {contacts.slice(0, 5).map((c) => (
                                <tr key={c._id} className="hover:bg-slate-50">
                                  <td className="p-3 font-bold text-slate-900">{c.name}</td>
                                  <td className="p-3">{c.email}</td>
                                  <td className="p-3 text-electric-600 font-semibold">{c.service}</td>
                                  <td className="p-3">
                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                                      c.status === 'New' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                    }`}>
                                      {c.status}
                                    </span>
                                  </td>
                                  <td className="p-3 text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-extrabold text-slate-900">Services Management</h2>
                      <Button onClick={() => openModal('service')} variant="primary" size="sm" icon={Plus}>
                        Add Service
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((svc) => (
                        <div key={svc._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                          <div>
                            <h4 className="text-base font-bold text-slate-900">{svc.title}</h4>
                            <p className="text-xs text-slate-600 line-clamp-1">{svc.shortDescription}</p>
                            <span className="text-[10px] font-mono text-electric-600 font-semibold">Slug: /{svc.slug}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => openModal('service', svc)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteService(svc._id)} className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Projects Tab */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-extrabold text-slate-900">Project Portfolio Management</h2>
                      <Button onClick={() => openModal('project')} variant="primary" size="sm" icon={Plus}>
                        Add Project
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div key={proj._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            <img src={proj.image} alt={proj.title} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                            <div>
                              <h4 className="text-base font-bold text-slate-900">{proj.title}</h4>
                              <span className="text-xs text-electric-600 font-bold">{proj.category}</span>
                              <div className="text-[10px] text-slate-500 font-medium">Client: {proj.client}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => openModal('project', proj)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteProject(proj._id)} className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Enquiries Tab */}
                {activeTab === 'contacts' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-extrabold text-slate-900">Customer Enquiries & Leads</h2>
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-700">
                          <thead className="bg-slate-100 text-slate-600 uppercase font-mono">
                            <tr>
                              <th className="p-3">Contact</th>
                              <th className="p-3">Service & Budget</th>
                              <th className="p-3">Message</th>
                              <th className="p-3">Status</th>
                              <th className="p-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {contacts.map((c) => (
                              <tr key={c._id} className="hover:bg-slate-50">
                                <td className="p-3">
                                  <div className="font-bold text-slate-900">{c.name}</div>
                                  <div className="text-slate-500">{c.email}</div>
                                  <div className="text-slate-500">{c.phone}</div>
                                </td>
                                <td className="p-3">
                                  <div className="text-electric-600 font-semibold">{c.service}</div>
                                  <div className="text-slate-500">{c.budget}</div>
                                </td>
                                <td className="p-3 max-w-xs truncate">{c.message}</td>
                                <td className="p-3">
                                  <select
                                    value={c.status}
                                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                                    className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-electric-600"
                                  >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </td>
                                <td className="p-3">
                                  <button onClick={() => handleDeleteContact(c._id)} className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Testimonials Tab */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-extrabold text-slate-900">Testimonials Management</h2>
                      <Button onClick={() => openModal('testimonial')} variant="primary" size="sm" icon={Plus}>
                        Add Testimonial
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testimonials.map((t) => (
                        <div key={t._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900">{t.clientName} ({t.company})</h4>
                            <button onClick={async () => { await deleteTestimonial(t._id); fetchAllData(); }} className="text-rose-600 p-1 hover:bg-rose-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-slate-600 italic">"{t.message}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Technologies Tab */}
                {activeTab === 'technologies' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-extrabold text-slate-900">Technologies Management</h2>
                      <Button onClick={() => openModal('technology')} variant="primary" size="sm" icon={Plus}>
                        Add Technology
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {technologies.map((t) => (
                        <div key={t._id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                            <div className="text-[10px] text-slate-500 font-semibold">{t.category}</div>
                          </div>
                          <button onClick={async () => { await deleteTechnology(t._id); fetchAllData(); }} className="text-rose-600 hover:bg-rose-50 p-1 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Statistics Tab */}
                {activeTab === 'statistics' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-extrabold text-slate-900">Homepage Statistics Counter</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {statistics.map((s) => (
                        <div key={s._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-500 font-bold uppercase">{s.title}</div>
                            <div className="text-2xl font-extrabold text-slate-900">{s.value}{s.suffix}</div>
                          </div>
                          <button onClick={() => openModal('stat', s)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. SEO Metadata Management Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">Page SEO & Meta Management</h2>
                        <p className="text-xs text-slate-500 font-medium">Add, update, and manage SEO Title, SEO Keywords, and Meta Description for all website pages.</p>
                      </div>
                      <Button onClick={() => openModal('seo')} variant="primary" size="sm" icon={Plus}>
                        Add Page SEO
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {seoPages.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 rounded-xl bg-electric-50 text-electric-600 flex items-center justify-center font-bold">
                                <Globe className="w-4 h-4" />
                              </span>
                              <div>
                                <h3 className="text-base font-extrabold text-slate-900">{item.pageName}</h3>
                                <span className="text-[11px] font-mono text-electric-600 bg-electric-50 px-2 py-0.5 rounded-full font-semibold">
                                  Page Key: /{item.page}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openModal('seo', item)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5" /> Edit SEO
                              </button>
                              <button
                                onClick={() => handleDeleteSeo(item._id, item.pageName)}
                                className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                title="Delete SEO Configuration"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Google Search Result Preview Card */}
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1">
                            <div className="text-[11px] text-slate-500 font-mono truncate">
                              {item.canonicalUrl || `https://syspoly.in/${item.page === 'home' ? '' : item.page}`}
                            </div>
                            <div className="text-sm font-semibold text-[#1a0dab] truncate">
                              {item.title}
                            </div>
                            <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {item.description}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                            <div>
                              <span className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Keywords</span>
                              <div className="flex flex-wrap gap-1.5">
                                {(item.keywords || '').split(',').filter(Boolean).map((kw, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                                    {kw.trim()}
                                  </span>
                                ))}
                                {!item.keywords && <span className="text-slate-400 italic">No keywords specified</span>}
                              </div>
                            </div>

                            <div>
                              <span className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Robots & Canonical</span>
                              <div className="space-y-0.5 text-slate-600 font-mono text-[11px]">
                                <div>Robots: <span className="font-semibold text-slate-800">{item.robots || 'index, follow'}</span></div>
                                {item.canonicalUrl && <div className="truncate">Canonical: <span className="text-slate-800">{item.canonicalUrl}</span></div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

          </main>
        </div>

        {/* Modal Form for CRUD */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`${editingItem ? 'Edit' : 'Create'} ${modalType.toUpperCase()}`}
        >
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            
            {modalType === 'service' && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Service Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                  <input
                    type="text"
                    value={formData.shortDescription || ''}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features || ''}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
              </>
            )}

            {modalType === 'project' && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Category</label>
                    <select
                      value={formData.category || 'Web'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                    >
                      <option value="Web">Web</option>
                      <option value="Mobile">Mobile</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SaaS">SaaS</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Client</label>
                    <input
                      type="text"
                      value={formData.client || ''}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
              </>
            )}

            {modalType === 'technology' && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Technology Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={formData.category || 'Frontend'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="CMS">CMS</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Cloud">Cloud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={formData.logo || ''}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
              </>
            )}

            {modalType === 'testimonial' && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.clientName || ''}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
              </>
            )}

            {modalType === 'stat' && (
              <>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Value (Number)</label>
                  <input
                    type="text"
                    value={formData.value || ''}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>
              </>
            )}

            {modalType === 'seo' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Page Display Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Home Page, About Us"
                      value={formData.pageName || ''}
                      onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Page Key (Identifier)</label>
                    <input
                      type="text"
                      placeholder="e.g. home, about, services, projects"
                      value={formData.page || ''}
                      onChange={(e) => setFormData({ ...formData, page: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                      required
                      disabled={!!editingItem}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-700 font-bold">SEO Title</label>
                    <span className={`text-[10px] font-bold ${
                      (formData.title?.length || 0) > 60 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {formData.title?.length || 0} / 60 chars (Recommended 50-60)
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Syspoly | IT Services & Software Development"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-700 font-bold">SEO Meta Description</label>
                    <span className={`text-[10px] font-bold ${
                      (formData.description?.length || 0) > 160 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {formData.description?.length || 0} / 160 chars (Recommended 140-160)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Search snippet description summarizing page contents..."
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">SEO Keywords (comma separated)</label>
                  <input
                    type="text"
                    placeholder="IT services, web development, react, custom software"
                    value={formData.keywords || ''}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Canonical URL</label>
                    <input
                      type="url"
                      placeholder="https://syspoly.in/..."
                      value={formData.canonicalUrl || ''}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Robots Tag</label>
                    <select
                      value={formData.robots || 'index, follow'}
                      onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:ring-2 focus:ring-electric-600"
                    >
                      <option value="index, follow">index, follow (Default - Recommended)</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="ghost" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Apply Changes
              </Button>
            </div>

          </form>
        </Modal>

      </div>
    </>
  );
};

export default AdminDashboardPage;
