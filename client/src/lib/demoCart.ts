export type DemoCartNotice = {
  title: string;
  description: string;
};

export function addDemoCartItem(currentCount: number, units = 1): number {
  return currentCount + Math.max(1, units);
}

export function getDemoCartNotice(itemCount: number): DemoCartNotice {
  if (itemCount <= 0) {
    return {
      title: "Sua sacola está vazia",
      description: "Escolha Pétala Dourada para começar seu ritual.",
    };
  }

  return {
    title: `${itemCount} ${itemCount === 1 ? "item" : "itens"} na sacola`,
    description: "Esta é uma experiência demonstrativa; não haverá checkout ou cobrança.",
  };
}
