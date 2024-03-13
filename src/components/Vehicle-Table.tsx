import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'vehicleNo', label: 'Vehicle No', minWidth: 170 },
  { id: 'vehicleType', label: 'Vehicle Type', minWidth: 100 },
  { id: 'registeredDate', label: 'Registered Date', minWidth: 170 },
  { id: 'chassisNo', label: 'Chassis No', minWidth: 170 },
  { id: 'brand', label: 'Brand', minWidth: 170 },
  { id: 'fuelType', label: 'Fuel Type', minWidth: 170 },
  { id: 'noOfSeats', label: 'No of Seats', minWidth: 170 },
];

interface Data {
  vehicleNo: string;
  vehicleType: string;
  registeredDate: string;
  chassisNo: string;
  brand: string;
  fuelType: string;
  noOfSeats: number;
}

function createData(
  vehicleNo: string,
  vehicleType: string,
  registeredDate: string,
  chassisNo: string,
  brand: string,
  fuelType: string,
  noOfSeats: number,
): Data {
  return { vehicleNo, vehicleType, registeredDate, chassisNo, brand, fuelType, noOfSeats };
}

const rows = [
  createData('ABC123', 'SUV', '2022-03-01', 'CHS123456', 'Toyota', 'Petrol', 5),
  createData('XYZ456', 'Sedan', '2022-02-15', 'CHS789012', 'Honda', 'Diesel', 4),
  // Add more rows as needed
];

 function VehicleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = (row as any)[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default VehicleTable;