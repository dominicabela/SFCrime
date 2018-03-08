import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      chartData2: props.chartData2
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right'
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'Hourly Crime Rate',
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            maintainAspectRatio: true,
      			spanGaps: false,
      			scales: {
      				yAxes: [{
      					stacked: true
      				}]
      			},
          }}
        />
        <Bar
          data={this.state.chartData2}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'Daily Crime Rate',
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            },
            maintainAspectRatio: true,
      			spanGaps: false,
            scales: {
  						xAxes: [{
  							stacked: true,
  						}],
  						yAxes: [{
  							stacked: true
  						}]
  					}
          }}
        />
      </div>
    )
  }
}

export default Chart;
