import React, { Component } from 'react';

import RsvItem from 'containers/RsvItem';

class Reservations extends Component {

  render() {
    const { measurements, tablesList } = this.props;
    const Items = this.props.reservations.map( item => {
      return (
        <RsvItem
          key={item.id} {...item}
          tablesList={tablesList}
          measurements={measurements}
        />
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
