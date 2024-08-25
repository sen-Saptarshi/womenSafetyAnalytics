import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  // Dummy data for charts
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Total Cases',
        data: [300, 500, 400, 700, 200, 300, 600],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Molestation', 'Kidnapping', 'Rape', 'Murder'],
    datasets: [
      {
        label: 'Crime Breakdown',
        data: [40, 20, 25, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Cases in Last 30 Days</h3>
          <p>1,230</p>
        </div>
        <div className="card">
          <h3>Active Hotspots</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>Emergency Alerts</h3>
          <p>3 Alerts in Last 24 Hours</p>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart">
          <h3>Monthly Crime Cases</h3>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h3>Crime Breakdown</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
