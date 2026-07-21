import React from "react";
import { Bar } from "react-chartjs-2";


import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";



ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);




const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div style={{ width: "400px", height: "300px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default  BarChart;
// export default BarChart;