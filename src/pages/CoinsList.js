import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Container = styled.div`
  padding: 1rem;
`;

const CoinCard = styled.div`
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

function CoinList() {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/list';

    axios
      .get(apiUrl)
      .then(response => setCoinList(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <h1>Coin List</h1>
      <div>
        {coinList.map(coin => (
          <CoinCard key={coin.id}>
            <Logo src={coin.image} alt={`${coin.name} Logo`} />
            <div>
              <h2>{coin.name}</h2>
              <p>Symbol: {coin.symbol}</p>
            </div>
          </CoinCard>
        ))}
      </div>
    </Container>
  );
}

export default CoinList;
