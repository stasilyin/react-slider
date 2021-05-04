import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Slider from '../Slider/Slider';

import dataForSlider from '../../constants/dataForSlider';

const AppStyles = styled.main`
  width: 100vw;
`;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,body {
    padding: 0;
    margin: 0;
  }
`;

function App() {
  const [index, setIndex] = useState(1);

  return (
    <React.StrictMode>
      <GlobalStyles />
      <AppStyles>
        <Slider
          onSlideComplete={setIndex}
          activeIndex={index}
          threshHold={100}
          transition={0.3}
          scaleOnDrag
        >
          {dataForSlider.map(({ url, title }, index) => (
            <img src={url} key={index} alt={title} />
          ))}
        </Slider>
      </AppStyles>
    </React.StrictMode>
  );
}

export default App;
