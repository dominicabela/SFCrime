import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZG9taW5pY2FiZWxhIiwiYSI6ImNqYzJ0Y2IyODA0YnAzMm4zN2p6YXN3NngifQ.pRPqhS3ZseAc4kvYUP4DEw';

class Map extends Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map;
