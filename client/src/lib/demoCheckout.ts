export const DEMO_PRODUCT_PRICE = 52.99;

export function calculateDemoTotal(quantity: number, unitPrice = DEMO_PRODUCT_PRICE): number {
  return Math.max(0, quantity) * unitPrice;
}

export function formatDemoReal(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
