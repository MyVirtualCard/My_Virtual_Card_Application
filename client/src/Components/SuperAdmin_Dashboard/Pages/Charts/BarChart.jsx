import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
// import {HighlightedCode} from '@mui/docs/HighlightedCode';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function BarChartForViews() {
  const [layout, setLayout] = React.useState('vertical');
  const [radius, setRadius] = React.useState(10);

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={1} flex={1}>
          <Typography gutterBottom>Border Radius</Typography>
          <Slider
            value={radius}
            onChange={(event, value) => setRadius(value)}
            valueLabelDisplay="auto"
            min={0}
            max={50}
            sx={{ mt: 2 }}
          />
        </Stack>
        <TextField
          select
          sx={{ minWidth: 150 }}
          label="layout"
          value={layout}
          onChange={(event) => setLayout(event.target.value)}
        >
          <MenuItem value="horizontal">Horizontal</MenuItem>
          <MenuItem value="vertical">Vertical</MenuItem>
        </TextField>
      </Stack>
      <BarChart
        series={[
          { dataKey: 'View', label: 'View', layout, stack: 'stack' },
          // { dataKey: 'low', label: 'Low', layout, stack: 'stack' },
        ]}
        {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
        borderRadius={radius}
      />
      <solarizedlight
        code={[`<BarChart`, `  /* ... */`, `  borderRadius={${radius}}`, `/>`].join(
          '\n',
        )}
        language="jsx"
        copyButtonHidden
      >

      </solarizedlight>
    </Stack>
  );
}

const dataset = [
  [20, 'Sep'],
  [5, 'October'],
  [10, 'November'],
  [35, 'December'],
].map(([View, order]) => ({
  View,
 
  order,
}));
const chartSettingsH = {
  dataset,
  height: 300,
  yAxis: [{ scaleType: 'band', dataKey: 'order' }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
  slotProps: {
    legend: {
      direction: 'row',
      position: { vertical: 'bottom', horizontal: 'middle' },
      padding: -5,
    },
  },
};
const chartSettingsV = {
  ...chartSettingsH,
  xAxis: [{ scaleType: 'band', dataKey: 'order' }],
  yAxis: undefined,
};
