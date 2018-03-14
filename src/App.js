import React, { Component } from 'react';
import './App.css';
import logo from './GitHub_Logo.png';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import Map from './components/Map';
import MapboxMap from './components/MapboxMap';
import axios from 'axios';
import randomColor from 'randomcolor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      chartData2: {},
      mapData: [],
      loading: true
    }
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // JSON file with crime data
    const url = 'https://raw.githubusercontent.com/dominicabela/SFCrimeMap/master/crimeData.json?token=AThWsZPYJZb8L5sKOiLBmsf59ef-XX-1ks5aqiS2wA%3D%3D';

    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const hourLabels = ['0.00', '1.00', '2.00', '3.00', '4.00', '5.00', '6.00', '7.00', '8.00', '9.00', '10.00', '11.00', '12.00',
                      '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00'];

    var categories = {};
    var dataset = [];
    var dataset2 = [];
    var locations = [];

    axios.get(url)
      .then(response => {

        var responseData = response.data;

        for (var i = 0; i < responseData.length; i++) {

          locations.push([parseFloat(responseData[i].latitude), parseFloat(responseData[i].longitude)]);

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
                backgroundColor: randomColor({
                  luminosity: 'bright',
                  format: 'rgba',
                  alpha: 1
                })
              }
            );
            dataset2.push(
              {
                label: key,
                data: categories[key].dayData,
                backgroundColor: randomColor({
                  luminosity: 'bright',
                  format: 'rgba',
                  alpha: 1
                })
              }
            );
          }
        }
        // Re-render charts when data is loaded
        this.render();
        // Keep track of whether data is loading (can be used to add loading message)
        this.setState({loading: false, mapData: locations});
        //console.log(this.state.mapData);
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
        },
        mapData: locations
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">San Francisco Crime Data</h1>
        </div>
        <div className="container">
          <div className="canvas-container map-container round">
            <MapboxMap mapData={this.state.mapData} />
          </div>
          <div className="canvas-container round">
            <LineChart chartData={this.state.chartData} chartTitle="Hourly Crime Rate" legendPosition="right"/>
          </div>
          <div className="canvas-container round">
            <BarChart chartData={this.state.chartData2} chartTitle="Daily Crime Rate" legendPosition="right"/>
          </div>
          <div className="logo">
            <a href="https://github.com/dominicabela/SFCrime">
              <p><img src={logo} alt="GitHub Logo" style={{width:"60px", height:"25px"}} /></p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
