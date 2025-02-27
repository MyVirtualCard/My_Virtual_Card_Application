import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const settings = {
  valueFormatter: (value) => `${value}%`,
  height: 100,
  showTooltip: true,
  showHighlight: true,
};

const smallValues = [0, 2, 3, 4, 6, 8, 7, 9, 15, 6, 8, 7, 12];
const largeValues = [60, 65, 66, 68, 87, 82, 83, 89, 92, 75, 76, 77, 91];

export default function CustomYAxis() {
  return (
    <Stack sx={{ width: '100%' }}>
      <Typography> </Typography>
      <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
    
        <Box sx={{ flexGrow: 1 }}>
          <SparkLineChart
            data={largeValues}
            yAxis={{
              min: 0,
              max: 100,
            }}
            {...settings}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
