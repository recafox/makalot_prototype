import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { useEffect, useRef, useState } from 'react';

import HorizontalFrame from './HorizontalFrame';
import VerticalFrame from './VerticalFrame';

function App() {
  const scrolledIDRef = useRef(0);
  const containerRef = useRef(null);
  const totalSections = 3;
  const currentlyMoved = useRef(0);
  const isScrollable = useRef(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrollable.current) return;
      const deltaY = e.deltaY;
      const container = containerRef.current;
      const style = window.getComputedStyle(container);
      const currentTranslate = new DOMMatrix(style.transform).m41; // translateX
      const dist = window.innerWidth / 20;
      if (deltaY > 0) {
        // boundary
        const max = container.getBoundingClientRect().width - window.innerWidth;
        if (Math.abs(currentTranslate - dist) >= max) {
          container.style.transform = `translateX(-${max}px)`;
        } else {
          container.style.transform = `translateX(${
            currentTranslate - dist
          }px)`;
        }
      } else {
        if (currentTranslate + dist >= 0) {
          container.style.transform = `translateX(0)`;
        } else {
          container.style.transform = `translateX(${
            currentTranslate + dist
          }px)`;
        }
      }
      currentlyMoved.current = Math.abs(new DOMMatrix(style.transform).m41);
      const sections = [0, window.innerWidth, window.innerWidth * 2];
      // 要換成各section實際的值
      // TODO: 製作一個map, 記錄各區域左邊開始起點, 計算方式:
      // 第 1 個元素為 0
      // 第 2 個元素為 0 + 第一個元素的寬度
      // 第 3 個元素為 第2個元素的左邊起點 + 第2個元素的寬度
      let current = sections.indexOf(
        sections.find((sec) => currentlyMoved.current === sec)
      );

      scrolledIDRef.current = current;

      setCurrentSection(scrolledIDRef.current);
      if (scrolledIDRef.current === 1) {
        isScrollable.current = false;
      }
    };

    window.addEventListener('mousewheel', handleWheel);
  }, []);

  return (
    <StyledContainer className='App' ref={containerRef}>
      <GlobalStyle />
      <HorizontalFrame id='SECTION_0' />
      <VerticalFrame
        id='SECTION_1'
        isScrolledOver={currentSection === 1 ? true : false}
        onScrollFinish={() => {
          isScrollable.current = true;
        }}
      />
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
