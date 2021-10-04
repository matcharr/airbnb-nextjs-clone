import React, {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState({});
  {/* Transform the result object into the {latitude: 37.7577, longitude: -122.4376} object */
  }
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  });

  return <ReactMapGL
    mapStyle="mapbox://styles/monkiwi/cku7ckifx4etx18p3zq0j43ig"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(viewport) => setViewport(viewport)}
  >
    {searchResults.map((result) => (
      <div key={result.long}>
        <Marker
          longitude={result.long}
          latitude={result.lat}
          offsetLeft={-20}
          offsetTop={-10}>
          <p role="img"
             onClick={() => setSelectedLocation(result)}
             className="cursor-pointer text-2xl animate-bounce"
             aria-label="push-pin">
            📌
          </p>
        </Marker>

        {/*The Popup that should show if we click on the marker*/}
        {selectedLocation.long === result.long ? (
          <Popup
            onClose={() => setSelectedLocation({})}
            closeOnClick={true}
            longitude={result.long}
            latitude={result.lat}
          >
            {result.title}
          </Popup>
        ) : false}
      </div>
    ))}
  </ReactMapGL>
    ;
}

export default Map;
