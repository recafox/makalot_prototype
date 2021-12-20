import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { useEffect, useRef, useState } from 'react';

import HorizontalFrame from './HorizontalFrame';
import VerticalFrame from './VerticalFrame';

// 滑鼠滾輪向右平移
// 在移到vertical區塊時, 滾輪事件變成向下
// vertical區塊滾動完成後, 滾輪事件變回向右

// 滑鼠滾輪向左平移
// 在移到vertical區塊時, 滾輪事件變成向上
// vertical區塊回到原點時, 滾輪事件變回向左

function App() {
  const containerRef = useRef(null);
  const isInVertical = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.getBoundingClientRect().width;
    const verticalContainer = document.querySelector('#SECTION_1');
    const verticalContainerPos = verticalContainer.getBoundingClientRect().left;
    const verticalContainerWidth =
      verticalContainer.getBoundingClientRect().width;
    const verticalContainerHeight =
      verticalContainer.getBoundingClientRect().height;

    const handleWheel = (e) => {
      const moveDist = Math.abs(e.deltaY) * 0.6;
      if (!isInVertical.current) {
        const currentContainerStyle = window.getComputedStyle(container);
        const translateX = Math.abs(
          new DOMMatrix(currentContainerStyle.transform).m41
        );
        if (e.deltaY > 0) {
          if (translateX + moveDist >= containerWidth - window.innerWidth) {
            container.style.transform = `translateX(-${
              containerWidth - window.innerWidth
            }px)`;
          } else {
            container.style.transform = `translateX(-${
              translateX + moveDist
            }px)`;
          }
        } else {
          console.log(translateX - moveDist);
          if (translateX - moveDist <= 0) {
            container.style.transform = `translateX(0px)`;
          } else {
            container.style.transform = `translateX(-${
              translateX - moveDist
            }px)`;
          }
        }
      } else {
      }
    };

    window.addEventListener('mousewheel', handleWheel);
  }, []);

  return (
    <StyledContainer className='App' ref={containerRef}>
      <GlobalStyle />
      <HorizontalFrame id='SECTION_0' />
      <VerticalFrame id='SECTION_1' />
      <HorizontalFrame id='SECTION_2' />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width: min-content;
  height: 100vh;
  overflow-y: hidden;
`;

export default App;
