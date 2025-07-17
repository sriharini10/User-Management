import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Report() {
  const [users, setUsers] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  useEffect(() => {
    const activeCount = users.filter(u => u.status === 'Active').length;
    const inactiveCount = users.filter(u => u.status === 'Inactive').length;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [{
          data: [activeCount, inactiveCount],
          backgroundColor: ['#28a745', '#fd7e14'],
        }],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return `${ctx.label}: ${ctx.parsed} users`;
              }
            }
          }
        }
      }
    });
  }, [users]);

  const total = users.length;
  const active = users.filter(u => u.status === 'Active').length;
  const inactive = users.filter(u => u.status === 'Inactive').length;

  return (
    <div className="report-wrapper">
      <div className="report-column">
        <canvas ref={chartRef} width={300} height={300}></canvas>
      </div>
      <div className="report-column">
        <h3>User Summary</h3>
        <table className="summary-table">
          <tbody>
            <tr><td>Total Users</td><td>{total}</td></tr>
            <tr><td>Active Users</td><td>{active}</td></tr>
            <tr><td>Inactive Users</td><td>{inactive}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
