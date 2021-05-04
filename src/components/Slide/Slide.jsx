import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SlideWrapper = styled.div`
  transition: transform 0.5s ease-out;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  img {
    object-fit: cover;
    object-position: center;
  }
`;
function Slide({
  child,
  sliderWidth,
  sliderHeight,
  scaleOnDrag = false,
}) {
  const slideRef = useRef('slide');

  const onMouseDown = () => {
    if (scaleOnDrag) slideRef.current.style.transform = 'scale(0.8)';
  };

  const onMouseUp = () => {
    if (scaleOnDrag) slideRef.current.style.transform = 'scale(1)';
  };

  return (
    <SlideWrapper
      ref={slideRef}
      sliderWidth={`${sliderWidth}px`}
      sliderHeight={`${sliderHeight}px`}
    >
      <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onMouseLeave={onMouseUp}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        { child }
      </div>
    </SlideWrapper>
  );
}

Slide.defaultProps = {
  scaleOnDrag: false,
};

Slide.propTypes = {
  child: PropTypes.element.isRequired,
  sliderWidth: PropTypes.number.isRequired,
  sliderHeight: PropTypes.number.isRequired,
  scaleOnDrag: PropTypes.bool,
};

export default Slide;
