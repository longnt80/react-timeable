import React, { Component } from 'react';
import axios from 'axios';

import TimetableWrapper from './TimetableWrapper';
import TimetableHeader from './TimetableHeader';
import TimetableBody from './TimetableBody';
import TimetableHeaderLeft from './TimetableHeaderLeft';
import TimetableHeaderRight from './TimetableHeaderRight';
import TimetableBodyLeft from './TimetableBodyLeft';
// import TimetableBodyRight from './TimetableBodyRight';
import './TimetableBodyRight.css';

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
    this.bodyRight = React.createRef();
  }

  componentDidMount() {
    this.getData();
    console.log(this.bodyRight.current);
    this.bodyRight.current.scrollLeft = 1000;
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
      console.log(headerRight);

      headerRight.scrollLeft = scrollLeft;
    }

    render() {

      const bodyRightStyles = {
        overflow: "scroll",
        backgroundColor: "#aaa",
        flex: 1,
        position: "relative",
      }

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
          {/* <TimetableBodyRight data-name="body-right" innerRef={ c => {this.bodyRight = c}} onScroll={this.handleGridSCroll}> */}
          <div style={bodyRightStyles} data-name="body-right" ref={this.bodyRight} onScroll={this.handleGridSCroll}>
            <Grid gridRef={ el => this.gridLayer = el} data-name="grid" {...this.state}/>
            <CurrentTime measurements={this.state.measurements}/>
            <Reservations {...this.state}/>
          </div>
          {/* </TimetableBodyRight> */}
        </TimetableBody>
      </TimetableWrapper>
    );
  }
}

export default Timetable;
