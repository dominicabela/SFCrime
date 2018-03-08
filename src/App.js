import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import Map from './components/Map';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      chartData2: {}
    }
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {

    const url = 'https://raw.githubusercontent.com/dominicabela/SFCrimeMap/master/crimeData.json?token=AThWsZPYJZb8L5sKOiLBmsf59ef-XX-1ks5aqiS2wA%3D%3D';

    const colors = ['rgba(169, 204, 227, 0.6)', 'rgba(163, 228, 215, 0.6)', 'rgba(162, 217, 206, 0.6)', 'rgba(169, 223, 191, 0.6)', 'rgba(171, 235, 198, 0.6)',
                    'rgba(249, 231, 159, 0.6)', 'rgba(250, 215, 160, 0.6)', 'rgba(245, 203, 167, 0.6)', 'rgba(237, 187, 153, 0.6)', 'rgba(230, 176, 170, 0.6)'];

    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const hourLabels = ['0.00', '1.00', '2.00', '3.00', '4.00', '5.00', '6.00', '7.00', '8.00', '9.00', '10.00', '11.00', '12.00',
                      '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00'];

    var categories = {};
    var dataset = [];
    var dataset2 = [];

    axios.get(url)
      .then(response => {

        var responseData = response.data;

        for (var i = 0; i < responseData.length; i++) {

          if (categories.hasOwnProperty(responseData[i].category)) {
            categories[responseData[i].category].dayData[dayLabels.indexOf(responseData[i].weekday)]++;
            categories[responseData[i].category].hourData[hourLabels.indexOf(responseData[i].hour)]++;
          } else {
            categories[responseData[i].category] = {
              dayData: [0, 0, 0, 0, 0, 0, 0],
              hourData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            categories[responseData[i].category].dayData[dayLabels.indexOf(responseData[i].weekday)]++;
            categories[responseData[i].category].hourData[dayLabels.indexOf(responseData[i].hour)]++;
          }

        }

        for (var key in categories) {
          if (categories.hasOwnProperty(key)) {
            dataset.push(
              {
                label: key,
                data: categories[key].hourData,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
              }
            );
            dataset2.push(
              {
                label: key,
                data: categories[key].dayData,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
              }
            );
          }
        }
    })

    this.setState(
      {
        chartData: {
          labels: hourLabels,
          datasets: dataset
        },
        chartData2: {
          labels: dayLabels,
          datasets: dataset2
        }
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">San Francisco Crime Data</h1>
        </div>
        <Chart chartData={this.state.chartData} chartData2={this.state.chartData2} legendPosition="right"/>
      </div>
    );
  }
}

export default App;
