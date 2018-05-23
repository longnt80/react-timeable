import styled from 'styled-components';

const TimetableBodyLeft = styled.div`
  width: ${props => props.customWidth ? props.customWidth : '20%'};
  background-color: #666;
`;

export default TimetableBodyLeft;
