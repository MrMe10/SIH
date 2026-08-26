"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type SensorStatus = "online" | "warning" | "alert";

interface Sensor {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  gasLevel: number;
  status: SensorStatus;
}

/* =========================================================
   DHRISHTI KARNATAKA DEVICES
   ========================================================= */

const sensors: Sensor[] = [
  {
    id: "DR-001",
    location: "Mangalore, Karnataka",
    latitude: 12.9141,
    longitude: 74.856,
    temperature: 27,
    humidity: 62,
    gasLevel: 18,
    status: "online",
  },

  {
    id: "DR-002",
    location: "Udupi, Karnataka",
    latitude: 13.3409,
    longitude: 74.7421,
    temperature: 29,
    humidity: 65,
    gasLevel: 24,
    status: "online",
  },

  {
    id: "DR-003",
    location: "Bengaluru, Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    temperature: 34,
    humidity: 78,
    gasLevel: 62,
    status: "warning",
  },

  {
    id: "DR-004",
    location: "Mysuru, Karnataka",
    latitude: 12.2958,
    longitude: 76.6394,
    temperature: 26,
    humidity: 60,
    gasLevel: 16,
    status: "online",
  },

  {
    id: "DR-005",
    location: "Hubballi, Karnataka",
    latitude: 15.3647,
    longitude: 75.124,
    temperature: 30,
    humidity: 67,
    gasLevel: 28,
    status: "online",
  },

  {
    id: "DR-006",
    location: "Belagavi, Karnataka",
    latitude: 15.8497,
    longitude: 74.4977,
    temperature: 32,
    humidity: 72,
    gasLevel: 45,
    status: "warning",
  },

  {
    id: "DR-007",
    location: "Shivamogga, Karnataka",
    latitude: 13.9299,
    longitude: 75.5681,
    temperature: 28,
    humidity: 69,
    gasLevel: 20,
    status: "online",
  },

  {
    id: "DR-008",
    location: "Kalaburagi, Karnataka",
    latitude: 17.3297,
    longitude: 76.8343,
    temperature: 31,
    humidity: 73,
    gasLevel: 32,
    status: "online",
  },
];

/* =========================================================
   INDIA MAP DATA
   ========================================================= */

const INDIA_GEOJSON_URL =
  "https://raw.githubusercontent.com/india-in-data/india-states-2019/master/india_states.geojson";

/* =========================================================
   INDIA MAP CENTER
   ========================================================= */

const INDIA_CENTER: [number, number] = [
  22.5,
  79.0,
];

/* =========================================================
   MAP CONTROLLER
   ========================================================= */

function MapController() {
  const map = useMap();

  useEffect(() => {
    map.setView(INDIA_CENTER, 5);

    map.setMaxBounds([
      [6, 68],
      [37, 98],
    ]);

    map.setMinZoom(5);
    map.setMaxZoom(10);
  }, [map]);

  return null;
}

/* =========================================================
   SENSOR ICON
   ========================================================= */

function createSensorIcon(status: SensorStatus) {
  let color = "#16a34a";

  if (status === "warning") {
    color = "#f59e0b";
  }

  if (status === "alert") {
    color = "#dc2626";
  }

  return L.divIcon({
    className: "dhrishti-sensor-marker",

    html: `
      <div
        style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: 700;
        "
      >
        ●
      </div>
    `,

    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

/* =========================================================
   STATUS
   ========================================================= */

function getStatusColor(status: SensorStatus) {
  if (status === "alert") {
    return "#dc2626";
  }

  if (status === "warning") {
    return "#d97706";
  }

  return "#15803d";
}

function getStatusText(status: SensorStatus) {
  if (status === "alert") {
    return "Alert";
  }

  if (status === "warning") {
    return "Warning";
  }

  return "Online";
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function ProjectLocations() {
  const [indiaGeoJson, setIndiaGeoJson] =
    useState<any>(null);

  const [selectedSensor, setSelectedSensor] =
    useState<string | null>(null);

  const [mapError, setMapError] =
    useState(false);

  /* =======================================================
     LOAD INDIA GEOJSON
     ======================================================= */

  useEffect(() => {
    async function loadIndiaMap() {
      try {
        setMapError(false);

        const response = await fetch(
          INDIA_GEOJSON_URL
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load India GeoJSON"
          );
        }

        const data = await response.json();

        setIndiaGeoJson(data);
      } catch (error) {
        console.error(
          "India GeoJSON error:",
          error
        );

        setMapError(true);
      }
    }

    loadIndiaMap();
  }, []);

  /* =======================================================
     FIND KARNATAKA
     ======================================================= */

  const karnatakaFeature = useMemo(() => {
    if (!indiaGeoJson) {
      return null;
    }

    const feature =
      indiaGeoJson.features?.find(
        (feature: any) => {
          const properties =
            feature.properties || {};

          const stateName =
            properties.st_nm ||
            properties.ST_NM ||
            properties.STNAME ||
            properties.NAME_1 ||
            properties.name;

          return (
            typeof stateName === "string" &&
            stateName.toLowerCase() ===
              "karnataka"
          );
        }
      );

    return feature || null;
  }, [indiaGeoJson]);

  /* =======================================================
     ONLY KARNATAKA DEVICES
     ======================================================= */

  const karnatakaSensors = useMemo(() => {
    return sensors.filter((sensor) =>
      sensor.location
        .toLowerCase()
        .includes("karnataka")
    );
  }, []);

  /* =======================================================
     COUNTS
     ======================================================= */

  const onlineCount =
    karnatakaSensors.filter(
      (sensor) =>
        sensor.status === "online"
    ).length;

  const warningCount =
    karnatakaSensors.filter(
      (sensor) =>
        sensor.status === "warning"
    ).length;

  const alertCount =
    karnatakaSensors.filter(
      (sensor) =>
        sensor.status === "alert"
    ).length;

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
            <span className="text-xl">
              📍
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              DHRISHTI Device Map
            </h2>

            <p className="text-sm text-gray-500">
              India → Karnataka sensor deployment
            </p>
          </div>

        </div>

        {/* STATUS */}

        <div className="flex flex-wrap items-center gap-4 text-xs">

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

            <span className="text-gray-600">
              {onlineCount} Online
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

            <span className="text-gray-600">
              {warningCount} Warning
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600" />

            <span className="text-gray-600">
              {alertCount} Alert
            </span>
          </div>

        </div>
      </div>

      {/* ==================================================
          MAP
      ================================================== */}

      <div className="relative h-[520px] w-full">

        <MapContainer
          center={INDIA_CENTER}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          {/* OpenStreetMap */}

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController />

          {/* =================================================
              INDIA STATES
          ================================================= */}

          {indiaGeoJson && (
            <GeoJSON
              data={indiaGeoJson}
              style={() => ({
                color: "#94a3b8",
                weight: 1,
                fillColor: "#f8fafc",
                fillOpacity: 0.45,
              })}
            />
          )}

          {/* =================================================
              KARNATAKA
          ================================================= */}

          {karnatakaFeature && (
            <GeoJSON
              key="karnataka"
              data={karnatakaFeature}
              style={() => ({
                color: "#15803d",
                weight: 3,
                fillColor: "#22c55e",
                fillOpacity: 0.35,
              })}
              onEachFeature={(_, layer) => {
                layer.bindTooltip(
                  "Karnataka",
                  {
                    permanent: true,
                    direction: "center",
                  }
                );
              }}
            />
          )}

          {/* =================================================
              DEVICES
              ONLY KARNATAKA DEVICES
          ================================================= */}

          {karnatakaSensors.map(
            (sensor) => (
              <Marker
                key={sensor.id}
                position={[
                  sensor.latitude,
                  sensor.longitude,
                ]}
                icon={createSensorIcon(
                  sensor.status
                )}
                eventHandlers={{
                  click: () => {
                    setSelectedSensor(
                      sensor.id
                    );
                  },
                }}
              >

                <Popup>

                  <div className="min-w-[220px]">

                    <div className="mb-2 flex items-center justify-between">

                      <h3 className="font-semibold text-gray-900">
                        {sensor.id}
                      </h3>

                      <span
                        className="text-xs font-semibold"
                        style={{
                          color:
                            getStatusColor(
                              sensor.status
                            ),
                        }}
                      >
                        {getStatusText(
                          sensor.status
                        )}
                      </span>

                    </div>

                    <p className="mb-4 text-xs text-gray-500">
                      {sensor.location}
                    </p>

                    <div className="grid grid-cols-2 gap-2">

                      <div className="rounded-lg bg-gray-50 p-2">
                        <p className="text-[11px] text-gray-500">
                          Temperature
                        </p>

                        <p className="font-semibold text-gray-900">
                          {sensor.temperature}°C
                        </p>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-2">
                        <p className="text-[11px] text-gray-500">
                          Humidity
                        </p>

                        <p className="font-semibold text-gray-900">
                          {sensor.humidity}%
                        </p>
                      </div>

                      <div className="col-span-2 rounded-lg bg-gray-50 p-2">
                        <p className="text-[11px] text-gray-500">
                          Gas Level
                        </p>

                        <p className="font-semibold text-gray-900">
                          {sensor.gasLevel}
                        </p>
                      </div>

                    </div>

                  </div>

                </Popup>

              </Marker>
            )
          )}

        </MapContainer>

        {/* =================================================
            REGION CARD
        ================================================= */}

        <div className="absolute left-5 top-5 z-[1000]">

          <div className="rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Deployment Region
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              🇮🇳 India
            </p>

            <div className="mt-1 flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

              <span className="text-sm font-medium text-green-700">
                Karnataka
              </span>

            </div>

            <p className="mt-1 text-xs text-gray-500">
              {karnatakaSensors.length} devices deployed
            </p>

          </div>

        </div>

        {/* =================================================
            LEGEND
        ================================================= */}

        <div className="absolute bottom-5 left-5 z-[1000]">

          <div className="rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">

            <p className="mb-2 text-xs font-semibold text-gray-700">
              Device Status
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-gray-600">

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                Online
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Warning
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                Alert
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {mapError && (

          <div className="absolute right-5 top-5 z-[1000] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">

            India map boundary data could not be loaded.

          </div>

        )}

      </div>

      {/* ==================================================
          KARNATAKA DEVICE LIST
      ================================================== */}

      <div className="border-t border-gray-100 px-6 py-5">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-gray-900">
              Karnataka Devices
            </h3>

            <p className="text-sm text-gray-500">
              DHRISHTI devices deployed only in Karnataka
            </p>

          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {karnatakaSensors.length} Devices
          </span>

        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {karnatakaSensors.map(
            (sensor) => {

              const selected =
                selectedSensor ===
                sensor.id;

              return (
                <button
                  key={sensor.id}
                  type="button"
                  onClick={() =>
                    setSelectedSensor(
                      sensor.id
                    )
                  }
                  className={`rounded-xl border p-3 text-left transition ${
                    selected
                      ? "border-green-500 bg-green-50"
                      : "border-gray-100 bg-gray-50 hover:border-gray-200"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-900">
                      {sensor.id}
                    </span>

                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          getStatusColor(
                            sensor.status
                          ),
                      }}
                    />

                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    {sensor.location}
                  </p>

                  <div className="mt-3 flex gap-3 text-xs text-gray-600">

                    <span>
                      🌡️ {sensor.temperature}°C
                    </span>

                    <span>
                      💧 {sensor.humidity}%
                    </span>

                  </div>

                </button>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
}