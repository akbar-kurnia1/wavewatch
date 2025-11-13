import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ErrorContainer = styled.div`
  color: ${theme.colors.accent.red};
  text-align: center;
  font-size: 1.1rem;
  padding: ${theme.spacing.md};
  background: rgba(255, 107, 107, 0.1);
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid rgba(255, 107, 107, 0.3);
`;

const ErrorMessage = ({ message, children }) => {
  return (
    <ErrorContainer>
      {children || (message && `❌ ${message}`)}
    </ErrorContainer>
  );
};

export default ErrorMessage;

