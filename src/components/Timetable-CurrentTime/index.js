import React, { Component } from 'react';
import styled from 'styled-components';
import { getMinutes, getHours } from 'date-fns';

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
    const lengthInOneMinute = parseInt(cellWidth, 10) / 15;
    const currentMinute = getMinutes(new Date());
    const currentHour = getHours(new Date());
    const totalMinutesOfToday = currentHour * 60 + currentMinute;
    const offSetPx = lengthInOneMinute * totalMinutesOfToday;

    this.setState({
      offsetMinuteInPixel: offSetPx
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
