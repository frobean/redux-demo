import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
`;

export const StatsGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const StatCard = styled.div`
  /* Empty parent style */
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.color || '#646cff'};
`;

export const StatLabel = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  background-color: ${props =>
    props.disabled ? '#3a3a3a' :
    props.variant === 'danger' ? '#d32f2f' : '#646cff'
  };
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: white;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;