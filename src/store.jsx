import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { createStore, combineReducers } from "redux";

var reduserMarkers = function(state, action) {
    if (state === undefined) {
        state = JSON.parse(localStorage.getItem("arrayMarker"));
        if (state == null) state = [];
    }
    if (action.type === "ADD_MARKER") {
        localStorage.setItem("arrayMarker", JSON.stringify(state.concat([action.marker])));
        return state.concat([action.marker]);
    }
    if (action.type === "CHANGE_MARKER") {
        var newState = state.concat();
        newState[action.id] = action.marker;
        localStorage.setItem("arrayMarker", JSON.stringify(newState));
        return newState;
    }
    return state;
};

var reduserMode = function(state, action) {
    if (state === undefined) {
        state = false;
    }
    if (action.type === "CHANGE_MODE") {
        return !state;
    }
    return state;
};
var store = createStore(combineReducers({ markers: reduserMarkers, mode: reduserMode }));
export default store;
