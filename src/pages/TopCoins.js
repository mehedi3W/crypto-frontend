// TopCoins.js
import styled from "@emotion/styled";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import './font.css';

const inlineStyle = {
  textDecoration: "none",
  color: "inherit",
};

const Container = styled.div`
  padding: 1rem;
`;

const CoinCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 1rem;
`;

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CoinDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 20px;
`;

const PriceChangeIndicator = styled.span`
  color: ${({ isPositive }) => (isPositive ? "green" : "red")};
  margin: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

function TopCoins() {
  const [topCoins, setTopCoins] = useState([]);
  const fetchTopCoins = async () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy URL
    const apiUrl =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";
  
    try {
      const response = await fetch(proxyUrl + apiUrl); // Use the proxy URL here
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTopCoins(data);
    } catch (error) {
      console.error("Error fetching top coins:", error);
    }
  };

  useEffect(() => {
    fetchTopCoins(); // Fetch data initially

    // Set up polling to fetch data every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchTopCoins, 10000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <h1>Top 50 Coins by Market Capitalization</h1>
      {topCoins.map((coin) => {
        const priceChange =
          coin.current_price -
          coin.current_price / (1 + coin.price_change_percentage_24h / 100);

        return (
          <Link style={inlineStyle} to={`/top_coins/${coin.id}`} key={coin.id}>
            <CoinCard>
              <CoinInfo>
                <Logo src={coin.image} alt={`${coin.name} Logo`} />
                <div>
                  <h2>{coin.name}</h2>
                  <div> {coin.symbol.toUpperCase()}</div>
                </div>
              </CoinInfo>
              <CoinDetails>
                <div>${coin.current_price}</div>
                <div>
                  {priceChange !== 0 && (
                    <PriceChangeIndicator isPositive={priceChange > 0}>
                      {priceChange > 0 ? (
                        <FontAwesomeIcon icon={faArrowAltCircleUp} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowAltCircleDown} />
                      )}
                    </PriceChangeIndicator>
                  )}
                  {" "}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                {/* <div>Market Cap: ${coin.market_cap.toLocaleString()}</div>
                <div>24h Volume: ${coin.total_volume.toLocaleString()}</div> */}
              </CoinDetails>
            </CoinCard>
          </Link>
        );
      })}
    </Container>
  );
}

export default TopCoins;
