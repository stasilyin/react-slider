import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';
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
  onSlideComplete,
  onSlideStart,
  activeIndex = null,
  threshHold = 100,
  transition = 0.3,
  scaleOnDrag = false,
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const dragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const currentIndex = useRef(activeIndex || 0);
  const sliderRef = useRef('slider');
  const animationRef = useRef(null);

  const transitionOn = () => {
    (sliderRef.current.style.transition = `transform ${transition}s ease-out`);
  };

  const transitionOff = () => {
    (sliderRef.current.style.transition = 'none');
  };

  function setSliderPosition() {
    sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  }

  const setPositionByIndex = useCallback(
    (w = dimensions.width) => {
      currentTranslate.current = currentIndex.current * -w;
      prevTranslate.current = currentTranslate.current;
      setSliderPosition();
    },
    [dimensions.width],
  );

  useEffect(() => {
    if (activeIndex !== currentIndex.current) {
      transitionOn();
      currentIndex.current = activeIndex;
      setPositionByIndex();
    }
  }, [activeIndex, setPositionByIndex]);

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function getElementDimensions(ref) {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    return { width, height };
  }

  useLayoutEffect(() => {
    setDimensions(getElementDimensions(sliderRef));

    setPositionByIndex(getElementDimensions(sliderRef).width);
  }, [setPositionByIndex]);

  useEffect(() => {
    const handleResize = () => {
      transitionOff();
      const { width, height } = getElementDimensions(sliderRef);
      setDimensions({ width, height });
      setPositionByIndex(width);
    };

    const handleKeyDown = ({ key }) => {
      const arrowsPressed = ['ArrowRight', 'ArrowLeft'].includes(key);

      if (arrowsPressed) transitionOn();

      if (arrowsPressed && onSlideStart) {
        onSlideStart(currentIndex.current);
      }

      if (key === 'ArrowRight' && currentIndex.current < children.length - 1) {
        currentIndex.current += 1;
      }

      if (key === 'ArrowLeft' && currentIndex.current > 0) {
        currentIndex.current -= 1;
      }

      if (arrowsPressed && onSlideComplete) {
        onSlideComplete(currentIndex.current);
      }
      setPositionByIndex();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [children.length, setPositionByIndex, onSlideComplete, onSlideStart]);

  function animation() {
    setSliderPosition();
    if (dragging.current) requestAnimationFrame(animation);
  }

  function touchStart(index) {
    return function (event) {
      transitionOn();
      currentIndex.current = index;
      startPos.current = getPositionX(event);
      dragging.current = true;
      animationRef.current = requestAnimationFrame(animation);
      sliderRef.current.style.cursor = 'grabbing';

      if (onSlideStart) onSlideStart(currentIndex.current);
    };
  }

  function touchMove(event) {
    if (dragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current = prevTranslate.current + currentPosition - startPos.current;
    }
  }

  function touchEnd() {
    transitionOn();
    cancelAnimationFrame(animationRef.current);
    dragging.current = false;
    const movedBy = currentTranslate.current - prevTranslate.current;

    if (movedBy < -threshHold && currentIndex.current < children.length - 1) {
      currentIndex.current += 1;
    }

    if (movedBy > threshHold && currentIndex.current > 0) {
      currentIndex.current -= 1;
    }

    transitionOn();

    setPositionByIndex();
    sliderRef.current.style.cursor = 'grab';

    if (onSlideComplete) onSlideComplete(currentIndex.current);
  }

  return (
    <SliderWrapper className="SliderWrapper">
      <SliderStyles ref={sliderRef} className="SliderStyles">

        {children.map((child, index) => (
          <div
            key={child.key}
            onTouchStart={touchStart(index)}
            onMouseDown={touchStart(index)}
            onTouchMove={touchMove}
            onMouseMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseUp={touchEnd}
            onMouseLeave={() => {
              if (dragging.current) touchEnd();
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="outer"
          >
            <Slide
              child={child}
              sliderWidth={dimensions.width}
              sliderHeight={dimensions.height}
              scaleOnDrag={scaleOnDrag}
            />
          </div>
        ))}
      </SliderStyles>
    </SliderWrapper>
  );
}

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  onSlideComplete: PropTypes.func,
  onSlideStart: PropTypes.func,
  activeIndex: PropTypes.number,
  threshHold: PropTypes.number,
  transition: PropTypes.number,
  scaleOnDrag: PropTypes.bool,
};

export default Slider;
