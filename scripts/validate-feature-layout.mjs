import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});

const viewports = [
  { name: "desktop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.name === "mobile" });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const report = await page.locator(".feature-card").evaluateAll((cards) => {
      const boxes = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
      });
      const overlaps = boxes.some((box, index) => boxes.slice(index + 1).some((other) => (
        box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top
      )));
      return { count: boxes.length, overlaps };
    });
    if (report.count !== 3 || report.overlaps) {
      throw new Error(`A grade de benefícios falhou em ${viewport.name}: ${JSON.stringify(report)}`);
    }
    console.log(`${viewport.name}: 3 cards sem sobreposição.`);
    await page.close();
  }
} finally {
  await browser.close();
}
