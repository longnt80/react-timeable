import React, { Component } from 'react';
import styled from 'styled-components';

class Reservations extends Component {

  render() {

    const RsvItem = styled.div`
      position: absolute;
      top: 0;
      left: 0;
    `;

    const Items = this.props.reservations.map( item => {
      return (
        <RsvItem key={item.id}>{item.name}</RsvItem>
      )
    });

    return (
      <React.Fragment>
        {Items}
      </React.Fragment>
    );
  }
}

export default Reservations;
