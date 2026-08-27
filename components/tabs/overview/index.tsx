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
}

export default function OverviewTab({ onViewAllDevices }: OverviewTabProps = {}) {
  return (
    <div className="w-full space-y-6">
      {/* ---------------------------------------------
          TOP METRICS
      --------------------------------------------- */}

      <MetricsGrid />

      {/* ---------------------------------------------
          DEVICE MAP
      --------------------------------------------- */}

      <ProjectLocations />

      {/* ---------------------------------------------
          RECENT DEVICES
      --------------------------------------------- */}

      <RecentDevices />

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