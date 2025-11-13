import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
`;

const SpinnerText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-left: ${theme.spacing.sm};
`;

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <SpinnerContainer>
      <span style={{ fontSize: '1.5rem' }}>🌊</span>
      <SpinnerText>{message}</SpinnerText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

