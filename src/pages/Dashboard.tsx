

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
 import NavigationBar from "../components/NavigationBar";
import ComparisonBarChart from "../components/IssuesDashboard";
import BarChart from "../components/VehiclesDashboard";
import PieChart from "../components/DriversDashboard";
import DoughnutChart from "../components/TripsDashboard";
import LineChartForNoOfTripsDashboard from "../components/LineChartForNoOfTripsDashboard";
import { format } from "date-fns";



const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#0083b0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontWeight: 900,
      fontSize: "3rem",
      textTransform: "uppercase",
      marginBottom: "1rem",
      marginLeft: "300px",
      textAlign: "center",
      letterSpacing: "0.5px",
      background: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      padding: "0.5rem",
    },
    h6: {
      fontWeight: "bold",
      textAlign: "center",
    },
  },
});

const DashboardPage: React.FC = () => {
  const [vehicleCounts, setVehicleCounts] = useState({
    totalVehicles: 0,
    inServiceVehicles: 0,
    outOfServiceVehicles: 0,
  });

  const [driverCounts, setDriverCounts] = useState({
    noOfTotalDrivers: 0,
    noOfAvailableDrivers: 0,
    noOfUnavailableDrivers: 0,
  });

  const [tripCounts, setTripCounts] = useState({
    numberOfTotalTrips: 0,
    scheduledTrips: 0,
    cancelledTrips: 0,
  });

  const [comparisonChartData, setComparisonChartData] = useState({
    years: [],
    malfunctionData: [],
    accidentData: [],
  });

  const [completedTripCounts, setCompletedTripCounts] = useState<TripCount[]>([]);

  useEffect(() => {
    fetchVehicleCounts();
    fetchDriverCounts();
    fetchTripCounts();
    fetchComparisonData();
    fetchTripCountsDaily();
    // fetchTraveledKmCounts();

    const intervalId = setInterval(() => {
      fetchVehicleCounts();
      fetchDriverCounts();
      fetchTripCounts();
      fetchComparisonData();
      fetchTripCountsDaily();
      // fetchTraveledKmCounts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchVehicleCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/vehicles/counts"
      );
      const { vehicles } = response.data;
      setVehicleCounts({
        totalVehicles: vehicles.total,
        inServiceVehicles: vehicles.inService,
        outOfServiceVehicles: vehicles.outOfService,
      });
    } catch (error) {
      console.error("Error fetching vehicle counts:", error);
    }
  };

  const fetchDriverCounts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/drivers/counts");
      const { available, unavailable } = response.data.drivers;
      setDriverCounts({
        noOfTotalDrivers: response.data.drivers.total,
        noOfAvailableDrivers: available,
        noOfUnavailableDrivers: unavailable,
      });
    } catch (error) {
      console.error("Error fetching driver counts:", error);
    }
  };

  const fetchTripCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/trips/counts"
      );
      const { scheduledTrips, cancelledTrips, totalTrips } =
        response.data.trips;
      setTripCounts({
        numberOfTotalTrips: totalTrips,
        scheduledTrips: scheduledTrips,
        cancelledTrips: cancelledTrips,
      });
    } catch (error) {
      console.error("Error fetching trip counts:", error);
    }
  };

  const fetchComparisonData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/issues/counts"
      );
      const data = response.data;
      const years = data.map((item: any) => item.year.toString());
      const malfunctionData = data.map((item: any) => item.malfunctions);
      const accidentData = data.map((item: any) => item.accidents);
      setComparisonChartData({ years, malfunctionData, accidentData });
    } catch (error) {
      console.error("Error fetching comparison data:", error);
    }
  };

  interface TripCount {
    date: string;
    count: number;
  }
  
  const fetchTripCountsDaily = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/trips/daily-completed");
      const dailyData = response.data;

      console.log("Raw API Response:", dailyData);

      if (!Array.isArray(dailyData)) {
        throw new Error("Expected an array of daily trip data");
      }

      const transformedData: TripCount[] = dailyData.map((item: any) => {
        try {
          const date = new Date(`${item.year}-${item.month}-${item.day}`);
          const formattedDate = format(date, 'yyyy-MM-dd');

          return {
            date: formattedDate,
            count: item.count,
          };
        } catch (error) {
          console.error("Error parsing date or count:", error);
          return null;
        }
      }).filter((data: TripCount | null): data is TripCount => data !== null);

      console.log("Transformed Data:", transformedData);

      setCompletedTripCounts(transformedData);
    } catch (error) {
      console.error("Error fetching daily completed trips:", error);
    }
  };

  
  const { totalVehicles, inServiceVehicles, outOfServiceVehicles } =
    vehicleCounts;
  const { noOfTotalDrivers, noOfAvailableDrivers, noOfUnavailableDrivers } =
    driverCounts;
  const { numberOfTotalTrips, scheduledTrips, cancelledTrips } = tripCounts;
  const { years, malfunctionData, accidentData } = comparisonChartData;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        <NavigationBar />
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ marginBottom: "1rem", textAlign: "center" }}>
            Dashboard
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "2rem", marginBottom: "2rem", justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginRight: "50px" , marginLeft: "100px"}}>
              <Card sx={{ height: "400px", width :"550px" , display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", background: "#f0f0f0", borderRadius: "30px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Vehicle Status
                  </Typography>
                  <BarChart
                    noOfTotalVehicles={totalVehicles}
                    noOfInServiceVehicles={inServiceVehicles}
                    noOfOutOfServiceVehicles={outOfServiceVehicles}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginRight: "160px" , marginLeft: "250px" }}>
              <Card sx={{ height: "400px", width :"550px" ,display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", background: "#f0f0f0", borderRadius: "30px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Driver Status
                  </Typography>
                  <PieChart
                    noOfAvailableDrivers={noOfAvailableDrivers}
                    noOfUnavailableDrivers={noOfUnavailableDrivers}
                  />
                  <Typography variant="body1">
                    <b>Number of Total Drivers: {noOfTotalDrivers}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{marginRight: "50px" , marginLeft: "100px" }}>
              <Card sx={{ height: "400px", width :"550px" ,display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", background: "#f0f0f0", borderRadius: "30px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Trip Status
                  </Typography>
                  <DoughnutChart
                    numberOfTotalTrips={numberOfTotalTrips}
                    scheduledTrips={scheduledTrips}
                    cancelledTrips={cancelledTrips}
                  />
                  <Typography variant="body1">
                    <b>Number of Total Trips: {numberOfTotalTrips}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginRight: "160px" , marginLeft: "250px" }}>
              <Card sx={{ height: "400px", width :"550px" ,display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", background: "#f0f0f0", borderRadius: "30px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Issue Comparison
                  </Typography>
                  <ComparisonBarChart
                    years={years}
                    malfunctionData={malfunctionData}
                    accidentData={accidentData}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginRight: "400px" }}>
              <Card sx={{ height: "530px", width: "900px" ,display: "flex", flexDirection: "column", justifyContent: "space-between",  background: "#f0f0f0", borderRadius: "30px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Daily Completed Trips
                  </Typography>
                  <LineChartForNoOfTripsDashboard completedTripCounts={completedTripCounts} />
                </CardContent>
              </Card>
            </Grid>
            
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default DashboardPage;
