import styled from '@emotion/styled';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

// ... (the rest of the App component implementation)


const Container = styled.div`
  
  padding: 1rem;
`;

const NavLink = styled(Link)`
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
`;

function App() {
  return (
      <Container>
        <nav>
          <NavLink to="/">Crypto Market List</NavLink>
          <NavLink to="/exchange_rates">Exchange Rates</NavLink>
          <NavLink to="/coin_list">Coin List</NavLink>
          <NavLink to="/exchange_list">Exchange List</NavLink>
          <NavLink to="/top_coins">Top coins List</NavLink>
        </nav>
        <Outlet></Outlet>
        {/* <Switch>
          <Route exact path="/">
            <MarketList></MarketList>
          </Route>
          <Route exact path="/exchange_rates">
            <ExchangeRates />
          </Route>
          <Route exact path="/coin_list">
            <CoinList />
          </Route>
          <Route exact path="/exchange_list">
            <ExchangeList />
          </Route>
          <Route exact path="/exchange_list/:id">
            <ExchangeDetails />
          </Route>
        </Switch> */}
      </Container>
  );
}

export default App;
