import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const CardContainer = styled.div`
  background: ${theme.colors.background.glass};
  padding: ${props => props.padding || theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  ${props => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
`;

const Card = ({ children, padding, marginBottom, ...props }) => {
  return (
    <CardContainer padding={padding} marginBottom={marginBottom} {...props}>
      {children}
    </CardContainer>
  );
};

export default Card;

