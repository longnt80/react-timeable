import React, { Component } from 'react';
import axios from 'axios';
import { getMinutes, getHours } from 'date-fns';

import TimetableWrapper from './TimetableWrapper';
import TimetableHeader from './TimetableHeader';
import TimetableBody from './TimetableBody';
import TimetableHeaderLeft from './TimetableHeaderLeft';
import TimetableHeaderRight from './TimetableHeaderRight';
import TimetableBodyLeft from './TimetableBodyLeft';
import TimetableBodyRight from './TimetableBodyRight';

import Timeframe from 'components/TimetableTimeframe';
import TableList from 'components/TimetableTableList';
import Grid from 'components/TimetableGrid';
import CurrentTime from 'components/Timetable-CurrentTime';

// import Reservations from 'components/Reservations';

const TimetableMeasurements = {
  leftSideWidth: "20rem",
  cellWidth: "4rem",
  cellHeight: "4rem",
}

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: TimetableMeasurements,
      storeConfigs: {},
      tablesList: [],
      reservations: [],
      gridScrollX: 0,
      offsetMinuteInPixel: 0
    }
  }

  componentDidMount() {
    console.log(this.gridLayer.offsetWidth);
    this.getData();
    this.getOffsetPixel();
    this.timerID = setInterval(
      () => this.getOffsetPixel(),
      1000
    );
  }

  componentDidUpdate() {
    const oneRemToPixel = 10;
    const offsetMinute = 80;
    this.bodyRight.scrollLeft = this.state.offsetMinuteInPixel * oneRemToPixel - offsetMinute; // TODO: need to re-write this part
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getData = () => {
    const storeConfigs = () => axios.get('http://localhost:3000/store-configs');
    const tables = () => axios.get('http://localhost:3000/tables');
    const reservations = () => axios.get('http://localhost:3000/reservations');
    axios.all([storeConfigs(), tables(), reservations()])
      .then( response => {
        const [ storeConfigs, tables, reservations ] = response;
        this.setState({
          storeConfigs: {...storeConfigs.data},
          tablesList: [...tables.data],
          reservations: [...reservations.data]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getOffsetPixel = () => {
    const { cellWidth } = this.state.measurements;
    const lengthInOneMinute = parseInt(cellWidth, 10) / 15;
    const currentMinute = getMinutes(new Date());
    const currentHour = getHours(new Date());
    const totalMinutesOfToday = currentHour * 60 + currentMinute;
    const offSetPx = lengthInOneMinute * totalMinutesOfToday;

    this.setState({
      offsetMinuteInPixel: offSetPx
    });
  }

  handleGridSCroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const headerRight = this.headerRight;

    headerRight.scrollLeft = scrollLeft;
  }

  render() {
    return (
      <TimetableWrapper>
        <TimetableHeader>
          <TimetableHeaderLeft customWidth={TimetableMeasurements.leftSideWidth} />
          <TimetableHeaderRight innerRef={ c => {this.headerRight = c}}>
            <Timeframe {...this.state}/>
          </TimetableHeaderRight>
        </TimetableHeader>
        <TimetableBody>
          <TimetableBodyLeft customWidth={TimetableMeasurements.leftSideWidth}>
            <TableList tablesList={this.state.tablesList} measurements={this.state.measurements}/>
          </TimetableBodyLeft>
          <TimetableBodyRight data-name="body-right" innerRef={ c => {this.bodyRight = c}} onScroll={this.handleGridSCroll}>
            <Grid gridRef={ el => this.gridLayer = el} data-name="grid" {...this.state}/>
            <CurrentTime offsetMinuteInPixel={this.state.offsetMinuteInPixel}/>
            {/* <Reservations {...this.state}/> */}
          </TimetableBodyRight>
        </TimetableBody>
      </TimetableWrapper>
    );
  }
}

export default Timetable;
