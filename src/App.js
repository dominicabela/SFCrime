import React, { Component } from 'react';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import MapboxMap from './components/MapboxMap';
import axios from 'axios';
import randomColor from 'randomcolor';

import { Grid, Segment } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      chartData2: {},
      loading: true
    }
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    // JSON file with crime data
    const url = 'https://raw.githubusercontent.com/dominicabela/SFCrimeMap/master/crimeData.json?token=AThWsTi5cMF6k0mAYDcevvmkyuMMnqLsks5atWjIwA%3D%3D';

    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const hourLabels = ['0.00', '1.00', '2.00', '3.00', '4.00', '5.00', '6.00', '7.00', '8.00', '9.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00', '22.00', '23.00'];

    // Keeps track of crime categories
    var categories = {};

    var hourDataset = [];
    var dayDataset = [];

    axios.get(url)
      .then(response => {

        var responseData = response.data;

        for (var i = 0; i < responseData.length; i++) {
          if (categories.hasOwnProperty(responseData[i].category)) {
            // Increment data array at proper location based on index of weekday/hour
            categories[responseData[i].category].dayData[dayLabels.indexOf(responseData[i].weekday)]++;
            categories[responseData[i].category].hourData[hourLabels.indexOf(responseData[i].hour)]++;
          // If category does not exist yet, add it to categories
          } else {
            // Create new category entry
            categories[responseData[i].category] = {
              dayData: [0, 0, 0, 0, 0, 0, 0],
              hourData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            // Increment data array at proper location based on index of weekday/hour
            categories[responseData[i].category].dayData[dayLabels.indexOf(responseData[i].weekday)]++;
            categories[responseData[i].category].hourData[dayLabels.indexOf(responseData[i].hour)]++;
          }
        }

        for (var key in categories) {
          // Ignores inhereted properties
          if (categories.hasOwnProperty(key)) {
            hourDataset.push(
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
            dayDataset.push(
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
        this.setState({loading: false});
    })

    // Updates state with retrieved data
    this.setState(
      {
        chartData: {
          labels: hourLabels,
          datasets: hourDataset
        },
        chartData2: {
          labels: dayLabels,
          datasets: dayDataset
        }
      }
    );
  }

  render() {
    return (
      <div style={{ backgroundColor:'#333' }}>
        <Grid columns={2}>
        <Grid.Column>
          <MapboxMap />
        </Grid.Column>
        <Grid.Column>
          <LineChart chartData={this.state.chartData} chartTitle="Hourly Crime Rate" legendPosition="right"/>
          <BarChart chartData={this.state.chartData2} chartTitle="Daily Crime Rate" legendPosition="right"/>
        </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
