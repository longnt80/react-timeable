import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

/*************************
* Import utilities
*/
import { convertMinuteToRem, getCurrentMinute } from 'utils/functions';
import { defaultTimetableMeasurements } from 'utils/defaultConfigs';

/*************************
* Import other components
*/
import TimetableWrapper from './TimetableWrapper';
import TimetableHeader from './TimetableHeader';
import TimetableBody from './TimetableBody';
import TimetableHeaderLeft from './TimetableHeaderLeft';
import TimetableHeaderRight from './TimetableHeaderRight';
import TimetableBodyLeft from './TimetableBodyLeft';
import TimetableBodyRight from './TimetableBodyRight';
import AddButton from './AddButton';

import Timeframe from 'components/TimetableTimeframe';
import TableList from 'components/TimetableTableList';
import Grid from 'components/TimetableGrid';
import Modal from 'components/commons/Modal';

import CurrentTime from 'containers/Timetable-CurrentTime';
import Reservations from 'containers/Reservations';
import AddRsvForm from 'containers/AddRsvForm';


class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: defaultTimetableMeasurements,
      storeConfigs: {},
      tablesList: [],
      reservations: [],
      gridScrollX: 0,
      modalOpen: false
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
    const { timetableCellWidth } = this.state.measurements;
    const currentMinuteInRem = convertMinuteToRem(getCurrentMinute(), timetableCellWidth);
    const currentMinuteInPixel = currentMinuteInRem * 10;
    const offsetMinute = 30;
    const offsetPixel = convertMinuteToRem(offsetMinute, timetableCellWidth) * 10;

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

  handleGridScrolled = (e) => {
    this.syncScrollPosition(this.headerRight, e.target.scrollLeft)
  }

  syncScrollPosition = (syncedEle, xScroll = 0, yScroll = 0 ) => {
    const scrollLeft = xScroll;
    const ele = syncedEle;

    ele.scrollLeft = scrollLeft;
  }

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  }
  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  }


  render() {



    return (
      <TimetableWrapper>
        <TimetableHeader>
          <TimetableHeaderLeft customWidth={this.state.measurements.leftSideWidth}>
            <AddButton type="button" onClick={this.openModal}><FontAwesomeIcon icon={faPlus}/></AddButton>
          </TimetableHeaderLeft>
          <TimetableHeaderRight innerRef={ c => {this.headerRight = c}}>
            <Timeframe {...this.state}/>
          </TimetableHeaderRight>
        </TimetableHeader>
        <TimetableBody>
          <TimetableBodyLeft customWidth={this.state.measurements.leftSideWidth}>
            <TableList tablesList={this.state.tablesList} measurements={this.state.measurements}/>
          </TimetableBodyLeft>
          <TimetableBodyRight data-name="body-right" innerRef={ c => {this.bodyRight = c}} onScroll={this.handleGridScrolled}>
            <Grid gridRef={ el => this.gridLayer = el} data-name="grid" {...this.state}/>
            <CurrentTime measurements={this.state.measurements}/>
            <Reservations {...this.state}/>
          </TimetableBodyRight>
        </TimetableBody>
        <Modal closeModal={this.closeModal} open={this.state.modalOpen}>
          <AddRsvForm/>
        </Modal>
      </TimetableWrapper>
    );
  }
}

export default Timetable;
