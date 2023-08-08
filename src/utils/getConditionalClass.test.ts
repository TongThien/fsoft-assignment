import { getConditionalClass } from "./getConditionalClass";


describe("getConditionalClass Function", () => {
  it("should return 'yes' for 'Yes' condition", () => {
    const result = getConditionalClass("Yes");
    expect(result).toBe("yes");
  });

  it("should return 'no' for 'No' condition", () => {
    const result = getConditionalClass("No");
    expect(result).toBe("no");
  });

  it("should return 'unknown' for 'Unknown' condition", () => {
    const result = getConditionalClass("Unknown");
    expect(result).toBe("unknown");
  });

  it("should return 'custom' for 'Custom' condition", () => {
    const result = getConditionalClass("Custom");
    expect(result).toBe("custom");
  });
});
