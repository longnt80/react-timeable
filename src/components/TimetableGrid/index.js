import React from 'react';
import styled from 'styled-components';

import FakeBorderElem from 'components/commons/FakeBorderElem';

const Grid = (props) => {
  const { storeConfigs, tablesList, measurements } = props;

  const businessHours = storeConfigs.business_hours;
  const totalColCell = businessHours * 4;
  const numberOfTables = tablesList.length;
  const cellHeight = measurements.cellHeight;
  const cellWidth = measurements.cellWidth;

  const Row = styled.div`
    display: flex;
  `;
  const ColCell = FakeBorderElem.extend`
    min-width: ${cellWidth};
    max-width: ${cellWidth};
    height: ${cellHeight};
    position: relative;

    &::before {
      border-bottom: 1px solid #ddd;
    }

    &:not(:first-child) {
      &::before {
        border-left: 1px solid #ddd;
      }
    }
  `;

  const rows = [];
  for (let i = 0; i < numberOfTables; i++) {
    const cols = [];
    for (let i = 0; i < totalColCell; i++) {
      const colTemplate = <ColCell data-col={i+1} key={i}></ColCell>;
      cols.push(colTemplate);
    }
    const rowTemplate = <Row data-row={i+1} key={i}>{cols}</Row>;
    rows.push(rowTemplate);
  }

  return (

    <div ref={props.gridRef}>
      {rows}
    </div>
  );
};

export default Grid;
