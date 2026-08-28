"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import for react-leaflet components since they don't support SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });
import { useMap } from "react-leaflet";

const INDIA_GEOJSON_URL = "https://raw.githubusercontent.com/india-in-data/india-states-2019/master/india_states.geojson";
const INDIA_CENTER: [number, number] = [22.5, 79.0];

function MapController() {
  const map = useMap();
  useEffect(() => {
    map.setView(INDIA_CENTER, 5);
    map.setMaxBounds([[6, 68], [37, 98]]);
    map.setMinZoom(5);
    map.setMaxZoom(10);
  }, [map]);
  return null;
}

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
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full bg-neutral-900"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <MapController />
        
        {indiaGeoJson && (
          <GeoJSON
            data={indiaGeoJson}
            style={() => ({
              color: "#333",
              weight: 1,
              fillColor: "#111",
              fillOpacity: 0.4,
            })}
          />
        )}
        
        {karnatakaFeature && (
          <GeoJSON
            key="karnataka"
            data={karnatakaFeature}
            style={() => ({
              color: "#16a34a",
              weight: 2,
              fillColor: "#22c55e",
              fillOpacity: 0.2,
            })}
          />
        )}
      </MapContainer>
    </div>
  );
}
