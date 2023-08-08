import React from "react";
import { useWeatherFacade } from "./useWeatherFacade";
import { act, renderHook } from "@testing-library/react";

describe("useWeatherFacade Hook", () => {
    beforeEach(() => {
      // Mock the fetch function globally
      global.fetch = jest.fn() as jest.Mock;
    });
  

    it("should fetch weather data and provide functions", async () => {
      // Set up the mock response
      const mockWeatherData = {
        current: {
          weather_descriptions: ["Clear"],
          uv_index: 5,
          wind_speed: 20,
        },
      };
      const mockResponse = {
        json: () => Promise.resolve(mockWeatherData),
      };
      (global.fetch as any).mockResolvedValue(mockResponse);
  
      const { result } = renderHook(() => useWeatherFacade());
  
      await act(async () => {
        await result.current.fetchWeather("12345");
      });
  
      expect(result.current.shouldGoOutside).toBe("Yes");
      expect(result.current.shouldWearSunscreen).toBe("Yes");
      expect(result.current.canFlyKite).toBe("Yes");
    });
  
    it("should handle fetch error", async () => {
      // Set up the mock response for error
      (global.fetch as any).mockRejectedValue(new Error("Fetch error"));
  
      const { result } = renderHook(() => useWeatherFacade());
  
      await act(async () => {
        await result.current.fetchWeather("12345");
      });
  
      expect(result.current.shouldGoOutside).toBe("Unknown");
      expect(result.current.shouldWearSunscreen).toBe("Unknown");
      expect(result.current.canFlyKite).toBe("Unknown");
    });
  });