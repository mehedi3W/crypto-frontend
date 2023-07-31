import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 1rem;
`;

const MarketCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 1rem;
`;

function MarketList() {
  const [marketList, setMarketList] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/exchanges';

    axios
      .get(apiUrl)
      .then(response => setMarketList(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <h1>Crypto Market List</h1>
      <div>
        {marketList.map(market => (
          <MarketCard key={market.id}>
            <Logo src={market.image} alt={`${market.name} Logo`} />
            <div>
              <h2>{market.name}</h2>
              <p>Country: {market.country}</p>
              <p>URL: {market.url}</p>
            </div>
          </MarketCard>
        ))}
      </div>
    </Container>
  );
}

export default MarketList;
