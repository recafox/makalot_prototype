import styled from 'styled-components';
import { useEffect, useRef } from 'react';

const FadeInWrapper = (props) => {
  const el = useRef(null);
  const options = {
    rootMargin: '0px 0px 0px -100px',
  };
  useEffect(() => {
    if (!el.current) return;
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => entry.target.classList.add('fade-in'), 100);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el.current);
  }, []);

  return <StyledFadeInWrapper ref={el}>{props.children}</StyledFadeInWrapper>;
};

const HorizontalFrame = (props) => {
  const randomBG = () =>
    `rgba(0, ${Math.random() * 155}, ${Math.random() * 155}, 0.6)`;

  useEffect(() => {}, []);
  return (
    <StyledContainer bg={randomBG()} {...props}>
      <FadeInWrapper>
        {props.children ? props.children : 'This will scroll horizontally'}
      </FadeInWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  box-sizing: border-box;
  border: 5px solid yellow;
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-family: 'Microsoft JhengHei', sans-serif;
  background-color: ${(p) => p.bg};
`;

const StyledFadeInWrapper = styled.div`
  opacity: 0;
  transform: translateY(32px;);
  transition: all 0.3s ease-out;
  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default HorizontalFrame;
