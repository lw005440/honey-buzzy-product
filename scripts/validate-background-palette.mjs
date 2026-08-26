import { chromium } from "@playwright/test";

function relativeLuminance([red, green, blue]) {
  const linear = [red, green, blue].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(background, foreground) {
  const backgroundLum = relativeLuminance(background);
  const foregroundLum = relativeLuminance(foreground);
  return (Math.max(backgroundLum, foregroundLum) + 0.05) / (Math.min(backgroundLum, foregroundLum) + 0.05);
}

function parseRgb(color) {
  const matches = color.match(/\d+(?:\.\d+)?/g);
  if (!matches || matches.length < 3) throw new Error(`Cor RGB inválida: ${color}`);
  return matches.slice(0, 3).map(Number);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});

try {
  for (const viewport of [{ name: "desktop", width: 1280, height: 720 }, { name: "mobile", width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.name === "mobile" });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const styles = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const header = getComputedStyle(document.querySelector(".site-header"));
      const cta = getComputedStyle(document.querySelector(".button-primary"));
      return { bodyBackground: body.backgroundColor, text: body.color, headerBackground: header.backgroundColor, ctaBackground: cta.backgroundColor, ctaText: cta.color };
    });
    const expectedBackground = "rgb(245, 239, 251)";
    if (styles.bodyBackground !== expectedBackground || styles.headerBackground !== expectedBackground) {
      throw new Error(`${viewport.name}: o fundo roxo claro não foi aplicado de maneira uniforme: ${JSON.stringify(styles)}`);
    }
    const textContrast = contrastRatio([245, 239, 251], [53, 29, 56]);
    const ctaContrast = contrastRatio([189, 54, 136], [245, 239, 251]);
    if (textContrast < 4.5 || ctaContrast < 3) {
      throw new Error(`${viewport.name}: contraste insuficiente (texto ${textContrast.toFixed(2)}, CTA ${ctaContrast.toFixed(2)})`);
    }
    if (viewport.name === "mobile") {
      await page.getByLabel("Abrir menu").click();
      await page.locator(".mobile-menu-cta").click();
      const controls = await page.evaluate(() => {
        const styles = (selector) => {
          const node = document.querySelector(selector);
          if (!node) throw new Error(`Controle ausente: ${selector}`);
          const computed = getComputedStyle(node);
          return { background: computed.backgroundColor, color: computed.color };
        };
        return {
          cta: styles(".button-primary"),
          cart: styles(".cart-button"),
          quantity: styles(".quantity-selector"),
          menu: styles(".mobile-menu"),
          menuLink: styles(".mobile-menu button:not(.mobile-menu-cta)"),
          drawer: styles(".cart-drawer"),
          drawerClose: styles(".drawer-close"),
        };
      });
      const controlRatios = {
        cta: contrastRatio(parseRgb(controls.cta.background), parseRgb(controls.cta.color)),
        cart: contrastRatio(parseRgb(controls.cart.background), parseRgb(controls.cart.color)),
        quantity: contrastRatio(parseRgb(controls.quantity.background), parseRgb(controls.quantity.color)),
        menu: contrastRatio(parseRgb(controls.menu.background), parseRgb(controls.menuLink.color)),
        drawer: contrastRatio(parseRgb(controls.drawer.background), parseRgb(controls.drawer.color)),
        drawerClose: contrastRatio(parseRgb(controls.drawerClose.background), parseRgb(controls.drawerClose.color)),
      };
      const weakControls = Object.entries(controlRatios).filter(([, ratio]) => ratio < 3);
      if (weakControls.length) {
        throw new Error(`mobile: controles com contraste insuficiente: ${JSON.stringify(weakControls)}`);
      }
      console.log(`mobile: controles com contraste adequado — ${Object.entries(controlRatios).map(([name, ratio]) => `${name} ${ratio.toFixed(2)}`).join(", ")}.`);
    }
    console.log(`${viewport.name}: fundo roxo claro aplicado; contraste do texto ${textContrast.toFixed(2)} e CTA ${ctaContrast.toFixed(2)}.`);
    await page.close();
  }
} finally {
  await browser.close();
}
