
import { useState, useEffect } from 'react';
import './App.css';

const KOLKATA_CENTER = { lat: 22.5726, lng: 88.3639 };

const places = [
  {
    name: 'Victoria Memorial',
    position: { lat: 22.5448, lng: 88.3426 },
    details: 'A large marble building and museum, dedicated to Queen Victoria.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Victoria_Memorial%2C_Kolkata.jpg',
  },
  {
    name: 'Howrah Bridge',
    position: { lat: 22.5850, lng: 88.3468 },
    details: 'An iconic cantilever bridge over the Hooghly River.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Howrah_bridge_at_night.jpg',
  },
  {
    name: 'Indian Museum',
    position: { lat: 22.5626, lng: 88.3507 },
    details: 'The largest and oldest museum in India, founded in 1814.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Indian_Museum%2C_Kolkata.jpg',
  },
];

const API_KEY = import.meta.env.VITE_API_KEY;

function loadGoogleMapsScript(callback) {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
}


function App() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: KOLKATA_CENTER,
        zoom: 13,
      });
      setMap(mapInstance);
    });
  }, []);

  useEffect(() => {
    if (!map || !window.google) return;
    const infoWindow = new window.google.maps.InfoWindow();
    places.forEach((place) => {
      const marker = new window.google.maps.Marker({
        position: place.position,
        map,
        title: place.name,
      });
      marker.addListener('click', () => {
        const html = `
          <div style='max-width:250px; background:white; color:black;'>
            <h2 style='color:black;'>${place.name}</h2>
            <img src='${place.image}' alt='${place.name}' style='width:100%;border-radius:4px;margin-bottom:8px;' onerror="this.onerror=null;this.src='https://via.placeholder.com/250x150?text=Image+Not+Found';" />
            <p style='color:black;'>${place.details}</p>
          </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    });
  }, [map]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

export default App;
