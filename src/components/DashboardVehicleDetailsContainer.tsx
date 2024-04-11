import  * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface VehicleData {
  numberOfVehicles: number;
  numberOfVehiclesOutOfService: number;
  numberOfVehiclesInService: number;
}

interface Props {
  vehicleData: VehicleData;
}

const DashboardVehicleDetailsInfo: React.FC<Props> = ({ vehicleData }) => {
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
          <h3>Details of Vehicles</h3>
          <p>No of Vehicle: {vehicleData.numberOfVehicles}</p>
          <p>No of Vehicles Out of Service: {vehicleData.numberOfVehiclesOutOfService}</p>
          <p>No of Vehicles In Service: {vehicleData.numberOfVehiclesInService}</p>
        </div>
      </Paper>
    </Grid>
  );
};

export default DashboardVehicleDetailsInfo;
