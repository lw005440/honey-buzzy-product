import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });

try {
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Aumentar quantidade" }).click();
  await page.getByRole("button", { name: /Colocar 2 unidades/i }).first().click();

  const drawer = page.getByRole("dialog", { name: /Sua sacola/i });
  await drawer.waitFor();
  const initialState = await drawer.innerText();
  if (!initialState.includes("R$ 60,00") || !initialState.includes("Frete")) {
    throw new Error("O painel mobile não exibiu o total de R$ 60,00 e o frete.");
  }

  await drawer.getByRole("button", { name: "Diminuir quantidade" }).click();
  const updatedState = await drawer.innerText();
  if (!updatedState.includes("R$ 30,00")) {
    throw new Error("O painel mobile não recalculou o total para R$ 30,00.");
  }

  console.log("Validação mobile da sacola concluída: seletor, painel e totais respondem corretamente.");
} finally {
  await browser.close();
}
