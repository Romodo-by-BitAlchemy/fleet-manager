import * as React from "react";
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Toolbar,
	Typography,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

/**
 * LandingPage component.
 * Renders the landing page of the application.
 */
const LandingPage: React.FC = () => {
	return (
		<Box sx={{ flexGrow: 1, minHeight: "100vh", width: "100vw" }}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Romodo
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ mt: 8, mb: 4 }}>
				<Box sx={{ textAlign: "center", my: 8 }}>
					<Typography
						variant="h2"
						component="h1"
						gutterBottom
					>
						Welcome to Romodo
					</Typography>
					<Typography
						variant="h5"
						component="h2"
						gutterBottom
					>
						Your ultimate fleet management solution.
					</Typography>
					<Button
						variant="contained"
						startIcon={<RocketLaunchIcon />}
						sx={{ mt: 3 }}
					>
						Get Started
					</Button>
				</Box>
				<Divider />
				<Grid
					container
					spacing={10}
					justifyContent="center"
					color={"InfoBackground"}
				>
					<Grid item>
						<Typography
							variant="h5"
							component="h3"
						>
							Feature One
						</Typography>
						<Typography>Feature one is coming soon!</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant="h5"
							component="h3"
						>
							Feature Two
						</Typography>
						<Typography>Feature two is coming soon!</Typography>
					</Grid>
					{/* Add more features as needed */}
				</Grid>
			</Container>
		</Box>
	);
};

export default LandingPage;
