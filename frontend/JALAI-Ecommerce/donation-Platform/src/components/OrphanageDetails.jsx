import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Users,
  Heart,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import apiService from '../services/apiService';

const OrphanageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orphanage, setOrphanage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchOrphanageDetails();
  }, [id]);

  const fetchOrphanageDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.getOrphanage(id);
      console.log('Orphanage details response:', response);

      if (response && response.data) {
        setOrphanage(response.data);
      } else if (response) {
        setOrphanage(response);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching orphanage details:', error);
      setError('Failed to load orphanage details');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (orphanage?.images) {
      setCurrentImageIndex((prev) =>
        prev === orphanage.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (orphanage?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? orphanage.images.length - 1 : prev - 1
      );
    }
  };

  const openInMaps = () => {
    if (orphanage?.coordinates) {
      const { lat, lng } = orphanage.coordinates;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !orphanage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-lg border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-600 mb-4">{error || 'Orphanage not found'}</p>
              <Button onClick={() => navigate('/dashboard')} className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-green-800">{orphanage.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <Card className="shadow-lg border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={orphanage.images?.[currentImageIndex] || orphanage.imageUrl || '/assets/orphanage-default.jpg'}
                  alt={`${orphanage.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation Arrows */}
                {orphanage.images && orphanage.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {orphanage.images && orphanage.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {orphanage.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {orphanage.images && orphanage.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {orphanage.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-green-500 ring-2 ring-green-200'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orphanage Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="shadow-lg border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-green-800">About {orphanage.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{orphanage.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-800">{orphanage.currentChildren}</p>
                    <p className="text-sm text-blue-600">Children</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-800">{orphanage.capacity}</p>
                    <p className="text-sm text-green-600">Capacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-green-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">{orphanage.location}</p>
                    {orphanage.coordinates && (
                      <button
                        onClick={openInMaps}
                        className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1 mt-1"
                      >
                        View on Map <ExternalLink className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>

                {orphanage.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{orphanage.contactPhone}</p>
                      <p className="text-sm text-gray-600">Phone</p>
                    </div>
                  </div>
                )}

                {orphanage.contactEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">{orphanage.contactEmail}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Established {new Date(orphanage.createdAt).getFullYear()}
                    </p>
                    <p className="text-sm text-gray-600">Year founded</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Needs Section */}
        <Card className="shadow-lg border border-white/50 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-green-800">Current Needs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-6">{orphanage.needsDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate(`/donate?orphanage=${orphanage.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105"
              >
                <Heart className="h-5 w-5" />
                Make a Donation
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(`mailto:${orphanage.contactEmail}?subject=Inquiry about ${orphanage.name}`, '_blank')}
                className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Directly
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrphanageDetails;
