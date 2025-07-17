// components/GoogleMap.js
import React, { useEffect, useRef } from 'react';
type MarkerType = {
    lat: number;
    lng: number;
    title?: string;
  };
  
  interface GoogleMapProps {
    center: MarkerType;
    points: MarkerType[];
    height?: string;
  }
const  GoogleMap: React.FC<GoogleMapProps> = ({ center, points, height = '400px' }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 10,
    });

    // Add markers
    points.forEach((point) => {
      new window.google.maps.Marker({
        position: point,
        map,
        title: point.title || '',
      });
    });
  }, [center, points]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default GoogleMap;
