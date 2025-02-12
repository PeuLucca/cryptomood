// Core
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Style
import "./Chart.css";

const data = [
  { date: "Feb 5", mood: 40 },
  { date: "Feb 6", mood: 55 },
  { date: "Feb 7", mood: 60 },
  { date: "Feb 8", mood: 30 },
  { date: "Feb 9", mood: 50 },
  { date: "Feb 10", mood: 80 },
  { date: "Feb 11", mood: 75 },
];

export default function Chart({ crypto }) {
  return (
    <div className="chart-container">
      <h3 style={{ textTransform: "capitalize" }}>Latest {crypto} value</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis domain={[0, 100]} stroke="#fff" />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#ffcc00" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
