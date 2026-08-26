/**
 * Direção de design: Clube de Pétalas — editorial de beleza em colagem, assimetria gentil,
 * lilás + rosa-pétala + dourado-pólen. O produto é o objeto central da narrativa.
 */
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Droplet,
  Menu,
  Minus,
  MoveRight,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { addDemoCartItem, getDemoCartNotice } from "@/lib/demoCart";

const productImage = "/manus-storage/honey-buzzy-petala-dourada_1e7e54ac.png";
const heroBackdrop = "/manus-storage/honey-buzzy-hero-studio_d083c293.png";
const petalIllustration = "/manus-storage/honey-buzzy-petal-illustration_82d1822f.png";
const brandSymbol = "/manus-storage/honey-buzzy-symbol_7c230306.png";
const unitPrice = 30;
const maximumQuantity = 9;

function formatBrazilianReal(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const faqs = [
  {
    question: "O que é Pétala Dourada?",
    answer:
      "Pétala Dourada é uma loção corporal desodorante hidratante da Honey Buzzy, pensada para transformar seu cuidado diário em um gesto sensorial.",
  },
  {
    question: "Qual é o tamanho do pote?",
    answer:
      "Este pote leva 150 ml de produto — um formato prático para fazer parte da rotina e ocupar um lugar bonito na sua prateleira.",
  },
  {
    question: "Como incluir no meu ritual?",
    answer:
      "Com a pele limpa e seca, aplique a quantidade desejada e espalhe com movimentos suaves até sentir a textura acomodar na pele.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const cartNotice = getDemoCartNotice(cartQuantity);

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function handleRitualAction() {
    toast("Ritual salvo", {
      description: "Você será a primeira a saber quando Pétala Dourada estiver disponível.",
    });
  }

  function handleAddToCart() {
    setCartQuantity((current) => addDemoCartItem(current, selectedQuantity));
    setCartOpen(true);
    toast("Pétala Dourada foi para a sacola", {
      description: `${selectedQuantity} ${selectedQuantity === 1 ? "pote" : "potes"} de 150 ml foram adicionados à prévia de sacola.`,
    });
  }

  function handleOpenCart() {
    setCartOpen(true);
  }

  function updateSelectedQuantity(delta: number) {
    setSelectedQuantity((current) => Math.min(maximumQuantity, Math.max(1, current + delta)));
  }

  function updateCartQuantity(delta: number) {
    setCartQuantity((current) => Math.min(maximumQuantity, Math.max(0, current + delta)));
  }

  return (
    <main>
      <div className="announcement-bar">
        <span>Loção corporal desodorante hidratante</span>
        <span className="announcement-star">✦</span>
        <span>um carinho que fica na pele</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Honey Buzzy, início">
          <img src={brandSymbol} alt="" className="brand-symbol" />
          <span className="brand-wordmark brand-wordmark-repeat">Pétala Dourada · Pétala Dourada ·</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <button onClick={() => scrollToSection("produto")}>o pote</button>
          <button onClick={() => scrollToSection("ingredientes")}>ingredientes</button>
          <button onClick={() => scrollToSection("ritual")}>o ritual</button>
          <button onClick={() => scrollToSection("duvidas")}>perguntas</button>
        </nav>

        <button className="cart-button" onClick={handleOpenCart} aria-label={`Abrir sacola, ${cartQuantity} ${cartQuantity === 1 ? "item" : "itens"}`}>
          <ShoppingBag size={17} strokeWidth={2.1} />
          <span>sacola</span>
          <b aria-live="polite">{cartQuantity}</b>
        </button>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollToSection("produto")}>o pote</button>
            <button onClick={() => scrollToSection("ingredientes")}>ingredientes</button>
            <button onClick={() => scrollToSection("ritual")}>o ritual</button>
            <button onClick={() => scrollToSection("duvidas")}>perguntas</button>
            <button className="mobile-menu-cta" onClick={handleAddToCart}>
              colocar na sacola <ShoppingBag size={16} />
            </button>
          </div>
        )}
      </header>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-topline"><span>prévia de sacola</span><span>✦</span></div>
            <div className="cart-drawer-header">
              <div>
                <p className="eyebrow eyebrow-dark"><span /> seu ritual</p>
                <h2 id="cart-drawer-title">Sua sacola</h2>
              </div>
              <button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Fechar sacola"><X size={20} /></button>
            </div>

            {cartQuantity > 0 ? (
              <>
                <article className="cart-line-item">
                  <div className="cart-product-image"><img src={productImage} alt="Pétala Dourada" /></div>
                  <div className="cart-line-copy">
                    <p className="cart-product-kicker">Honey Buzzy apresenta</p>
                    <h3>Pétala Dourada</h3>
                    <p>Loção corporal · 150 ml</p>
                    <div className="cart-line-controls">
                      <div className="quantity-selector quantity-selector-small" aria-label="Quantidade na sacola">
                        <button onClick={() => updateCartQuantity(-1)} aria-label="Diminuir quantidade"><Minus size={15} /></button>
                        <span>{cartQuantity}</span>
                        <button onClick={() => updateCartQuantity(1)} disabled={cartQuantity >= maximumQuantity} aria-label="Aumentar quantidade"><Plus size={15} /></button>
                      </div>
                      <button className="remove-cart-item" onClick={() => setCartQuantity(0)}>remover</button>
                    </div>
                  </div>
                  <strong className="cart-line-price">{formatBrazilianReal(unitPrice * cartQuantity)}</strong>
                </article>

                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>{formatBrazilianReal(unitPrice * cartQuantity)}</strong></div>
                  <div><span>Frete</span><strong className="free-shipping-label">grátis</strong></div>
                  <div className="cart-total"><span>Total</span><strong>{formatBrazilianReal(unitPrice * cartQuantity)}</strong></div>
                </div>
                <div className="cart-demo-note"><Sparkles size={15} /><p>Esta é uma prévia demonstrativa. Não há checkout nem cobrança.</p></div>
                <button className="cart-finish-button" onClick={() => toast("Prévia atualizada", { description: "Sua sacola demonstrativa foi mantida sem checkout." })}>
                  continuar explorando <ArrowUpRight size={17} />
                </button>
              </>
            ) : (
              <div className="cart-empty-state">
                <div className="cart-empty-icon"><ShoppingBag size={34} /></div>
                <h3>{cartNotice.title}</h3>
                <p>{cartNotice.description}</p>
                <button className="button-primary" onClick={() => { setCartOpen(false); scrollToSection("inicio"); }}>
                  escolher Pétala Dourada <ArrowUpRight size={17} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <section className="hero-section" id="inicio">
        <div className="hero-art" style={{ backgroundImage: `url(${heroBackdrop})` }} />
        <div className="hero-dots hero-dots-left" aria-hidden="true" />
        <div className="hero-dots hero-dots-right" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><span /> Pétala Dourada</p>
          <h1>
            Pele macia,
            <em> humor dourado.</em>
          </h1>
          <p className="hero-description">
            Um gesto de cuidado cheio de cor, textura e afeto. Conheça a loção corporal que deixa a rotina mais sua.
          </p>
          <div className="hero-actions">
            <div className="quantity-selector" aria-label="Quantidade desejada">
              <button onClick={() => updateSelectedQuantity(-1)} disabled={selectedQuantity <= 1} aria-label="Diminuir quantidade"><Minus size={16} /></button>
              <span>{selectedQuantity}</span>
              <button onClick={() => updateSelectedQuantity(1)} disabled={selectedQuantity >= maximumQuantity} aria-label="Aumentar quantidade"><Plus size={16} /></button>
            </div>
            <button className="button-primary" onClick={handleAddToCart}>
              colocar {selectedQuantity} {selectedQuantity === 1 ? "unidade" : "unidades"} <ShoppingBag size={18} />
            </button>
            <button className="text-button" onClick={() => scrollToSection("ritual")}>
              como usar <MoveRight size={18} />
            </button>
          </div>
          <p className="hero-price">por <strong>R$ 30,00</strong> <span>· 150 ml</span></p>
          <div className="hero-note">
            <span className="tiny-sparkle">✦</span>
            <p>Para quem coleciona pequenos momentos de cuidado.</p>
          </div>
        </div>

        <div className="hero-product-stage">
          <div className="sunburst" aria-hidden="true" />
          <div className="product-orbit orbit-one" aria-hidden="true">pétala</div>
          <div className="product-orbit orbit-two" aria-hidden="true">mel</div>
          <div className="product-shadow" aria-hidden="true" />
          <img
            className="hero-product"
            src={productImage}
            alt="Pote de loção corporal Honey Buzzy Pétala Dourada com tampa dourada e rótulo rosa-lilás"
          />
          <div className="product-chip">
            <span>150</span>
            <small>ml</small>
          </div>
          <div className="price-chip" aria-label="Preço: R$ 30,00">
            <span>R$</span>
            <strong>30</strong>
            <small>,00</small>
          </div>
          <div className="shipping-chip" aria-label="Frete grátis">
            <Truck size={16} strokeWidth={2.1} />
            <span>frete</span>
            <strong>grátis</strong>
          </div>
          <p className="product-caption">feito para ficar<br />perto de você</p>
        </div>
      </section>

      <div className="marquee-row" aria-label="Características do produto">
        <div className="marquee-track">
          <span>hidratação com afeto</span><i>✦</i><span>um pote, muitos rituais</span><i>✦</i><span>doce no ponto</span><i>✦</i>
          <span>hidratação com afeto</span><i>✦</i><span>um pote, muitos rituais</span><i>✦</i><span>doce no ponto</span><i>✦</i>
        </div>
      </div>

      <section className="product-intro" id="produto">
        <div className="intro-number">01</div>
        <div className="intro-heading">
          <p className="eyebrow eyebrow-dark"><span /> o pote que abre sorrisos</p>
          <h2>Uma pétala<br /><em>para chamar de sua.</em></h2>
        </div>
        <div className="intro-story">
          <p>
            Pétala Dourada nasceu para deixar seu ritual mais gostoso. A fórmula é uma loção corporal desodorante hidratante, apresentada em um pote com cor, brilho e muita personalidade.
          </p>
          <button className="circle-link" onClick={handleRitualAction} aria-label="Receber novidades sobre Pétala Dourada">
            <ArrowUpRight size={23} />
          </button>
        </div>
        <div className="intro-image-wrap">
          <div className="image-curve curve-top" aria-hidden="true" />
          <img src={petalIllustration} alt="Ilustração botânica em lilás, uva e dourado" />
          <div className="image-stamp">feito<br />para o<br />seu ritual <span>✦</span></div>
        </div>
      </section>

      <section className="ingredients-section" id="ingredientes">
        <div className="ingredients-heading">
          <p className="eyebrow eyebrow-dark"><span /> ingredientes em destaque</p>
          <h2>Da amora<br /><em>ao mel.</em></h2>
          <p>
            Dois ingredientes que traduzem o universo doce, frutado e vibrante de Pétala Dourada.
          </p>
        </div>
        <div className="ingredients-grid">
          <article className="ingredient-card ingredient-berry">
            <span className="ingredient-number">01</span>
            <div className="ingredient-orb ingredient-orb-berry" aria-hidden="true" />
            <p className="ingredient-kicker">extrato de amora</p>
            <h3>Morus Alba<br />Fruit Extract</h3>
            <p className="ingredient-copy">
              O extrato de amora traz a referência frutada e violeta que inspira a identidade de Pétala Dourada.
            </p>
            <span className="inci-tag">INCI · Morus Alba Fruit Extract</span>
          </article>
          <article className="ingredient-card ingredient-honey">
            <span className="ingredient-number">02</span>
            <div className="ingredient-orb ingredient-orb-honey" aria-hidden="true" />
            <p className="ingredient-kicker">mel</p>
            <h3>Mel</h3>
            <p className="ingredient-copy">
              O mel acrescenta a assinatura dourada e sensorial que torna este cuidado ainda mais especial.
            </p>
            <span className="inci-tag">INCI · Mel</span>
          </article>
        </div>
        <p className="ingredients-note">Ingredientes em destaque. Para a composição completa, consulte sempre a embalagem do produto.</p>
      </section>

      <section className="feature-strip">
        <div className="feature-strip-intro">
          <p className="eyebrow eyebrow-dark"><span /> mais que hidratar</p>
          <p>Três pequenos sinais de um ritual que fica.</p>
        </div>
        <article className="feature-card feature-card-pink">
          <span className="feature-index">/ 01</span>
          <Droplet size={29} strokeWidth={1.6} />
          <h3>Textura que convida ao toque.</h3>
          <p>Uma loção corporal para transformar alguns minutos do dia em um cuidado só seu.</p>
        </article>
        <article className="feature-card feature-card-purple">
          <span className="feature-index">/ 02</span>
          <Sparkles size={29} strokeWidth={1.6} />
          <h3>Cheiro, cor<br />e bom humor.</h3>
          <p>Uma experiência com o tom vibrante e a leveza que já vivem na embalagem.</p>
        </article>
        <article className="feature-card feature-card-cream">
          <span className="feature-index">/ 03</span>
          <span className="feature-volume">150<small>ml</small></span>
          <h3>Um potinho para deixar à vista.</h3>
          <p>Formato compacto para acompanhar a rotina e enfeitar o seu cantinho de autocuidado.</p>
        </article>
      </section>

      <section className="ritual-section" id="ritual">
        <div className="ritual-visual">
          <div className="ritual-pill">um cuidado de cada vez</div>
          <p className="ritual-repeat" aria-hidden="true">Pétala Dourada<br />Pétala Dourada<br />Pétala Dourada</p>
          <div className="ritual-paper-note">
            <span>ritual da vez</span>
            <strong>Pausar também<br />é cuidar.</strong>
          </div>
          <div className="ritual-petals" aria-hidden="true">
            <span className="ritual-petal petal-one" />
            <span className="ritual-petal petal-two" />
            <span className="ritual-petal petal-three" />
            <span className="ritual-petal petal-four" />
          </div>
          <div className="ritual-scribble" aria-hidden="true">✦</div>
        </div>
        <div className="ritual-content">
          <p className="eyebrow eyebrow-light"><span /> três gestos simples</p>
          <h2>Abra o pote.<br /><em>Acenda o ritual.</em></h2>
          <div className="ritual-steps">
            <div className="ritual-step">
              <span>01</span>
              <div><h3>Abra</h3><p>Escolha uma pausa só sua e encontre a textura no pote.</p></div>
            </div>
            <div className="ritual-step">
              <span>02</span>
              <div><h3>Aplique</h3><p>Espalhe pelo corpo com movimentos suaves e sem pressa.</p></div>
            </div>
            <div className="ritual-step">
              <span>03</span>
              <div><h3>Floresça</h3><p>Siga o dia levando um pouquinho mais de cuidado com você.</p></div>
            </div>
          </div>
          <button className="button-secondary" onClick={handleRitualAction}>
            quero receber novidades <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      <section className="product-closeout">
        <div className="closeout-copy">
          <p className="eyebrow eyebrow-dark"><span /> Honey Buzzy apresenta</p>
          <h2>Pétala<br /><em>Dourada</em></h2>
          <p className="product-price"><span>R$</span> 30,00</p>
          <p>Loção corporal desodorante hidratante<br />150 ml · 5.01 fl. oz.</p>
          <button className="button-primary button-primary-dark" onClick={handleAddToCart}>
            colocar {selectedQuantity} {selectedQuantity === 1 ? "unidade" : "unidades"} <ShoppingBag size={18} />
          </button>
        </div>
        <div className="closeout-product-wrap">
          <div className="closeout-frame" aria-hidden="true" />
          <div className="pink-disc" aria-hidden="true" />
          <img src={productImage} alt="Honey Buzzy Pétala Dourada em destaque" className="closeout-product" />
          <span className="closeout-note">pote de afeto</span>
          <span className="closeout-glint glint-one">✦</span>
          <span className="closeout-glint glint-two">✦</span>
        </div>
      </section>

      <section className="faq-section" id="duvidas">
        <div className="faq-title">
          <p className="eyebrow eyebrow-dark"><span /> sem segredo</p>
          <h2>Pequenas<br /><em>perguntas.</em></h2>
          <p>Tudo o que você precisa saber para deixar Pétala Dourada entrar na rotina.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{faq.question}</span>
                  <ChevronDown size={21} />
                </button>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand brand-footer" href="#inicio">
            <img src={brandSymbol} alt="" className="brand-symbol" />
            <span className="brand-wordmark brand-wordmark-repeat">Pétala Dourada · Pétala Dourada ·</span>
          </a>
          <p>Seu ritual pode ser doce,<br />colorido e inteiramente seu.</p>
          <button className="footer-arrow" onClick={() => scrollToSection("inicio")} aria-label="Voltar ao topo"><ArrowUpRight size={25} /></button>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Honey Buzzy</span>
          <span>feito para florescer</span>
          <span>Pétala Dourada · 150 ml</span>
        </div>
      </footer>
    </main>
  );
}
