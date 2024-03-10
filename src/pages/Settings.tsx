// import * as React from 'react';
import {
	Container,
	Typography,
	Box,
	Paper,
	FormGroup,
	FormControlLabel,
	Switch,
	TextField,
	Button,
	AppBar,
	Toolbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Settings = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<SettingsIcon sx={{ mr: 2 }} />
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Settings
					</Typography>
				</Toolbar>
			</AppBar>
			<Container sx={{ py: 8 }}>
				<Typography
					variant="h4"
					gutterBottom
				>
					Application Settings
				</Typography>
				<Paper sx={{ p: 2, mb: 2 }}>
					<Typography
						variant="h6"
						gutterBottom
					>
						Notifications
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={<Switch defaultChecked />}
							label="Email Notifications"
						/>
						<FormControlLabel
							control={<Switch />}
							label="Push Notifications"
						/>
					</FormGroup>
				</Paper>
				<Paper sx={{ p: 2, mb: 2 }}>
					<Typography
						variant="h6"
						gutterBottom
					>
						Account
					</Typography>
					<Box
						component="form"
						noValidate
						autoComplete="off"
					>
						<TextField
							fullWidth
							label="Username"
							margin="normal"
						/>
						<TextField
							fullWidth
							label="Email"
							margin="normal"
						/>
						<Button
							variant="contained"
							sx={{ mt: 2 }}
						>
							Update Account
						</Button>
					</Box>
				</Paper>
				{/* Add more settings categories as needed */}
			</Container>
		</Box>
	);
};

export default Settings;
