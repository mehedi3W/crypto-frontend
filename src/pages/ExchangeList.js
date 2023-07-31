import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component

const Container = styled.div`
  padding: 1rem;
`;

const ExchangeCard = styled.div`
  align-items: center;
  display: flex;
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

const PriceChangeIndicator = styled.span`
  color: ${({ isPositive }) => (isPositive ? "green" : "red")};
  margin-left: 8px;
`;

function ExchangeList() {
  const [exchangeList, setExchangeList] = useState([]);

  useEffect(() => {
    const apiUrl = "https://api.coingecko.com/api/v3/exchanges";

    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exchange list:", error);
      });
  }, []);

  return (
    <Container>
      <h1>Exchange List</h1>
      {exchangeList.map((exchange) => {
        const priceChange =
          exchange.trade_volume_24h_btc -
          exchange.trade_volume_24h_btc_normalized;

        return (
          <Link to={`/exchange_list/${exchange.id}`} key={exchange.id}>
            <ExchangeCard>
              <Logo src={exchange.image} alt={`${exchange.name} Logo`} />
              <div>
                <h2>{exchange.name}</h2>
                <div>Country: {exchange.country}</div>
                <div>URL: {exchange.url}</div>
                <div>
                  Trade Volume 24h BTC: {exchange.trade_volume_24h_btc} BTC
                  {priceChange !== 0 && (
                    <PriceChangeIndicator isPositive={priceChange > 0}>
                      {priceChange > 0 ? "↑" : "↓"}
                    </PriceChangeIndicator>
                  )}
                </div>
              </div>
            </ExchangeCard>
          </Link>
        );
      })}
    </Container>
  );
}

export default ExchangeList;
