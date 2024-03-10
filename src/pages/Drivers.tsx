import * as React from "react";
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";

const Drivers: React.FC = () => {
	return (
		<Container maxWidth="lg">
			<Typography
				variant="h1"
				component="h1"
				align="center"
				gutterBottom
			>
				Drivers
			</Typography>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
				>
					<Card>
						<CardContent>
							<Typography
								variant="h5"
								component="h2"
							>
								Driver Name
							</Typography>
							<Typography color="textSecondary">
								License Number: XXXX-XXXX-XXXX
							</Typography>
							<Typography color="textSecondary">Vehicle Type: Sedan</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* Add more driver cards here */}
			</Grid>
		</Container>
	);
};

export default Drivers;
