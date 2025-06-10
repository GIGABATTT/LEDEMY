
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Menu, Heart } from 'lucide-react';

interface NearbyPharmaciesProps {
  onBackToDashboard: () => void;
}

interface Pharmacy {
  id: string;
  name: string;
  hours: string;
  phone: string;
  isOpen: boolean;
  coordinates: [number, number];
}

const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Farmácia Pague Menos',
    hours: 'Aberto até às 19h',
    phone: '1234-5678',
    isOpen: true,
    coordinates: [-38.4987, -12.9703]
  },
  {
    id: '2',
    name: 'Drogaria São Paulo',
    hours: 'Aberto 24h',
    phone: '9876-5432',
    isOpen: true,
    coordinates: [-38.5012, -12.9720]
  },
  {
    id: '3',
    name: 'Farmácia Nissei',
    hours: 'Fechado - Abre às 8h',
    phone: '5555-1234',
    isOpen: false,
    coordinates: [-38.4965, -12.9685]
  },
  {
    id: '4',
    name: 'Drogasil',
    hours: 'Aberto até às 22h',
    phone: '7777-8888',
    isOpen: true,
    coordinates: [-38.5025, -12.9740]
  },
  {
    id: '5',
    name: 'Farmácia Popular',
    hours: 'Aberto até às 18h',
    phone: '3333-4444',
    isOpen: true,
    coordinates: [-38.4945, -12.9665]
  }
];

export const NearbyPharmacies: React.FC<NearbyPharmaciesProps> = ({ onBackToDashboard }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-38.4987, -12.9703], // Itaigara, Salvador, BA
      zoom: 14,
    });

    // Add markers for each pharmacy
    pharmacies.forEach((pharmacy) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'pharmacy-marker';
      markerElement.innerHTML = `
        <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-red-600 transition-colors shadow-lg">
          +
        </div>
      `;
      
      markerElement.addEventListener('click', () => {
        setSelectedPharmacy(pharmacy);
      });

      new mapboxgl.Marker(markerElement)
        .setLngLat(pharmacy.coordinates)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className="w-full max-w-[412px] mx-auto h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <ArrowLeft 
            className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onBackToDashboard}
          />
        </div>
        <div>
          <Menu className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
      </header>

      {/* Location Input */}
      <div className="p-4">
        <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
          <Heart className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">Informe sua região</span>
        </div>
      </div>

      {/* Mapbox Token Input (temporary) */}
      {!mapboxToken && (
        <div className="p-4 bg-yellow-50 border border-yellow-200">
          <p className="text-sm text-yellow-800 mb-2">
            Para visualizar o mapa, insira seu token público do Mapbox:
          </p>
          <input
            type="text"
            placeholder="Seu token público do Mapbox"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-gray-600 mt-1">
            Obtenha em: https://mapbox.com/
          </p>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="w-full h-full" />
        
        {!mapboxToken && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-600">Mapa será exibido aqui</p>
              <p className="text-sm text-gray-500">Itaigara, Salvador - BA</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Pharmacy Info */}
      {selectedPharmacy && (
        <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            {selectedPharmacy.name}
          </h3>
          <div className="space-y-1">
            <p className="text-gray-700">
              <span className="font-medium">Horário:</span> {selectedPharmacy.hours}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contato:</span> {selectedPharmacy.phone}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div 
                className={`w-3 h-3 rounded-full ${
                  selectedPharmacy.isOpen ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className={`text-sm font-medium ${
                selectedPharmacy.isOpen ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedPharmacy.isOpen ? 'Aberto' : 'Fechado'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
