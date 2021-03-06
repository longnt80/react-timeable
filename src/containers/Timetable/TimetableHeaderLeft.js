import styled from 'styled-components';

const TimetableHeaderLeft = styled.div`
  height: 5rem;
  width: ${props => props.customWidth ? props.customWidth : '20%'};
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TimetableHeaderLeft;
