import {
  getProduct,
  ART_COLOR_NOTE,
  ART_DEFAULT_COLOR,
  buildWhatsAppLink,
  buildEmailLink,
  formatPriceEUR,
} from "./data.js";

/* =====================
   Ohogeschenke.de - product.js (FINAL)
   Single product page with mobile Sticky CTA + Smart show/hide
   URL: product.html?cat=ART&id=22  OR  product.html?cat=WEIN&id=1
   Using data.js as single source of truth
   ===================== */

// =====================
// HELPERS (local only)
// =====================
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function setOgMeta(product) {
  // Optional: updates title/meta for nicer share/SEO; safe if tags don't exist
  document.title = `Ohogeschenke.de — ${product.name}`;

  const set = (selector, value, attr = "content") => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  set('meta[property="og:title"]', `Ohogeschenke.de — ${product.name}`);
  set('meta[property="og:description"]', `Preis: ${formatPriceEUR(product.price)}`);
  // OG image left as site default; could be per-product later
}

// =====================
// STICKY CTA (mobile)
// =====================
let stickyEl = null;

function ensureStickyCTA() {
  if (stickyEl) return stickyEl;

  stickyEl = document.createElement("div");
  stickyEl.className = "sticky-cta";
  stickyEl.id = "stickyCta";

  stickyEl.innerHTML = `
    <div class="sticky-cta-inner">
      <div class="sticky-cta-meta">
        <p class="sticky-cta-title" id="stickyCtaTitle"></p>
        <p class="sticky-cta-sub muted" id="stickyCtaSub"></p>
      </div>
      <div class="sticky-cta-actions">
        <a class="cta-wa" id="stickyCtaWA" target="_blank" rel="noopener">WhatsApp</a>
        <a id="stickyCtaMail">E-Mail</a>
      </div>
    </div>
  `;

  document.body.appendChild(stickyEl);
  document.body.classList.add("has-sticky-cta");
  return stickyEl;
}

function updateStickyCTA(product, color) {
  const el = ensureStickyCTA();

  const title = el.querySelector("#stickyCtaTitle");
  const sub = el.querySelector("#stickyCtaSub");
  const wa = el.querySelector("#stickyCtaWA");
  const mail = el.querySelector("#stickyCtaMail");

  const isArt = product.category === "ART";
  const colorToSend = isArt ? (color || ART_DEFAULT_COLOR) : null;

  const priceText = formatPriceEUR(product.price);
  title.textContent = product.name;
  sub.textContent = `${priceText}${isArt ? ` • Farbe: ${colorToSend}` : ""}`;

  wa.href = buildWhatsAppLink(product, colorToSend);
  mail.href = buildEmailLink(product, colorToSend);
}

function enableSmartSticky() {
  const sticky = document.getElementById("stickyCta");
  const mainActions = document.querySelector(".product-page-actions");
  if (!sticky || !mainActions) return;
  if (!("IntersectionObserver" in window)) return;

  // hide at top (CTA visible), show when CTA scrolls away
  sticky.classList.add("is-hidden");

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries[0].isIntersecting;
      sticky.classList.toggle("is-hidden", visible);
    },
    { threshold: 0.15 }
  );

  io.observe(mainActions);
}

// =====================
// RENDER
// =====================
function showNotFound() {
  const root = document.getElementById("productRoot");
  const nf = document.getElementById("productNotFound");
  if (root) root.innerHTML = "";
  if (nf) nf.style.display = "block";
}

function renderProduct(product) {
  const root = document.getElementById("productRoot");
  const nf = document.getElementById("productNotFound");
  if (!root) return;
  if (nf) nf.style.display = "none";

  const isArt = product.category === "ART";
  let selectedColor = isArt ? (product.defaultColor || ART_DEFAULT_COLOR) : null;

  const priceText = formatPriceEUR(product.price);

  root.innerHTML = `
    <section class="product-page">
      <div class="card product-page-card">
        <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:18px;border:1px solid rgba(255,255,255,0.10);display:block;object-fit:cover;" />

        <div style="padding:14px 6px 6px;">
          <h1 style="margin:10px 0 6px;font-size:28px;line-height:1.15;">${product.name}</h1>
          <div style="font-size:20px;font-weight:900;margin-bottom:8px;">${priceText}</div>

          ${
            isArt
              ? `
            <div class="color-options" data-color-options>
              <button type="button" class="color-btn ${selectedColor === "Schwarz" ? "active" : ""}" data-color="Schwarz">Schwarz</button>
              <button type="button" class="color-btn ${selectedColor === ART_DEFAULT_COLOR ? "active" : ""}" data-color="${ART_DEFAULT_COLOR}">${ART_DEFAULT_COLOR}</button>
            </div>
            <div class="color-note">${ART_COLOR_NOTE}</div>
          `
              : ""
          }

          <!-- IMPORTANT: this class is what Smart Sticky observes -->
          <div class="actions product-page-actions">
            <a class="action-btn btn-wa" target="_blank" rel="noopener">WhatsApp</a>
            <a class="action-btn btn-mail">E-Mail</a>
          </div>

          <div class="info" style="margin-top:12px;">
            <p class="muted" style="margin:0;">
              Bestellung schnell und einfach: klicke auf WhatsApp oder E-Mail – der Text wird automatisch ausgefüllt.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  const waLink = root.querySelector(".btn-wa");
  const mailLink = root.querySelector(".btn-mail");

  function refreshLinks() {
    const colorToSend = isArt ? (selectedColor || ART_DEFAULT_COLOR) : null;
    waLink.href = buildWhatsAppLink(product, colorToSend);
    mailLink.href = buildEmailLink(product, colorToSend);
  }

  refreshLinks();

  // Sticky CTA init + sync
  updateStickyCTA(product, isArt ? selectedColor : null);
  enableSmartSticky();

  if (isArt) {
    const options = root.querySelector("[data-color-options]");
    options.addEventListener("click", (e) => {
      const btn = e.target.closest(".color-btn");
      if (!btn) return;

      selectedColor = btn.dataset.color;

      options.querySelectorAll(".color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      refreshLinks();
      updateStickyCTA(product, selectedColor); // keep sticky CTA in sync
    });
  }

  setOgMeta(product);
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const cat = (getQueryParam("cat") || "").toUpperCase();
  const idRaw = getQueryParam("id");

  const id = Number(idRaw);
  if (!cat || !id || Number.isNaN(id)) {
    showNotFound();
    return;
  }

  const product = getProduct(cat, id);
  if (!product) {
    showNotFound();
    return;
  }

  renderProduct(product);
});
