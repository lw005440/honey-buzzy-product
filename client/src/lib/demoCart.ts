export type DemoCartNotice = {
  title: string;
  description: string;
};

export function addDemoCartItem(currentCount: number): number {
  return currentCount + 1;
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
