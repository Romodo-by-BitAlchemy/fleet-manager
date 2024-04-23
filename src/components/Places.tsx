"use client";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";

export default function Places() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <APIProvider apiKey={"AIzaSyCP1KOUiEbJqBJxIxkDhylVGZnH-MOabbU"}>
        <Map center={{ lat: 43.64, lng: -79.41 }} zoom={1}></Map>
      </APIProvider>
    </div>
  );
}
