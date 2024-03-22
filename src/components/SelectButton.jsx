import styled from '@emotion/styled'
import React from 'react'

const StyledButton = styled.span`
  border: 1px solid #0B60B0;
  border-radius: 5px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Montserrat;
  cursor: pointer;
  background-color: ${({ selected }) => selected ? "#0B60B0" : ""};
  color: ${({ selected }) => selected ? "black" : ""};
  font-weight: ${({ selected }) => selected ? 700 : 500};
  &:hover {
    background-color: #0B60B0;
    color: black;
  }
  width: 22%;
`;

export default function SelectButton({ children, selected, onClick }) {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
