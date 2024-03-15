// MapComponent.tsx
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SetServiceArea: React.FC = () => {
	const [startPoint, setStartPoint] = useState("");
	const [radius, setRadius] = useState<number>(0);
	const mapRef = useRef<HTMLDivElement>(null);
	let map: google.maps.Map;
	let circle: google.maps.Circle;

	useEffect(() => {
		if (mapRef.current && !map) {
			map = new google.maps.Map(mapRef.current, {
				center: { lat: -34.397, lng: 150.644 },
				zoom: 8,
			});
		}
	}, []);

	const handleSearch = () => {
		const service = new google.maps.places.PlacesService(map);
		service.findPlaceFromQuery(
			{
				query: startPoint,
				fields: ["name", "geometry"],
			},
			(results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK && results) {
					const location = results[0]?.geometry?.location || { lat: 0, lng: 0 };
					map.setCenter(location);
					if (circle) circle.setMap(null);
					circle = new google.maps.Circle({
						strokeColor: "#FF0000",
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: "#FF0000",
						fillOpacity: 0.35,
						map,
						center: location,
						radius: radius,
					});
				}
			}
		);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField
				label="Start Point"
				variant="outlined"
				value={startPoint}
				onChange={(e) => setStartPoint(e.target.value)}
			/>
			<TextField
				label="Radius (meters)"
				variant="outlined"
				type="number"
				value={radius}
				onChange={(e) => setRadius(Number(e.target.value))}
			/>
			<Button
				variant="contained"
				onClick={handleSearch}
			>
				Search
			</Button>
			<div
				ref={mapRef}
				style={{ height: "400px", width: "100%" }}
			/>
		</Box>
	);
};

export default SetServiceArea;
