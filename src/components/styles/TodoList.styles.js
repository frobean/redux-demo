import styled from '@emotion/styled';

/*
  emotoncss for readability
*/
export const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 6px;
  margin-bottom: 8px;
`;

export const Checkbox = styled.input`
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 6px 10px;
  font-size: 14px;
  background-color: #1a1a1a;
  border: 1px solid #646cff;
  border-radius: 4px;
  color: white;
`;

export const TodoText = styled.span`
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.6 : 1};
  cursor: pointer;
`;

export const CategoryBadge = styled.span`
  font-size: 12px;
  padding: 2px 8px;
  background-color: #646cff33;
  border-radius: 4px;
  color: #646cff;
`;

export const Button = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  background-color: ${props => props.variant === 'delete' ? '#d32f2f' : '#4a4a4a'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  opacity: 0.6;
`;

export const ListContainer = styled.div`
  margin-top: 20px;
`;
