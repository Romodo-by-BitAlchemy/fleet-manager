import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Define the interface for column configuration
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  align?: "right";
}

// Define the columns for the table
// Define the columns for the table
const columns: readonly Column[] = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  { id: "nic", label: "NIC No", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 170 },
  { id: "dob", label: "Date of Birth", minWidth: 170 },
  { id: "contactNo", label: "Contact No", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "licenseNo", label: "License No", minWidth: 170 },
  { id: "licenseExpireDate", label: "Expiry Date", minWidth: 170 },
  { id: "medicalIssues", label: "Medical Issues", minWidth: 170 },
  { id: "createdAt", label: "Registered Date", minWidth: 170 },
  { id: "updatedAt", label: "Updated Date", minWidth: 170 },
  { id: "availability", label: "Availability", minWidth: 170 },
];

// Define the data interface for table rows
// Define the data interface for table rows
interface Data {
  _id: string;
  firstName: string;
  lastName: string;
  nic: string;
  gender: string;
  dob: string;
  contactNo: string;
  email: string;
  licenseNo: string;
  licenseExpireDate: string;
  medicalIssues: string;
  createdAt: string;
  updatedAt: string;
  availability: boolean;
}

// Define the props interface for the DriverTable component
// Define the props interface for the DriverTable component
interface DriverTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  startDate: Date | null;
  endDate: Date | null;
}

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

// Define the DriverTable component
const DriverTable: React.FC<DriverTableProps> = ({
  tableRef,
  startDate,
  endDate,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [drivers, setDrivers] = React.useState<Data[]>([]);

  // Fetch driver data from the server when the component mounts
  useEffect(() => {
    fetchDrivers();

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchDrivers();
    }, 5000);

    // Cleanup interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Function to fetch driver data from the server
  const fetchDrivers = () => {
    axios
      .get("http://localhost:3000/api/drivers")
      .then((response) => setDrivers(response.data))
      .catch((err) => {
        console.error("Error fetching drivers:", err);
        // Handle error state in your component (e.g., set an error flag, show an error message)
      });
  };

  // Filter rows based on the selected date range
  const filteredRows = drivers.filter((row) => {
    const registeredDate = dayjs(row.createdAt);
    return (
      (!startDate || registeredDate >= dayjs(startDate)) &&
      (!endDate || registeredDate <= dayjs(endDate))
    );
  });

  // Event handler for changing the page
  // Event handler for changing the page
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Event handler for changing the number of rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
  // Event handler for changing the number of rows per page
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };

  const formatDateTime = (dateString: string) => {
    const date = dayjs(dateString);
    return {
      date: date.format('YYYY-MM-DD'),
      time: date.format('HH:mm:ss')
    };
  };

  // Render the DriverTable component
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };

  const formatDateTime = (dateString: string) => {
    const date = dayjs(dateString);
    return {
      date: date.format('YYYY-MM-DD'),
      time: date.format('HH:mm:ss')
    };
  };

  // Render the DriverTable component
  return (
    <Paper sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      <TableContainer sx={{ maxHeight: "100%", maxWidth: "100%" }}>
    <Paper sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      <TableContainer sx={{ maxHeight: "100%", maxWidth: "100%" }}>
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
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.nic}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{formatDate(row.dob)}</TableCell>
                    <TableCell>{row.contactNo}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.licenseNo}</TableCell>
                    <TableCell>{formatDate(row.licenseExpireDate)}</TableCell>
                    <TableCell>{row.medicalIssues}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDateTime(row.createdAt).date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDateTime(row.updatedAt).date}</Typography>
                    </TableCell>
                    <TableCell>{row.availability ? 'Available' : 'Not Available'}</TableCell>
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

export default DriverTable;
