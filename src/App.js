import styled from '@emotion/styled';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

const Container = styled.div`
  padding: 1rem;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #232f3e;
  padding: 0.5rem 0;
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  text-decoration: none;
  color: #fff;
  font-size: 20px; /* Increased font size */
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #f0c14b;
  }
`;

function App() {
  return (
    <Container>
      <Navbar>
        <NavLink to="/">Crypto Market List</NavLink>
        <NavLink to="/exchange_rates">Exchange Rates</NavLink>
        <NavLink to="/coin_list">Coin List</NavLink>
        <NavLink to="/exchange_list">Exchange List</NavLink>
        <NavLink to="/top_coins">Top Coins List</NavLink>
      </Navbar>
      <Outlet></Outlet>
    </Container>
  );
}

export default App;
