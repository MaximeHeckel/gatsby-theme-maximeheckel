import styled from '@emotion/styled';
import React from 'react';

export const ColoredBlockWrapper = styled('div')`
  background: ${props => props.color};
  color: #2b2d3e;
  position: relative;
  width: 100vw;
  padding-bottom: 50px;
  padding-top: 50px;
  left: calc(-50vw + 50%);

  div {
    @media (max-width: 800px) {
      padding-left: 30px;
      padding-right: 30px;
    }
    margin: 0 auto;
    max-width: 700px;
  }

  a {
    color: #2b2d3e;
  }
`;

const ColoredBlock = props => {
  return (
    <ColoredBlockWrapper color={props.color}>
      <div>{props.children}</div>
    </ColoredBlockWrapper>
  );
};

export default ColoredBlock;
