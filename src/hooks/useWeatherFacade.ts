import { useMemo, useState } from "react";

interface WeatherData {
  current: {
    weather_descriptions: string[];
    uv_index: number;
    wind_speed: number;
  };
}

export const useWeatherFacade = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isFetched,setIsFetched] = useState(false)

  const fetchWeather = async (zipcode: string) => {
    const apiKey = "610acf4c1d203448cd6f671955c5e8aa";
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${zipcode}`;

    try {
      const response = await fetch(url);
      const data: WeatherData = await response.json();
      setWeatherData(data);
      setIsFetched(true)
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
  };

  const shouldGoOutside = useMemo(() => {
    if (weatherData?.current != null) {
      const weatherDescription = weatherData.current?.weather_descriptions ?? [];
      return weatherDescription.includes("rain") ? "No" : "Yes";
    }
    return "Unknown";
  },[weatherData]);

  const shouldWearSunscreen = useMemo(() => {
    if (weatherData?.current != null) {
      const uvIndex = weatherData.current?.uv_index;
      return uvIndex > 3 ? "Yes" : "No";
    }
    return "Unknown";
  },[weatherData]);

  const canFlyKite = useMemo(() => {
    if (weatherData?.current != null) {
      const weatherDescription = weatherData.current?.weather_descriptions ?? [];
      const windSpeed = weatherData.current?.wind_speed;
      return weatherDescription.includes("rain") || windSpeed <= 15 ? "No" : "Yes";
    }
    return "Unknown";
  },[weatherData]);


  return { fetchWeather, isFetched, shouldGoOutside, shouldWearSunscreen, canFlyKite };
};
