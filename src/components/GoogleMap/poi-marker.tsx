import { useEffect, useState, useRef, useCallback } from "react";

import {
  useMap,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

// import { Circle } from "./circle";
import { Poi } from "../../types";

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  // const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  // const [circleCenter, setCircleCenter] = useState<google.maps.LatLng | null>(
  //   null
  // );
  const [infowindowOpen, setInfowindowOpen] = useState<boolean>(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("marker clicked: ", ev.latLng.toString());
    map.panTo(ev.latLng);
    // setCircleCenter(ev.latLng);
    setInfowindowOpen(!infowindowOpen);
  }, []);

  // Initialize MarkerClusterer, if the map has changed
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers, if the markers array has changed
  // useEffect(() => {
  //   clusterer.current?.clearMarkers();
  //   clusterer.current?.addMarkers(Object.values(markers));
  // }, [markers]);

  // const setMarkerRef = (marker: Marker | null, key: string) => {
  //   if (marker && markers[key]) return;
  //   if (!marker && !markers[key]) return;

  //   setMarkers((prev) => {
  //     if (marker) {
  //       return { ...prev, [key]: marker };
  //     } else {
  //       const newMarkers = { ...prev };
  //       delete newMarkers[key];
  //       return newMarkers;
  //     }
  //   });
  // };

  return (
    <>
      {/* <Circle
        radius={800}
        center={circleCenter}
        strokeColor={"#0c4cb3"}
        strokeOpacity={1}
        strokeWeight={3}
        fillColor={"#3b82f6"}
        fillOpacity={0.3}
      /> */}
      {props.pois.map((poi: Poi) => (
        <>
          <AdvancedMarker
            key={poi.key}
            position={poi.location}
            ref={markerRef}
            // ref={(marker) => setMarkerRef(marker, poi.key)}
            clickable={true}
            onClick={handleClick}
            // title={poi.key}
          >
            {/* <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          /> */}
          </AdvancedMarker>
          {infowindowOpen && (
            <InfoWindow
              anchor={marker}
              maxWidth={200}
              onCloseClick={() => setInfowindowOpen(false)}
            >
              {poi.key}
            </InfoWindow>
          )}
        </>
      ))}
    </>
  );
};

export default PoiMarkers;
