import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from "axios";
import dayjs from 'dayjs';

// Define the interface for column configuration
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
}

// Define the columns for the table
const columns: readonly Column[] = [
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'nicNo', label: 'NIC No', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 170 },
  { id: 'contactNo', label: 'Contact No', minWidth: 170 },
  { id: 'serviceNo', label: 'Service No', minWidth: 170 },
  { id: 'internalExternal', label: 'Internal/External', minWidth: 170 },
{ id : 'createdAt' , label : 'Created At', minWidth : 170},
{ id : 'updatedAt' , label : 'Updated At', minWidth : 170}
];

// Define the data interface for table rows
interface Data {
  email: string;
  firstName: string;
  lastName: string;
  nicNo: string;
  gender: string;
  contactNo: string;
  serviceNo: string;
  internalExternal: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the props interface for the PassengersTable component
interface PassengersTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  startDate: Date | null;
  endDate: Date | null;
}

// Define the PassengersTable component
const PassengersTable: React.FC<PassengersTableProps> = ({ tableRef, startDate, endDate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [passengers, setPassengers] = React.useState<Data[]>([]);

  // Fetch passenger data from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/passengers")
      .then((response) => setPassengers(response.data))
      .catch((err) => {
        console.error("Error fetching passengers:", err);
      });
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
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return {
      date: date.format('YYYY-MM-DD'),
      time: date.format('HH:mm:ss')
    };
  };

  // Render the PassengersTable component
  return (
    <Paper sx={{ maxWidth: '100%', maxHeight: '100%' }}>
      <TableContainer sx={{ maxHeight: '100%', maxWidth: '100%' }}>
        <Table stickyHeader aria-label="sticky table" ref={tableRef}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
                <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{row.email}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.nicNo}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.contactNo}</TableCell>
                  <TableCell>{row.serviceNo}</TableCell>
                  <TableCell>{row.internalExternal}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(row.createdAt).date}</Typography>
                    <Typography variant="body2" color="textSecondary">{formatDate(row.createdAt).time}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(row.updatedAt).date}</Typography>
                    <Typography variant="body2" color="textSecondary">{formatDate(row.updatedAt).time}</Typography></TableCell>

                  </TableRow>
                );
              })}
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
