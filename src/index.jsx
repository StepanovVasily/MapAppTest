import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./app.jsx";
import store from "./store.jsx";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
