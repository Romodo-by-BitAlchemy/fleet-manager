import React, { useState, useRef  } from 'react';
import DatePickerValue from '../components/DatePickerValue';
import DriverTable from '../components/Driver-Table';
import NavigationBar from '../components/NavigationBar';
import PrintButton from '../components/PrintButton';


const DriverReport: React.FC = () => {
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
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto' }}>
      <NavigationBar />
      <h1>Drivers Details Report</h1>
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
      <div style={{ marginTop: '10px' ,width: 'calc(100vw - 50px)' }}>
        <DriverTable
        tableRef={tableRef}
          rows={[
            { 
              firstName: 'John', 
              lastName: 'Doe', 
              nicNo: '123456789V', 
              gender: 'Male', 
              dateOfBirth: '1990-05-15', 
              contactNo: '1234567890', 
              email: 'john.doe@example.com', 
              licenseNo: 'LIC789012', 
              expiryDate: '2025-05-15', 
              medicalIssues: 'None',
              registeredDate: '2022-04-01' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2023-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2021-05-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2023-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2020-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2020-06-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2025-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2022-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2023-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2009-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2010-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2022-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2022-02-15' 
            },
            { 
              firstName: 'Jane', 
              lastName: 'Smith', 
              nicNo: '987654321V', 
              gender: 'Female', 
              dateOfBirth: '1985-10-20', 
              contactNo: '0987654321', 
              email: 'jane.smith@example.com', 
              licenseNo: 'LIC123456', 
              expiryDate: '2024-10-20', 
              medicalIssues: 'Asthma',
              registeredDate: '2022-02-15' 
            },
          ]}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default DriverReport;
