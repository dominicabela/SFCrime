import React from 'react';
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
});

// Get geojson data
const geojson = require('./sfgeodata.geojson');

// Style for cirle layer
const circlePaint = {
  // Increase size as zoom increases
  'circle-radius': [
    'interpolate',
    ['linear'],
    ['number', 1],
    0, 3,
    5, 20
  ],
  'circle-color': 'rgb(170,80,72)',
  // Decrease opacity as zoom decreases to transition to heatmap layer
  'circle-opacity': {
    stops: [
      [14, 0],
      [15, 1]
    ]
  },
  // Increase stroke width as zoom increases
  'circle-stroke-width': [
    'interpolate',
    ['linear'],
    ['number', 1],
    0, 2,
    5, 12
  ],
  'circle-stroke-color': 'rgb(200,100,90)',
  // Increase stroke opacity as zoom increases
  'circle-stroke-opacity': {
    stops: [
      [14, 0],
      [15, 0.3]
    ]
  }
}

// Style for heatmap layer
const heatmapPaint = {
  // Increase weight as diameter breast height increases
  'heatmap-weight': {
    property: 'dbh',
    type: 'exponential',
    stops: [
      [0, 0],
      [5, 2]
    ]
  },
  // Increase intensity as zoom level increases
  'heatmap-intensity': {
    stops: [
      [0, 0],
      [5, 2]
    ]
  },
  // Assign color values be applied to points depending on their density
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0, "rgba(33,102,172,0)",
    0.2, "rgb(103,169,207)",
    0.4, "rgb(209,229,240)",
    0.6, "rgb(253,219,199)",
    0.8, "rgb(239,138,98)",
    1, "rgb(178,24,43)"
  ],
  // Increase radius as zoom increases
  'heatmap-radius': {
    stops: [
      [0, 1],
      [5, 10]
    ]
  },
  // Decrease opacity as zoom increases to transition to circle layer
  'heatmap-opacity': {
    default: 1,
    stops: [
      [14, 0.3],
      [15, 0]
    ]
  }
};

class MapboxMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: -122.437710,
      lng: 37.7571310,
      zoom: [11.5],
      mapStyle: 'mapbox://styles/mapbox/dark-v9'
    };
  }

  render() {
    return (
      <Map
        style={this.state.mapStyle}
        containerStyle={{
          height: "100vh",
          width: "50vw"
        }}
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}>
        <Source
          id='crimeSource'
          geoJsonSource={{
            type: 'geojson',
            data: geojson
          }}
        />
        <Layer type="heatmap" paint={heatmapPaint} sourceId={'crimeSource'} />
        <Layer type="circle" paint={circlePaint} sourceId={'crimeSource'} />
      </Map>
    );
  }
}

export default MapboxMap;
