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

// Define the interface for column configuration
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
}

// Define the columns for the table
const columns: readonly Column[] = [
  { id: "firstName", label: "First Name", minWidth: 170 },
  { id: "lastName", label: "Last Name", minWidth: 170 },
  { id: "nicNo", label: "NIC No", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 170 },
  { id: "dateOfBirth", label: "Date of Birth", minWidth: 170 },
  { id: "contactNo", label: "Contact No", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "licenseNo", label: "License No", minWidth: 170 },
  { id: "expiryDate", label: "Expiry Date", minWidth: 170 },
  { id: "medicalIssues", label: "Medical Issues", minWidth: 170 },
  { id: "createdDate", label: "Registered Date", minWidth: 170 },
  { id: "updatedDate", label: "Updated Date", minWidth: 170},
  { id: "availability", label: "Availability", minWidth: 170 },
];

// Define the data interface for table rows
interface Data {
  firstName: string;
  lastName: string;
  nicNo: string;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  email: string;
  licenseNo: string;
  expiryDate: string;
  medicalIssues: string;
  createdDate: string;
  updatedDate: string;
  availability:boolean;

}

// Define the props interface for the DriverTable component
interface DriverTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  startDate: Date | null;
  endDate: Date | null;
}

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
    axios
      .get("http://localhost:5000/api/drivers")
      .then((response) => setDrivers(response.data))
      .catch((err) => {
        console.error("Error fetching drivers:", err);
        // Handle error state in your component (e.g., set an error flag, show an error message)
      });
  }, []);
  
  

  // Filter rows based on the selected date range
  const filteredRows = drivers.filter((row) => {
    const registeredDate = dayjs(row.createdDate);
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
  return (
    <Paper sx={{ maxWidth: "100%", maxHeight: "100%" }}>
      <TableContainer sx={{ maxHeight: "100%", maxWidth: "100%" }}>
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
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.nicNo}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{formatDate(row.dateOfBirth)}</TableCell>
                    <TableCell>{row.contactNo}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.licenseNo}</TableCell>
                    <TableCell>{formatDate(row.expiryDate)}</TableCell>
                    <TableCell>{row.medicalIssues}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDateTime(row.createdDate).date}</Typography>
                      <Typography variant="body2" color="textSecondary">{formatDateTime(row.createdDate).time}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDateTime(row.updatedDate).date}</Typography>
                      <Typography variant="body2" color="textSecondary">{formatDateTime(row.updatedDate).time}</Typography></TableCell>
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
