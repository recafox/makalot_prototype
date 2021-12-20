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
  const isVerticalAllScrolled = useRef(false);

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
      const currentContainerStyle = window.getComputedStyle(container);
      const translateX = Math.abs(
        new DOMMatrix(currentContainerStyle.transform).m41
      );

      if (
        translateX < verticalContainerPos ||
        translateX >= verticalContainerPos + verticalContainerWidth
      ) {
        // reset progress
        isVerticalAllScrolled.current = false;
      }

      if (!isInVertical.current) {
        if (e.deltaY > 0) {
          if (translateX + moveDist >= containerWidth - window.innerWidth) {
            console.log('set transform 3333');
            container.style.transform = `translateX(-${
              containerWidth - window.innerWidth
            }px)`;
          } else {
            if (
              isVerticalAllScrolled.current === false &&
              translateX + moveDist >= verticalContainerPos
            ) {
              isInVertical.current = true;
              console.log('set transform 1111', verticalContainerPos);
              container.style.transform = `translateX(-${verticalContainerPos}px)`;
            } else {
              console.log('set transform 2222');
              container.style.transform = `translateX(-${
                translateX + moveDist
              }px)`;
            }
          }
        } else {
          if (translateX - moveDist <= 0) {
            container.style.transform = `translateX(0px)`;
          } else {
            if (
              isVerticalAllScrolled.current === false &&
              translateX - moveDist <
                verticalContainerPos + verticalContainerWidth * 0.5 &&
              translateX - moveDist > verticalContainerPos
            ) {
              container.style.transition = `0.4s transform ease-out`;
              console.log('set transform 4444');
              container.style.transform = `translateX(-${verticalContainerPos}px)`;
              setTimeout(() => {
                console.log('set transform 5555');
                verticalContainer.style.transform = `translateY(-${
                  verticalContainerHeight - window.innerHeight
                }px)`;
                isInVertical.current = true;
                isVerticalAllScrolled.current = false;
                container.style.transition = 'unset';
              }, 400);
            } else {
              console.log('set transform 6666');
              container.style.transform = `translateX(-${
                translateX - moveDist
              }px)`;
            }
          }
        }
      } else {
        // vertical scrolling
        const verticalStyle = window.getComputedStyle(verticalContainer);
        const verticalTransform = Math.abs(
          new DOMMatrix(verticalStyle.transform).m42
        );
        if (e.deltaY > 0) {
          if (
            verticalTransform + moveDist >=
            verticalContainerHeight - window.innerHeight
          ) {
            verticalContainer.style.transform = `translateY(-${
              verticalContainerHeight - window.innerHeight
            }px)`;
            isInVertical.current = false;
            isVerticalAllScrolled.current = true;
          } else {
            verticalContainer.style.transform = `translateY(-${
              verticalTransform + moveDist
            }px)`;
          }
        } else {
          if (verticalTransform - moveDist <= 0) {
            verticalContainer.style.transform = `translateY(0px)`;
            isInVertical.current = false;
            isVerticalAllScrolled.current = true;
          } else {
            verticalContainer.style.transform = `translateY(-${
              verticalTransform - moveDist
            }px)`;
          }
        }
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
