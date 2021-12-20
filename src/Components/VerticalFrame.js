import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import HorizontalFrame from './HorizontalFrame';

const VerticalFrame = (props) => {
  return (
    <StyledContainer {...props}>
      <HorizontalFrame>This will scroll vertically</HorizontalFrame>
      <HorizontalFrame>This will scroll vertically</HorizontalFrame>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100vw;
  height: fit-content;
  font-size: 32px;
  font-family: 'Microsoft JhengHei', sans-serif;
  background: salmon;
  position: relative;

  .
`;

export default VerticalFrame;
