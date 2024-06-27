
import * as React from 'react';
import Grid from '@mui/material/Grid';
import DashboardVehicleDetailsInfo from '../components/DashboardVehicleDetailsContainer';
import DashboardDriversDetailsInfo from '../components/DashboardDriversDetailsInfo';
import DashboardPassengersDetailsInfo from '../components/DashboardPassengersDetailsInfo';
import DashboardAccidentsDetailsInfo from '../components/DashboardAccidentsDetailsInfo';
import DashboardMalfunctionsDetailsInfo from '../components/DashboardMalfunctionsDetailsInfo';
// import NavigationBar from '../components/NavigationBar';

const DashboardPage: React.FC = () => {
  // Initialize dynamic data to zero
  const vehicleData = {
    numberOfVehicles: 0,
    numberOfVehiclesOutOfService: 0,
    numberOfVehiclesInService: 0,
  };

  const driverData = {
    totalDrivers: 0,
    availableDrivers: 0,
    notAvailableDrivers: 0,
  };

  const tripData = {
    finishedTrips: 0,
    liveTrips: 0,
    scheduledTrips: 0,
    cancelledTrips: 0,
  };

  const accidentCount = 0;
  const malfunctionCount = 0;

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {/* First Row */}
      <NavigationBar />
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {/* Box 1: Details of Vehicles */}
          <DashboardVehicleDetailsInfo vehicleData={vehicleData} />

          {/* Box 2: Drivers Info */}
          <DashboardDriversDetailsInfo driverData={driverData} />

          {/* Box 3: Trips Info */}
          <DashboardPassengersDetailsInfo tripData={tripData} />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {/* Box 4: Number of Accidents */}
          <DashboardAccidentsDetailsInfo accidentCount={accidentCount} />

          {/* Box 5: Number of Malfunctions */}
          <DashboardMalfunctionsDetailsInfo malfunctionCount={malfunctionCount} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
