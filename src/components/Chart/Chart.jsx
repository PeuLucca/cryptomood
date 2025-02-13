// Core
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Components
import Loading from "../Loading";

// Style
import "./Chart.css";

export default function Chart({ crypto, data }) {
  return (
    <div className="chart-container">
      <h3 style={{ textTransform: "capitalize" }}>Latest {crypto} value</h3>
      <ResponsiveContainer width="100%" height={300}>
        {
          data && data.length > 0 ? (
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis domain={[0, 100]} stroke="#fff" />
              <Tooltip formatter={(value) => `$${Math.round(value).toLocaleString()}`} />
              <Line type="monotone" dataKey="mood" stroke="#DF9A29" strokeWidth={3} />
            </LineChart>
          ) : <Loading />
        }
      </ResponsiveContainer>
    </div>
  );
}
