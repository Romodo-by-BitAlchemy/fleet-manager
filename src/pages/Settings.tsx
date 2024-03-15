import * as React from "react";
import { useState } from "react";
import {
	Box,
	Button,
	Container,
	Grid,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import "../App.css";
import SetServiceArea from "../components/SetServiceArea";

interface IFormInput {
	firstName: string;
	lastName: string;
	email: string;
	contactNumber: string;
	companyName: string;
	companyAddress: string;
	companyEmail: string;
	companyContact: string;
}

const ProfileSettingsForm: React.FC = () => {
	const [alignment, setAlignment] = useState("profile");
	const { register, handleSubmit } = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
	};

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		if (newAlignment !== null) {
			setAlignment(newAlignment);
		}
	};

	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleAlignment}
					fullWidth
					sx={{ mb: 4, flexGrow: 1 }}
				>
					<ToggleButton value="profile">Profile Settings</ToggleButton>
					<ToggleButton value="business">Business Settings</ToggleButton>
				</ToggleButtonGroup>

				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					{alignment === "profile" ? (
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									label="First Name"
									fullWidth
									{...register("firstName")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									label="Last Name"
									fullWidth
									{...register("lastName")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									label="Email Address"
									fullWidth
									{...register("email")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									label="Contact Number"
									fullWidth
									{...register("contactNumber")}
								/>
							</Grid>
						</Grid>
					) : (
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
							>
								<TextField
									label="Company Name"
									fullWidth
									{...register("companyName")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									label="Address"
									fullWidth
									{...register("companyAddress")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									label="Email Address"
									fullWidth
									{...register("companyEmail")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									label="Contact Number"
									fullWidth
									{...register("companyContact")}
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<SetServiceArea></SetServiceArea>
							</Grid>
						</Grid>
					)}

					<Box
						sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 3 }}
					>
						<Button
							variant="outlined"
							color="secondary"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Update
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default ProfileSettingsForm;
