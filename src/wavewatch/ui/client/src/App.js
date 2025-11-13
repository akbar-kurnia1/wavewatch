import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import SurfPage from './pages/SurfPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #E8F4F8 0%, #F5F7FA 50%, #FFFFFF 100%);
  background-attachment: fixed;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surf" element={<SurfPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
