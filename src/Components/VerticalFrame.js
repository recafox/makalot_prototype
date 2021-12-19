import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import HorizontalFrame from './HorizontalFrame';

const VerticalFrame = ({ isScrolledOver, onScrollFinish, id }) => {
  const containerRef = useRef(null);
  const scrolledOver = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    // mousewheel
    const max =
      containerRef.current.getBoundingClientRect().top +
      window.scrollY +
      containerRef.current.getBoundingClientRect().height -
      window.innerHeight;

    const handleWheel = (e) => {
      console.log('inside use effect', scrolledOver.current);
      if (!scrolledOver.current) return;
      const deltaY = e.deltaY;
      const container = containerRef.current;
      const style = window.getComputedStyle(container);
      const currentTranslate = new DOMMatrix(style.transform).m42; // translateX
      const dist = window.innerWidth / 50;

      if (deltaY > 0) {
        // boundary
        if (Math.abs(currentTranslate - dist) > max) {
          container.style.transform = `translateY(-${max}px)`;
          onScrollFinish();
        } else {
          container.style.transform = `translateY(${
            currentTranslate - dist
          }px)`;
        }
      } else {
        if (currentTranslate + dist >= 0) {
          container.style.transform = `translateY(0px)`;
          onScrollFinish();
        } else {
          container.style.transform = `translateY(${
            currentTranslate + dist
          }px)`;
        }
      }
    };
    containerRef.current.addEventListener('mousewheel', handleWheel);
  }, []);

  useEffect(() => {
    scrolledOver.current = isScrolledOver;
  }, [isScrolledOver]);

  return (
    <StyledContainer ref={containerRef} id={id}>
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
