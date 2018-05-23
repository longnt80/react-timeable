import React from 'react';
import styled from 'styled-components';

const TimetableCurrentTime = (props) => {
  const Wrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 1px;
    background-color: red;
    top: 0;
    left: ${props.offsetMinuteInPixel}rem;
    z-index: 2;
  `;

  return (
    <Wrapper/>
  );
};

export default TimetableCurrentTime;

