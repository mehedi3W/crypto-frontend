import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CoinChart from "../pages/CoinChart";
import CoinList from "../pages/CoinsList";
import ExchangeDetails from "../pages/ExchangeDetails";
import ExchangeList from "../pages/ExchangeList";
import ExchangeRates from "../pages/ExchangeRates";
import MarketList from "../pages/MarketList";
import TopCoins from "../pages/TopCoins";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <MarketList></MarketList>,
      },
      {
        path: "exchange_rates",
        element: <ExchangeRates></ExchangeRates>,
      },
      {
        path: "coin_list",
        element: <CoinList></CoinList>,
      },
      {
        path: "exchange_list",
        element: <ExchangeList></ExchangeList>,
      },
      {
        path: "exchange_list/:id",
        element: <ExchangeDetails></ExchangeDetails>,
      },
      {
        path: "/top_coins",
        element: <TopCoins></TopCoins>,
      },
      {
        path: "/top_coins/:id",
        element: <CoinChart></CoinChart>,
      },
    ],
  },
]);
