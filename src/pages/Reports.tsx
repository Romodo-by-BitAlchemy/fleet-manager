import * as React from "react";
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
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

const reportTypes = [
	{
		title: "Accident and Malfunction Report",
		description:
			"Detailed reports on accidents and malfunctions encountered by the fleet.",
	},
	{
		title: "Driver Details Report",
		description:
			"Comprehensive information on drivers, including performance metrics.",
	},
	{
		title: "Passenger Details Report",
		description: "Insights into passenger demographics and travel preferences.",
	},
	{
		title: "Vehicle Details Report",
		description:
			"In-depth details on each vehicle in the fleet, including maintenance history.",
	},
	{
		title: "Distance Travelled Report",
		description:
			"Analysis of distances travelled by the fleet, optimizing for efficiency.",
	},
	// Add more report types as needed
];

const Reports = () => {
	return (
		<Box
			sx={{ flexGrow: 1 }}
			position={"relative"}
		>
			<Container sx={{ py: 8 }}>
				<Typography
					variant="h4"
					gutterBottom
				>
					Explore Fleet Reports
				</Typography>
				<Grid
					container
					spacing={4}
				>
					{reportTypes.map((report, index) => (
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
										{report.title}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{report.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">View Report</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Reports;
