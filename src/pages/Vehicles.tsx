import * as React from "react";
import {  Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Switch, DialogTitle, TextField } from "@mui/material";
import NewVehilce, { Vehicle } from "../components/NewVehicle";
import axios from "axios";
import { StyledTableCell } from "./Drivers";
import Swal from "sweetalert2";
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const Vehicles: React.FC = () => {

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
  React.useEffect(() => {
    getAllVehicles();
  }, []);

  const getAllVehicles = () => {
    fetch("http://localhost:3000/api/v1/vehicle")
     .then((res) => res.json())
     .then((data) => {
        setVehicles(data.data);
        setAllVehicles(data.data);
      });
  }
  const handleClick = (event: any, id: string) => {
    const selectedIndex = selected.indexOf(id);
    const newSelected: string[] = [id];

    setSelected(newSelected);
  };
const isSelected = (id:string) => selected.indexOf(id) !== -1;
const handleUpdateClick = () => {
  if (selected.length === 0) {
    Swal.fire({
      title: "Not Selected",
      text: "Please select a driver to update",
      icon: "question"
    });
  }else{
    const v = vehicles.filter(v => v._id === selected[0])[0];
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

const handleDeleteClick = () => {
  if (selected.length === 0) {
    Swal.fire({
      title: "Not Selected",
      text: "Please select a driver to delete",
      icon: "question"
    });
  }else{
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
    const v = vehicles.filter(v => v._id === selected[0])[0];
    axios.delete(`http://localhost:3000/api/v1/vehicle/${v._id}`).then((r) => {
      if(r.status === 204) {
        Swal.fire({
					title: "Good job!",
					text: "Vehicle deleted successfully!",
					icon: "success"
					});
        setSelected([]);
        setVehicles([]);
        setAllVehicles([]);
        getAllVehicles();
      }

    }).catch((e)=> {
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
const closeDialog = () => {
  setIsNewDriverModalOpen(false);
}
const openDialog = () => {
  setIsNewDriverModalOpen(true);
}

const onChangeAvailability = (e:boolean, v:Vehicle) => {
  v.availability = e;
  axios.patch(`http://localhost:3000/api/v1/vehicle/${v._id}`, v).then(()=> {
    getAllVehicles();
  }).catch((error) => {
          Swal.fire({
            title: "Oops...",
            text: "Something went wrong !",
            icon: "error"
            });
        });

}
const clearFields = () => {
  setVehicleNo("")
  setChassisNo("")
  setBrand("")
  setNoOfSeats(0)
  setSelectedFuelType("")
  setSelectedCondition("")
  setSelectedYear(2024)
  setSelectedVehType("")
}
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredVehicles = allVehicles.filter(veh =>veh?._id?.toLowerCase().includes(searchTerm))
  setVehicles(filteredVehicles)
}
	return (
		<Container maxWidth="xl" sx={{marginTop: '-60px', width: '95vw'}}>
      <div style={{'marginLeft': '50vw'}}>
        <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  label="Search Vehicle ID"
                  onChange={handleSearch}
                />
      </div>
				<DialogTitle sx={{ alignItems: 'start', display: 'flex', flexDirection: 'row', gap: '20px'}}>Vehicles</DialogTitle>
      <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Vehicle ID</StyledTableCell>
            <StyledTableCell align="right">Vehicle no.</StyledTableCell>
            <StyledTableCell align="right">type</StyledTableCell>
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
          {vehicles.map((row) => {
            const isItemSelected = isSelected(row._id);
            return <TableRow
              key={row._id}
              hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">{row._id}</TableCell>
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
  <Button variant="outlined" onClick={() => {setIsNewDriverModalOpen(true); setIsUpdate(false); clearFields()}}>Create</Button>&nbsp;&nbsp;
  <Button variant="outlined" onClick={ () => {handleUpdateClick() ,  setIsUpdate(true)}}>Update</Button>&nbsp;&nbsp;
  <Button variant="outlined" onClick={ () => handleDeleteClick()}>Delete</Button>
	</Container>
	);
};

export default Vehicles;
