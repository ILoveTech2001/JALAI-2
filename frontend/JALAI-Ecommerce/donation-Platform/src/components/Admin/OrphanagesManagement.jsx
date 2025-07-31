import React, { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  MapPin,
  Phone,
  Mail,
  Users,
  Heart,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  X,
  Camera,
  FileText,
  IdCard,
  Save
} from 'lucide-react';

const OrphanagesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrphanages, setSelectedOrphanages] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Registration form state
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    approximateChildren: '',
    certificateOfRegistration: null,
    directorIdCard: null,
    orphanagePictures: []
  });

  // Cities in Yaoundé and Douala, Cameroon
  const cameroonCities = [
    { value: '', label: 'Select Location' },
    // Yaoundé areas
    { value: 'yaounde-centre', label: 'Yaoundé - Centre' },
    { value: 'yaounde-mfoundi', label: 'Yaoundé - Mfoundi' },
    { value: 'yaounde-nlongkak', label: 'Yaoundé - Nlongkak' },
    { value: 'yaounde-bastos', label: 'Yaoundé - Bastos' },
    { value: 'yaounde-emana', label: 'Yaoundé - Emana' },
    { value: 'yaounde-ekounou', label: 'Yaoundé - Ekounou' },
    { value: 'yaounde-mvog-ada', label: 'Yaoundé - Mvog-Ada' },
    { value: 'yaounde-odza', label: 'Yaoundé - Odza' },
    // Douala areas
    { value: 'douala-akwa', label: 'Douala - Akwa' },
    { value: 'douala-bonanjo', label: 'Douala - Bonanjo' },
    { value: 'douala-deido', label: 'Douala - Deido' },
    { value: 'douala-new-bell', label: 'Douala - New Bell' },
    { value: 'douala-bonapriso', label: 'Douala - Bonapriso' },
    { value: 'douala-bassa', label: 'Douala - Bassa' },
    { value: 'douala-makepe', label: 'Douala - Makepe' },
    { value: 'douala-pk', label: 'Douala - PK' }
  ];

  // Check if mobile screen
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllOrphanages();

      let orphanagesData = [];
      if (response && response.data && Array.isArray(response.data)) {
        orphanagesData = response.data;
      } else if (Array.isArray(response)) {
        orphanagesData = response;
      }

      const transformedOrphanages = orphanagesData.map(orphanage => ({
        id: orphanage.id,
        name: orphanage.name,
        email: orphanage.contactEmail,
        password: '********',
        phoneNumber: orphanage.contactPhone,
        location: orphanage.location,
        approximateChildren: orphanage.currentChildren || 0,
        kids: orphanage.currentChildren || 0, // Add kids property for compatibility
        capacity: orphanage.capacity || 0,
        needsDescription: orphanage.needsDescription || 'No specific needs listed',
        status: orphanage.verified ? 'verified' : 'pending',
        registrationDate: orphanage.createdAt ? new Date(orphanage.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        totalDonationsReceived: 0, // This would come from donations data
        imageUrl: orphanage.imageUrl,
        description: orphanage.description || `Orphanage located in ${orphanage.location}`,
        contactPerson: 'Director' // Default contact person
      }));

      setOrphanages(transformedOrphanages);
      setError(null);
    } catch (error) {
      console.error('Error fetching orphanages:', error);
      setError('Failed to load orphanages');
      setOrphanages([]);
    } finally {
      setLoading(false);
    }
  };



  const statusOptions = ['all', 'approved', 'pending', 'rejected'];

  // Handle registration form input changes
  const handleRegistrationInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file uploads
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setRegistrationData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  // Handle multiple picture uploads
  const handlePicturesUpload = (e) => {
    const files = Array.from(e.target.files);
    setRegistrationData(prev => ({
      ...prev,
      orphanagePictures: [...prev.orphanagePictures, ...files]
    }));
  };

  // Remove uploaded picture
  const removePicture = (index) => {
    setRegistrationData(prev => ({
      ...prev,
      orphanagePictures: prev.orphanagePictures.filter((_, i) => i !== index)
    }));
  };

  // Validate registration form
  const validateRegistrationForm = () => {
    const { name, email, password, confirmPassword, phoneNumber, location, approximateChildren } = registrationData;

    if (!name.trim()) {
      alert('Please enter the orphanage name');
      return false;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      return false;
    }

    if (!location) {
      alert('Please select a location');
      return false;
    }

    if (!approximateChildren || isNaN(approximateChildren) || approximateChildren < 1) {
      alert('Please enter a valid number of children');
      return false;
    }

    return true;
  };

  // Submit registration form
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegistrationForm()) {
      return;
    }

    try {
      // Prepare data for API
      const orphanageData = {
        name: registrationData.name,
        email: registrationData.email,
        phoneNumber: registrationData.phoneNumber,
        location: cameroonCities.find(city => city.value === registrationData.location)?.label || registrationData.location,
        approximateChildren: registrationData.approximateChildren,
        description: `Orphanage located in ${cameroonCities.find(city => city.value === registrationData.location)?.label}`,
        needsDescription: 'General support needed',
        images: registrationData.orphanagePictures.map((file, index) => `/assets/orphanage-${index + 1}.jpg`) // For demo, use placeholder images
      };

      // Call API to create orphanage
      const response = await apiService.createOrphanage(orphanageData);

      if (response.success) {
        // Refresh the orphanages list
        await fetchOrphanages();

        // Reset form and close modal
        setRegistrationData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          location: '',
          approximateChildren: '',
          certificateOfRegistration: null,
          directorIdCard: null,
          orphanagePictures: []
        });

        setShowRegistrationForm(false);
        alert('Orphanage registration submitted successfully! It will be reviewed by administrators.');
      } else {
        alert('Failed to register orphanage. Please try again.');
      }
    } catch (error) {
      console.error('Error registering orphanage:', error);
      alert('Failed to register orphanage. Please try again.');
    }
  };

  // Filter orphanages based on search and status
  const filteredOrphanages = orphanages.filter(orphanage => {
    const matchesSearch = orphanage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orphanage.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orphanage.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || orphanage.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectOrphanage = (orphanageId) => {
    setSelectedOrphanages(prev => 
      prev.includes(orphanageId) 
        ? prev.filter(id => id !== orphanageId)
        : [...prev, orphanageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrphanages.length === filteredOrphanages.length) {
      setSelectedOrphanages([]);
    } else {
      setSelectedOrphanages(filteredOrphanages.map(orphanage => orphanage.id));
    }
  };

  const handleViewOrphanage = (orphanage) => {
    setSelectedOrphanage(orphanage);
    setShowViewModal(true);
  };

  const handleEditOrphanage = (orphanage) => {
    setSelectedOrphanage(orphanage);
    setShowEditModal(true);
  };

  const handleUpdateStatus = (orphanageId, newStatus) => {
    setOrphanages(prev => prev.map(orphanage => 
      orphanage.id === orphanageId 
        ? { ...orphanage, status: newStatus }
        : orphanage
    ));
  };

  const handleDeleteOrphanage = (orphanageId) => {
    if (window.confirm('Are you sure you want to delete this orphanage?')) {
      setOrphanages(prev => prev.filter(orphanage => orphanage.id !== orphanageId));
      setSelectedOrphanages(prev => prev.filter(id => id !== orphanageId));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orphanages Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Register and manage orphanages on the platform</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Register Orphanage</span>
            <span className="sm:hidden">Register</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orphanages</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{orphanages.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {orphanages.filter(o => o.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {orphanages.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Children</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {orphanages.reduce((total, o) => total + o.kids, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search orphanages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrphanages.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedOrphanages.length} orphanage(s) selected
            </span>
            <div className="flex gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                Approve Selected
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                Reject Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orphanages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredOrphanages.map((orphanage) => (
          <div key={orphanage.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedOrphanages.includes(orphanage.id)}
                    onChange={() => handleSelectOrphanage(orphanage.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-3"
                  />
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(orphanage.status)}`}>
                  {getStatusIcon(orphanage.status)}
                  {orphanage.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {orphanage.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {orphanage.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {orphanage.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  {orphanage.phoneNumber}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  {orphanage.email}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  Contact: {orphanage.contactPerson}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{orphanage.kids}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Children</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{orphanage.capacity}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Capacity</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Occupancy</span>
                  <span className="text-gray-900 dark:text-white">
                    {Math.round((orphanage.currentOccupancy / orphanage.capacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(orphanage.currentOccupancy / orphanage.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewOrphanage(orphanage)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditOrphanage(orphanage)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400"
                    title="Edit Orphanage"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteOrphanage(orphanage.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                {orphanage.status === 'pending' && (
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleUpdateStatus(orphanage.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(orphanage.id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              {orphanage.totalDonationsReceived > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      Total Donations
                    </span>
                    <span className="font-medium text-green-600">
                      {orphanage.totalDonationsReceived.toLocaleString()} XAF
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrphanages.length}</span> of{' '}
            <span className="font-medium">{orphanages.length}</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
              Previous
            </button>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Orphanage Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${isMobile ? 'mx-2' : 'mx-4'}`}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                  Register New Orphanage
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fill in the details to register a new orphanage
                </p>
              </div>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleRegistrationSubmit} className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                {/* Basic Information Section */}
                <div className="md:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Basic Information
                  </h4>
                </div>

                {/* Orphanage Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Orphanage Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={registrationData.name}
                    onChange={handleRegistrationInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter orphanage name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      name="email"
                      value={registrationData.email}
                      onChange={handleRegistrationInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={registrationData.password}
                    onChange={handleRegistrationInputChange}
                    required
                    minLength="8"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter password (min 8 characters)"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registrationData.confirmPassword}
                    onChange={handleRegistrationInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm password"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={registrationData.phoneNumber}
                      onChange={handleRegistrationInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+237 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      name="location"
                      value={registrationData.location}
                      onChange={handleRegistrationInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {cameroonCities.map(city => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Number of Children */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Approximate Number of Children *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      name="approximateChildren"
                      value={registrationData.approximateChildren}
                      onChange={handleRegistrationInputChange}
                      required
                      min="1"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter approximate number of children"
                    />
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="md:col-span-2 mt-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Required Documents
                  </h4>
                </div>

                {/* Certificate of Registration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Certificate of Registration *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'certificateOfRegistration')}
                      className="hidden"
                      id="certificate-upload"
                    />
                    <label htmlFor="certificate-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {registrationData.certificateOfRegistration
                          ? registrationData.certificateOfRegistration.name
                          : 'Click to upload certificate'
                        }
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Director's ID Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Director's ID Card *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'directorIdCard')}
                      className="hidden"
                      id="id-card-upload"
                    />
                    <label htmlFor="id-card-upload" className="cursor-pointer">
                      <IdCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {registrationData.directorIdCard
                          ? registrationData.directorIdCard.name
                          : 'Click to upload ID card'
                        }
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Orphanage Pictures */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Orphanage Pictures
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePicturesUpload}
                      className="hidden"
                      id="pictures-upload"
                    />
                    <label htmlFor="pictures-upload" className="cursor-pointer">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click to upload orphanage pictures
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Multiple JPG, PNG files up to 5MB each
                      </p>
                    </label>
                  </div>

                  {/* Display uploaded pictures */}
                  {registrationData.orphanagePictures.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Uploaded Pictures ({registrationData.orphanagePictures.length})
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {registrationData.orphanagePictures.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Camera className="h-6 w-6 text-gray-400" />
                            </div>
                            <button
                              type="button"
                              onClick={() => removePicture(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Register Orphanage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Orphanage Modal */}
      {showViewModal && selectedOrphanage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Orphanage Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Orphanage Content */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{selectedOrphanage.name}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedOrphanage.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedOrphanage.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedOrphanage.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedOrphanage.kids}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Children</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedOrphanage.capacity}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Description</h5>
                  <p className="text-gray-600 dark:text-gray-400">{selectedOrphanage.description}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Needs</h5>
                  <p className="text-gray-600 dark:text-gray-400">{selectedOrphanage.needsDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Status</h5>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedOrphanage.status === 'verified' ? 'bg-green-100 text-green-800' :
                      selectedOrphanage.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedOrphanage.status}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Registration Date</h5>
                    <p className="text-gray-600 dark:text-gray-400">{selectedOrphanage.registrationDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrphanagesManagement;
