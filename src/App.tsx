import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import addressPoints from "./speedy";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
type AdressPoint = Array<[number, number, string]>;

function App() {
  return (
    <div>
      <MapContainer
        style={{ height: "800px" }}
        center={[42.6954322, 25.3239467]}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {Object.entries(addressPoints).map(([idx, address]) => (
            <Marker key={address.oID} position={[address.Y, address.X]}>
              <Popup>{address.officeName}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default App;
