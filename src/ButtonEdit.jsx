import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { connect } from 'react-redux';
import store from './store.jsx'

 class ButtonEdit extends React.Component {
    render() {
        return this.props.mode
            ? <button onClick={()=>{store.dispatch({type: 'CHANGE_MODE'}); }} id={"ButtonEdit"}>Перейти в режим просмотра</button>
            : <button onClick={()=>{store.dispatch({type: 'CHANGE_MODE'}); }} id={"ButtonEdit"}>Перейти в режим редактирования</button>;
    }
}
function mapStateToProps (state) {
  return {
    mode: state.mode
  }
}
export default connect(mapStateToProps)(ButtonEdit)