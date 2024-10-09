import { useReducer, createContext, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Map from "./pages/map";
export const HazardContext = createContext();
function App() {
  const appstate = {
    magnitude: 4,
    year: "2014",
    show_drawer: false,
  };
  const Hazardreducer = (state, action) => {
    switch (action.type) {
      case "magnitude-selection":
        return {
          ...state,
          magnitude: action.payload,
        };
      case "year-selection":
        return {
          ...state,
          year: action.payload,
        };
      case "show-drawer":
        return {
          ...state,
          show_drawer: !state.show_drawer,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(Hazardreducer, appstate, (args) => {
    const isstored = window.localStorage.getItem("earthquake");
    return JSON.parse(isstored) ?? args;
  });
  useEffect(() => {
    window.localStorage.setItem("earthquake", JSON.stringify(state));
  }, [state]);
  return (
    <HazardContext.Provider value={{ state, dispatch }}>
      <main className="relative">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="map" element={<Map />} />
          </Routes>
        </HashRouter>
      </main>
    </HazardContext.Provider>
  );
}

export default App;
