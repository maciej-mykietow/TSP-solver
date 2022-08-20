import React, { useEffect, useState } from "react";
import {
  mapboxglAccessToken,
  InitialConfigMapboxglUS,
} from "../../const/constants";
import mapboxgl from "!mapbox-gl"; //exclude from transpilation
import "./PathMap.scss";

let mapboxglMap;

const returnRouteSourceDataConfig = (solutionToDisplay) => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: solutionToDisplay,
    },
  };
};

const returnRouteSourceConfig = (solutionToDisplay) => {
  return {
    type: "geojson",
    data: returnRouteSourceDataConfig(solutionToDisplay),
  };
};

const returnRouteLayerConfig = () => {
  return {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#21130d",
      "line-width": 1,
    },
  };
};

const returnOriginCityLayerDataConfig = (solutionToDisplay) => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: solutionToDisplay[0],
        },
        properties: {
          title:
            solutionToDisplay[0][2] +
            ", " +
            solutionToDisplay[0][3] +
            " - Origin city",
        },
      },
    ],
  };
};

const returnOriginCitySourceConfig = (solutionToDisplay) => {
  return {
    type: "geojson",
    data: returnOriginCityLayerDataConfig(solutionToDisplay),
  };
};

const returnOriginCityLayerConfig = () => {
  return {
    id: "origin",
    type: "symbol",
    source: "origin",
    layout: {
      "icon-image": "custom-marker",
      "text-field": ["get", "title"],
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 1.25],
      "text-anchor": "top",
    },
  };
};

const addReturnToOriginCityPoint = (displaySolution) => {
  displaySolution.push(displaySolution[0]); //coming back to origin city
};

const setupMapbox = (solutionToDisplay) => {
  addReturnToOriginCityPoint(solutionToDisplay);
  mapboxgl.accessToken = mapboxglAccessToken;
  mapboxglMap = new mapboxgl.Map(InitialConfigMapboxglUS);

  mapboxglMap.on("load", () => {
    mapboxglMap.addSource("route", returnRouteSourceConfig(solutionToDisplay));
    mapboxglMap.addLayer(returnRouteLayerConfig());

    mapboxglMap.loadImage(
      "https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/020_-_Star-32.png",
      (error, image) => {
        if (error) throw error;
        mapboxglMap.addImage("custom-marker", image);
        mapboxglMap.addSource(
          "origin",
          returnOriginCitySourceConfig(solutionToDisplay)
        );
        mapboxglMap.addLayer(returnOriginCityLayerConfig());
      }
    );
  });
};

const updateRouteLayer = (displaySolution) => {
  mapboxglMap
    .getSource("route")
    .setData(returnRouteSourceDataConfig(displaySolution));
  mapboxglMap.removeLayer("route");
  mapboxglMap.addLayer(returnRouteLayerConfig());
};

const updateOriginCityLayer = (displaySolution) => {
  mapboxglMap.removeLayer("origin");
  mapboxglMap
    .getSource("origin")
    .setData(returnOriginCityLayerDataConfig(displaySolution));
  mapboxglMap.addLayer(returnOriginCityLayerConfig());
};

const updateDisplaySolution = (displaySolution) => {
  addReturnToOriginCityPoint(displaySolution);
  updateRouteLayer(displaySolution);
  updateOriginCityLayer(displaySolution);
};

const PathMap = ({ solutionToDisplay }) => {
  const [skipDuringFirstRender, setSkipDuringFirstRender] = useState(true);
  const [displayedSolution] = useState(solutionToDisplay);

  useEffect(() => {
    setupMapbox(displayedSolution);
  }, []);

  useEffect(() => {
    if (skipDuringFirstRender) setSkipDuringFirstRender(false);
    else {
      updateDisplaySolution(solutionToDisplay);
    }
  }, [solutionToDisplay]);

  return <div id="map"></div>;
};

export default PathMap;
