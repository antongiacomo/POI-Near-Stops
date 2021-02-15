import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const Map = ({ a }) => {
  return (
    <MapContainer
      className="rounded-xl"
      center={[a[0][1], a[0][0]]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPTOBOX_KEY}`}
      />
      {a.map((item, index) => (
        <Marker position={[item[1], item[0]]} animate={true}>

          <Popup>
            {item[2].map(
              (item,key) =>
                item.categories && (
                  <h1 key={`pop-${key}`}>
                    {item.title} - {item.categories[0].name}

                  </h1>
                )
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
