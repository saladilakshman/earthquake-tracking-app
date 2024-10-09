import Sidebar from "./sidebar";
import { useContext } from "react";
import { HazardContext } from "../App";
const Drawer = () => {
  const { state, dispatch } = useContext(HazardContext);
  return (
    <>
      <button
        className="lg:hidden block bg-white px-4 py-2 drop-shadow-lg rounded-lg absolute bottom-24 right-3 text-neutral-700 z-50 capitalize text-base "
        onClick={() => dispatch({ type: "show-drawer" })}
      >
        filter list
      </button>
      <div
        className={`lg:hidden block bg-white ${
          state?.show_drawer ? "h-2/3" : "h-0"
        } absolute bottom-0 right-0 left-0 z-50 duration-500`}
      >
        <Sidebar />
      </div>
    </>
  );
};

export default Drawer;
