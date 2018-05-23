import styled from 'styled-components';

const FakeBorderElem = styled.div `
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export default FakeBorderElem;
