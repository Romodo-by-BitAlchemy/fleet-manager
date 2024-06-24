import * as React from "react";
import {  Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Switch, DialogTitle, styled, tableCellClasses, TextField } from "@mui/material";
import NewDriver, { Driver } from "../components/NewDriver";
import axios from "axios";
import Swal from "sweetalert2";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#9A82DB',
    color: '#000000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const Drivers: React.FC = () => {

  const [fName, setFName] = React.useState<string>("");
	const [lName, setLName] = React.useState<string>("");
	const [dOfBirth, setDOfBirth] = React.useState<Date|null>(new Date());
	const [nic, setNIC] = React.useState<string>("");
	const [email, setEmail] = React.useState<string>("");
	const [contactNo, setContactNo] = React.useState<string>("");
	const [licenseNo, setLicenseNo] = React.useState<string>("");
	const [lExDate, setLExDate] = React.useState<Date|null>(new Date());
	const [gender, setGender] = React.useState<string>("");
	const [mediCondition, setMediCondition] = React.useState<string>("");
	const [no, setNo] = React.useState<string>("");
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const [alldrivers, setAllDrivers] = React.useState<Driver[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] =  React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] =  React.useState<boolean>(false);
  React.useEffect(() => {
    getAllDrivers();
  }, []);

  const getAllDrivers = () => {
    setDrivers([])
    setAllDrivers([]);
    console.log("aaa");

    fetch("http://localhost:3000/api/v1/driver")
     .then((res) => res.json())
     .then((data) => {
        setDrivers(data.data);
        setAllDrivers(data.data)
      });
  }
  const handleClick = (event: any, id: string|undefined) => {
    const selectedIndex = selected.indexOf(id);
    const newSelected: string[] = [id];

    setSelected(newSelected);
  };
const isSelected = (id:string|undefined) => selected.indexOf(id) !== -1;
const handleUpdateClick = () => {
  if (selected.length === 0) {

			Swal.fire({
				title: "Oops...",
				text: "Please select a driver to update",
				icon: "error"
				});
  }else{
    const d = drivers.filter(v => v._id === selected[0])[0];
    if(d){
      setIsNewDriverModalOpen(true);
      setNo(d.no)
      setFName(d.firstName);
      setLName(d.lastName);
      setDOfBirth(new Date(d.dob));
      setNIC(d.nic)
      setEmail(d.email)
      setContactNo(d.contactNo)
      setLicenseNo(d.licenseNo)
      setLExDate(new Date(d.licenseExpireDate))
      setGender(d.gender)
      setMediCondition(d.medicalIssues)
    }
  }

}

const handleDeleteClick = () => {
  if (selected.length === 0) {
    Swal.fire({
				title: "Oops...",
				text: "Please select a driver to delete",
				icon: "error"
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
      const d = drivers.filter(v => v._id === selected[0])[0];
      axios.delete(`http://localhost:3000/api/v1/driver/${d._id}`).then((r) => {
        if(r.status === 204) {
          Swal.fire({
            title: "Good job!",
            text: "Vehicle deleted successfully!",
            icon: "success"
            });
          setSelected([]);
          setDrivers([]);
          getAllDrivers();
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

const onChangeAvailability = (e:boolean, v:Driver) => {
  v.availability = e;
  axios.patch(`http://localhost:3000/api/v1/vehicle/${v._id}`, v).catch((error) => {
          Swal.fire({
          title: "Oops...",
          text: "Something went wrong !",
          icon: "error"
				});
        });

}
const clearFields = () => {
		setNo("");
		setFName("");
		setLName("")
		setContactNo("")
		setLicenseNo("")
		setLExDate(new Date())
    setDOfBirth(new Date())
		setGender("")
		setMediCondition("")
    setNIC("")
    setEmail("")

}
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredDrivers = alldrivers.filter(driver =>driver?.no?.toLowerCase().includes(searchTerm))
  setDrivers(filteredDrivers)
}
	return (
		<Container maxWidth="xl" sx={{marginTop: '-60px', width: '95vw'}}>
      <div style={{'marginLeft': '50vw'}}>
        <TextField
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  label="Search Driver No"
                  onChange={handleSearch}
                />
      </div>

      <DialogTitle sx={{ alignItems: 'start', display: 'flex', flexDirection: 'row', gap: '20px'}}>Drivers</DialogTitle>
      <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">No</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">NIC</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">DOB</StyledTableCell>
            <StyledTableCell align="center">Contact No</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">License No</StyledTableCell>
            <StyledTableCell align="center">License Exp. dat</StyledTableCell>
            <StyledTableCell align="center">Medical Isuues</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((row) => {
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
              <TableCell component="th" scope="row">{row.no}</TableCell>
              <TableCell component="th" scope="row">{new Date(row.date).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.nic}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{new Date(row.dob).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.contactNo}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.licenseNo}</TableCell>
              <TableCell align="right">{new Date(row.licenseExpireDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.medicalIssues}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <NewDriver
        no={no}
        firstName={fName}
        lastName={lName}
        nic={nic}
        gender={gender}
        dob={dOfBirth}
        contactNo={contactNo}
        email={email}
        licenseNo={licenseNo}
        licenseExpireDate={lExDate}
        medicalIssues={mediCondition}
        getAll={getAllDrivers}
        id={selected[0]}
        isOpen={isNewDriverModalOpen}
        isUpdate={isUpdate}
        close={closeDialog}
        open={openDialog} />
  <br/>
  <Button variant="outlined" onClick={() => {setIsNewDriverModalOpen(true); setIsUpdate(false); clearFields()}}>Create</Button>&nbsp;&nbsp;
  <Button variant="outlined" onClick={ () => {handleUpdateClick() ,  setIsUpdate(true)}}>Update</Button>&nbsp;&nbsp;
  <Button variant="outlined" onClick={ () => handleDeleteClick()}>Delete</Button>
	</Container>
	);
};

export default Drivers;
