import TextField from "@mui/material/TextField";
import { Box, Typography, Button } from "@mui/material";
import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";
export default function Signupf1() {
	return (
		<div>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					height: "100vh",
					width: "1200px",
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
					}}
				></Box>

				<Box
					sx={{
						flex: 0.5,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<img
						src={Logo}
						alt="Logo"
						style={{
							flex: 0.1,
							width: "450px", // Adjust as needed
							height: "20px", // Adjust as neededß
							objectFit: "cover",
							maskPosition: "center",
							paddingRight: "50px",
							marginRight: "-800px",
							marginLeft: "250px",
							marginTop: "30px",
						}}
					></img>
				</Box>
				<form>
					<Box
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							//border: "2px solid purple",
							//borderRadius: "50px",
							marginTop: "20px",
							marginBottom: "20px",
						}}
					>
						<Typography
							variant="h3"
							sx={{
								fontWeight: 900,
								color: "purple",
							}}
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
						<TextField
							id="outlined-basic"
							label="Company Name"
							variant="outlined"
							sx={{ marginTop: 2 }} // Adjust as needed
						/>
						<TextField
							id="outlined-basic"
							label="Address"
							variant="outlined"
							sx={{ marginTop: 2 }} // Adjust as needed
						/>
						<TextField
							id="outlined-basic"
							label="Registered Number"
							variant="outlined"
							sx={{ marginTop: 2 }} // Adjust as needed
						/>
						<TextField
							id="outlined-basic"
							label="Contact Number"
							variant="outlined"
							sx={{ marginTop: 2 }} // Adjust as needed
						/>
						<TextField
							id="outlined-basic"
							label="Company Email"
							variant="outlined"
							sx={{ marginTop: 2 }} // Adjust as needed
						/>
						<br />
						<Button
							variant="contained"
							sx={{ backgroundColor: "purple" }}
						>
							Next
							<br />
						</Button>
					</Box>
				</form>
			</Box>
		</div>
	);
}
