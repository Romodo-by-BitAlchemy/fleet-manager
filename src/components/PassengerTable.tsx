import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import dayjs from 'dayjs';
import { styled } from "@mui/material/styles";


// Styled TableCell component for header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#BDBDBD",
  color: theme.palette.common.black,
  fontWeight: '700',
  fontSize: '0.875rem',
  height: '40px',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Define the interface for column configuration
interface Column {
  id: string;
  label: string;
  minWidth?: number;
}

// Define the columns for the table
// Define the columns for the table
const columns: readonly Column[] = [
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'nicNo', label: 'NIC No', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 170 },
  { id: 'contactNo', label: 'Contact No', minWidth: 170 },
  { id: 'serviceNo', label: 'Service No', minWidth: 170 },
  { id: 'isInternal', label: 'Internal/External', minWidth: 170 }, // Adjusted to match the data structure
  { id: 'createdAt', label: "Registered Date",  minWidth: 170 },
  { id: 'updatedAt', label: "Updated Date", minWidth: 170 },
];

// Define the data interface for table rows
// Define the data interface for table rows
interface Data {
  email: string;
  firstName: string;
  lastName: string;
  nicNo: string;
  gender: string;
  contactNo: string;
  serviceNo: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the props interface for the PassengersTable component
// Define the props interface for the PassengersTable component
interface PassengersTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  startDate: Date | null;
  endDate: Date | null;
}

// Define the PassengersTable component
const PassengersTable: React.FC<PassengersTableProps> = ({ tableRef, startDate, endDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [passengers, setPassengers] = useState<Data[]>([]);

  // Fetch passenger data from the server
  const fetchPassengers = () => {
    axios
      .get("http://localhost:3000/api/passengers")
      .then((response) => setPassengers(response.data))
      .catch((err) => {
        console.error("Error fetching passengers:", err);
      });
  };

  useEffect(() => {
    fetchPassengers();

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchPassengers();
    }, 5000);

    // Cleanup interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Filter rows based on the selected date range
  const filteredRows = passengers.filter((row) => {
    const registeredDate = dayjs(row.createdAt); // Convert to Dayjs object for comparison
    return (
      (!startDate || registeredDate >= dayjs(startDate)) &&
      (!endDate || registeredDate <= dayjs(endDate))
    );
  });

  // Event handler for changing the page
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Event handler for changing the number of rows per page
  // Event handler for changing the number of rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return {
      date: date.format('YYYY-MM-DD'),
      time: date.format('HH:mm:ss'),
    };
  };

  // Render the PassengersTable component
  // Render the PassengersTable component
  return (
    
    <Paper sx={{ maxWidth: '100%', maxHeight: '100%' }}>
      <TableContainer sx={{ maxHeight: '100%', maxWidth: '100%' }}>
        <Table stickyHeader aria-label="sticky table" ref={tableRef}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} style={{ minWidth: column.minWidth }}>
                {column.label}
              </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
                <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.nicNo}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.contactNo}</TableCell>
                  <TableCell>{row.serviceNo}</TableCell>
                  <TableCell>{row.isInternal ? 'Internal' : 'External'}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(row.createdAt).date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(row.updatedAt).date}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PassengersTable;
