//components/IssuesTable.tsx
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
// Define the props interface for the IssuesTable component
interface IssuesTableProps {
  tableRef: React.RefObject<HTMLTableElement>;
  startDate: Date | null;
  endDate: Date | null;
}

// Define the columns for the table
const columns = [
  { id: "nameOfTheIssues", label: "Name of the Issues", minWidth: 170 },
  { id: "type", label: "Types of Issues", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "rerouting", label: "Rerouting", minWidth: 100 },
  { id: "reroutingNewVehicleNo", label: "Rerouting New Vehicle No", minWidth: 170 },
  
  { id: "createdAt", label: "Registered Date", minWidth: 170 },
];

// Define the data interface for table rows
interface Issue {
  _id: string;
  nameOfTheIssues: string;
  type: string;
  description: string;
  rerouting: boolean;
  reroutingNewVehicleNo?: string;
  createdAt: string;
}

// Define the IssuesTable component
const IssuesTable: React.FC<IssuesTableProps> = ({ tableRef, startDate, endDate }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [issues, setIssues] = useState<Issue[]>([]);

  // Fetch issue data from the server when the component mounts
  const fetchIssues = () => {
    axios.get("http://localhost:3000/api/issues")
      .then((response) => {
        setIssues(response.data);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
      });
  };

  // Fetch issue data from the server initially and on component mount
  useEffect(() => {
    fetchIssues();

    // Polling interval to fetch updated data every 10 seconds (adjust as needed)
    const interval = setInterval(() => {
      fetchIssues();
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Filter rows based on the selected date range
  const filteredRows = issues.filter((row) => {
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

  // Render the IssuesTable component
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
              .map((issue, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{issue.nameOfTheIssues}</TableCell>
                  <TableCell>{issue.type}</TableCell>
                  <TableCell>{issue.description}</TableCell>
                  <TableCell>{issue.rerouting ? "Yes" : "No"}</TableCell>
                  <TableCell>{issue.reroutingNewVehicleNo}</TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">{formatDate(issue.createdAt).date}</Typography>
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

export default IssuesTable;
