
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Menu, Search } from 'lucide-react';

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
  region: string;
}

interface Region {
  name: string;
  coordinates: [number, number];
  zoom: number;
}

const regions: Region[] = [
  { name: 'Itaigara', coordinates: [-38.4987, -12.9703], zoom: 15 },
  { name: 'Barra', coordinates: [-38.5167, -13.0067], zoom: 15 },
  { name: 'Pituba', coordinates: [-38.4700, -12.9800], zoom: 15 },
  { name: 'Ondina', coordinates: [-38.5100, -13.0100], zoom: 15 },
  { name: 'Rio Vermelho', coordinates: [-38.4950, -13.0050], zoom: 15 },
  { name: 'Pelourinho', coordinates: [-38.5108, -12.9714], zoom: 16 },
  { name: 'Campo Grande', coordinates: [-38.5200, -12.9600], zoom: 15 },
  { name: 'Brotas', coordinates: [-38.4800, -12.9500], zoom: 15 }
];

const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Farmácia Pague Menos',
    hours: 'Aberto até às 19h',
    phone: '1234-5678',
    isOpen: true,
    coordinates: [-38.4987, -12.9703],
    region: 'Itaigara'
  },
  {
    id: '2',
    name: 'Drogaria São Paulo',
    hours: 'Aberto 24h',
    phone: '9876-5432',
    isOpen: true,
    coordinates: [-38.5167, -13.0067],
    region: 'Barra'
  },
  {
    id: '3',
    name: 'Farmácia Nissei',
    hours: 'Fechado - Abre às 8h',
    phone: '5555-1234',
    isOpen: false,
    coordinates: [-38.4700, -12.9800],
    region: 'Pituba'
  },
  {
    id: '4',
    name: 'Drogasil',
    hours: 'Aberto até às 22h',
    phone: '7777-8888',
    isOpen: true,
    coordinates: [-38.5100, -13.0100],
    region: 'Ondina'
  },
  {
    id: '5',
    name: 'Farmácia Popular',
    hours: 'Aberto até às 18h',
    phone: '3333-4444',
    isOpen: true,
    coordinates: [-38.4950, -13.0050],
    region: 'Rio Vermelho'
  },
  {
    id: '6',
    name: 'Farmácia Central',
    hours: 'Aberto até às 20h',
    phone: '2222-3333',
    isOpen: true,
    coordinates: [-38.5108, -12.9714],
    region: 'Pelourinho'
  },
  {
    id: '7',
    name: 'Drogaria Campo Grande',
    hours: 'Aberto até às 21h',
    phone: '4444-5555',
    isOpen: true,
    coordinates: [-38.5200, -12.9600],
    region: 'Campo Grande'
  },
  {
    id: '8',
    name: 'Farmácia Brotas',
    hours: 'Aberto até às 18h',
    phone: '6666-7777',
    isOpen: true,
    coordinates: [-38.4800, -12.9500],
    region: 'Brotas'
  }
];

export const NearbyPharmacies: React.FC<NearbyPharmaciesProps> = ({ onBackToDashboard }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [searchRegion, setSearchRegion] = useState('');
  const [filteredRegions, setFilteredRegions] = useState<Region[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-38.5014, -12.9714], // Centro de Salvador
      zoom: 11, // Zoom para ver toda Salvador
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Initially show all pharmacies
    showPharmaciesForRegion('all');

    return () => {
      clearMarkers();
      map.current?.remove();
    };
  }, [mapboxToken]);

  const clearMarkers = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
  };

  const showPharmaciesForRegion = (regionName: string) => {
    if (!map.current) return;

    clearMarkers();

    const pharmaciesToShow = regionName === 'all' 
      ? pharmacies 
      : pharmacies.filter(pharmacy => pharmacy.region.toLowerCase() === regionName.toLowerCase());

    pharmaciesToShow.forEach((pharmacy) => {
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

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(pharmacy.coordinates)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  };

  const handleRegionSearch = (value: string) => {
    setSearchRegion(value);
    
    if (value.length > 0) {
      const filtered = regions.filter(region => 
        region.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRegions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredRegions([]);
      setShowSuggestions(false);
    }
  };

  const handleRegionSelect = (region: Region) => {
    if (!map.current) return;

    setSearchRegion(region.name);
    setSelectedRegion(region.name);
    setShowSuggestions(false);

    // Zoom to the selected region
    map.current.flyTo({
      center: region.coordinates,
      zoom: region.zoom,
      duration: 2000
    });

    // Show pharmacies for this region
    showPharmaciesForRegion(region.name);
  };

  const handleShowAllRegions = () => {
    if (!map.current) return;

    setSearchRegion('');
    setSelectedRegion('');
    setShowSuggestions(false);

    // Zoom out to show all Salvador
    map.current.flyTo({
      center: [-38.5014, -12.9714],
      zoom: 11,
      duration: 2000
    });

    // Show all pharmacies
    showPharmaciesForRegion('all');
  };

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

      {/* Region Search */}
      <div className="p-4">
        <div className="relative">
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Digite a região de Salvador (ex: Barra, Itaigara)"
              value={searchRegion}
              onChange={(e) => handleRegionSearch(e.target.value)}
              onFocus={() => searchRegion.length > 0 && setShowSuggestions(true)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Suggestions */}
          {showSuggestions && filteredRegions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
              {filteredRegions.map((region) => (
                <div
                  key={region.name}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleRegionSelect(region)}
                >
                  <span className="text-gray-700">{region.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Show All Button */}
        {selectedRegion && (
          <button
            onClick={handleShowAllRegions}
            className="mt-2 text-blue-600 text-sm underline"
          >
            Ver todas as regiões de Salvador
          </button>
        )}

        {/* Current Region Display */}
        {selectedRegion && (
          <div className="mt-2 text-sm text-gray-600">
            Mostrando farmácias em: <span className="font-semibold text-blue-600">{selectedRegion}</span>
          </div>
        )}
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
              <p className="text-gray-600">Mapa de Salvador será exibido aqui</p>
              <p className="text-sm text-gray-500">Digite uma região para buscar farmácias</p>
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
              <span className="font-medium">Região:</span> {selectedPharmacy.region}
            </p>
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
