// CoinChart.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts'; // Import ReactApexChart
import { useParams } from 'react-router-dom';

const CoinChart = () => {
    const {id} = useParams();
    const coinId = id;
    console.log("coinId: ", coinId)
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;

    axios
      .get(apiUrl)
      .then(response => {
        setCoinData(response.data.prices);
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
        data: coinData.map(data => [new Date(data[0]).getTime(), data[1]]), // Convert Unix timestamp to milliseconds
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
