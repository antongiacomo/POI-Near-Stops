import L from 'leaflet';

const Marker = ({ a }) => {
  let icon = L.icon({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
  return (
    <Marker position={text["coordinates"]} icon={icon}>
      <Tooltip direction={"center"} permanent className={"shape-tooltip"}>
        <span>{text["text"]}</span>
      </Tooltip>
    </Marker>
  );
};

export default Marker;
