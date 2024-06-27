import * as React from 'react';
import DatePickerValue from '../../components/DatePickerValue';
import PassengersTable from '../../components/PassengerTable';
// import NavigationBar from '../../components/NavigationBar';
import PrintButton from '../../components/PrintButton';
import { Box, maxWidth } from '@mui/system';
import { useState } from 'react';
import { useRef } from 'react';

const PassengersReport: React.FC = () => {
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
    <h1>Passenger Details Report</h1>
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
    
      <div style={{ marginTop: '10px',width: 'calc(100vw - 50px)' }}>
      <PassengersTable
       tableRef={tableRef}
  rows={[
    { 
      email: 'joh@example.com',
      firstName: 'John', 
      lastName: 'Doe', 
      nicNo: '123456789V', 
      gender: 'Male', 
      dateOfBirth: '1990-05-15', 
      contactNo: '1234567890', 
      serviceNo: 'SRV123456', 
      isInternal: true, 
      companyName: 'Example Company', 
      registeredDate: '2022-03-01' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: '789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: '789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15',
     
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },
    { 
      email: 'jan@example.com',
      firstName: 'Jane', 
      lastName: 'Smith', 
      nicNo: '987654321V', 
      gender: 'Female', 
      dateOfBirth: '1985-10-20', 
      contactNo: '0987654321', 
      serviceNo: 'SRV789012', 
      isInternal: false, 
      registeredDate: '2022-02-15' 
    },

    
  ]}
  startDate={startDate}
  endDate={endDate}
/>
      </div>
    </Box>
  );
};

export default PassengersReport;





