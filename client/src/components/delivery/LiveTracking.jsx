import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function LiveTracking({ orders }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [deliveryLocations, setDeliveryLocations] = useState([]);

  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );

    // Simulate delivery locations - replace with actual data
    setDeliveryLocations(orders.map(order => ({
      id: order._id,
      lat: order.shippingInfo.location.latitude,
      lng: order.shippingInfo.location.longitude,
      address: order.shippingInfo.address
    })));
  }, [orders]);

  if (!currentLocation) {
    return <div className="h-full flex items-center justify-center">Loading map...</div>;
  }

  return (
    <MapContainer 
      center={[currentLocation.lat, currentLocation.lng]} 
      zoom={13} 
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Current location marker */}
      <Marker position={[currentLocation.lat, currentLocation.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
      
      {/* Delivery locations */}
      {deliveryLocations.map(location => (
        <Marker key={location.id} position={[location.lat, location.lng]}>
          <Popup>{location.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}