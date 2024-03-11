import { Box, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import BusImage from "../assets/busimage.jpg";

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
}));

export default function Signupf1() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				height: "100vh",
				width: "100vw",
			}}
		>
			{/* Left side with BusImage */}
			<Box
				sx={{
					flex: 1,
					backgroundImage: `url(${BusImage})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					position: "relative",
					minHeight: "100vh",
				}}
			></Box>

			<Grid
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					flex: 1,
					padding: "20px",
					"@media (min-width: 600px)": {
						flex: 0.5,
					},
				}}
			>
				<StyledPaper>
					<Typography
						variant="h3"
						sx={{ fontWeight: 900, color: "purple" }}
					>
						SIGN UP
					</Typography>
					<Typography
						variant="body2"
						sx={{ fontWeight: 400, color: "black" }}
					>
						Company Details
					</Typography>
					<br />
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							xs={12}
						>
							<TextField
								id="outlined-basic"
								label="Company Name"
								variant="outlined"
								fullWidth
								type="text"
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<TextField
								id="outlined-basic"
								label="Address"
								variant="outlined"
								fullWidth
								type="text"
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<TextField
								id="outlined-basic"
								label="Registered Number"
								variant="outlined"
								fullWidth
								type="text"
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<TextField
								id="outlined-basic"
								label="Contact Number"
								variant="outlined"
								fullWidth
								type="tel"
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<TextField
								id="outlined-basic"
								label="Company Email"
								variant="outlined"
								fullWidth
								type="email"
							/>
						</Grid>
					</Grid>
					<br />
					<Button
						variant="contained"
						sx={{ backgroundColor: "purple" }}
					>
						Next
						<br />
					</Button>
				</StyledPaper>
			</Grid>
		</Box>
	);
}
