import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App";

// Mock the modules being imported
jest.mock("./hooks/useWeatherFacade", () => ({
  useWeatherFacade: () => ({
    fetchWeather: jest.fn(),
    shouldGoOutside: "Yes",
    shouldWearSunscreen: "Yes",
    canFlyKite: "Yes",
    isFetched: true,
  }),
}));

jest.mock("./utils/getConditionalClass", () => ({
  getConditionalClass: (condition: string) => condition.toLowerCase(),
}));

describe("App Component", () => {
  it("renders the component and triggers fetchWeather on button click", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter zipcode");
    const button = screen.getByText("Get Weather");

    fireEvent.change(input, { target: { value: "12345" } });
    fireEvent.click(button);

    // Wait for the fetchWeather to be called
    await act(async () => {
      await screen.findAllByText("Yes");
    });

    expect(screen.getByText("Should I go outside?")).toBeInTheDocument();
    expect(screen.getByText("Should I wear sunscreen?")).toBeInTheDocument();
    expect(screen.getByText("Can I fly my kite?")).toBeInTheDocument();
  });
});
