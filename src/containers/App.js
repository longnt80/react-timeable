import React from 'react';
import { injectGlobal } from 'styled-components';
import 'normalize.css';

import Timetable from 'containers/Timetable';

injectGlobal`
  html {
    font-size: 10px;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 1.6rem;
  }
`

const App = () => {
  return (
    <Timetable/>
  )
}

export default App;
