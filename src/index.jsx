import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
class ButtonEdit extends React.Component {
    render(props) {
        return this.props.mode
            ? <button onClick={this.props.changeMode} id={"ButtonEdit"}>Перейти в режим просмотра</button>
            : <button onClick={this.props.changeMode} id={"ButtonEdit"}>Перейти в режим редактирования</button>;
    }
}
class MarkerEdited extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: this.props.position,
            name: this.props.name,
            description: this.props.description,
            id: this.props.id
        };
        this.nameChange = this.nameChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }
    nameChange(event) {
        this.setState({ name: event.target.value });
    }
    descriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    updatePosition(e) {
        this.setState({ position: e.target._latlng });
        this.props.changeMarker({ position: this.state.position, name: this.props.name, description: this.props.description }, this.props.id);
    }
    render(props) {
        return this.props.mode
            ? <Marker radius={22} position={[this.state.position.lat, this.state.position.lng]} draggable={true} onDragend={this.updatePosition}>
                  <Popup minWidth={90}>
                      <span onClick={this.toggleDraggable}>
                          <form
                              onSubmit={e => {
                                  e.preventDefault();
                                  this.props.changeMarker({ position: this.state.position, name: this.state.name, description: this.state.description }, this.props.id);
                              }}
                          >
                              Название:
                              <input type="text" value={this.state.name} onChange={this.nameChange} />
                              <br />
                              Описание:
                              <input type="text" value={this.state.description} onChange={this.descriptionChange} />
                              <h4>Координаты: {this.state.position.lat},{this.state.position.lng}</h4>
                              <input type="submit" value="Изменить" />
                          </form>
                      </span>
                  </Popup>
              </Marker>
            : <Marker radius={22} position={[this.props.position.lat, this.props.position.lng]} draggable={false}>
                  <Popup minWidth={90}>
                      <span onClick={this.toggleDraggable}>
                          <h4>Название: {this.props.name}</h4>
                          <h4>Описание: {this.props.description}</h4>
                          <h4>Координаты: {this.props.position.lat},{this.props.position.lng}</h4>

                      </span>
                  </Popup>
              </Marker>;
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 11,
            mode: false
        };
        this.changeMode = this.changeMode.bind(this);
    }
    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        var eventClick;
        eventClick = leafletMap.on("click", clicked => {
            if (this.state.mode) {
                var arrayMarker = JSON.parse(localStorage.getItem("arrayMarker"));
                if (arrayMarker == null) arrayMarker = [{ position: clicked.latlng }];
                else arrayMarker.push({ position: clicked.latlng, name: "", description: "" });
                localStorage.setItem("arrayMarker", JSON.stringify(arrayMarker));
                this.forceUpdate();
            }
        });
    }
    changeMarker(event, id) {
        var arrayMarker = JSON.parse(localStorage.getItem("arrayMarker"));
        arrayMarker[id] = event;
        localStorage.setItem("arrayMarker", JSON.stringify(arrayMarker));
    }
    changeMode() {
        this.setState({ mode: !this.state.mode });
    }

    arrayMarker() {
        let ar = [];
        var arrayMarker = JSON.parse(localStorage.getItem("arrayMarker"));
        let leng;
        if (arrayMarker != null) leng = arrayMarker.length;
        else leng = 0;

        for (let i = 0; i != leng; i++)
            ar.push(
                <MarkerEdited
                    changeMarker={this.changeMarker}
                    id={i}
                    mode={this.state.mode}
                    key={i}
                    name={arrayMarker[i].name}
                    description={arrayMarker[i].description}
                    position={arrayMarker[i].position}
                />
            );
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
                <ButtonEdit mode={this.state.mode} changeMode={this.changeMode} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
