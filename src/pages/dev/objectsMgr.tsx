import React, { useState, useEffect } from "react";
import {
	AppBar,
	Tabs,
	Tab,
	Box,
	CssBaseline,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import VehicleList from "../../components/dev/VehicleList";
import ShipmentList from "../../components/dev/ShipmentList";
import OptimizerList from "../../components/dev/OptimizerList";
import OperationList from "../../components/dev/OperationList";
import SolutionList from "../../components/dev/SolutionList";
import { Vehicle, Shipment, Optimizer, Operation, Solution } from "./types";
import {
	getVehicles,
	getShipments,
	getOptimizers,
	getOperations,
	getSolutions,
} from "./api";

const theme = createTheme();

function ObjectMgr() {
	const [tab, setTab] = useState(0);
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [optimizers, setOptimizers] = useState<Optimizer[]>([]);
	const [operations, setOperations] = useState<Operation[]>([]);
	const [solutions, setSolutions] = useState<Solution[]>([]);

	useEffect(() => {
		getVehicles().then(setVehicles);
		getShipments().then(setShipments);
		getOptimizers().then(setOptimizers);
		getOperations().then(setOperations);
		getSolutions().then(setSolutions);
	}, []);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Tabs
						value={tab}
						onChange={handleChange}
						centered
					>
						<Tab label="Vehicles" />
						<Tab label="Shipments" />
						<Tab label="Optimizers" />
						<Tab label="Operations" />
						<Tab label="Solutions" />
					</Tabs>
				</AppBar>
				<Box sx={{ p: 3 }}>
					{tab === 0 && (
						<VehicleList
							vehicles={vehicles}
							setVehicles={setVehicles}
						/>
					)}
					{tab === 1 && (
						<ShipmentList
							shipments={shipments}
							setShipments={setShipments}
						/>
					)}
					{tab === 2 && (
						<OptimizerList
							optimizers={optimizers}
							setOptimizers={setOptimizers}
						/>
					)}
					{tab === 3 && (
						<OperationList
							operations={operations}
							setOperations={setOperations}
						/>
					)}
					{tab === 4 && (
						<SolutionList
							solutions={solutions}
							setSolutions={setSolutions}
						/>
					)}
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default ObjectMgr;
