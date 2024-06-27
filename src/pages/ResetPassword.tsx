import /*React, */{ useState, FormEvent } from 'react';
import '../App.css';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, TextField, Button, Alert , Grid , Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BusImage from "../assets/busimage.jpg";


const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { token } = useParams<{ token: string }>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    // Password strength validation function
    const isStrongPassword = (password: string): boolean => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    
        return (
          password.length >= 8 &&
          uppercaseRegex.test(password) &&
          lowercaseRegex.test(password) &&
          numberRegex.test(password) &&
          specialCharacterRegex.test(password)
        );
    };

    // Form submission handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // check if passwords don't match
        if (password !== confirmPassword) {
            const error = "Passwords do not match";
            setErrorMessage(error);
            console.log(error);
            return;
        }
        else if (!isStrongPassword(password)) {
            // Set error message if password is not strong
            const error = "Password should contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters";
            setErrorMessage(error);
            console.log(error);
            return;
        }
        else {
            setErrorMessage(""); // Reset error message when passwords match
        }

        // API call to reset password
        axios.post("http://localhost:3000/api/v1/user/resetPassword/"+token, {
            password,
        }).then((res: AxiosResponse<{ status: boolean }>) => {
            if (res.data.status) {
                alert("Password reset successfully");
                console.log("Password reset successfully");
                navigate('/login');
            }
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
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
					minHeight: "100%",
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
                    Reset Password
                </Typography>
                
                <TextField
                    required
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    label="Password"
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    className="textfiledStyle"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff /> } 
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <TextField
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="filled"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    className="textfiledStyle"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff /> } 
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <br />   

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Render error message if error state is not empty */}

                <br /><br />
      
                <Button 
                    type='submit'
                    color="primary" 
                    size="large" 
                    variant="contained" 
                    className="button-instance"
                    fullWidth
                    sx={{ marginY: 2 }} 
                >
                    RESET
                </Button>
                

                
            </form>
            </Grid>
        </Box>
        </div>
    )
}

export default ResetPassword;
