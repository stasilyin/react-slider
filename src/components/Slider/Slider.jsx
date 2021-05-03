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
  .slide-outer {
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

}

export default Slider;
