import React, { useState } from "react";
import { useWeatherFacade } from "./hooks/WeatherFacade";
import "./App.css";
import { getConditionalClass } from "./utils/getConditionalClass";

function App() {
  const [zipcode, setZipcode] = useState("");
  const { fetchWeather, shouldGoOutside, shouldWearSunscreen, canFlyKite, isFetched } = useWeatherFacade();

  const handleFetchWeather = () => {
    fetchWeather(zipcode);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <button className="fetch-button" onClick={handleFetchWeather}>
          Get Weather
        </button>
      </div>
      {isFetched && (
        <div className="result">
          <p>
            Should I go outside?{" "}
            <span className={getConditionalClass(shouldGoOutside)}>{shouldGoOutside}</span>
          </p>
          <p>
            Should I wear sunscreen?{" "}
            <span className={getConditionalClass(shouldWearSunscreen)}>
              {shouldWearSunscreen}
            </span>
          </p>
          <p>
            Can I fly my kite?{" "}
            <span className={getConditionalClass(canFlyKite)}>{canFlyKite}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
