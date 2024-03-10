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
		name: "Electric Sedan",
		description:
			"A sleek and modern electric vehicle perfect for city driving.",
		imageUrl: "https://example.com/electric-sedan.jpg",
	},
	{
		name: "Family SUV",
		description:
			"Spacious and safe, ideal for family trips with plenty of cargo space.",
		imageUrl: "https://example.com/family-suv.jpg",
	},
	{
		name: "Sporty Convertible",
		description:
			"Experience thrilling drives with the top down in this sporty convertible.",
		imageUrl: "https://example.com/sporty-convertible.jpg",
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
