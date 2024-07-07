// components/ShipmentList.tsx
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
import { Shipment, VisitRequest } from "../../pages/dev/types";
import {
	createShipment,
	updateShipment,
	deleteShipment,
} from "../../pages/dev/api";

interface ShipmentListProps {
	shipments: Shipment[];
	setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>;
}

const ShipmentList: React.FC<ShipmentListProps> = ({
	shipments,
	setShipments,
}) => {
	const [open, setOpen] = useState(false);
	const [currentShipment, setCurrentShipment] =
		useState<Partial<Shipment> | null>(null);

	const handleOpen = (shipment: Shipment | null = null) => {
		setCurrentShipment(
			shipment || {
				displayName: "",
				pickups: [],
				deliveries: [],
				loadDemands: {},
				allowedVehicleIndexes: [],
				penaltyCost: 0,
			}
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCurrentShipment(null);
	};

	const handleSave = async () => {
		if (currentShipment) {
			let updatedShipment: Shipment;
			if ("name" in currentShipment && currentShipment.name) {
				updatedShipment = await updateShipment(
					currentShipment.name,
					currentShipment
				);
				setShipments(
					shipments.map((s) =>
						s.name === updatedShipment.name ? updatedShipment : s
					)
				);
			} else {
				updatedShipment = await createShipment(
					currentShipment as Omit<Shipment, "name">
				);
				setShipments([...shipments, updatedShipment]);
			}
		}
		handleClose();
	};

	const handleDelete = async (shipment: Shipment) => {
		if (
			window.confirm(`Are you sure you want to delete ${shipment.displayName}?`)
		) {
			await deleteShipment(shipment.name);
			setShipments(shipments.filter((s) => s.name !== shipment.name));
		}
	};

	const handleVisitRequestChange = (
		index: number,
		isPickup: boolean,
		field: keyof VisitRequest,
		value: any
	) => {
		setCurrentShipment((prev) => {
			if (!prev) return prev;
			const visits = isPickup
				? [...(prev.pickups || [])]
				: [...(prev.deliveries || [])];
			visits[index] = { ...visits[index], [field]: value };
			return {
				...prev,
				[isPickup ? "pickups" : "deliveries"]: visits,
			};
		});
	};

	return (
		<Box>
			<Typography
				variant="h4"
				gutterBottom
			>
				Shipments
			</Typography>
			<List>
				{shipments.map((shipment) => (
					<ListItem key={shipment.name}>
						<ListItemText primary={shipment.displayName} />
						<Button onClick={() => handleOpen(shipment)}>Edit</Button>
						<Button onClick={() => handleDelete(shipment)}>Delete</Button>
					</ListItem>
				))}
			</List>
			<Button
				variant="contained"
				color="primary"
				onClick={() => handleOpen()}
			>
				Add Shipment
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>
					{currentShipment && "name" in currentShipment
						? "Edit Shipment"
						: "Add Shipment"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Display Name"
						fullWidth
						value={currentShipment?.displayName || ""}
						onChange={(e) =>
							setCurrentShipment((prev) =>
								prev ? { ...prev, displayName: e.target.value } : null
							)
						}
					/>
					<Typography variant="h6">Pickups</Typography>
					{currentShipment?.pickups?.map((pickup, index) => (
						<Box key={index}>
							<TextField
								margin="dense"
								label="Arrival Latitude"
								type="number"
								fullWidth
								value={pickup.arrivalLocation.latitude}
								onChange={(e) =>
									handleVisitRequestChange(index, true, "arrivalLocation", {
										...pickup.arrivalLocation,
										latitude: Number(e.target.value),
									})
								}
							/>
							<TextField
								margin="dense"
								label="Arrival Longitude"
								type="number"
								fullWidth
								value={pickup.arrivalLocation.longitude}
								onChange={(e) =>
									handleVisitRequestChange(index, true, "arrivalLocation", {
										...pickup.arrivalLocation,
										longitude: Number(e.target.value),
									})
								}
							/>
							{/* Add more fields for pickup */}
						</Box>
					))}
					<Typography variant="h6">Deliveries</Typography>
					{currentShipment?.deliveries?.map((delivery, index) => (
						<Box key={index}>
							<TextField
								margin="dense"
								label="Arrival Latitude"
								type="number"
								fullWidth
								value={delivery.arrivalLocation.latitude}
								onChange={(e) =>
									handleVisitRequestChange(index, false, "arrivalLocation", {
										...delivery.arrivalLocation,
										latitude: Number(e.target.value),
									})
								}
							/>
							<TextField
								margin="dense"
								label="Arrival Longitude"
								type="number"
								fullWidth
								value={delivery.arrivalLocation.longitude}
								onChange={(e) =>
									handleVisitRequestChange(index, false, "arrivalLocation", {
										...delivery.arrivalLocation,
										longitude: Number(e.target.value),
									})
								}
							/>
							{/* Add more fields for delivery */}
						</Box>
					))}
					{/* Add fields for loadDemands, allowedVehicleIndexes, penaltyCost, etc. */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ShipmentList;
