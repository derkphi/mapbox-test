import React from 'react';
import ReactMapGL, {Marker, Source, Layer, NavigationControl, GeolocateControl} from 'react-map-gl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { length as turfLength } from '@turf/turf';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import markerImg from './marker-icon.png'

function Map() {
  const polygon = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [[
        [7.4181321127277515, 46.97100503555501],
        [7.419512371488337, 46.96979094171849],
        [7.419644496984791, 46.96785700895023],
        [7.41852833652381, 46.965922852670616],
        [7.416689500278139, 46.964213421419515],
        [7.416952969612274, 46.96259434637023],
        [7.417281648594689, 46.96209967737944],
        [7.41557364277021, 46.96200938047555],
        [7.4136026713385546, 46.962323780689886],
        [7.411632074973777, 46.96187355894224],
        [7.405126107969477, 46.96542487137728],
        [7.404271913719851, 46.96560451418053],
        [7.399672325949166, 46.96654749426737],
        [7.400590583472943, 46.968661669948794],
        [7.408212291033252, 46.9682142539397],
        [7.412613640319248, 46.96951967075658],
        [7.414650062218596, 46.970329694939714],
        [7.4181321127277515, 46.97100503555501]
      ]]
    },
    'properties': {}
  };

  const polyline = {
    'type': 'Feature',
    'geometry': {
      'type': 'LineString',
      'coordinates': [
        [7.417478758616334, 46.96203225193723],
        [7.4150803836623025, 46.96322362173851],
        [7.416228948458388, 46.96576499176308],
        [7.416720404084648, 46.96877846486095],
        [7.414291921650181, 46.96347081701836],
        [7.414061740569083, 46.96398798718615],
        [7.415964689608403, 46.96909314153159],
        [7.41501232049818, 46.968395817537875],
        [7.414486884977604, 46.96801340996167]
      ]
    },
    'properties': {}
  };

  let distance = turfLength(polyline).toLocaleString();

  const marks = [
    {
      value: -180,
      label: '-180°'
    },
    {
      value: -90,
      label: '-90°'
    },
    {
      value: 0,
      label: '0°'
    },
    {
      value: 90,
      label: '90°'
    },
    {
      value: 180,
      label: '180°'
    }
  ];

  const [viewport, setViewport] = React.useState({
    latitude: 46.96601,
    longitude: 7.41143,
    zoom: 14,
    bearing: 0
  });

  const adjustBaring = (bearing) => {
    console.log(bearing)
    setViewport({
      ...viewport,
      bearing: bearing
    })
  };

  return (
    <>
      <div id="slider">
        <Typography id="discrete-slider-always" gutterBottom>
          Bearing
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider-always"
          step={5}
          marks={marks}
          min={-180}
          max={180}
          valueLabelDisplay="auto"
          onChangeCommitted={(event, sliderVal) => adjustBaring(sliderVal)}
        />
      </div>
      <div className="map__container">
      <div id="distance" class="distance-container">{distance} km</div>
        <ReactMapGL
          //mapStyle='mapbox://styles/mapbox/streets-v11'
          //mapStyle="https://s3.amazonaws.com/cdn.brianbancroft.io/assets/osmstyle.json"
          //mapStyle="https://vectortiles.geo.admin.ch/gl-styles/ch.swisstopo.leichte-basiskarte.vt/v006/style.json"
          mapStyle="https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json"
          //mapStyle="https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json"
          {...viewport}
          width="100%"
          height="100%"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken='pk.eyJ1IjoiZGVya3NlbnBoaWxpcHAiLCJhIjoiY2tycXV1ejZxMnFzNTJ1cnY5eHZ0ZXp1YSJ9.iWymYhi7VBjE_C6WIt0mOw'
        >
          <Marker latitude={polygon.geometry.coordinates[0][6][1]} longitude={polygon.geometry.coordinates[0][6][0]}>
            <img src={markerImg} alt="marker"/>
          </Marker>
          <Source id='polylineSource' type='geojson' data={polyline}>
            <Layer
              id='lineLayer'
              type='line'
              layout={{
              'line-join': 'round',
              'line-cap': 'round',
              }}
              paint={{
              'line-color': 'lime',
                'line-width': 5,
              }}
            />
          </Source>
          <Source id='polygonSource' type='geojson' data={polygon}>
            <Layer
              id='polygonLayer'
              type='fill'
              paint={{
                'fill-color': 'purple',
                'fill-opacity': 0.3
              }}
            />
          </Source>
          <GeolocateControl />
          <NavigationControl />
        </ReactMapGL>
      </div>
    </>
  );
}

export default Map;