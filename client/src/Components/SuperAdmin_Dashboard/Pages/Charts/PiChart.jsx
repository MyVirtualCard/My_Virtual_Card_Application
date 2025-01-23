import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Total Users', value: 35, color: '#0088FE' },
  { label: 'Reseller User', value: 5, color: '#00C49F' },
  { label: 'Basic Plan User', value: 20, color: '#FFBB28' },
  { label: 'EnterPrice Plan User', value: 10, color: '#FF8042' },
];

const sizing = {
  margin: { right: 5 },
  width: 300,
  height: 300,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function PieChartDiagram() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 150,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 12,
        },
      }}
      {...sizing}
    />
  );
}
