"use client";

import MetricsGrid from "./metrics-grid";
import ProjectLocations from "./project-locations";
import RecentDevices from "./recent-devices";
// import SensorActivityChart from "./sensor-activity-chart";
// import SensorAlerts from "./sensor-alerts";
// import SensorHealth from "./sensor-health";

export default function OverviewTab() {
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