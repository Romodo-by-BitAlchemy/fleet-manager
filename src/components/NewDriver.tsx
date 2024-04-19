import { Dialog ,  Grid, Button, DialogTitle, DialogContentText, DialogContent, TextField, MenuItem, DialogActions } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Swal from "sweetalert2";

export interface Driver  {
	_id?:string,
	no?:string,
	date: Date,
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
interface NewDriverProps {
isOpen: boolean,
no:string,
firstName: string,
lastName: string,
nic: string,
gender: string,
dob: Date|null,
contactNo: string,
email: string,
licenseNo: string,
licenseExpireDate: Date|null,
medicalIssues: string,
open: () => void,
close: () => void,
getAll: () => void,
isUpdate: boolean,
id: string
}
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const numberRegex = /[0-9]{3,}/;
const nameRegex = /[A-Za-z.]{3,}/;
const nicRegex = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;
const contactRegex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/
const licenseReges = /^[a-zA-Z0-9]{6,10}$/
function NewDriver(props: NewDriverProps) {

	const [id, setId] = React.useState<string>(props.id);
	const [no, setNo] = React.useState<string>(props.no);
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

	React.useEffect(() => {

		setId(props.id);
		setNo(props.no);
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


    }, [props.id, props.no, props.firstName, props.lastName, props.nic, props.email, props.contactNo, props.licenseNo, props.gender, props.medicalIssues, props.dob, props.licenseExpireDate, props.isUpdate]);
	const checkValidation = () : boolean => {
		if (!numberRegex.test(no)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invaliddu Driver No !"
				});
			return false;
        }
		if (!nameRegex.test(fName)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalidd First Name"
				});
			return false;
		}
		if (!nameRegex.test(lName)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalidd Last Name"
				});
			return false;
		}
		if (!nicRegex.test(nic)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalidd NIC"
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
				text: "Invalidd Contact Number"
				});
            return false;
        }
		if (!licenseReges.test(licenseNo)){
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalidd License Number"
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
	const handleAddDriver = () => {
		if(checkValidation()){
		const driver = {
			no: no,
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
		}).catch((error) => {
			Swal.fire({
					title: "Oops...",
					text: "Something went wrong !",
					icon: "error"
					});
		});
		}
	}
	const handleUpdateVehicle = () => {
		if(checkValidation()){
		const driver = {
			no: no,
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
			axios.patch(`http://localhost:3000/api/v1/driver/${id}`, driver).then((response) => {
			console.log(response);

				if (response.status === 204) {
					Swal.fire({
					title: "Good job!",
					text: "Driver update successfully!",
					icon: "success"
					});
					props.close()
					clearFields();
					props.getAll();

				}
			}).catch((error) => {
			Swal.fire({
				title: "Oops...",
				text: "Something went wrong !",
				icon: "error"
				});
			});
		}
	}
	const clearFields = () => {
		setId("");
		setNo("");
		setFName("");
		setLName("")
		setContactNo("")
		setLicenseNo("")
		setLExDate(new Date())
		setGender("")
		setMediCondition("")



    }
	return (
		<div>

			<Dialog open={props.isOpen} onClose={() =>  props.close()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"Add Driver"}
				</DialogTitle>
				<DialogContent>
					<br />
					<DialogContentText id="alert-dialog-description">
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label="No"
									variant="outlined"
									fullWidth
									value={no}
									onChange={(event) => setNo(event.target.value)}
								/>
							</Grid>
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
									onChange={(event) => setNIC(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Email"
									variant="outlined"
									fullWidth
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Contact Number"
									variant="outlined"
									fullWidth
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
					<Button onClick={props.isUpdate?  handleUpdateVehicle:handleAddDriver}>{props.isUpdate? "Update": "Add"}</Button>
					<Button onClick={() => props.close()}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default NewDriver
