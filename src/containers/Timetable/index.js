import React, { Component } from 'react';
import axios from 'axios';
import { convertMinuteToRem, getCurrentMinute } from 'utils';

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

import CurrentTime from 'containers/Timetable-CurrentTime';
import Reservations from 'containers/Reservations';

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
    }
  }

  componentDidMount() {
    this.getData();

    this.scrollBodyRightToCurrentMinute();
  }

  componentDidUpdate() {
    this.scrollBodyRightToCurrentMinute();
  }

  scrollBodyRightToCurrentMinute = () => {
    const { cellWidth } = this.state.measurements;
    const currentMinuteInRem = convertMinuteToRem(getCurrentMinute(), cellWidth);
    const currentMinuteInPixel = currentMinuteInRem * 10;
    const offsetMinute = 30;
    const offsetPixel = convertMinuteToRem(offsetMinute, cellWidth) * 10;

    this.bodyRight.scrollLeft = currentMinuteInPixel - offsetPixel;
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
            <CurrentTime measurements={this.state.measurements}/>
            <Reservations {...this.state}/>
          </TimetableBodyRight>
        </TimetableBody>
      </TimetableWrapper>
    );
  }
}

export default Timetable;
