import React, { useEffect, useState } from "react";
import { divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import addressPoints from "./speedy";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
// type AdressPoint = Array<[number, number, string]>;

function App() {
  const [officeId, setOfficeId] = useState(0);
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (officeId === 0) {
      return;
    }

    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        function: "bubbleHtmlFiller",
        lang: "bg",
        arguments: {
          id: officeId,
        },
      }),
    })
      .then((r) => r.text())
      .then((r) => setDetails(r));
  }, [officeId]);

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
            <Marker
              icon={divIcon({
                className: "speedy-marker",
                html: `<div class='name'><img src='https://www.speedy.bg/uploads/file_manager_uploads/Pics/speedy-logo-172x76.png' /><div class='type'>${address.officeIcon}</div></div><div class='arrow arrow-down'></div>`,
              })}
              key={address.oID}
              position={[address.Y, address.X]}
              eventHandlers={{
                click: (e) => {
                  setOfficeId(address.oID);
                },
              }}
            >
              <Popup>
                <div dangerouslySetInnerHTML={{ __html: details }} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default App;
