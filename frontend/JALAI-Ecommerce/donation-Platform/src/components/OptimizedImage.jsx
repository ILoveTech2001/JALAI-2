import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  placeholder = '/placeholder.jpg',
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-xs">Loading...</div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imageError ? placeholder : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default OptimizedImage;
