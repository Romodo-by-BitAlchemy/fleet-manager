// DashboardPage.tsx
import * as React from "react";
import {
	Typography,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Box,
} from "@mui/material";

const DashboardPage: React.FC = () => {
	return (
		<Box sx={{ flexGrow: 1, p: 3 }}>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
			>
				Welcome to the Fleet Manager Dashboard
			</Typography>
			<Typography
				variant="subtitle1"
				gutterBottom
			>
				Manage your fleet efficiently and effectively.
			</Typography>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
				>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image="https://images.pexels.com/photos/16350504/pexels-photo-16350504/free-photo-of-cargo-ship-sailing.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Vehicle Management"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								Vehicle Management
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
							>
								Keep track of your vehicles' status, maintenance, and more.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
				>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image="https://images.pexels.com/photos/4391483/pexels-photo-4391483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Driver Management"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								Driver Management
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
							>
								Manage your drivers, schedules, and ensure compliance.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{/* Add more cards as needed */}
			</Grid>
		</Box>
	);
};

export default DashboardPage;
