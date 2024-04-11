import * as  React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface TripData {
  finishedTrips: number;
  liveTrips: number;
  scheduledTrips: number;
  cancelledTrips: number;
}

interface Props {
  tripData: TripData;
}

const DashboardPassengersDetailsInfo: React.FC<Props> = ({ tripData }) => {
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
          <h3>Trips Info</h3>
          <p>Finished Trips: {tripData.finishedTrips}</p>
          <p>Live Trips: {tripData.liveTrips}</p>
          <p>Scheduled Trips: {tripData.scheduledTrips}</p>
          <p>Cancelled Trips: {tripData.cancelledTrips}</p>
        </div>
      </Paper>
    </Grid>
  );
};

export default DashboardPassengersDetailsInfo;
