import TextField from "@mui/material/TextField";
import "../App.css";
import { Box, Typography, Button } from "@mui/material";
import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";
interface Signupf1Props {
  onNext: () => void;
}

const Signupf1: React.FC<Signupf1Props> = ({ onNext }) => {
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
              width: "400px", // Adjust as needed
              height: "10px", // Adjust as neededß
              objectFit: "cover",
              maskPosition: "center",
              paddingRight: "50px",
              marginRight: "-800px",
              marginLeft: "250px",
              marginTop: "20px",
              marginBottom: "-30px",
              paddingBottom: "-20px",
            }}
          ></img>
        </Box>
        <form>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              //border: "2px solid purple",
              //borderRadius: "50px",
              paddingTop: "-50px",
              marginTop: "-25px",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "purple",
                marginTop: "-30px",
                paddingTop: "-30px",
              }}
            >
              SIGN UP
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: "black",
                marginTop: "-20",
                paddingTop: "-20px",
                marginBottom: "-20px",
              }}
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
              onClick={onNext}
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
};
export default Signupf1;
