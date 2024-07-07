import * as React from "react";
import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, IconButton, InputAdornment, DialogTitle, styled, tableCellClasses, Alert, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import NavigationBar from "../components/NavigationBar";

export const StyledTableCell = styled(TableCell)(({ /*theme*/ }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#9A82DB',
    color: '#000000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Passenger component
const Passengers: React.FC = () => {
  const [passengers, setPassengers] = React.useState<any[]>([]);
  const [allPassengers, setAllPassengers] = React.useState<any[]>([]);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    getAllPassengers();
  }, []);

  const getAllPassengers = () => {
    setPassengers([]);
    setAllPassengers([]);
    console.log("Fetching all passengers...");

    fetch("http://localhost:3000/api/v1/passenger")
      .then((res) => res.json())
      .then((data) => {
        setPassengers(data.data);
        setAllPassengers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching passengers:", error);
        setErrorMessage("Error fetching passengers");
      });
  };

  const updatePassengerStatus = (id: string, action: string) => {
    axios.put(`http://localhost:3000/api/v1/passenger/${id}`, { action })
      .then((response) => {
        console.log(`Passenger ${action}d:`, response);
        getAllPassengers(); // Refresh the passenger list
      })
      .catch((error) => {
        console.error(`Error ${action}ing passenger:`, error);
        setErrorMessage(`Error ${action}ing passenger`);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPassengers = allPassengers.filter(passenger =>
      passenger.firstName.toLowerCase().includes(searchTerm) ||
      passenger.lastName.toLowerCase().includes(searchTerm) ||
      passenger.nicNo.toLowerCase().includes(searchTerm)
    );
    setPassengers(filteredPassengers);
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: '-60px', width: '91vw' }}>
      <br /><br />
      <NavigationBar/>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle sx={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>Passengers</DialogTitle>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search Passenger"
          onChange={handleSearch}
          sx={{ width: '400px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>

      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: '10px' }}>
          {errorMessage}
        </Alert>
      )}

      <br />

      <div style={{ height: '400px', overflow: 'auto' }}>
        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">NIC No</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Contact No</StyledTableCell>
                <StyledTableCell align="center">Birthday</StyledTableCell>
                <StyledTableCell align="center">Is Internal</StyledTableCell>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">Service No</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {passengers.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.nicNo}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.contactNo}</TableCell>
                  <TableCell align="center">{new Date(row.birthday).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{row.isInternal ? "Yes" : "No"}</TableCell>
                  <TableCell align="center">{row.companyName}</TableCell>
                  <TableCell align="center">{row.serviceNo}</TableCell>
                  <TableCell align="center">
                    {row.isActive ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => updatePassengerStatus(row._id, 'deactivate')}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updatePassengerStatus(row._id, 'activate')}
                      >
                        Activate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default Passengers;
