import { useContext, useState, useEffect } from "react";
import { HazardContext } from "../App";
const Sidebar = ({ list }) => {
  const { state, dispatch } = useContext(HazardContext);
  const [years, setYears] = useState([]);
  useEffect(() => {
    let years = [];
    let num = 13;
    do {
      num++;
      years.push(num);
    } while (
      num <
      Number(new Date().getFullYear().toString().split("").slice(2).join(""))
    );
    setYears(years);
  }, []);
  const yearselection = (event) => {
    dispatch({ type: "year-selection", payload: `20${event.target.value}` });
  };
  const magnitudeselection = (event) => {
    dispatch({ type: "magnitude-selection", payload: event.target.value });
  };
  const getData = async () => {
    console.log(state?.year, state?.magnitude);
  };
  return (
    <div className="relative h-full">
      <h2 className="text-center text-lg capitalize bg-blue-600/75 rounded-t-lg text-white p-2">
        {list?.length} earthquakes occurs in America in {state?.year}
      </h2>
      <div className="flex gap-2 justify-centet items-center my-8 pl-4">
        <h3>Select year:</h3>
        <select
          className="border border-stone-500 rounded-md w-fit focus:outline-none"
          onChange={(e) => yearselection(e)}
          defaultValue={state?.year}
        >
          {years.map((year, index) => {
            return (
              <option key={index} value={year}>
                20{year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col justify-center gap-5 items-baseline my-8 pl-2">
        <h3>Magnitude range (in ml) : {state?.magnitude}</h3>
        <input
          type="range"
          defaultValue={state?.magnitude}
          max={9}
          min={4}
          onChange={(e) => magnitudeselection(e)}
        />
      </div>
      <div className="flex justify-center items-center gap-4 lg:m-2">
        <button
          className=" border text-blue-600 border-blue-600/75 px-4 py-2 rounded-lg  lg:hidden block flex-1 mx-6"
          onClick={() => dispatch({ type: "show-drawer" })}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
