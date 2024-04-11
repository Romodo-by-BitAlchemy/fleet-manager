import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface Props {
  accidentCount: number;
}

const DashboardAccidentsDetailsInfo: React.FC<Props> = ({ accidentCount }) => {
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
          <h3>Number of Accidents</h3>
          <p>Accident Count: {accidentCount}</p>
        </div>
      </Paper>
    </Grid>
  );
};

export default DashboardAccidentsDetailsInfo;
