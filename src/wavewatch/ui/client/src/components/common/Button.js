import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const StyledButton = styled.button`
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.8rem 1.5rem'};
  background: ${props => 
    props.variant === 'primary' 
      ? theme.colors.background.glassHover
      : theme.colors.background.glass
  };
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${theme.colors.background.glassActive};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

