import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position: absolute;
  z-index: 10;
  margin-top: 50px;
  color: black;
  padding: 10px;
  border: 1px solid black;
  border-radius: 13px;
  width: 25%;
  height:25%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
              rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const Search = () => {
  return (
    <StyledDiv>
      Search
    </StyledDiv>
  );
};

export default Search;
