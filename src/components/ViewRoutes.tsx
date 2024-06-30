import React, { useEffect, useState } from "react";
import {
	GoogleMap,
	LoadScript,
	DirectionsRenderer,
	Marker,
} from "@react-google-maps/api";

interface RouteResponse {
	routes: {
		vehicleName: string;
		vehicleStartTime: string;
		vehicleEndTime: string;
		visits: {
			isPickup: boolean;
			startTime: string;
			detour: string;
			loadDemands: {
				weight: {
					amount: string;
				};
			};
			shipmentName: string;
		}[];
		transitions: {
			travelDuration: string;
			travelDistanceMeters: number;
			waitDuration: string;
			totalDuration: string;
			startTime: string;
			vehicleLoads: {
				weight: {
					amount?: string;
				};
			};
		}[];
		metrics: {
			performedShipmentCount: number;
			travelDuration: string;
			waitDuration: string;
			delayDuration: string;
			breakDuration: string;
			visitDuration: string;
			totalDuration: string;
			travelDistanceMeters: number;
			maxLoads: {
				weight: {
					amount: string;
				};
			};
		};
	}[];
	metrics: {
		visitDuration: string;
		totalDuration: string;
		travelDuration: string;
	};
	skippedShipments: {
		// Add properties for skipped shipments
	}[];
	validationErrors: {
		// Add properties for validation errors
	}[];
}

const MapPage: React.FC = () => {
	const [directions, setDirections] = useState<google.maps.DirectionsResult[]>(
		[]
	);
	const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
	// const [map, setMap] = useState<google.maps.Map | null>(null);

	useEffect(() => {
		const fetchRoutes = async () => {
			try {
				const response = await fetch("API_ENDPOINT", {
					method: "POST",
					// Add necessary request headers and body
				});

				if (response.ok) {
					const data: RouteResponse = await response.json();
					const directionsResults: google.maps.DirectionsResult[] = [];
					const markerPositions: google.maps.LatLngLiteral[] = [];

					for (const route of data.routes) {
						const vehicleResponse = await fetch(
							`API_ENDPOINT/vehicles/${route.vehicleName}`,
							{
								method: "GET",
								// Add necessary request headers
							}
						);

						if (vehicleResponse.ok) {
							const vehicleData = await vehicleResponse.json();
							const origin: google.maps.LatLngLiteral = {
								lat: vehicleData.startLocation.lat,
								lng: vehicleData.startLocation.lng,
							};
							markerPositions.push(origin);

							const waypoints: google.maps.DirectionsWaypoint[] = [];

							for (const visit of route.visits) {
								const shipmentResponse = await fetch(
									`API_ENDPOINT/shipments/${visit.shipmentName}`,
									{
										method: "GET",
										// Add necessary request headers
									}
								);

								if (shipmentResponse.ok) {
									const shipmentData = await shipmentResponse.json();
									const location: google.maps.LatLngLiteral = {
										lat: shipmentData.deliveryLocation.lat,
										lng: shipmentData.deliveryLocation.lng,
									};
									waypoints.push({
										location: new google.maps.LatLng(location),
										stopover: true,
									});
									markerPositions.push(location);
								}
							}

							const destination: google.maps.LatLngLiteral = {
								lat: vehicleData.endLocation.lat,
								lng: vehicleData.endLocation.lng,
							};
							markerPositions.push(destination);

							const directionsService = new google.maps.DirectionsService();
							const directionsResult = await directionsService.route({
								origin,
								destination,
								waypoints,
								travelMode: google.maps.TravelMode.DRIVING,
							});

							directionsResults.push(directionsResult);
						}
					}

					setDirections(directionsResults);
					setMarkers(markerPositions);
				} else {
					console.error("Error fetching routes:", response.statusText);
				}
			} catch (error) {
				console.error("Error fetching routes:", error);
			}
		};

		fetchRoutes();
	}, []);

	return (
		<GoogleMap
			mapContainerStyle={{ width: "100%", height: "400px" }}
			center={{ lat: 6.9271, lng: 79.8612 }}
			zoom={8}
		>
			{directions.map((route, index) => (
				<DirectionsRenderer
					key={index}
					directions={route}
				/>
			))}
			{markers.map((position, index) => (
				<Marker
					key={index}
					position={position}
				/>
			))}
		</GoogleMap>
	);
};

export default MapPage;
