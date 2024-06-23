//import { DialerSip } from "@mui/icons-material";

// Import necessary components and modules
import { Dialog ,  Grid, Button, DialogTitle, DialogContentText, DialogContent, TextField, MenuItem, DialogActions } from "@mui/material";
import * as React from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define interface for Vehicle
export interface Vehicle  {
  //id: ReactNode;
    //map(arg0: (row: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
	id:string,
    no: string,
    type: string,
    chassisNo: string,
    productionYear: Date,
    ac: boolean,
    brand: string,
    availability: boolean,
    fuelType: string,
    noOfSeats: number
}


// Define interface for NewDriverProps
interface NewDriverProps {
	isOpen:boolean,
	year:number,
	selVehType:string,
	selCondition:string,
	selFuelType:string,
	vehNo: string,
	chassisNo: string,
	brand: string,
	noOfSeats: number,
	open: Function,
	close: Function,
	isUpdate: boolean,
	id:string,
	getAll: () => void,

}

// Regular expressions for validation
const vehicleNoRegex = /^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/;
const chassisNoRegex = /^[a-zA-Z0-9 ]{6,}$/;
const brandRegex = /^[a-zA-Z0-9.,-\s]{6,}$/;
const nuRegex = /^[0-9]{1,}$/

// NewVehicle component
function NewVehicle(props: NewDriverProps) {

	 // State variables
	const years = Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index);
	const [selectedYear, setSelectedYear] = React.useState<number>(props.year);
	const [id, setId] = React.useState<string>(props.id);
	const onChangeDate: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setSelectedYear(parseInt(event.target.value));
	}
	const vehTypes: string[] = ["Car", "Van", "Bus"];
	const fuelTypes: string[] = ["Petrol", "Diesel", "Electric"];
	const conditions: string[] = ["AC", "Non AC"];
	const [selectedVehType, setSelectedVehType] = React.useState<string>(props.selVehType);
	const [selectedCondition, setSelectedCondition] = React.useState<string>(props.selCondition);
	const [selectedFuelType, setSelectedFuelType] = React.useState<string>(props.selFuelType);
	const [vehicleNo, setVehicleNo] = React.useState<string>(props.vehNo);
	const [chassisNo, setChassisNo] = React.useState<string>(props.chassisNo);
	const [brand, setBrand] = React.useState<string>(props.brand);
	const [noOfSeats, setNoOfSeats] = React.useState<number>(props.noOfSeats);

	  // Update state when props change
	React.useEffect(() => {
		setSelectedVehType(props.selVehType);
        setSelectedCondition(props.selCondition);
        setSelectedFuelType(props.selFuelType);
        setVehicleNo(props.vehNo);
        setChassisNo(props.chassisNo);
        setBrand(props.brand);
        setNoOfSeats(props.noOfSeats);
		setSelectedYear(props.year);
		setId(props.id);
    }, [props.selVehType, 
		props.selCondition, 
		props.selFuelType, 
		props.vehNo, 
		props.chassisNo, 
		props.brand, 
		props.noOfSeats
	]);

	 // Validation function
	const checkValidation = () : boolean => {

		 // Validation checks for each field
        // Display error message using SweetAlert2 if validation fails
        // Return false if any validation fails, otherwise return true

		if (!vehicleNoRegex.test(vehicleNo)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invaid vehicle number"
				});
			return false;
		}
		if (!chassisNoRegex.test(chassisNo)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invaid chassis number"
				});
            return false;
        }
		if (selectedYear < 1900 || selectedYear > new Date().getFullYear()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invalid year!"
				});
            return false;
        }
		if (!brandRegex.test(brand)) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invaid brand name"
				});
            return false;
        }
		if (selectedVehType.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Vehicle type is required!"
				});
			return false;
		}
		if (!nuRegex.test(noOfSeats.toString())) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Invaid number of seats"
				});
            return false;
        }

		if (selectedFuelType.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Fuel type is required!"
				});
            return false;
        }
		if (selectedCondition.length === 0) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Condition is required!"
				});
            return false;
        }

		return true;
	}

	// Add vehicle function
	const handleAddVehicle = () => {

		// Check validation before adding vehicle
        // If validation passes, construct vehicle object and make POST request
        // Display success or error message using SweetAlert2
        // Close dialog and clear fields after successful addition

		if (checkValidation()) {
			const vehicle = {
			no: vehicleNo,
			type: selectedVehType,
			chassisNo: chassisNo,
			productionYear: new Date(selectedYear.toString()),
			ac: selectedCondition === "AC",
			brand: brand,
			availability: true,
			fuelType: selectedFuelType,
			noOfSeats: !noOfSeats ? 0 : noOfSeats
		}

		axios.post('http://localhost:3000/api/v1/vehicle', vehicle).then((response) => {
			if (response.status === 201) {
				Swal.fire({
					title: "Good job!",
					text: "Vehicle added successfully!",
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

	// Update vehicle function
	const handleUpdateVehicle = () => {

		// Check validation before updating vehicle
        // If validation passes, construct vehicle object and make PATCH request
        // Display success or error message using SweetAlert2
        // Close dialog and clear fields after successful update

		if (checkValidation()) {
		const vehicle = {
			no: vehicleNo,
			type: selectedVehType,
			chassisNo: chassisNo,
			productionYear: new Date(selectedYear.toString()),
			ac: selectedCondition === "AC",
			brand: brand,
			fuelType: selectedFuelType,
			noOfSeats: !noOfSeats ? 0 : noOfSeats
		}
			
			//axios.put(`http://localhost:3000/api/v1/vehicle`, vehicle).then((response) => {	
			axios.put(`http://localhost:3000/api/v1/vehicle/${id}`, vehicle).then((response) => {
			console.log(response);

				if (response.status === 200) {
					Swal.fire({
					title: "Good job!",
					text: "Vehicle update successfully!",
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

	  // Clear all fields
	const clearFields = () => {

		// Reset all state variables to empty or default values
		setVehicleNo("");
        setChassisNo("");
        setBrand("");
        setNoOfSeats(0);
		setSelectedFuelType("")
    }
	return (
		<div>

			{/* Dialog component for adding or updating vehicle */}
			<Dialog open={props.isOpen} onClose={() =>  props.close()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					{"Vehicle Details"}
				</DialogTitle>
				<DialogContent>
					<br />
					<DialogContentText id="alert-dialog-description">
						{/* Form fields for adding or updating vehicle */}
                        {/* Display input fields using Grid layout */}
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Vehicle Number"
									variant="outlined"
									fullWidth
									value={vehicleNo}
									onChange={(event) => setVehicleNo(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Vehicle Chassis Number"
									variant="outlined"
									fullWidth
									value={chassisNo}
									onChange={(event) => setChassisNo(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									select
									label="Select Year"
									value={selectedYear}
									onChange={onChangeDate}
									fullWidth
								>
									{years.map((year) => (
										<MenuItem key={year} value={year}>
											{year}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Brand"
									variant="outlined"
									fullWidth
									value={brand}
									onChange={(event) => setBrand(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									select
									label="Vehicle Type"
									value={selectedVehType}
									onChange={(e) => setSelectedVehType(e.target.value)}
									fullWidth
								>
									{vehTypes.map((type, i) => (
										<MenuItem key={i} value={type}>
											{type}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									label="No. of Seats"
									variant="outlined"
									fullWidth
									value={noOfSeats}
									onChange={(event) => setNoOfSeats(parseInt(event.target.value))}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									select
									label="Fuel Type"
									value={selectedFuelType}
									onChange={(e) => setSelectedFuelType(e.target.value)}
									fullWidth
								>
									{fuelTypes.map((type, i) => (
										<MenuItem key={i} value={type}>
											{type}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									select
									label="Condition"
									value={selectedCondition}
									onChange={(e) => setSelectedCondition(e.target.value)}
									fullWidth
								>
									{conditions.map((type, i) => (
										<MenuItem key={i} value={type}>
											{type}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>

					{/* Add or Update button */}
					<Button onClick={props.isUpdate?  handleUpdateVehicle:handleAddVehicle}>{props.isUpdate? "Update": "Add"}</Button>
					{/* Cancel button */}
					<Button onClick={() => props.close()}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default NewVehicle