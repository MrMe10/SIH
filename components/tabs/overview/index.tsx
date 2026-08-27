"use client";

import dynamic from "next/dynamic";
import MetricsGrid from "./metrics-grid";
import RecentDevices from "./recent-devices";

const ProjectLocations = dynamic(() => import("./project-locations"), {
  ssr: false,
});
// import SensorActivityChart from "./sensor-activity-chart";
// import SensorAlerts from "./sensor-alerts";
// import SensorHealth from "./sensor-health";

interface OverviewTabProps {
  onViewAllDevices?: () => void;
  onInspectDevice?: (deviceId: string, parentModuleId?: string) => void;
  onInspectParentModule?: (moduleId: string) => void;
}

export default function OverviewTab({
  onViewAllDevices,
  onInspectDevice,
  onInspectParentModule,
}: OverviewTabProps = {}) {
  return (
    <div className="w-full space-y-6">
      {/* ---------------------------------------------
          TOP METRICS
      --------------------------------------------- */}

      <MetricsGrid />

      {/* ---------------------------------------------
          MAP (LEFT) & KARNATAKA DEVICE MENU (RIGHT)
      --------------------------------------------- */}

      <ProjectLocations
        onInspectDevice={onInspectDevice}
        onInspectParentModule={onInspectParentModule}
      />

      {/* ---------------------------------------------
          RECENT DEVICES
      --------------------------------------------- */}

      <RecentDevices
        onViewAll={onViewAllDevices}
        onInspectDevice={onInspectDevice}
      />

      {/* ---------------------------------------------
          SENSOR ACTIVITY
      --------------------------------------------- */}

      {/* <SensorActivityChart /> */}

      {/* ---------------------------------------------
          ALERTS + SENSOR HEALTH
      --------------------------------------------- */}
{/* 
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SensorAlerts />

        <SensorHealth />
      </div> */}
    </div>
  );
}