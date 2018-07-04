import React, { Component } from 'react';
import styled from 'styled-components';
import { convertMinuteToRem, getCurrentMinute } from 'utils/functions';

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
    const { timetableCellWidth } = this.props.measurements;

    this.setState({
      offsetMinuteInPixel: convertMinuteToRem(getCurrentMinute(), timetableCellWidth)
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
