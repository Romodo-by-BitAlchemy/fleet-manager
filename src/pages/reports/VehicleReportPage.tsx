import * as React from 'react';
import DatePickerValue from '../../components/DatePickerValue';
import VehicleTable from '../../components/VehicleTable';
// import NavigationBar from '../../components/NavigationBar';
import PrintButton from '../../components/PrintButton';
import { Box, maxWidth } from '@mui/system';
import { useState } from 'react';
import { useRef } from 'react';

const VehicleReport: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);



  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <Box sx ={{ maxWidth:'80vw' }}>
      {/* <NavigationBar /> */}
      <h1>Vehicle Details Report</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          <DatePickerValue
            label="Start Date"
            selectedDate={startDate}
            onDateChange={handleStartDateChange}
          />
        </div>
        <div style={{ marginRight: '10px' }}>
          <DatePickerValue
            label="End Date"
            selectedDate={endDate}
            onDateChange={handleEndDateChange}
          />
        </div>

        <div style={{ position: 'relative', marginRight: '10px', marginLeft: '20px' }}>
          <PrintButton tableRef={tableRef} />
        </div>
      
      </div>
      <div style={{ marginTop: '10px' , width: 'calc(100vw - 50px)'}}>
        <VehicleTable
        tableRef={tableRef}
          rows={[
            { vehicleNo: 'ABC123', vehicleType: 'SUV', registeredDate: '2022-03-01', chassisNo: 'CHS123456', brand: 'Toyota', fuelType: 'Petrol', noOfSeats: 5 } ,
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
            { vehicleNo: 'XYZ456', vehicleType: 'Sedan', registeredDate: '2022-02-15', chassisNo: 'CHS789012', brand: 'Honda', fuelType: 'Diesel', noOfSeats: 4 },
          ]}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </Box>
  );
};

export default VehicleReport;
