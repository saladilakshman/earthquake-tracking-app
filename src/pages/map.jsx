import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import location from "../assets/location.png";
import Sidebar from "../components/sidebar";
import { useContext } from "react";
import { HazardContext } from "../App";
import Drawer from "../components/drawer";
const Map = () => {
  const [list, setList] = useState([]);
  const icon = new Icon({
    iconUrl: location,
    iconSize: [35, 35],
  });
  const { state } = useContext(HazardContext);
  useEffect(() => {
    axios
      .get(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${state?.year}-01-01&endtime=${state?.year}-01-02&maxmagnitude=${state?.magnitude}`
      )
      .then((res) => {
        setList(res.data?.features);
      })
      .catch((err) => console.log(err));
  }, [state?.magnitude, state?.year]);
  return (
    <>
      <Drawer />
      <div className="grid grid-cols-12">
        <div className="hidden lg:col-span-2 lg:block h-screen border border-r-stone-200 shadow-xl">
          <Sidebar list={list} />
        </div>
        <MapContainer
          center={[34.307144, -106.018066]}
          zoom={5}
          scrollWheelZoom={false}
          className=" col-span-12 lg:col-span-10 isolate"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openaip.net/">openAIP Data</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {list?.map((q, index) => {
            const {
              geometry: { coordinates },
              properties: { mag, place, time, url },
            } = q;
            return (
              <Marker
                position={[coordinates[1], coordinates[0]]}
                key={index}
                icon={icon}
              >
                <Popup>
                  <h3 className="text-center border-b-[0.1px] border-b-stone-300 text-lg">
                    Details
                  </h3>
                  <div className="flex flex-col gap-1 my-2">
                    <h1 className="text-base">
                      <span className="font-semibold">Magnitude: </span>
                      {mag}
                    </h1>
                    <h1 className="text-base">
                      <span className="font-semibold">Place: </span>
                      {place}
                    </h1>
                    <h1 className="text-base pb-5">
                      <span className="font-semibold">Event occurs on : </span>
                      {new Date(time).toLocaleString("en-IN")}
                    </h1>
                  </div>
                  <button
                    className="px-3 py-1 capitalize text-sm border border-stone-600 text-stone-700 rounded-lg mx-auto block"
                    onClick={() => (window.location.href = url)}
                  >
                    More details
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
// function MapHandler({ dispatch }) {
//   dispatch({ type: "show-drawer" });
// }
