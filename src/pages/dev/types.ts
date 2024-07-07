export interface Vehicle {
	name: string;
	displayName: string;
	startLocation: Location;
	endLocation: Location;
	travelMode: "TRAVEL_MODE_UNSPECIFIED" | "DRIVING" | "WALKING";
	loadLimits: { [key: string]: { maxLoad: string } };
	costPerHour: number;
	costPerTraveledHour: number;
	costPerKilometer: number;
	fixedCost: number;
	usedIfRouteIsEmpty: boolean;
	routeModifiers?: RouteModifiers;
	breakRule?: BreakRule;
	label?: string;
	startTimeWindows: TimeWindow[];
	endTimeWindows: TimeWindow[];
	extraVisitDurationForVisitType: { [key: string]: string };
	unloadingPolicy:
		| "UNLOADING_POLICY_UNSPECIFIED"
		| "LAST_IN_FIRST_OUT"
		| "FIRST_IN_FIRST_OUT";
}

export interface Shipment {
	name: string;
	displayName: string;
	pickups: VisitRequest[];
	deliveries: VisitRequest[];
	loadDemands: { [key: string]: { amount: string } };
	allowedVehicleIndexes: number[];
	penaltyCost: number;
	shipmentType?: string;
	label?: string;
	pickupToDeliveryRelativeDetourLimit?: number;
	pickupToDeliveryAbsoluteDetourLimit?: string;
	pickupToDeliveryTimeLimit?: string;
}

export interface Optimizer {
	name: string;
	displayName: string;
	modelSpec: ModelSpec;
	optimizeToursSpec: OptimizeToursSpec;
}

export interface Operation {
	name: string;
	metadata: any;
	done: boolean;
	error?: any;
	response?: any;
}

export interface Solution {
	name: string;
	optimizationResponse: OptimizationResponse;
	metadata: SolutionMetadata;
}

export interface Location {
	latitude: number;
	longitude: number;
}

export interface TimeWindow {
	startTime: string;
	endTime: string;
	softStartTime?: string;
	softEndTime?: string;
	costPerHourBeforeSoftStartTime?: number;
	costPerHourAfterSoftEndTime?: number;
}

export interface VisitRequest {
	arrivalLocation: Location;
	departureLocation?: Location;
	duration: string;
	timeWindows: TimeWindow[];
	cost?: number;
	tag?: string[];
}

export interface RouteModifiers {
	avoidTolls?: boolean;
	avoidHighways?: boolean;
	avoidFerries?: boolean;
	avoidIndoor?: boolean;
}

export interface BreakRule {
	breakRequests: BreakRequest[];
	frequencyConstraints: FrequencyConstraint[];
}

export interface BreakRequest {
	earliestStartTime: string;
	latestStartTime: string;
	minDuration: string;
}

export interface FrequencyConstraint {
	minBreakDuration: string;
	maxInterBreakDuration: string;
}

export interface ModelSpec {
	globalStartTime: string;
	globalEndTime: string;
	globalDurationCostPerHour?: number;
	maxActiveVehicles?: number;
}

export interface OptimizeToursSpec {
	timeout: string;
	solvingMode?: "DEFAULT_SOLVE" | "VALIDATE_ONLY";
}

export interface OptimizationResponse {
	routes: ShipmentRoute[];
	skippedShipments: SkippedShipment[];
	metrics: Metrics;
}

export interface ShipmentRoute {
	vehicleIndex: number;
	vehicleLabel?: string;
	vehicleStartTime: string;
	vehicleEndTime: string;
	visits: Visit[];
}

export interface Visit {
	shipmentIndex: number;
	isPickup: boolean;
	visitRequestIndex: number;
	startTime: string;
}

export interface SkippedShipment {
	index: number;
	label?: string;
	reasons: SkipReason[];
}

export interface SkipReason {
	code: string;
	exampleVehicleIndex?: number;
}

export interface Metrics {
	objectiveValue: number;
	totalDistance: number;
	totalTravelTime: string;
	totalBreakTime: string;
	totalWaitTime: string;
	totalVisitTime: string;
	totalTravelCost: number;
	maxActiveVehicles: number;
}

export interface SolutionMetadata {
	optimizer: string;
	optimizationStartTime: string;
}
