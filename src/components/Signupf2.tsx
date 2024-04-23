//import TextField from "@mui/material/TextField";
import "../App.css";
import { Box, Typography, Button } from "@mui/material";
import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";
import CheckboxesGroup from "./CheckboxesGroup";
import CheckboxesGroup2 from "./CheckboxesGroup2";
interface Signupf2Props {
  onNext: () => void;
  onBack: () => void;
}

const Signupf2: React.FC<Signupf2Props> = ({ onNext, onBack }) => {
  
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
                fontWeight: 200,
                color: "black",
                marginTop: "-20",
                paddingTop: "-20px",
                marginBottom: "-20px",
              }}
            >
              Further Settings
            </Typography>
            <br />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 200,
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
                fontWeight: 200,
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
                fontWeight: 200,
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
                onClick={onNext}
                sx={{ backgroundColor: "purple" }}
              >
                Next
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                onClick={onBack}
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
};
export default Signupf2;
