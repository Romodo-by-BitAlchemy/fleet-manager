import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios'; // Import AxiosResponse type
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function Home() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    Axios.defaults.withCredentials = true;

    const handleLogout = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmLogout = () => {
        Axios.get('http://localhost:3000/auth/logout')
            .then((res: AxiosResponse<{ status: boolean }>) => {
                if (res.data.status) {
                    alert("User logged out successfully");
                    console.log("User logged out successfully");
                    navigate('/login');
                }
            }).catch((err: any) => {
                console.log(err);
            });
    };

    

    /*const handleLogout = () => {
        Axios.get('http://localhost:3000/auth/logout')
            .then((res: AxiosResponse<{ status: boolean }>) => { // Define type for res
                if (res.data.status) {
                    alert("User logged out successfully");
                    console.log("User logged out successfully");
                    navigate('/login');
                }
            }).catch((err) => {
                console.log(err);
            })*/
    
            return (
                <div>
                    <h2>Home</h2>
                    <Button component={Link} to="/dashboard" variant="contained" color="primary">Dashboard</Button>
                    <br /><br />
                    <Button onClick={handleLogout} variant="contained" color="secondary">Logout</Button>
        
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Logout Confirmation</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to logout?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={confirmLogout} color="secondary">
                                Logout
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }

export default Home;
