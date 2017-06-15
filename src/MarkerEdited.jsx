import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { connect } from 'react-redux';
import store from './store.jsx'
class MarkerEdited extends React.Component {//маркер
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.markers[this.props.id].name,
            description:this.props.markers[this.props.id].description,
            position:this.props.markers[this.props.id].position,
            id: this.props.id
        };
        this.nameChange = this.nameChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }
    nameChange(event) {
       this.setState({name:event.target.value});
    }
    descriptionChange(event) {
        this.setState({description:event.target.value});
    }
    updatePosition(e) {
        this.setState({position:e.target._latlng});
         store.dispatch({type: 'CHANGE_MARKER',marker:{ name:this.state.name,description:this.state.description,position:e.target._latlng},id:this.state.id})
    }
    render() {
        return this.props.mode//выбор режима
            ? <Marker radius={22} position={[this.state.position.lat, this.state.position.lng]} draggable={true} onDragend={this.updatePosition}>
                  <Popup minWidth={90}>
                      <span onClick={this.toggleDraggable}>
                          <form onSubmit={(e) => {
                                  e.preventDefault();
                                   store.dispatch({type: 'CHANGE_MARKER',marker:{ name:this.state.name,description:this.state.description,position:this.props.markers[this.state.id].position },id:this.state.id})
                           }}
                          >
                              Название:
                              <input type="text" value={this.state.name}  onChange={this.nameChange}/>
                              <br />
                              Описание:
                              <input type="text" value={this.state.description} onChange={this.descriptionChange} />
                              <h4>Координаты: {this.state.position.lat},{this.state.position.lng}</h4>
                              <input type="submit" value="Изменить"/>
                          </form>
                      </span>
                  </Popup>
              </Marker>
            : <Marker radius={22} position={[this.state.position.lat, this.state.position.lng]} draggable={false}>
                  <Popup minWidth={90}>
                      <span>
                          <h4>Название: {this.state.name}</h4>
                          <h4>Описание: {this.state.description}</h4>
                          <h4>Координаты: {this.props.markers[this.state.id].position.lat},{this.props.markers[this.state.id].position.lng}</h4>
                      </span>
                  </Popup>
              </Marker>
                 
    }
}

function mapStateToProps (state) {
  return {
    mode: state.mode,
    markers: state.markers
  }
}
export default connect(mapStateToProps)(MarkerEdited)