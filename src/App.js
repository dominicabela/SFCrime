import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    }
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here
    var labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var data = [0, 0, 0, 0, 0, 0, 0];

    axios.get('https://raw.githubusercontent.com/dominicabela/SFCrime/master/crimeData.json')
      .then(response => {
        // Split timestamp and data into separate arrays
        var responseData = response.data;

        for (var i = 0; i < responseData.length; i++) {
          var index = labels.indexOf(responseData[i].weekday);
          data[index]++;
        }
    })

    this.setState(
      {
        chartData: {
          labels: labels,
          datasets: [
            {
              label: 'Crimes',
              data: data,
              backgroundColor: 'rgba(170, 160, 160, 0.6)'
            }
          ]
        }
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Chart chartData={this.state.chartData} legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;
