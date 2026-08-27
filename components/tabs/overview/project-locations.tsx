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
import {
  ExternalLink,
  MapPin,
  Radio,
  RotateCcw,
} from "lucide-react";
import { PARENT_MODULES } from "@/components/tabs/devices/parent-modules";
import { ParentModule } from "@/components/tabs/devices/types";

interface ProjectLocationsProps {
  onInspectDevice?: (deviceId: string, parentModuleId?: string) => void;
  onInspectParentModule?: (moduleId: string) => void;
}

/* =========================================================
   INDIA MAP DATA & CENTER
   ========================================================= */

const INDIA_GEOJSON_URL =
  "https://raw.githubusercontent.com/india-in-data/india-states-2019/master/india_states.geojson";

const DEFAULT_MAP_CENTER: [number, number] = [17.5, 76.5];
const DEFAULT_MAP_ZOOM = 5;

/* =========================================================
   MAP CONTROLLER
   ========================================================= */

function MapController({
  selectedGateway,
  gateways,
  resetCounter,
}: {
  selectedGateway?: string | null;
  gateways: ParentModule[];
  resetCounter?: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);

    map.setMaxBounds([
      [-15, 30],
      [50, 130],
    ]);

    map.setMinZoom(4);
    map.setMaxZoom(18);
  }, [map]);

  // Invalidate map size on layout load
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  // Handle auto-zoom to selected gateway or reset back to the default overview
  useEffect(() => {
    if (!selectedGateway) {
      map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, {
        duration: 1.2,
      });
      return;
    }

    const gw = gateways.find((g) => g.id === selectedGateway);
    if (gw && gw.latitude && gw.longitude) {
      map.flyTo([gw.latitude, gw.longitude], 12, {
        duration: 1.4,
      });
    }
  }, [selectedGateway, gateways, map, resetCounter]);

  return null;
}

/* =========================================================
   OLD CIRCULAR MAP ICON (RESTORED)
   ========================================================= */

function createMapIcon(status: string) {
  let color = "#16a34a"; // emerald green

  if (status === "warning") {
    color = "#f59e0b"; // amber
  }

  if (status === "offline" || status === "alert") {
    color = "#dc2626"; // red
  }

  return L.divIcon({
    className: "dhrishti-map-marker",
    html: `
      <div
        style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
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
   MAIN COMPONENT
   ========================================================= */

export default function ProjectLocations({
  onInspectParentModule,
}: ProjectLocationsProps = {}) {
  const [indiaGeoJson, setIndiaGeoJson] = useState<any>(null);
  const [selectedGatewayId, setSelectedGatewayId] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState(0);
  const [mapError, setMapError] = useState(false);

  const gateways = PARENT_MODULES;

  const handleResetMap = () => {
    setSelectedGatewayId(null);
    setResetCounter((prev) => prev + 1);
  };

  /* =======================================================
     LOAD INDIA GEOJSON
     ======================================================= */

  useEffect(() => {
    async function loadIndiaMap() {
      try {
        setMapError(false);
        const response = await fetch(INDIA_GEOJSON_URL);
        if (!response.ok) {
          throw new Error("Unable to load India GeoJSON");
        }
        const data = await response.json();
        setIndiaGeoJson(data);
      } catch (error) {
        console.error("India GeoJSON error:", error);
        setMapError(true);
      }
    }
    loadIndiaMap();
  }, []);

  /* =======================================================
     FIND KARNATAKA IN GEOJSON
     ======================================================= */

  const karnatakaFeature = useMemo(() => {
    if (!indiaGeoJson) return null;
    const feature = indiaGeoJson.features?.find((f: any) => {
      const properties = f.properties || {};
      const stateName =
        properties.st_nm ||
        properties.ST_NM ||
        properties.STNAME ||
        properties.NAME_1 ||
        properties.name;
      return (
        typeof stateName === "string" &&
        stateName.toLowerCase() === "karnataka"
      );
    });
    return feature || null;
  }, [indiaGeoJson]);

  const onlineGateways = gateways.filter((g) => g.status === "online").length;
  const warningGateways = gateways.filter((g) => g.status === "warning").length;

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex flex-col gap-4 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Radio className="size-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              DHRISHTI Parent Modules
            </h2>
            <p className="text-sm text-muted-foreground">
              Tracked parent module locations across Karnataka
            </p>
          </div>
        </div>

        {/* STATUS COUNTS */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">
              {onlineGateways} Online
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">
              {warningGateways} Warning
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
            <span className="text-muted-foreground">
              {gateways.length} Tracked Modules
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================
          BODY: MAP (LEFT) & PARENT MODULES (RIGHT)
      ================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
        {/* MAP ON LEFT */}
        <div className="relative h-[440px] lg:h-auto lg:col-span-7 xl:col-span-8 w-full border-b lg:border-b-0 lg:border-r border-border">
          <MapContainer
            center={DEFAULT_MAP_CENTER}
            zoom={DEFAULT_MAP_ZOOM}
            scrollWheelZoom={true}
            className="h-full w-full min-h-[440px] lg:min-h-[540px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController
              selectedGateway={selectedGatewayId}
              gateways={gateways}
              resetCounter={resetCounter}
            />

            {/* INDIA STATES */}
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

            {/* KARNATAKA HIGHLIGHT */}
            {karnatakaFeature && (
              <GeoJSON
                key="karnataka"
                data={karnatakaFeature}
                style={() => ({
                  color: "#059669",
                  weight: 3,
                  fillColor: "#10b981",
                  fillOpacity: 0.35,
                })}
                onEachFeature={(_, layer) => {
                  layer.bindTooltip("Karnataka", {
                    permanent: true,
                    direction: "center",
                  });
                }}
              />
            )}

            {/* PARENT MODULE MARKERS (OLD CIRCULAR ICONS) */}
            {gateways.map((gw) => (
              <Marker
                key={gw.id}
                position={[gw.latitude, gw.longitude]}
                icon={createMapIcon(gw.status)}
                eventHandlers={{
                  click: () => {
                    setSelectedGatewayId(gw.id);
                  },
                }}
              >
                <Popup>
                  <div className="min-w-[220px] p-1 text-card-foreground">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {gw.name}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          gw.status === "online"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {gw.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="mb-3 text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="size-3 text-emerald-600 shrink-0" />
                      {gw.location}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        onInspectParentModule?.(gw.id);
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
                    >
                      <ExternalLink className="size-3.5" />
                      View Details in Devices Tab
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* REGION CARD */}
          <div className="absolute left-5 top-5 z-[1000]">
            <div className="rounded-xl border border-border bg-card/95 px-4 py-3 shadow-md backdrop-blur">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Deployment Region
              </p>
              <p className="mt-0.5 font-bold text-foreground">
                🇮🇳 India → Karnataka
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {gateways.length} Parent Modules Active
                </span>
              </div>
            </div>
          </div>

          {/* ERROR DISPLAY */}
          {mapError && (
            <div className="absolute right-5 top-5 z-[1000] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              India map boundary data could not be loaded.
            </div>
          )}
        </div>

        {/* ==================================================
            PARENT MODULES LIST (RIGHT)
            CLEAN & MINIMAL: PARENT MODULE NAME + DETAILS BUTTON
        ================================================== */}
        <div className="flex flex-col lg:col-span-5 xl:col-span-4 p-5 lg:p-6 bg-card max-h-[540px] lg:max-h-[600px]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">
                Parent Modules
              </h3>
              <p className="text-xs text-muted-foreground">
                Tracked regional modules in Karnataka
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetMap}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground shadow-2xs"
                title="Reset map view"
              >
                <RotateCcw className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span>Reset View</span>
              </button>

              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {gateways.length} Modules
              </span>
            </div>
          </div>

          {/* Parent Module Cards List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
            {gateways.map((gw) => {
              const isSelected = selectedGatewayId === gw.id;
              const isWarning = gw.status === "warning";

              return (
                <div
                  key={gw.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedGatewayId(gw.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedGatewayId(gw.id);
                    }
                  }}
                  className={`group relative flex items-center justify-between w-full cursor-pointer rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/10 shadow-sm ring-1 ring-emerald-500/30"
                      : "border-border bg-card hover:border-emerald-500/40 hover:bg-muted/40"
                  }`}
                >
                  {/* Parent Module Name & Status */}
                  <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
                    <span
                      className={`size-2.5 rounded-full shrink-0 ${
                        isWarning ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {gw.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {gw.id} · {gw.location}
                      </p>
                    </div>
                  </div>

                  {/* Details Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGatewayId(gw.id);
                      onInspectParentModule?.(gw.id);
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white shadow-2xs"
                    title="View details of this module in Devices tab"
                  >
                    <ExternalLink className="size-3 text-emerald-600 dark:text-emerald-400 group-hover:text-white" />
                    <span>Details</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}