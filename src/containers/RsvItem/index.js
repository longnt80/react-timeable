import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCurrentMinute, convertMinuteToRem } from 'utils/functions';
// import R from "ramda";

class RsvItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      width: 0,
      tables: [],
      active: false
    }
  }

  componentDidMount() {
    const { timetableCellWidth, timetableCellHeight } = this.props.measurements;
    const { start, end, tableIds, tablesList } = this.props;

    const startX = this._getStartX(start, timetableCellWidth);
    const endX = this._getEndX(end, timetableCellHeight);
    const width = this._getWidth(startX, endX);
    const continuousOrdersList = this.getListOfContinuousTableOrders(tableIds, tablesList);
    const tables = this.convertToDimentions(continuousOrdersList, timetableCellHeight);

    this.setState({
      startX,
      width,
      tables
    });
  }

  _getStartX = (startTime, timetableCellWidth) => {
    const startMinute = getCurrentMinute(startTime[0], startTime[1]);
    const startX = convertMinuteToRem(startMinute, timetableCellWidth);

    return startX;
  }

  _getEndX = (endTime, timetableCellWidth) => {
    const endMinute = getCurrentMinute(endTime[0], endTime[1]);
    const endX = convertMinuteToRem(endMinute, timetableCellWidth);

    return endX;
  }

  _getWidth = (startX, endX) => {
    return endX - startX;
  }

  splitAtIndexes = (arr = [], indexes = []) => {
    const len = indexes.length;
    let nextIndex = 0;
    let result = [];
    for (let i = 0; i <= len; i++) {
      i < len ? result.push(arr.slice(nextIndex, indexes[i])) : result.push(arr.slice(nextIndex));
      nextIndex = indexes[i];
    }
    return result;
  }

  getListOfContinuousTableOrders = (tableIds = [], tablesList = []) => {
    const sortedArr = tablesList.filter( table => tableIds.indexOf(table.id) !== -1 ).map( table => table.order ).sort();
    const indexAfterMissingNumber = sortedArr.filter( (i, index, arr) => i - arr[index - 1] > 1 ).map( i => sortedArr.indexOf(i));
    const result = this.splitAtIndexes(sortedArr, indexAfterMissingNumber);
    return result;
  }

  convertToDimentions = (continuousOrdersList, timetableCellHeight) => {
    const result = continuousOrdersList.map( item => {
      const data = {
        startY: (parseInt(timetableCellHeight, 10) * (item[0] - 1)) + 0.3,
        height: (parseInt(timetableCellHeight, 10) * item.length) - 0.7
      }

      return data;
    });

    return result;
  }

  render() {
    const { startX, width, tables, active } = this.state;
    const { name } = this.props;

    const rsvParts = tables.map( (table, index) => {
      const StyledRsv = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(${startX}rem, ${table.startY}rem);
        width: ${width}rem;
        height: ${table.height}rem;
        background-color: rebeccapurple;
        color: ${active ? "red" : "white"};
      `;

      return (
        <StyledRsv
          key={index}
        >
          {name}
        </StyledRsv>
      );
    });

    return (
      <React.Fragment>
        {rsvParts}
      </React.Fragment>
    );
  }
}

// RsvItem.propTypes = {
//   startCoor: PropTypes.number,
//   endCoor: PropTypes.number,
//   tableIds: PropTypes.array,
//   name: PropTypes.string,
//   order: PropTypes.number,
// }

export default RsvItem;
