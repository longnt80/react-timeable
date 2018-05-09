import React, { Component } from 'react';
import styled from 'styled-components';

class Grid extends Component {
  render() {
    const { data } = this.props;
    const businessHours = data.storeConfigs.business_hours;
    const numberOfTables = data.tablesList.length;
    const cellHeight = data.measurements.cellHeight;
    const cellWidth = data.measurements.cellWidth;

    const Wrapper = styled.div`

    `;

    const RowCell = styled.div`
      display: flex;
    `;
    const ColCell = styled.div`
      width: ${cellWidth};
      height: ${cellHeight};

      &:nth-child(15) {
        background-color: blue;
      }
    `;

    const cols = [];
    const rows = [];
    for (let i = 0; i < businessHours; i++) {
      const colTemplate = <ColCell data-col={i+1} key={i}></ColCell>;
      cols.push(colTemplate);
    }
    for (let i = 0; i < numberOfTables; i++) {
      const rowTemplate = <RowCell data-row={i+1} key={i}>{cols}</RowCell>;
      rows.push(rowTemplate);
    }


    return (
      <Wrapper>
        {rows}
      </Wrapper>
    );
  }
}

export default Grid;
