import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '../Slider/Slider';

import dataForSlider from '../../constants/dataForSlider';

const AppStyles = styled.main`
  height: 100vh;
  width: 100vw;
`;

function App() {
  const [index, setIndex] = useState(1);

  return (
    <React.StrictMode>
      <AppStyles>
        <Slider
          onSlideComplete={setIndex}
          activeIndex={index}
          threshHold={100}
          transition={0.3}
          scaleOnDrag={true}
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
