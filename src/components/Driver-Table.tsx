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
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'nicNo', label: 'NIC No', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 170 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 170 },
  { id: 'contactNo', label: 'Contact No', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'licenseNo', label: 'License No', minWidth: 170 },
  { id: 'expiryDate', label: 'Expiry Date', minWidth: 170 },
  { id: 'medicalIssues', label: 'Medical Issues', minWidth: 170 },
  { id: 'registeredDate', label: 'Registered Date', minWidth: 170 },
];

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
  registeredDate: string;
}

interface DriverTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  rows: Data[];
  startDate: Date | null;
  endDate: Date | null;
}

const DriverTable: React.FC<DriverTableProps> = ({ tableRef, rows, startDate, endDate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const filteredRows = rows.filter(row => {
    const registeredDate = new Date(row.registeredDate);
    return (!startDate || registeredDate >= startDate) && (!endDate || registeredDate <= endDate);
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{maxwidth: '100', maxHeight: '100'}}>
      <TableContainer sx={{maxHeight: '100', maxWidth: '100'}}>
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
                    {columns.map((column) => {
                      const value = row[column.id as keyof Data];
                      const formattedValue = typeof value === 'string' ? value : (value as string).toString();
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {formattedValue}
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
