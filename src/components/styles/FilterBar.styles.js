import styled from '@emotion/styled';

/*
 Use emotioncss to mark up the component bits
*/
export const Container = styled.div`
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const FilterGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  opacity: 0.8;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #1a1a1a;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  color: white;

  &::placeholder {
    color: #888;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 6px 16px;
  font-size: 13px;
  background-color: ${props => props.active ? '#646cff' : '#3a3a3a'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    opacity: 0.9;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #1a1a1a;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  option {
    background-color: #1a1a1a;
  }
`;

export const ResetButton = styled.button`
  padding: 6px 16px;
  font-size: 13px;
  background-color: #d32f2f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #b71c1c;
  }
`;