import * as React from "react";
import {  Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Switch, DialogTitle, TextField,  IconButton , InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NewVehilce, { Vehicle } from "../components/NewVehicle";
import axios from "axios";
import { StyledTableCell } from "./Drivers";
import Swal from "sweetalert2";

/*function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}*/

// Define the Vehicles component
const Vehicles: React.FC = () => {

   // State variables
  const [selectedYear, setSelectedYear] = React.useState<number>(2024);
  const [selectedVehType, setSelectedVehType] = React.useState<string>("");
  const [selectedCondition, setSelectedCondition] = React.useState<string>("");
	const [selectedFuelType, setSelectedFuelType] = React.useState<string>("");
	const [vehicleNo, setVehicleNo] = React.useState<string>("");
	const [chassisNo, setChassisNo] = React.useState<string>("");
	const [brand, setBrand] = React.useState<string>("");
	const [noOfSeats, setNoOfSeats] = React.useState<number>(0);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [allVehicles, setAllVehicles] = React.useState<Vehicle[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] =  React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] =  React.useState<boolean>(false);
  
  // Fetch all vehicles when component mounts
  React.useEffect(() => {
    getAllVehicles();
  }, []);

  // Function to fetch all vehicles
  const getAllVehicles = () => {

    // Fetch all vehicles from the API
    // Update state with the fetched data

    fetch("http://localhost:3000/api/v1/vehicle")
     .then((res) => res.json())
     .then((data) => {
        setVehicles(data.data);
        setAllVehicles(data.data);
      });
  }

  
  // Function to handle click on a row
  const handleClick = (_event: any, id: string) => {

    // Update selected array with the clicked row's id
   // const selectedIndex = selected.indexOf(id);
    const newSelected: string[] = [id];

    setSelected(newSelected);
  };

  // Function to check if a row is selected
const isSelected = (id:string) => selected.indexOf(id) !== -1;

// Function to handle update button click
const handleUpdateClick = () => {

      // Check if a row is selected
    // If yes, fetch details of the selected vehicle and populate the modal form
    // Open the modal dialog for updating vehicle

  if (selected.length === 0) {
    Swal.fire({
      title: "Not Selected",
      text: "Please select a driver to update",
      icon: "question"
    });
  }
  else{
    const v = vehicles.filter(v => v.id === selected[0])[0];
    setSelectedYear(new Date(v.productionYear).getFullYear())
    setSelectedVehType(v.type)
    setChassisNo(v.chassisNo)
    setIsNewDriverModalOpen(true);
    setVehicleNo(v.no)
    setBrand(v.brand)
    setSelectedCondition(v.ac? "AC" : "Non AC")
    setNoOfSeats(v.noOfSeats)
    setSelectedFuelType(v.fuelType)

  }

}

// Function to handle delete button click
const handleDeleteClick = () => {

  // Check if a row is selected
    // If yes, prompt user for confirmation before deleting the selected vehicle
    // If confirmed, make a DELETE request to the API to delete the vehicle

  if (selected.length === 0) {
    Swal.fire({
      title: "Not Selected",
      text: "Please select a driver to delete",
      icon: "question"
    });
  }
  else{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
    const v = vehicles.filter(v => v.id === selected[0])[0];
    axios.delete(`http://localhost:3000/api/v1/vehicle/${v.id}`).then((r) => {
      if(r.status === 204) {
        Swal.fire({
					
					text: "Vehicle deleted successfully!",
					icon: "success"
					});
        setSelected([]);
        setVehicles([]);
        setAllVehicles([]);
        getAllVehicles();
      }

    }).catch((/*e*/)=> {
      Swal.fire({
				title: "Oops...",
				text: "Something went wrong !",
				icon: "error"
				});
    })
    }
});

  }
}

// Function to close the modal dialog
const closeDialog = () => {

  // Close the modal dialog
  setIsNewDriverModalOpen(false);
}

// Function to open the modal dialog
const openDialog = () => {

  // Open the modal dialog
  setIsNewDriverModalOpen(true);
}

// Function to handle availability toggle
/*const onChangeAvailability = (e:boolean, v:Vehicle) => {

  // Update availability status of the vehicle
  // Make a PATCH request to the API to update the vehicle's availability
 
  v.availability = e;
  axios.patch(`http://localhost:3000/api/v1/vehicle/${v.id}`, v).then(()=> {
    getAllVehicles();
  }).catch((/*error) => {
          Swal.fire({
            title: "Oops...",
            text: "Something went wrong !",
            icon: "error"
            });
        });

}*/

const onChangeAvailability = (availability: boolean, vehicle: Vehicle) => {
  axios.put(`http://localhost:3000/api/v1/vehicle/${vehicle.id}`, { availability }).then(() => {
    getAllVehicles();
  }).catch(() => {
    Swal.fire({
      title: "Oops...",
      text: "Something went wrong!",
      icon: "error"
    });
  });
};

// Function to clear form fields
const clearFields = () => {

  // Clear all form fields
  setVehicleNo("")
  setChassisNo("")
  setBrand("")
  setNoOfSeats(0)
  setSelectedFuelType("")
  setSelectedCondition("")
  setSelectedYear(2024)
  setSelectedVehType("")
}

// Function to handle search input change
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

  // Filter vehicles based on search term and update the state with filtered vehicles
  const searchTerm = e.target.value.toLowerCase();
  const filteredVehicles = allVehicles.filter(veh =>veh?.id?.toLowerCase().includes(searchTerm))
  setVehicles(filteredVehicles)
}
	return (
		
      <Container maxWidth="xl" sx={{marginTop: '-60px', width: '91vw'}}>
      <br/><br/>
   
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <DialogTitle sx={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>Vehicles</DialogTitle>

      
      
        <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  label="Search Vehicle ID"
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

     <br></br>
     <br></br>
      
      {/* Table to display vehicles */}
      <TableContainer component={Paper} >

      <Table aria-label="simple table">

        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Vehicle ID</StyledTableCell>
            <StyledTableCell align="right">Vehicle no.</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Chassis no.</StyledTableCell>
            <StyledTableCell align="right">Production Year</StyledTableCell>
            <StyledTableCell align="right">AC/Non AC</StyledTableCell>
            <StyledTableCell align="right">Brand</StyledTableCell>
            <StyledTableCell align="right">Fuel Type</StyledTableCell>
            <StyledTableCell align="right">No.of Seats</StyledTableCell>
            <StyledTableCell align="right">Availability</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {/* Map through vehicles and render table rows */}
          {vehicles.map((row) => {
            const isItemSelected = isSelected(row.id || '');
            return <TableRow
              key={row.id}
              hover
                    onClick={(event) => handleClick(event, row.id || '')}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
            >

              {/* Table cells */}
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell component="th" scope="row">{row.no}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.chassisNo}</TableCell>
              <TableCell align="right">{new Date(row.productionYear).getFullYear()}</TableCell>
              <TableCell align="right">{row.ac? "AC" : "Non AC"}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.fuelType}</TableCell>
              <TableCell align="right">{row.noOfSeats}</TableCell>
              <TableCell align="right"><Switch checked={row.availability} onChange={(e) => onChangeAvailability(e.target.checked, row)} /></TableCell>
            
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>

     {/* Modal dialog for adding or updating vehicle */}
    <NewVehilce
    id={selected[0]}
    isOpen={isNewDriverModalOpen}
    isUpdate={isUpdate}
    year={selectedYear}
    brand={brand}
    selVehType={selectedVehType}
    selCondition={selectedCondition}
    selFuelType={selectedFuelType}
    vehNo={vehicleNo}
    chassisNo={chassisNo}
    noOfSeats={noOfSeats}
    close={closeDialog}
    open={openDialog}
    getAll={getAllVehicles}
  />
  <br/>

  {/* Button to create, update or delete vehicle */}
  <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => {setIsNewDriverModalOpen(true); setIsUpdate(false); clearFields()}}>Add</Button>&nbsp;&nbsp;
  <Button variant="outlined" startIcon={<CloudUploadIcon />} onClick={ () => {handleUpdateClick() ,  setIsUpdate(true)}}>Update</Button>&nbsp;&nbsp;
  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={ () => handleDeleteClick()}>Delete</Button>
	</Container>
	);
};

export default Vehicles;
