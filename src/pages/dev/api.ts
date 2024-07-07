import axios from "axios";
import { Vehicle, Shipment, Optimizer, Operation, Solution } from "./types";

// const API_BASE_URL = "https://cloudoptimization.googleapis.com/v1";
const API_BASE_URL = "http://localhost:3000/api/fleet"; // Adjust this if your API is hosted elsewhere

const PROJECT_ID = "romodo-fleets";
const LOCATION = "us-central1";
const WORKSPACE = "-3640280689426825215";

const instance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		Authorization: `Bearer `, //FIX use the backend logic
		"Content-Type": "application/json",
	},
});

export const getVehicles = () =>
	instance
		.get<Vehicle[]>(`/workspace/${WORKSPACE}/vehicle`)
		.then((res) => res.data);

export const createVehicle = (vehicleData: Omit<Vehicle, "name">) =>
	instance
		.post<Vehicle>(`/workspace/${WORKSPACE}/vehicle`, vehicleData)
		.then((res) => res.data);

export const updateVehicle = (
	vehicleId: string,
	vehicleData: Partial<Vehicle>
) =>
	instance
		.patch<Vehicle>(`/workspace/${WORKSPACE}/vehicle/${vehicleId}`, vehicleData)
		.then((res) => res.data);

export const deleteVehicle = (vehicleId: string) =>
	instance
		.delete(`/workspace/${WORKSPACE}/vehicle/${vehicleId}`)
		.then((res) => res.data);

export const getShipments = () =>
	instance
		.get<Shipment[]>(`/workspace/${WORKSPACE}/shipment`)
		.then((res) => res.data);

export const createShipment = (shipmentData: Omit<Shipment, "name">) =>
	instance
		.post<Shipment>(`/workspace/${WORKSPACE}/shipment`, shipmentData)
		.then((res) => res.data);

export const updateShipment = (
	shipmentId: string,
	shipmentData: Partial<Shipment>
) =>
	instance
		.patch<Shipment>(
			`/workspace/${WORKSPACE}/shipment/${shipmentId}`,
			shipmentData
		)
		.then((res) => res.data);

export const deleteShipment = (shipmentId: string) =>
	instance
		.delete(`/workspace/${WORKSPACE}/shipment/${shipmentId}`)
		.then((res) => res.data);

export const getOptimizers = () =>
	instance
		.get<Optimizer[]>(`/workspace/${WORKSPACE}/optimizer`)
		.then((res) => res.data);

export const createOptimizer = (optimizerData: Omit<Optimizer, "name">) =>
	instance
		.post<Optimizer>(`/workspace/${WORKSPACE}/optimizer`, optimizerData)
		.then((res) => res.data);

export const updateOptimizer = (
	optimizerId: string,
	optimizerData: Partial<Optimizer>
) =>
	instance
		.patch<Optimizer>(
			`/workspace/${WORKSPACE}/optimizer/${optimizerId}`,
			optimizerData
		)
		.then((res) => res.data);

export const deleteOptimizer = (optimizerId: string) =>
	instance
		.delete(`/workspace/${WORKSPACE}/optimizer/${optimizerId}`)
		.then((res) => res.data);

export const getOperations = () =>
	instance.get<Operation[]>(`/operations`).then((res) => res.data);

export const getSolutions = () =>
	instance
		.get<Solution[]>(`/workspace/${WORKSPACE}/solutions`)
		.then((res) => res.data);

export const runOptimizer = (optimizerId: string) =>
	instance
		.post<Operation>(`/workspace/${WORKSPACE}/optimizer/${optimizerId}:run`)
		.then((res) => res.data);

export const api = {
	// Workspace operations
	createWorkspace: (workspaceDisplayName: string) =>
		axios.post(`${API_BASE_URL}/workspace`, { workspaceDisplayName }),

	// Vehicle operations
	getVehicles: (workspaceId: string) =>
		axios.get(`${API_BASE_URL}/workspace/${workspaceId}/vehicle`),

	createVehicle: (workspaceId: string, vehicleData: any) =>
		axios.post(`${API_BASE_URL}/workspace/${workspaceId}/vehicle`, vehicleData),

	updateVehicle: (workspaceId: string, vehicleId: string, vehicleData: any) =>
		axios.patch(
			`${API_BASE_URL}/workspace/${workspaceId}/vehicle/${vehicleId}`,
			vehicleData
		),

	deleteVehicle: (workspaceId: string, vehicleId: string) =>
		axios.delete(
			`${API_BASE_URL}/workspace/${workspaceId}/vehicle/${vehicleId}`
		),

	// Shipment operations
	getShipments: (workspaceId: string) =>
		axios.get(`${API_BASE_URL}/workspace/${workspaceId}/shipment`),

	createShipment: (workspaceId: string, shipmentData: any) =>
		axios.post(
			`${API_BASE_URL}/workspace/${workspaceId}/shipment`,
			shipmentData
		),

	updateShipment: (
		workspaceId: string,
		shipmentId: string,
		shipmentData: any
	) =>
		axios.patch(
			`${API_BASE_URL}/workspace/${workspaceId}/shipment/${shipmentId}`,
			shipmentData
		),

	deleteShipment: (workspaceId: string, shipmentId: string) =>
		axios.delete(
			`${API_BASE_URL}/workspace/${workspaceId}/shipment/${shipmentId}`
		),

	// Optimizer operations
	getOptimizers: (workspaceId: string) =>
		axios.get(`${API_BASE_URL}/workspace/${workspaceId}/optimizers`),

	createOptimizer: (workspaceId: string, optimizerData: any) =>
		axios.post(
			`${API_BASE_URL}/workspace/${workspaceId}/optimizer`,
			optimizerData
		),

	updateOptimizer: (
		workspaceId: string,
		optimizerId: string,
		optimizerData: any
	) =>
		axios.patch(
			`${API_BASE_URL}/workspace/${workspaceId}/optimizer/${optimizerId}`,
			optimizerData
		),

	deleteOptimizer: (workspaceId: string, optimizerId: string) =>
		axios.delete(
			`${API_BASE_URL}/workspace/${workspaceId}/optimizer/${optimizerId}`
		),

	runOptimizer: (workspaceId: string, optimizerId: string) =>
		axios.post(
			`${API_BASE_URL}/workspace/${workspaceId}/optimizer/${optimizerId}/run`
		),

	// Operations and Solutions
	getOperations: (workspaceId: string) =>
		axios.get(`${API_BASE_URL}/workspace/${workspaceId}/operations`),

	getSolutions: (workspaceId: string) =>
		axios.get(`${API_BASE_URL}/workspace/${workspaceId}/solutions`),
};
