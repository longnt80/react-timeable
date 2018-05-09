import React from 'react';
import { injectGlobal } from 'styled-components';
import 'normalize.css';

import Timetable from './Timetable';

injectGlobal`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

const App = () => {
  return (
    <Timetable/>
  )
}

export default App;
