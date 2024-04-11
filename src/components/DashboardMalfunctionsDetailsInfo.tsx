import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface Props {
  malfunctionCount: number;
}

const DashboardMalfunctionsDetailsInfo: React.FC<Props> = ({ malfunctionCount }) => {
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
          <h3>Number of Malfunctions</h3>
          <p>Malfunction Count: {malfunctionCount}</p>
        </div>
      </Paper>
    </Grid>
  );
};

export default DashboardMalfunctionsDetailsInfo;
