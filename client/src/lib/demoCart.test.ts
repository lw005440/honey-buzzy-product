import { describe, expect, it } from "vitest";
import { addDemoCartItem, getDemoCartNotice } from "./demoCart";

describe("sacola demonstrativa", () => {
  it("inicia sem itens e orienta a escolher o produto", () => {
    expect(getDemoCartNotice(0)).toEqual({
      title: "Sua sacola está vazia",
      description: "Escolha Pétala Dourada para começar seu ritual.",
    });
  });

  it("incrementa a quantidade ao adicionar o produto", () => {
    expect(addDemoCartItem(0)).toBe(1);
    expect(addDemoCartItem(1)).toBe(2);
    expect(addDemoCartItem(2, 3)).toBe(5);
  });

  it("deixa claro que uma sacola com itens não gera checkout ou cobrança", () => {
    expect(getDemoCartNotice(2)).toEqual({
      title: "2 itens na sacola",
      description: "Esta é uma experiência demonstrativa; não haverá checkout ou cobrança.",
    });
  });
});
