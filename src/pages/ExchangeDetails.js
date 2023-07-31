import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useParams } from 'react-router-dom';
const Container = styled.div`
  padding: 1rem;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 1rem;
`;

function ExchangeDetails() {
  const { id } = useParams();
  const [exchangeDetails, setExchangeDetails] = useState(null);
  const [volumeChartData, setVolumeChartData] = useState(null);

  useEffect(() => {
    const exchangeUrl = `https://api.coingecko.com/api/v3/exchanges/${id}`;
    const volumeChartUrl = `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=7`; // You can adjust the "days" parameter

    // Fetch exchange details
    axios
      .get(exchangeUrl)
      .then(response => setExchangeDetails(response.data))
      .catch(error => console.error('Error fetching exchange data:', error));

    // Fetch volume chart data
    axios
      .get(volumeChartUrl)
      .then(response => setVolumeChartData(response.data))
      .catch(error => console.error('Error fetching volume chart data:', error));
  }, [id]);

  if (!exchangeDetails || !volumeChartData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    options: {
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd MMM yyyy',
        },
      },
      yaxis: {
        labels: {
          formatter: value => `$${value}`,
        },
      },
    },
    series: [
      {
        name: 'Volume (USD)',
        data: volumeChartData.map(data => [new Date(data[0]).getTime(), data[1]]),
      },
    ],
  };

  return (
    <Container>
      <h1>Exchange Details</h1>
      <div>
        <Logo src={exchangeDetails.image} alt={`${exchangeDetails.name} Logo`} />
        <h2>{exchangeDetails.name}</h2>
        <p>Country: {exchangeDetails.country}</p>
        <p>URL: {exchangeDetails.url}</p>
        <ApexCharts options={chartData.options} series={chartData.series} type="line" height={400} />
      </div>
    </Container>
  );
}

export default ExchangeDetails;
