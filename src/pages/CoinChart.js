import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom';

const CoinChart = () => {
  const { id } = useParams();
  const coinId = id;

  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://api.coincap.io/v2/assets/${coinId}/history?interval=m5`; // Interval set to 5 minutes for 24 hours data

    axios
      .get(apiUrl)
      .then(response => {
        const historicalData = response.data.data.map(data => [data.time, parseFloat(data.priceUsd)]);
        setCoinData(historicalData);
      })
      .catch(error => {
        console.error('Error fetching coin data:', error);
      });
  }, [coinId]);

  const chartData = {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
      },
      xaxis: {
        type: 'datetime',
      },
    },
    series: [
      {
        name: 'Price (USD)',
        data: coinData,
      },
    ],
  };

  return (
    <div>
      <h2>Price Chart for {coinId}</h2>
      <ReactApexChart type="line" options={chartData.options} series={chartData.series} height={400} />
    </div>
  );
};

export default CoinChart;
