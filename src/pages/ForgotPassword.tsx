import { useState, FormEvent } from 'react';
import '../App.css';
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Alert, Grid, Box } from '@mui/material';
import BusImage from "../assets/busimage.jpg";

const ForgotPassword: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = false;

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Sending a POST request to the server to initiate password reset
        axios.post("http://localhost:3000/api/v1/user/forgotPassword", {
            email,
        }).then((res: AxiosResponse<{ status: boolean }>) => {
            if (res.data.status) {
                console.log("Email sent");
                alert("Check your email for the password reset link.");
                navigate("/login");
            } else {
                setErrorMessage("Incorrect username or email.");
            }
        }).catch(err => {
            console.log(err.response.data.message);
            if (err.response.data.message === "User is not registered.") {
                setErrorMessage("User is not registered. Please sign up.");
            } else {
                setErrorMessage("Invalid username or email. Please try again.");
            }
        });
    };

    return (
        <div className='sign-up-container'>
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
                        "@media (min-width: 200vh)": {
                            flex: 0.4,
                        },
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
                    <form className='sign-up-form' onSubmit={handleSubmit}>
                        <Typography variant="h4" component="h1" gutterBottom className="typoColor">
                            Forgot Password
                        </Typography>

                        <TextField
                            required
                            type="text"
                            id="username"
                            label="Username"
                            variant="filled"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            className="textfiledStyle"
                            fullWidth
                        />

                        <TextField
                            required
                            type="email"
                            id="email"
                            label="Email"
                            variant="filled"
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            className="textfiledStyle"
                            fullWidth
                        />

                        {errorMessage && <Alert severity="error" sx={{ marginY: 2 }}>{errorMessage}</Alert>} 

                        <Button
                            type='submit'
                            color="primary"
                            size="large"
                            variant="contained"
                            className="button-instance"
                            fullWidth
                            sx={{ marginY: 2 }}
                        >
                            SUBMIT
                        </Button>

                        <Typography variant="body2" gutterBottom>
                            <Link to="/login">Back to Login</Link>
                        </Typography>
                    </form>
                    
                </Grid>
            </Box>
        </div>
    );
}

export default ForgotPassword;
