// TopCoins.js
import styled from "@emotion/styled";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
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
  const [loading, setLoading] = useState(true); // Add loading state

  // const fetchTopCoins = async () => {
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // CORS proxy URL
  //   const apiUrl =
  //     "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

  //   try {
  //     const response = await fetch(proxyUrl + apiUrl); // Use the proxy URL here
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setTopCoins(data);
  //   } catch (error) {
  //     console.error("Error fetching top coins:", error);
  //   }
  // };

  const fetchTopCoins = async () => {
    const coinCapUrl = "http://localhost:5001/api/topCoins"; // Your backend API
    const coinGeckoUrl = "http://localhost:5001/api/fetchStoredCoins";

    try {
      const response = await fetch(coinCapUrl);
      if (!response.ok) {
        console.error("coinCapUrl was not ok")
      }
      const coinCapData = await response.json();

      const coinGeckoResponse = await fetch(coinGeckoUrl);
      if (!coinGeckoResponse.ok) {
        console.error("coinGeckoResponse was not ok")
      }
      const coinGeckoData = await coinGeckoResponse.json();

      const mergedData = coinCapData.data.map((coinCapCoin) => {
        // Find the corresponding coin data from CoinGecko API based on ID
        const coinGeckoCoin = coinGeckoData.find(
          (coin) => coin.name === coinCapCoin.name
        );

        // Create a merged object with required properties
        return {
          id: coinCapCoin.id,
          name: coinCapCoin.name,
          symbol: coinCapCoin.symbol,
          priceUsd: coinCapCoin.priceUsd,
          changePercent24Hr: coinCapCoin.changePercent24Hr,
          image: coinGeckoCoin?.image || "", // Use CoinGecko image if available
        };
      });
      setLoading(false);
      setTopCoins(mergedData);
    } catch (error) {
      console.error("Error fetching top coins:", error);
    }
  };

  useEffect(() => {
    fetchTopCoins(); // Fetch data initially

    // Set up polling to fetch data every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchTopCoins, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  if(loading){
    return (
      <Loading></Loading>
    )
  }

  return (
    <Container>
      <h1>Top 50 Coins by Market Capitalization</h1>
      {topCoins.map((coin) => {
        const priceChange =
          coin.priceUsd -
          coin.priceUsd / (1 + coin.changePercent24Hr / 100);

        return (
          <Link style={inlineStyle} to={`/top_coins/${coin.id}`} key={coin.id}>
            <CoinCard>
              <CoinInfo>
                <Logo src={coin.image} alt={`${coin.name} Logo`} />
                <div>
                  <h2>{coin.name}</h2>
                  <div> {coin.symbol/* .toUpperCase() */}</div>
                </div>
              </CoinInfo>
              <CoinDetails>
                <div>${coin.priceUsd}</div>
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
                  {parseFloat(coin.changePercent24Hr).toFixed(2)}%
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
