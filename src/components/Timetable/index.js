import React, { Component } from 'react';
import axios from 'axios';

import TimetableWrapper from './TimetableWrapper';
import TimetableHeader from './TimetableHeader';
import TimetableBody from './TimetableBody';
import TimetableHeaderLeft from './TimetableHeaderLeft';
import TimetableHeaderRight from './TimetableHeaderRight';
import TimetableBodyLeft from './TimetableBodyLeft';
import TimetableBodyRight from './TimetableBodyRight';

import Grid from '../TimetableGrid';

const TimetableMeasurements = {
  leftSideWidth: "20rem",
  cellWidth: "40px",
  cellHeight: "40px",
}

class Timetable extends Component {
  state = {
    measurements: TimetableMeasurements,
    storeConfigs: {},
    tablesList: [],
    reservations: [],
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

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <TimetableWrapper>
        <TimetableHeader>
          <TimetableHeaderLeft customWidth={TimetableMeasurements.leftSideWidth} />
          <TimetableHeaderRight></TimetableHeaderRight>
        </TimetableHeader>
        <TimetableBody>
          <TimetableBodyLeft customWidth={TimetableMeasurements.leftSideWidth}></TimetableBodyLeft>
          <TimetableBodyRight>
            <Grid data={this.state}/>
          </TimetableBodyRight>
        </TimetableBody>
      </TimetableWrapper>
    );
  }
}

export default Timetable;
