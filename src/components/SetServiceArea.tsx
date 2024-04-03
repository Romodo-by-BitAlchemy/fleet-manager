// MapComponent.tsx
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SetServiceArea: React.FC = () => {
	const [radius, setRadius] = useState<number>();
	const mapRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	let map: google.maps.Map;
	let circle: google.maps.Circle;

	useEffect(() => {
		if (mapRef.current && !map) {
			map = new google.maps.Map(mapRef.current, {
				center: { lat: 6.9271, lng: 79.8612 },
				zoom: 8,
			});
		}

		if (inputRef.current) {
			const autocomplete = new google.maps.places.Autocomplete(
				inputRef.current,
				{
					componentRestrictions: { country: "LK" },
				}
			);
			autocomplete.bindTo("bounds", map);
			autocomplete.addListener("place_changed", () => {
				const place = autocomplete.getPlace();
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}
				const location = place.geometry.location;
				if (location) {
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
			});
		}
	}, [radius]);

	const handleUpdateMap = (radiusInput: number): void => {
		setRadius(radiusInput * 1000);
		if (radius) circle.setMap(map);

		circle = new google.maps.Circle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			map,
			center: map.getCenter(),
			radius: radius,
		});
	};

	const radiusInputRef = useRef<HTMLInputElement>(null);
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField
				label="Start Point"
				variant="outlined"
				inputRef={inputRef}
			/>
			<TextField
				label="Radius (KM)"
				variant="outlined"
				type="number"
				onChange={(e) => handleUpdateMap(Number(e.target.value))}
				inputRef={radiusInputRef}
			/>
			<Button
				variant="contained"
				onClick={() => {
					handleUpdateMap(Number(radiusInputRef.current));
				}}
			>
				Update
			</Button>
			<div
				ref={mapRef}
				style={{ height: "400px", width: "100%" }}
			/>
		</Box>
	);
};

export default SetServiceArea;
