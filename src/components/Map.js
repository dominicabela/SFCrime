import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-122.3372706, 37.7571310],
      zoom: 11
    });

    map.on('load', function() {
      map.addLayer({
        id: 'crime',
        type: 'circle',
        source: {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/dominicabela/SFCrimeMap/master/sfgeodata.geojson?token=AThWsdqj59FRGn997-wtnQXQ17gBCACPks5arz91wA%3D%3D'
        },
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['number', 1],
            0, 4,
            5, 24
          ],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['number', 0],
            0, '#bc2618',
            1, '#3BB3C3',
            2, '#669EC4',
            3, '#8B88B6',
            4, '#A2719B',
            5, '#AA5E79'
          ],
          'circle-opacity': {
            stops: [
              [14, 0],
              [15, 1]
            ]
          }
        }
      }, 'admin-2-boundaries-dispute');

      map.addLayer({
        id: 'crime-heat',
        type: 'heatmap',
        source: {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/dominicabela/SFCrimeMap/master/sfgeodata.geojson?token=AThWsdqj59FRGn997-wtnQXQ17gBCACPks5arz91wA%3D%3D'
        },
        //maxzoom: 10,
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [0, 0],
              [6, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 2]
            ]
          },
          // assign color values be applied to points depending on their density
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
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 0.2],
              [15, 0]
            ]
          },
        }
      }, 'waterway-label');
    });
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="col12 row15 pad0 center"/>
    );
  }
}

export default Map;
