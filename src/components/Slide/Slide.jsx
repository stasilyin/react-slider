import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

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
function Slide({ child }) {
  const slideRef = useRef('slide');

  return (
    <SlideWrapper ref={slideRef}>
      <div>
        { child }
      </div>
    </SlideWrapper>
  );
}

Slide.PropTypes = {
  child: PropTypes.element.isRequired,
};

export default Slide;
