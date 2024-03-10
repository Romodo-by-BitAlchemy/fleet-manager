import * as React from "react";
import {
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	AppBar,
	Toolbar,
	Box,
} from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";

const vehicles = [
	{
		name: "Bus",
		description:
			"A large vehicle designed to transport passengers, typically along fixed routes.",
		imageUrl: "https://example.com/bus.jpg",
		modelNumber: "1234",
	},
	{
		name: "Van",
		description:
			"A versatile vehicle with ample cargo space, suitable for various purposes.",
		imageUrl: "https://example.com/van.jpg",
		modelNumber: "5678",
	},
	// Add more vehicles as needed
];

const Vehicles = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<DirectionsCarFilledIcon sx={{ mr: 2 }} />
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Vehicle Showcase
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ py: 8 }}>
				<Typography
					variant="h4"
					gutterBottom
				>
					Explore Our Vehicles
				</Typography>
				<Grid
					container
					spacing={4}
				>
					{vehicles.map((vehicle, index) => (
						<Grid
							item
							key={index}
							xs={12}
							sm={6}
							md={4}
						>
							<Card>
								<CardMedia
									component="img"
									height="140"
									image={vehicle.imageUrl}
									alt={vehicle.name}
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="div"
									>
										{vehicle.name}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{vehicle.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">Learn More</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Vehicles;
