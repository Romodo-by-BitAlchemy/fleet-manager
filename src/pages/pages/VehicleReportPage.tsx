import React, { useState, useRef } from "react";
import DatePickerValue from "../components/DatePickerValue"; // Importing custom DatePicker component
import VehicleTable from "../components/VehicleTable"; // Importing VehicleTable component
 import NavigationBar from "../components/NavigationBar"; // Importing NavigationBar component
import PrintButton from "../components/DownloadButton"; // Importing DownloadButton component

// Define the VehicleReport functional component
const VehicleReport: React.FC = () => {
  // State variables for start and end dates
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // Reference for the table component
  const tableRef = useRef(null);

  // Event handler for start date change
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  // Event handler for end date change
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  // Return the JSX for the VehicleReport component
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      {/* Navigation bar component */}
      <NavigationBar />

      {/* Title */}
      <h1>Vehicle Details Report</h1>

      {/* Date picker components for start and end dates */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
          <DatePickerValue
            label="Start Date"
            selectedDate={startDate}
            onDateChange={handleStartDateChange}
          />
        </div>
        <div style={{ marginRight: "10px" }}>
          <DatePickerValue
            label="End Date"
            selectedDate={endDate}
            onDateChange={handleEndDateChange}
          />
        </div>

        {/* Download button */}
        <div
          style={{
            position: "relative",
            marginRight: "10px",
            marginLeft: "20px",
          }}
        >
          <PrintButton tableRef={tableRef} />
        </div>
      </div>

      {/* VehicleTable component to display vehicle details */}
      <div style={{ marginTop: "10px", width: "calc(100vw - 50px)" }}>
        <VehicleTable
          tableRef={tableRef}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default VehicleReport;
