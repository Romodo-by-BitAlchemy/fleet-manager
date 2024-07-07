import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
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

// Define the props interface for the VehicleTable component
interface VehicleTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  startDate: Date | null;
  endDate: Date | null;
}

// Define the columns for the table
const columns = [
  { id: "no", label: "Vehicle No", minWidth: 170 },
  { id: "type", label: "Vehicle Type", minWidth: 100 },
  { id: "chassisNo", label: "Chassis No", minWidth: 170 },
  { id: "brand", label: "Brand", minWidth: 170 },
  { id: "fuelType", label: "Fuel Type", minWidth: 170 },
  { id: "noOfSeats", label: "No of Seats", minWidth: 170 },
  { id: "productionYear", label: "Production Year", minWidth: 170 },
  { id: "acNonAc", label: "AC/Non-AC", minWidth: 170 },
  { id: "availability", label: "Availability", minWidth: 170 },
  { id: "createdAt", label: "Registered Date",  minWidth: 170 },
  { id: "updatedAt", label: "Updated Date", minWidth: 170 },
];

// Define the data interface for table rows
interface Vehicle {
  _id: string;
  no: string; // Ensure this matches the schema property name
  type: string;
  chassisNo: string;
  brand: string;
  fuelType: string;
  noOfSeats: number;
  productionYear: number;
  ac: boolean; // Ensure this matches the schema property name
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the VehicleTable component
const VehicleTable: React.FC<VehicleTableProps> = ({ tableRef, startDate, endDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Fetch vehicle data from the server when the component mounts
  useEffect(() => {
    fetchVehicles();

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchVehicles();
    }, 5000);

    // Cleanup interval to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Function to fetch vehicle data from the server
  const fetchVehicles = async () => {
    await axios
      .get("http://localhost:3000/api/vehicles")
      .then((response) => {
        
        setVehicles(response.data);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
      });
  };

  // Filter rows based on the selected date range
  const filteredRows = vehicles.filter((row) => {
    const registeredDate = dayjs(row.createdAt);
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

  // Format the date once during rendering
  const formatDate = (dateString: string) => {
    const date = dayjs(dateString);
    return {
      date: date.format("YYYY-MM-DD"),
      time: date.format("HH:mm:ss"),
    };
  };

  // Render the VehicleTable component
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
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
  .map((vehicle, index) => (
    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
      <TableCell>{vehicle.no}</TableCell>
      <TableCell>{vehicle.type}</TableCell>
      <TableCell>{vehicle.chassisNo}</TableCell>
      <TableCell>{vehicle.brand}</TableCell>
      <TableCell>{vehicle.fuelType}</TableCell>
      <TableCell>{vehicle.noOfSeats}</TableCell>
      <TableCell>{vehicle.productionYear}</TableCell>
      <TableCell>{vehicle.ac ? "AC" : "Non-AC"}</TableCell>
      <TableCell>{vehicle.availability ? "Yes" : "No"}</TableCell>
      <TableCell><Typography variant="body2">{formatDate(vehicle.createdAt).date}</Typography></TableCell>
      <TableCell><Typography variant="body2">{formatDate(vehicle.updatedAt).date}</Typography></TableCell>
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

export default VehicleTable;
