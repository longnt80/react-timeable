import styled from 'styled-components';

const TimetableHeaderLeft = styled.div`
  height: 50px;
  width: ${props => props.customWidth ? props.customWidth : '20%'};
  background-color: #ddd;
`;

export default TimetableHeaderLeft;
