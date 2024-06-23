import { Dialog ,  Grid, Button, DialogTitle, DialogContentText, DialogContent, TextField, MenuItem, DialogActions } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Swal from "sweetalert2";



// Define interface for Driver
export interface Driver  {
  isActive: any;
  date: string | number | Date;
  availability: boolean;
	_id?:string,
	no?:string,
	dateOfJoined: Date,
	firstName: string,
	lastName: string,
	nic: string,
	gender: string,
	dob: Date,
	contactNo: string,
	email: string,
	licenseNo: string,
	licenseExpireDate: Date,
	medicalIssues: string,
}

// Define props interface for NewDriver component
interface NewDriverProps {
	isOpen: boolean,
	no:string,
	firstName: string,
	lastName: string,
	nic: string,
	gender: string,
	dob: Date,
	contactNo: string,
	email: string,
	licenseNo: string,
	licenseExpireDate: Date,
	medicalIssues: string,
	open: () => void,
	close: () => void,
	getAll: () => void,
	isUpdate: boolean,
	id: string	
}

// Regular expressions for validation
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
//const numberRegex = /D[0-9]{3,}/;
const nameRegex = /[A-Za-z.]{3,}/;
const nicRegex = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;
const contactRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
const licenseReges = /^[a-zA-Z0-9]{6,10}$/;


function NewDriver(props: NewDriverProps) {
	// State variables for form fields
	const [id, setId] = React.useState<string>(props.id);
	//const [no, setNo] = React.useState<string>(props.no);
	const [fName, setFName] = React.useState<string>(props.firstName);
	const [lName, setLName] = React.useState<string>(props.lastName);
	const [dOfBirth, setDOfBirth] = React.useState<Date>(props.dob);
	const [nic, setNIC] = React.useState<string>(props.nic);
	const [email, setEmail] = React.useState<string>(props.email);
	const [contactNo, setContactNo] = React.useState<string>(props.contactNo);
	const [licenseNo, setLicenseNo] = React.useState<string>(props.licenseNo);
	const [lExDate, setLExDate] = React.useState<Date>(props.licenseExpireDate);
	const [gender, setGender] = React.useState<string>(props.gender);
	const [mediCondition, setMediCondition] = React.useState<string>(props.medicalIssues);
	//const [errorMessage, setErrorMessage] = React.useState<string>("");

	// Update state variables when props change
	React.useEffect(() => {

		setId(props.id);
		//setNo(props.no);
		setFName(props.firstName);
		setLName(props.lastName)
		setDOfBirth(props.dob);
		setNIC(props.nic);
		setEmail(props.email);
		setContactNo(props.contactNo);
		setLicenseNo(props.licenseNo);
		setLExDate(props.licenseExpireDate);
		setGender(props.gender);
		setMediCondition(props.medicalIssues);

    }, [
		props.id, 
		//props.no, 
		props.firstName, 
		props.lastName, 
		props.nic, 
		props.email, 
		props.contactNo, 
		props.licenseNo, 
		props.gender, 
		props.medicalIssues, 
		props.dob, 
		props.licenseExpireDate, 
		props.isUpdate
	]);

	// Function to check form field validation
	const checkValidation = () : boolean => {
		//let isValid = true;
		// Validation checks for each field
        // Display error message using SweetAlert2 if validation fails
        // Return false if any validation fails, otherwise return true

		/*if (!numberRegex.test(no)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid Driver No !"
				});
			return false;
        }*/

		if (!nameRegex.test(fName)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid First Name"
				});
			return false;
		}

		if (!nameRegex.test(lName)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid Last Name"
				});
			return false;
		}

		if (!nicRegex.test(nic)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid NIC"
				});
            return false;
        }

		if (!emailRegex.test(email)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid Email"
				});
            return false;
        }

		if (!contactRegex.test(contactNo)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid Contact Number"
				});
            return false;
        }

		if (!licenseReges.test(licenseNo)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid License Number"
				});
            return false;
        }

		if (gender.length === 0){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Gender is required"
				});
            return false;
        }

		if (lExDate === null){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "License Expiry Date is required"
				});
            return false;
        }

		if (mediCondition.length === 0){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Medical Issues is required"
				});
            return false;
        }

		if (dOfBirth === null){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Date of Birth is required"
				});
            return false;
        }

        return true;
	}

	// Function to handle adding a new driver
	const handleAddDriver = () => {

		// Check validation before adding driver
        // If validation passes, construct driver object and make POST request
        // Display success or error message using SweetAlert2
        // Close dialog and clear fields after successful addition

		if(checkValidation()){
		const driver = {
			//no: no,
			firstName: fName,
			lastName: lName,
			nic: nic,
			gender: gender,
			dob: dOfBirth,
			contactNo: contactNo,
			email: email,
			licenseNo: licenseNo,
			licenseExpireDate: lExDate,
			medicalIssues: mediCondition
		}

		// POST request to add a new driver
		axios.post('http://localhost:3000/api/v1/driver', driver).then((response) => {
			if (response.status === 201) {
				Swal.fire({
					title: "Good job!",
					text: "Driver added successfully!",
					icon: "success"
					});
				props.close()
				clearFields();
				props.getAll();
			}
		}).catch((/*error*/) => {
			Swal.fire({
					title: "Oops...",
					text: "Something went wrong !",
					icon: "error"
					});
		});
		}
	}

	
	// Function to handle updating a driver
	const handleUpdateVehicle = () => {

		// Check validation before updating driver
        // If validation passes, construct driver object and make PATCH request
        // Display success or error message using SweetAlert2
        // Close dialog and clear fields after successful update

		if(checkValidation()){
		const driver = {
			//no: no,
			firstName: fName,
			lastName: lName,
			nic: nic,
			gender: gender,
			dob: dOfBirth,
			contactNo: contactNo,
			email: email,
			licenseNo: licenseNo,
			licenseExpireDate: lExDate,
			medicalIssues: mediCondition
		}
			axios.put(`http://localhost:3000/api/v1/driver/${id}`, driver).then((response) => {
			
			console.log(response);

				if (response.status === 200) {
					Swal.fire({
					title: "Good job!",
					text: "Driver update successfully!",
					icon: "success"
					});
					props.close()
					clearFields();
					props.getAll();

				}
			}).catch((/*error */) => {
			Swal.fire({
				title: "Oops...",
				text: "Something went wrong !",
				icon: "error"
				});
			});
		}
	}

	// Clear all fields
	const clearFields = () => {

		// Reset all state variables to empty or default values

		setId("");
		//setNo("");
		setFName("");
		setLName("")
		setContactNo("")
		setLicenseNo("")
		setLExDate(new Date())
		setGender("")
		setMediCondition("")
		setNIC("")
		setEmail("")


    }
	return (
		<div>
			{/* Dialog component for adding or updating driver */}
			<Dialog open={props.isOpen} onClose={() =>  props.close()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"Driver Details"}
				</DialogTitle>
				<DialogContent>
					<br />
					<DialogContentText id="alert-dialog-description">

						{/* Form fields for adding or updating driver */}
                        {/* Display input fields using Grid layout */}

						<Grid container spacing={2}>
							
							<Grid item xs={12} sm={6}>
								<TextField
									label="First Name"
									variant="outlined"
									fullWidth
									value={fName}
									onChange={(event) => setFName(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Last Name"
									variant="outlined"
									fullWidth
									value={lName}
									onChange={(event) => setLName(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker label={"Date of Birth"} value={dayjs(dOfBirth)}
								onChange={(v:any) => setDOfBirth(v)}
								/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="NIC"
									variant="outlined"
									fullWidth
									value={nic}
									placeholder="ex: xxxxxxxxxV or xxxxxxxxxxxx "
									onChange={(event) => setNIC(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Email"
									variant="outlined"
									fullWidth
									value={email}
									placeholder="ex: abc@gmail.com"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Contact Number"
									variant="outlined"
									fullWidth
									placeholder="ex: 07xxxxxxxx"
									value={contactNo}
									onChange={(event) => setContactNo(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="License Number"
									variant="outlined"
									fullWidth
									value={licenseNo}
									placeholder="ex: Bxxxxxxxxx"
									onChange={(event) => setLicenseNo(event.target.value)}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker label={"License Expiry Date"} value={dayjs(lExDate)} onChange={(v:any) => setLExDate(v)} />
								</LocalizationProvider>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									select
									label="Gender"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									fullWidth
								>
									{["Male", "Female"].map((type, i) => (
										<MenuItem key={i} value={type}>
											{type}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Medical Conditions"
									variant="outlined"
									fullWidth
									value={mediCondition}
									onChange={(event) => setMediCondition(event.target.value)}
								/>
							</Grid>

						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{/* Button to add or update driver */}
					<Button onClick={props.isUpdate?  handleUpdateVehicle:handleAddDriver}>{props.isUpdate? "Update": "Add"}</Button>
					{/* Button to cancel operation */}
					<Button onClick={() => props.close()}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default NewDriver