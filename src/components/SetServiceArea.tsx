// MapComponent.tsx
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";

const SetServiceArea: React.FC = () => {
	const [radius, setRadius] = useState<number>();
	const [center, setCenter] = useState<google.maps.LatLng | null>(null);
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			const autocomplete = new google.maps.places.Autocomplete(
				inputRef.current,
				{
					componentRestrictions: { country: "LK" },
				}
			);

			autocomplete.addListener("place_changed", () => {
				const place = autocomplete.getPlace();
				if (!place.geometry || !place.geometry.location) {
					console.log("Returned place contains no geometry");
					return;
				}
				setCenter(place.geometry.location);
			});
		}
	}, []);

	const radiusInputRef = useRef<HTMLInputElement>(null);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<TextField
				label="Start Point"
				variant="outlined"
				inputRef={inputRef}
				onChange={() => {
					if (map && center) {
						map.fitBounds({
							north: center.lat(),
							south: center.lat(),
							east: center.lng(),
							west: center.lng(),
						});
					}
				}}
			/>
			<TextField
				label="Radius (KM)"
				variant="outlined"
				type="number"
				onChange={(e) => setRadius(Number(e.target.value) * 1000)}
				inputRef={radiusInputRef}
			/>
			<Button
				variant="contained"
				onClick={() => {
					if (map && center && radius) {
						map.fitBounds({
							north: center.lat() + radius / 111300,
							south: center.lat() - radius / 111300,
							east: center.lng() + radius / 111300,
							west: center.lng() - radius / 111300,
						});
					}
				}}
			>
				Update
			</Button>
			<div style={{ height: "400px", width: "100%" }}>
				<GoogleMap
					mapContainerStyle={{ height: "100%", width: "100%" }}
					center={center || { lat: 6.9271, lng: 79.8612 }}
					zoom={8}
					onLoad={setMap}
				>
					{center && <Marker position={center} />}
					{center && radius && (
						<Circle
							center={center}
							radius={radius}
							options={{
								strokeColor: "#FF0000",
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: "#FF0000",
								fillOpacity: 0.35,
							}}
						/>
					)}
				</GoogleMap>
			</div>
		</Box>
	);
};

export default SetServiceArea;
