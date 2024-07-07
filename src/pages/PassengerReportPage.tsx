import { useState, useRef } from "react";
import DatePickerValue from "../components/DatePickerValue"; // Adjust path as per your structure
import PassengersTable from "../components/PassengerTable"; // Adjust path as per your structure
 import NavigationBar from "../components/NavigationBar"; // Adjust path as per your structure
import PrintButton from "../components/DownloadButton"; // Adjust path as per your structure
// import React from "react";

const PassengersReport = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const tableRef = useRef(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date || null);
  };
  
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date || null);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
      <NavigationBar />
      <h1>Passenger Details Report</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
          <DatePickerValue label="Start Date" selectedDate={startDate} onDateChange={handleStartDateChange} />
        </div>
        <div style={{ marginRight: "10px" }}>
          <DatePickerValue label="End Date" selectedDate={endDate} onDateChange={handleEndDateChange} />
        </div>
        <div style={{ position: "relative", marginRight: "10px", marginLeft: "20px" }}>
          <PrintButton tableRef={tableRef} />
        </div>
      </div>
      <div style={{ marginTop: "10px", width: "calc(100vw - 50px)" }}>
        <PassengersTable tableRef={tableRef} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default PassengersReport;
