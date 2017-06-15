import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import {createStore, combineReducers} from 'redux';
import { connect } from 'react-redux';
import MarkerEdited from './MarkerEdited.jsx'
import ButtonEdit from './ButtonEdit.jsx'
import store from './store.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 11,
        };
    }
    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        var eventClick;
        eventClick = leafletMap.on("click", clicked => {
            if (this.props.mode) {
                store.dispatch({type:"ADD_MARKER",marker:{ position: clicked.latlng,name: " ", description: " " }})//arrayMarker = [{ position: clicked.latlng }];
            }
        });
    }
    arrayMarker() {//добавление массива маркеров из localstorage
        let ar = [];
        var arrayMarker = this.props.markers//JSON.parse(localStorage.getItem("arrayMarker"));
       for (let i = 0; i != arrayMarker.length; i++)
            ar.push(<MarkerEdited id={i} key={i}/>);
        return ar;
    }
    render() {
        const position = [56.07, 47.20];
        return (
            <div>
                <Map
                    ref={m => {this.leafletMap = m;}}
                    id={"iu"}
                    useFlyTo={false}
                    center={position}
                    zoom={this.state.zoom}
                >
                    <TileLayer url="http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png" />
                    {this.arrayMarker()}
                </Map>
                <ButtonEdit/>
            </div>
        );
    }
}

function mapStateToProps (state) {
   
  return {
    mode: state.mode,
    markers: state.markers
  }
}
export default connect(mapStateToProps)(App)