import React, { Component } from 'react';
import axios from 'axios';
import 'normalize.css';
import './App.css';
import AddRsv from './AddRsv';

class App extends Component {
  state = {
    storeConfigs: {},
    tablesList: [],
    reservations: [],
  }

  getData = () => {
    const storeConfigs = () => axios.get('http://localhost:3000/store-configs');
    const tables = () => axios.get('http://localhost:3000/tables');
    const reservations = () => axios.get('http://localhost:3000/reservations');
    axios.all([storeConfigs(), tables(), reservations()])
      .then( response => {
        const [ storeConfigs, tables, reservations ] = response;
        this.setState({
          storeConfigs: {...storeConfigs.data},
          tablesList: [...tables.data],
          reservations: [...reservations.data]
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { tablesList } = this.state;
    return (
      <div className="App">
        <div className="header">
          <AddRsv tablesList={tablesList}/>
        </div>
      </div>
    );
  }
}

export default App;
