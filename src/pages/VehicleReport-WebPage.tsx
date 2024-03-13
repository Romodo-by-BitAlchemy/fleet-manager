//VehicleReport-WebPage.tsx
import * as React from 'react';
import { useState } from 'react';
import DatePickerValue from '../components/DatePickerValue';
import VehicleTable from '../components/Vehicle-Table';

const VehicleReport: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div>
      <h1>Vehicle Report</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
        <DatePickerValue
          label="Start Date"
          selectedDate={startDate}
          onDateChange={handleStartDateChange}
        />
        </div>
        <div style={{ marginRight: '20px' }}>
        <DatePickerValue
          label="End Date"
          selectedDate={endDate}
          onDateChange={handleEndDateChange}
        />
      </div>
      </div>
      {startDate && endDate ? (
        <div style={{ marginRight: '40px' }}>
          <h2>Vehicle Details</h2>
          <VehicleTable startDate={startDate} endDate={endDate} />
        </div>
      ) : (
        
        <VehicleTable/>
       
      )}
    </div>
  );
};

export default VehicleReport;