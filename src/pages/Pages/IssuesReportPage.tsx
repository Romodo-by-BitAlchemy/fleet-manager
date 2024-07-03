//Pages/IssuesReportPage.tsx
import { useState, useRef } from "react";
import DatePickerValue from "../Components/DatePickerValue"; // Adjust path as per your structure
import IssuesTable from "../Components/IssuesTable"; // Adjust path as per your structure
import NavigationBar from "../Components/NavigationBar"; // Adjust path as per your structure
import PrintButton from "../Components/DownloadButton"; // Adjust path as per your structure
import React from "react";

const IssuesReport = () => {
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
      <h1>Issue Details Report</h1>
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
        <IssuesTable tableRef={tableRef} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default IssuesReport;
