// import * as React from 'react';
import {
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
	Button,
	AppBar,
	Toolbar,
	Box,
	Chip,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinearScaleIcon from "@mui/icons-material/LinearScale";

const trips = [
	{
		origin: "New York, NY",
		destination: "Los Angeles, CA",
		distance: "2,789 miles",
	},
	{
		origin: "Chicago, IL",
		destination: "Houston, TX",
		distance: "1,082 miles",
	},
	{
		origin: "Denver, CO",
		destination: "Phoenix, AZ",
		distance: "815 miles",
	},
	// Add more trips as needed
];

const Trips = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Container sx={{ py: 8 }}>
				<Typography
					variant="h4"
					gutterBottom
				>
					Route Details
				</Typography>
				<Grid
					container
					spacing={4}
				>
					{trips.map((trip, index) => (
						<Grid
							item
							key={index}
							xs={12}
							sm={6}
							md={4}
						>
							<Card>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
									>
										<LocationOnIcon /> {trip.origin} - {trip.destination}
									</Typography>
									<Chip
										icon={<LinearScaleIcon />}
										label={`Distance: ${trip.distance}`}
										variant="outlined"
									/>
								</CardContent>
								<CardActions>
									<Button size="small">View Details</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Trips;
