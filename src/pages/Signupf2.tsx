//import TextField from "@mui/material/TextField";
import "/Users/chamith/fleet-manager/romodo-fleet-manager/src/App.css";
import { Box, Typography, Button } from "@mui/material";
import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";
import CheckboxesGroup from "../components/CheckboxesGroup";
import CheckboxesGroup2 from "../components/CheckboxesGroup2";
export default function Signupf2() {
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
							Further Settings
						</Typography>
						<br />
						<Typography
							variant="body2"
							sx={{
								fontWeight: 400,
								color: "black",
								textAlign: "left",
								paddingRight: "130px",
								marginLeft: "-60px",
							}}
						>
							Setup Route Starting Point
						</Typography>
						<br />
						<Typography
							variant="body2"
							sx={{
								fontWeight: 400,
								color: "black",
								textAlign: "left",
								paddingRight: "130px",
								marginLeft: "-125px",
							}}
						>
							Passenger Type
						</Typography>
						<CheckboxesGroup />
						<Typography
							variant="body2"
							sx={{
								fontWeight: 400,
								color: "black",
								textAlign: "left",
								paddingRight: "130px",
								marginLeft: "-125px",
							}}
						>
							Seat Reservation
						</Typography>
						<CheckboxesGroup2 />
						<Box sx={{ display: "inline-block" }}>
							<Button
								variant="contained"
								sx={{ backgroundColor: "purple" }}
							>
								Next
							</Button>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<Button
								variant="contained"
								sx={{ color: "black", backgroundColor: "White" }}
							>
								Back
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</div>
	);
}
