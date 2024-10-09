import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-cover bg-no-repeat  h-full bg-[url(assets/earthquake.jpg)] bg-blend-multiply bg-stone-800/55">
      <div
        className="flex flex-col justify-center items-center gap-8 lg:px-60 px-4"
        style={{ minBlockSize: "100vh" }}
      >
        <h1 className="text-center text-white text-base lg:text-xl">
          {`Every year, around 500,000 detectable earthquakes occur globally. Out of
        these, 100,000 can be felt, and about 100 cause damage. The majority of
        these earthquakes go unnoticed, but even small tremors play a crucial
        role in releasing Earth's natural energy." Curious to see where these
        earthquakes happen? Click below to explore the latest earthquake
        occurrences on our interactive map!`}
        </h1>
        <button
          className="px-4 py-2 text-white bg-purple-500 rounded-full text-base hover:bg-purple-600 active:bg-purple-700 transition-colors capitalize"
          onClick={() => {
            document.startViewTransition(() => navigate("/map"));
          }}
          id="view-btn"
        >
          view hazards on map
        </button>
      </div>
    </div>
  );
};

export default Home;
