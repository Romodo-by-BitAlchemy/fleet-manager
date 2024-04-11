
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface DriverData {
  totalDrivers: number;
  availableDrivers: number;
  notAvailableDrivers: number;
}

interface Props {
  driverData: DriverData;
}

const DashboardDriversDetailsInfo: React.FC<Props> = ({ driverData }) => {
  return (
    <Grid item>
      <Paper
        sx={{
          height: 250,
          width: 280,
          margin: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          padding: 2,
        }}
      >
        <div>
          <h3>Drivers Info</h3>
          <p>Total Drivers: {driverData.totalDrivers}</p>
          <p>Available Drivers: {driverData.availableDrivers}</p>
          <p>Not-Available Drivers: {driverData.notAvailableDrivers}</p>
        </div>
      </Paper>
    </Grid>
  );
};

export default DashboardDriversDetailsInfo;
