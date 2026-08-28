"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import { MapContainer, GeoJSON, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";

const INDIA_GEOJSON_URL = "https://raw.githubusercontent.com/india-in-data/india-states-2019/master/india_states.geojson";
const KARNATAKA_CENTER: [number, number] = [14.9, 75.7139];

function MapController() {
  const map = useMap();
  useEffect(() => {
    map.setView(KARNATAKA_CENTER, 6.5);
    map.setMaxBounds([[6, 68], [37, 98]]);
    map.setMinZoom(6);
    map.setMaxZoom(10);
  }, [map]);
  return null;
}

const createCustomIcon = (isSafe: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; background-color: ${isSafe ? '#22c55e' : '#ef4444'}; box-shadow: 0 0 10px ${isSafe ? '#22c55e' : '#ef4444'};"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export default function IndiaMap({ installations }: { installations: any[] }) {
  const [indiaGeoJson, setIndiaGeoJson] = useState<any>(null);

  useEffect(() => {
    fetch(INDIA_GEOJSON_URL).then(res => res.json()).then(setIndiaGeoJson).catch(console.error);
  }, []);

  const karnatakaFeature = useMemo(() => {
    if (!indiaGeoJson) return null;
    return indiaGeoJson.features?.find((f: any) => {
      const name = f.properties.st_nm || f.properties.ST_NM;
      return typeof name === "string" && name.toLowerCase() === "karnataka";
    });
  }, [indiaGeoJson]);

  return (
    <div className="w-full h-full relative z-0 bg-neutral-950">
      <MapContainer
        center={KARNATAKA_CENTER}
        zoom={6.5}
        scrollWheelZoom={true}
        className="h-full w-full bg-transparent"
        zoomControl={false}
      >
        <MapController />
        
        {/* Base India Map (No TileLayer, just GeoJSON) */}
        {indiaGeoJson && (
          <GeoJSON
            data={indiaGeoJson}
            style={() => ({
              color: "#333", // Border color
              weight: 1,
              fillColor: "#171717", // Neutral 900
              fillOpacity: 1,
            })}
          />
        )}
        
        {/* Highlighted Karnataka */}
        {karnatakaFeature && (
          <GeoJSON
            key="karnataka"
            data={karnatakaFeature}
            style={() => ({
              color: "#16a34a",
              weight: 2,
              fillColor: "#22c55e",
              fillOpacity: 0.1,
            })}
          />
        )}
        
        {/* Render Installations with HTML DivIcons to ensure they are on top */}
        {installations.map((inst) => {
          if (!inst.lat || !inst.lng) return null;
          const isSafe = inst.status === 'SAFE';
          return (
            <Marker
              key={inst.id}
              position={[inst.lat, inst.lng]}
              icon={createCustomIcon(isSafe)}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="font-sans text-xs font-semibold text-neutral-900">{inst.name}</div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
