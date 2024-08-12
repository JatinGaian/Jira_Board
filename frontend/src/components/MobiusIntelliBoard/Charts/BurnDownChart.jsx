// BurndownChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BurnDownChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={100} height={100} data={data}  margin={{left: -20, right:30 }}>
                <XAxis dataKey="day" padding={{ left: 30, right: 30 }} fontSize={"clamp(0.75rem, 0rem + 0.9375vw, 2.25rem)  "} />
                <YAxis dataKey="storyPoints" fontSize={"clamp(0.75rem, 0rem + 0.9375vw, 2.25rem)    "} />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="linear" dataKey="storyPoints" stroke="#7C5CFC" fill='#7C5CFC' activeDot={{ r: 5 }} />
                <Line type="linear" dataKey="idealBurnDown" stroke="#D6DAE1" dot={false} />
            </LineChart>
        </ResponsiveContainer >
    );
};

export default BurnDownChart;
