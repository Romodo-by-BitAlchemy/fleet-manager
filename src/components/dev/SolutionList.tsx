// components/SolutionList.tsx
import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Solution, ShipmentRoute, Visit } from "../../pages/dev/types";

interface SolutionListProps {
	solutions: Solution[];
	setSolutions: React.Dispatch<React.SetStateAction<Solution[]>>;
}

const SolutionList: React.FC<SolutionListProps> = ({
	solutions,
	setSolutions,
}) => {
	const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
		null
	);
	const [open, setOpen] = useState(false);

	const handleOpen = (solution: Solution) => {
		setSelectedSolution(solution);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedSolution(null);
	};

	const formatDateTime = (dateTimeString: string) => {
		return new Date(dateTimeString).toLocaleString();
	};

	const renderRoutes = (routes: ShipmentRoute[]) => (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Vehicle</TableCell>
						<TableCell>Start Time</TableCell>
						<TableCell>End Time</TableCell>
						<TableCell>Visits</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{routes.map((route, index) => (
						<TableRow key={index}>
							<TableCell>
								{route.vehicleLabel || `Vehicle ${route.vehicleIndex}`}
							</TableCell>
							<TableCell>{formatDateTime(route.vehicleStartTime)}</TableCell>
							<TableCell>{formatDateTime(route.vehicleEndTime)}</TableCell>
							<TableCell>{renderVisits(route.visits)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);

	const renderVisits = (visits: Visit[]) => (
		<List dense>
			{visits.map((visit, index) => (
				<ListItem key={index}>
					<ListItemText
						primary={`Shipment ${visit.shipmentIndex} - ${visit.isPickup ? "Pickup" : "Delivery"}`}
						secondary={`Start Time: ${formatDateTime(visit.startTime)}`}
					/>
				</ListItem>
			))}
		</List>
	);

	return (
		<Box>
			<Typography
				variant="h4"
				gutterBottom
			>
				Solutions
			</Typography>
			<List>
				{solutions.map((solution) => (
					<ListItem key={solution.name}>
						<ListItemText
							primary={solution.name.split("/").pop()}
							secondary={`Created: ${formatDateTime(solution.metadata.optimizationStartTime)}`}
						/>
						<Button onClick={() => handleOpen(solution)}>Details</Button>
					</ListItem>
				))}
			</List>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="lg"
				fullWidth
			>
				<DialogTitle>Solution Details</DialogTitle>
				<DialogContent>
					{selectedSolution && (
						<Box>
							<Typography variant="h6">
								Name: {selectedSolution.name}
							</Typography>
							<Typography>
								Created:{" "}
								{formatDateTime(
									selectedSolution.metadata.optimizationStartTime
								)}
							</Typography>
							<Typography>
								Optimizer: {selectedSolution.metadata.optimizer}
							</Typography>

							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>Routes</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{renderRoutes(selectedSolution.optimizationResponse.routes)}
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>Skipped Shipments</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<List>
										{selectedSolution.optimizationResponse.skippedShipments.map(
											(shipment, index) => (
												<ListItem key={index}>
													<ListItemText
														primary={`Shipment ${shipment.index}`}
														secondary={`Reasons: ${shipment.reasons.map((reason) => reason.code).join(", ")}`}
													/>
												</ListItem>
											)
										)}
									</List>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography>Metrics</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Objective Value:{" "}
										{
											selectedSolution.optimizationResponse.metrics
												.objectiveValue
										}
									</Typography>
									<Typography>
										Total Distance:{" "}
										{
											selectedSolution.optimizationResponse.metrics
												.totalDistance
										}
									</Typography>
									<Typography>
										Total Travel Time:{" "}
										{
											selectedSolution.optimizationResponse.metrics
												.totalTravelTime
										}
									</Typography>
									<Typography>
										Max Active Vehicles:{" "}
										{
											selectedSolution.optimizationResponse.metrics
												.maxActiveVehicles
										}
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default SolutionList;
