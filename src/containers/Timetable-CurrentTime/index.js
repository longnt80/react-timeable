import React, { Component } from 'react';
import styled from 'styled-components';

import { findCurrentMinuteInPixel } from 'utils';

class TimetableCurrentTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offsetMinuteInPixel: 0
    }
  }

  componentDidMount() {
    this.getOffsetPixel();
    this.timerID = setInterval(
      () => this.getOffsetPixel(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getOffsetPixel = () => {
    const { cellWidth } = this.props.measurements;

    this.setState({
      offsetMinuteInPixel: findCurrentMinuteInPixel(cellWidth)
    });
  }

  render() {
    const Wrapper = styled.div`
      position: absolute;
      height: 100%;
      width: 1px;
      background-color: red;
      top: 0;
      left: ${this.state.offsetMinuteInPixel}rem;
      z-index: 2;
    `;

    return (
      <Wrapper/>
    );
  }
}

export default TimetableCurrentTime;
