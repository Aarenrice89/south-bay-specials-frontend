// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { createRoot } from "react-dom/client";

import {
  APIProvider,
  Map,
  // useMap,
  // AdvancedMarker,
  MapCameraChangedEvent,
  // Pin,
} from "@vis.gl/react-google-maps";

// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import type { Marker } from "@googlemaps/markerclusterer";

// import { Circle } from "../circle";
import PoiMarkers from "./poi-marker";
import { Poi } from "../../types";

const locations: Poi[] = [
  {
    key: "American Junkie",
    location: { lat: 33.86200633981369, lng: -118.40043937895398 },
  },
];

const GoogleMap = () => (
  <APIProvider
    apiKey={import.meta.env.VITE_GM_API_KEY}
    onLoad={() => console.log("Maps API has loaded.")}
  >
    <Map
      mapId={import.meta.env.VITE_GM_ID_KEY}
      defaultZoom={13}
      style={{ width: "80vw", height: "80vh" }}
      defaultCenter={{ lat: 33.860664, lng: -118.4009608 }}
      // onCameraChanged={(ev: MapCameraChangedEvent) =>
      //   console.log(
      //     "camera changed:",
      //     ev.detail.center,
      //     "zoom:",
      //     ev.detail.zoom
      //   )
      // }
    >
      <PoiMarkers pois={locations} />
    </Map>
  </APIProvider>
);

export default GoogleMap;
