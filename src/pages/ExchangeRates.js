import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 1rem;
`;

const ExchangeRateCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
`;

function ExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';

    axios
      .get(apiUrl)
      .then(response => setExchangeRates(Object.entries(response.data.rates)))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <h1>Exchange Rates</h1>
      <div>
        {exchangeRates.map(([currency, rate]) => (
          <ExchangeRateCard key={currency}>
            <Logo src={rate.image} alt={`${currency} Logo`} />
            <div>
              <h2>{currency}</h2>
              <p>Rate: {rate.value}</p>
              <p>Last Updated: {new Date(rate.timestamp * 1000).toLocaleString()}</p>
            </div>
          </ExchangeRateCard>
        ))}
      </div>
    </Container>
  );
}

export default ExchangeRates;
