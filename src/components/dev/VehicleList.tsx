// components/VehicleList.tsx
import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Typography,
} from "@mui/material";
import { Vehicle } from "../../pages/dev/types";
import {
	createVehicle,
	updateVehicle,
	deleteVehicle,
} from "../../pages/dev/api";

interface VehicleListProps {
	vehicles: Vehicle[];
	setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles, setVehicles }) => {
	const [open, setOpen] = useState(false);
	const [currentVehicle, setCurrentVehicle] = useState<Partial<Vehicle> | null>(
		null
	);

	const handleOpen = (vehicle: Vehicle | null = null) => {
		setCurrentVehicle(
			vehicle || {
				displayName: "",
				startLocation: { latitude: 0, longitude: 0 },
				endLocation: { latitude: 0, longitude: 0 },
				travelMode: "DRIVING",
				loadLimits: {},
				costPerHour: 0,
				costPerTraveledHour: 0,
				costPerKilometer: 0,
				fixedCost: 0,
				usedIfRouteIsEmpty: false,
				startTimeWindows: [],
				endTimeWindows: [],
				extraVisitDurationForVisitType: {},
				unloadingPolicy: "UNLOADING_POLICY_UNSPECIFIED",
			}
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCurrentVehicle(null);
	};

	const handleSave = async () => {
		if (currentVehicle) {
			let updatedVehicle: Vehicle;
			if ("name" in currentVehicle && currentVehicle.name) {
				updatedVehicle = await updateVehicle(
					currentVehicle.name,
					currentVehicle
				);
				setVehicles(
					vehicles.map((v) =>
						v.name === updatedVehicle.name ? updatedVehicle : v
					)
				);
			} else {
				updatedVehicle = await createVehicle(
					currentVehicle as Omit<Vehicle, "name">
				);
				setVehicles([...vehicles, updatedVehicle]);
			}
		}
		handleClose();
	};

	const handleDelete = async (vehicle: Vehicle) => {
		if (
			window.confirm(`Are you sure you want to delete ${vehicle.displayName}?`)
		) {
			await deleteVehicle(vehicle.name);
			setVehicles(vehicles.filter((v) => v.name !== vehicle.name));
		}
	};

	const handleLocationChange = (
		locationType: "startLocation" | "endLocation",
		field: "latitude" | "longitude",
		value: number
	) => {
		setCurrentVehicle((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				[locationType]: {
					...prev[locationType],
					[field]: value,
				} as Location, // Add type assertion here
			};
		});
	};

	return (
		<Box>
			<Typography
				variant="h4"
				gutterBottom
			>
				Vehicles
			</Typography>
			<List>
				{vehicles.map((vehicle) => (
					<ListItem key={vehicle.name}>
						<ListItemText primary={vehicle.displayName} />
						<Button onClick={() => handleOpen(vehicle)}>Edit</Button>
						<Button onClick={() => handleDelete(vehicle)}>Delete</Button>
					</ListItem>
				))}
			</List>
			<Button
				variant="contained"
				color="primary"
				onClick={() => handleOpen()}
			>
				Add Vehicle
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>
					{currentVehicle && "name" in currentVehicle
						? "Edit Vehicle"
						: "Add Vehicle"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Display Name"
						fullWidth
						value={currentVehicle?.displayName || ""}
						onChange={(e) =>
							setCurrentVehicle((prev) =>
								prev ? { ...prev, displayName: e.target.value } : null
							)
						}
					/>
					<TextField
						margin="dense"
						label="Start Latitude"
						type="number"
						fullWidth
						value={currentVehicle?.startLocation?.latitude || ""}
						onChange={(e) =>
							handleLocationChange(
								"startLocation",
								"latitude",
								Number(e.target.value)
							)
						}
					/>
					<TextField
						margin="dense"
						label="Start Longitude"
						type="number"
						fullWidth
						value={currentVehicle?.startLocation?.longitude || ""}
						onChange={(e) =>
							handleLocationChange(
								"startLocation",
								"longitude",
								Number(e.target.value)
							)
						}
					/>
					<TextField
						margin="dense"
						label="End Latitude"
						type="number"
						fullWidth
						value={currentVehicle?.endLocation?.latitude || ""}
						onChange={(e) =>
							handleLocationChange(
								"endLocation",
								"latitude",
								Number(e.target.value)
							)
						}
					/>
					<TextField
						margin="dense"
						label="End Longitude"
						type="number"
						fullWidth
						value={currentVehicle?.endLocation?.longitude || ""}
						onChange={(e) =>
							handleLocationChange(
								"endLocation",
								"longitude",
								Number(e.target.value)
							)
						}
					/>
					{/* Add more fields for other vehicle properties */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default VehicleList;
