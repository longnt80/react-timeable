import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FakeBorderElem from 'components/commons/FakeBorderElem';

const TimetableTableList = (props) => {
  const { tablesList, measurements } = props;

  const Wrapper = styled.div``;

  const TableDiv = FakeBorderElem.extend`
    height: ${measurements.timetableCellHeight};
    background-color: teal;
    color: #fff;

    &:not(:last-child)::before {
      border-bottom: 1px solid #ddd;
    }
  `;

  let tables = tablesList
    .sort((a,b) => a.order > b.order ? 1 : -1 )
    .map((table) => {
      return (
        <TableDiv key={table.order}>{table.name}</TableDiv>
      )
    });

  return (
    <Wrapper>
      {tables}
    </Wrapper>
  );
};

TimetableTableList.propTypes = {
  tablesList: PropTypes.array,
  measurements: PropTypes.object
}

export default TimetableTableList;
