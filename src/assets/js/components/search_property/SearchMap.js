import React, {
  useState,
  useReducer,
  useContext,
  useEffect,
  memo,
} from "react";

import { FetchContext } from "@context/FetchContext";
import { GlobalContext } from "@context/GlobalContext";

import MapReducer from "@reducers/MapReducer";
import {
  SET_PROPERTIES,
  TOGGLE_POPUP,
  SET_POPUP_INFO,
} from "@constants/actionTypes";

import ReactMapGL, { GeolocateControl } from "react-map-gl";

import Markers from "./map/Markers";
import PopUp from "./map/PopUp";

const SearchMap = () => {
  const { location } = useContext(GlobalContext);

  const { buy_properties, rent_properties } = useContext(FetchContext);

  const defaultData = [
    {
      coordinates: {
        latitude: 37.422028,
        longitude: -122.084052,
      },
      country: "United States",
      city: "California",
    },
  ];

  const defaultMapState = {
    properties: defaultData,
    show_popup: false,
    popup_info: defaultData,
  };

  const [map_state, dispatch] = useReducer(MapReducer, defaultMapState);

  const togglePopup = (val) => dispatch({ type: TOGGLE_POPUP, payload: val });

  const getPropertyInfo = (index) =>
    dispatch({ type: SET_POPUP_INFO, payload: map_state.properties[index] });

  const [arr, setArr] = useState([]);

  useEffect(() => {
    location.includes("buy-properties") && setArr(buy_properties);
    location.includes("rental-listings") && setArr(rent_properties);

    const properties = arr.map((item) => {
      return {
        coordinates: item.coordinates,
        country: item.addressLocation,
        city: item.addressCity,
        property_id: item.id,
      };
    });

    if (arr.length > 0) dispatch({ type: SET_PROPERTIES, payload: properties });
    else dispatch({ type: SET_PROPERTIES, payload: defaultData });
  }, [buy_properties, rent_properties, arr]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 16,
    latitude: undefined,
    longitude: undefined,
  });

  useEffect(() => {
    setViewport((prevState) => ({
      ...prevState,
      latitude: map_state.properties[0].coordinates.latitude,
      longitude: map_state.properties[0].coordinates.longitude,
    }));
  }, [map_state.properties]);

  const map_key = 'pk.eyJ1IjoiZ3JlY2RldiIsImEiOiJjazc0eTBjZnEwcW9oM2tudncyaGdhemxvIn0.zgIjs4IpmpFNgxJaeVWjzw';

  return (
    <section id="search-map">
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={map_key}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        <Markers
          data={map_state.properties}
          togglePopup={togglePopup}
          getPropertyInfo={getPropertyInfo}
          showPopup={map_state.show_popup}
        />

        <PopUp
          showPopup={map_state.show_popup}
          togglePopup={togglePopup}
          popupInfo={map_state.popup_info}
        />

        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
          }}
        />
      </ReactMapGL>
    </section>
  );
};

export default memo(SearchMap);
