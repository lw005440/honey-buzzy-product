import { describe, expect, it } from "vitest";
import { calculateDemoTotal, DEMO_PRODUCT_PRICE, formatDemoReal } from "./demoCheckout";

describe("checkout demonstrativo", () => {
  it("usa R$ 52,99 como preço unitário", () => {
    expect(DEMO_PRODUCT_PRICE).toBe(52.99);
    expect(formatDemoReal(DEMO_PRODUCT_PRICE)).toBe("R$ 52,99");
  });

  it("calcula o total de acordo com a quantidade escolhida", () => {
    expect(calculateDemoTotal(1)).toBe(52.99);
    expect(calculateDemoTotal(2)).toBe(105.98);
    expect(calculateDemoTotal(0)).toBe(0);
  });
});
