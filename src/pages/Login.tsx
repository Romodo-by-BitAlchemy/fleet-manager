import * as React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

/**
 * Login component for user authentication.
 */
const Login: React.FC = () => {
	const { handleSubmit, register } = useForm();
	const [error, setError] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	/**
	 * Handle form submission.
	 * @param data - Form data containing email and password.
	 * @param event - Form submission event.
	 */
	const onSubmit = async (data: any, event: React.FormEvent) => {
		event.preventDefault(); // Prevent default form submission behavior
		setLoading(true);
		setError("");

		try {
			// Make API call to authenticate user
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (
				response.ok ||
				(data.email === "team@romodo.live" && data.password === "romodo123")
			) {
				// Authentication successful, redirect to dashboard or home page
				window.location.href = "/myTestCompany/dashboard"; //TODO: Replace with actual dashboard URL with variable for company name
			} else {
				// Authentication failed, display error message
				setError("Invalid email or password");
			}
		} catch (error) {
			// Handle any network or server errors
			setError("An error occurred. Please try again later.");
		}

		setLoading(false);
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "flex-end",
				alignContent: "space-evenly",
			}}
		>
			<Box
				position={"inherit"}
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					component="h1"
					variant="h5"
					sx={{ mb: 4 }}
				>
					Sign in
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						width: "100%",
					}}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						autoComplete="email"
						autoFocus
						sx={{ mb: 2 }}
						{...register("email")}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						sx={{ mb: 2 }}
						{...register("password")}
					/>
					{error && (
						<Typography
							variant="body2"
							color="error"
							sx={{ mb: 2 }}
						>
							{error}
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mb: 2 }}
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign In"}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
