import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const StyledInput = styled.input`
  padding: 0.8rem;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 1rem;
  min-width: ${props => props.minWidth || '200px'};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const Input = ({ minWidth, ...props }) => {
  return <StyledInput minWidth={minWidth} {...props} />;
};

export default Input;

