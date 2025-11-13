import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const HeaderContainer = styled.header`
  background: ${theme.colors.background.glass};
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const NavLink = styled(Link)`
  color: ${theme.colors.white};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 5px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.background.glassHover};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          🌊 WaveWatch
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/surf">Surf</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

