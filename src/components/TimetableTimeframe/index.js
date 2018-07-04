import React from 'react';
import styled from 'styled-components';

import FakeBorderElem from 'components/commons/FakeBorderElem';

const Timeframe = (props) => {
  const { storeConfigs, measurements } = props;

  const businessHours = storeConfigs.business_hours;
  const timetableCellWidth = measurements.timetableCellWidth;
  const hour = [];

  const Wrapper = styled.div`
    display: flex;
    height: 100%;
    position: relative;
  `;

  const QuarterOfHour = FakeBorderElem.extend`
    min-width: ${timetableCellWidth};
    height: 100%;

    &:first-child::before {
      border-left: 1px solid #ddd;
    }
  `;

  const Hour = styled.div`
    display: flex;
    background-color: green;
    height: 100%;

    $:first-child ${QuarterOfHour}:first-child::before {
      border-left: none;
    }
  `;

  for (let i = 0; i < businessHours; i++) {
    const quarterOfHour = [];
    for (let ii = 0; ii < 4; ii++) {
      const cellName = `${String(i)}-${(ii + 1) * 15}`
      const hourNumber = ii === 0 ? i.toString() : '';

      const quarterOfHourTemplate = <QuarterOfHour data-minutes={cellName} key={ii}>{hourNumber}</QuarterOfHour>;
      quarterOfHour.push(quarterOfHourTemplate);
    }

    const hourTemplate = <Hour data-hour={i+1} key={i}>{quarterOfHour}</Hour>;
    hour.push(hourTemplate);
  }

  return (
    <Wrapper>
      {hour}
    </Wrapper>
  );
};

export default Timeframe;
