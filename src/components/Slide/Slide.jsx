import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SlideWrapper = styled.div`
  transition: transform 0.5s ease-out;
  div {
    background-color: #18FF85;
    padding: 1rem;
    height: 100%;
    width: ${(props) => props.sliderWidth};
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
function Slide({
  child,
  sliderWidth,
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
  scaleOnDrag: PropTypes.bool,
};

export default Slide;
