import styled from '@emotion/styled';

/*
 Using emotioncss here to keep the code more readable by avoiding inline css
*/

export const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1 1 300px;
  padding: 10px 14px;
  font-size: 14px;
  background-color: #2a2a2a;
  border: 1px solid #4a4a4a;
  border-radius: 6px;
  color: white;

  &::placeholder {
    color: #888;
  }
`;

export const Select = styled.select`
  padding: 10px 14px;
  font-size: 14px;
  background-color: #2a2a2a;
  border: 1px solid #4a4a4a;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  option {
    background-color: #2a2a2a;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #646cff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-weight: 500;

  &:hover {
    background-color: #535bf2;
  }
`;
