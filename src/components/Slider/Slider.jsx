import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import Slide from '../Slide/Slide';

const SliderStyles = styled.div`
  all: initial;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: inline-flex;
  will-change: transform, scale;
  cursor: grab;
  .outer {
    display: flex;
    align-items: center;
  }
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-height: 100vh;
`;

function Slider({
  children,
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const dragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const currentIndex = useRef(activeIndex || 0);
  const sliderRef = useRef('slider');
  const animationRef = useRef(null);

  const transitionOn = () => (sliderRef.current.style.transition = `transform ${transition}s ease-out`);

  const transitionOff = () => (sliderRef.current.style.transition = 'none');

  function touchStart(index) {
    return function (event) {
      transitionOn();
      currentIndex.current = index;
      startPos.current = getPositionX(event);
      dragging.current = true;
      animationRef.current = requestAnimationFrame(animation);
      sliderRef.current.style.cursor = 'grabbing';
      // if onSlideStart prop - call it
      if (onSlideStart) onSlideStart(currentIndex.current);
    }
  }

  function touchMove(event) {
    if (dragging.current) {
      const currentPosition = getPositionX(event)
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current
    }
  }

  function touchEnd() {
    transitionOn();
    cancelAnimationFrame(animationRef.current);
    dragging.current = false
    const movedBy = currentTranslate.current - prevTranslate.current;

    if (movedBy < -threshHold && currentIndex.current < children.length - 1)
      currentIndex.current += 1

    if (movedBy > threshHold && currentIndex.current > 0)
      currentIndex.current -= 1

    transitionOn();

    setPositionByIndex();

    sliderRef.current.style.cursor = 'grab';

    if (onSlideComplete) onSlideComplete(currentIndex.current);
  }
  return (
    <SliderWrapper className='SliderWrapper'>
      <SliderStyles ref={sliderRef} className='SliderStyles'>
        <div>
          <Slide />
        </div>
      </SliderStyles>
    </SliderWrapper>
  );
}

export default Slider;
