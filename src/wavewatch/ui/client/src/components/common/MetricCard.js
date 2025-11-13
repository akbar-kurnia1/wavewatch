import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const MetricContainer = styled.div`
  background: ${theme.colors.background.primary};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${theme.colors.border.medium};
    box-shadow: ${theme.shadows.sm};
  }
`;

const MetricLabel = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.div`
  font-size: ${props => props.size === 'large' ? theme.typography.fontSize['2xl'] : theme.typography.fontSize.xl};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: 1.2;
`;

const MetricUnit = styled.span`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.fontWeight.normal};
  margin-left: 0.25rem;
`;

const MetricCard = ({ label, value, unit, size = 'medium', ...props }) => {
  return (
    <MetricContainer {...props}>
      <MetricLabel>{label}</MetricLabel>
      <MetricValue size={size}>
        {value}
        {unit && <MetricUnit>{unit}</MetricUnit>}
      </MetricValue>
    </MetricContainer>
  );
};

export default MetricCard;

