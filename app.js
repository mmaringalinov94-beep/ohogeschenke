import {
  STORAGE_KEY,
  allProducts,
  ART_COLOR_NOTE,
  ART_DEFAULT_COLOR,
  buildWhatsAppLink,
  buildEmailLink,
  productDetailsHref,
  formatPriceEUR,
} from "./data.js";

/* =====================
   Ohogeschenke.de - app.js (FINAL)
   Products + Controls + Quick View + localStorage + Product page links
   Using data.js as single source of truth
   ===================== */

// =====================
// HELPERS (local only)
// =====================
function normName(s) {
  return (s || "").toString().trim().toLowerCase();
}

function safeParseJSON(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// =====================
// PERSISTENCE
// =====================
function loadShopState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? safeParseJSON(raw) : null;
  } catch {
    return null;
  }
}

function saveShopState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function clearShopState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// =====================
// STATE
// =====================
let activeCategory = "ALL"; // ALL | ART | WEIN
let searchQuery = "";
let sortMode = "featured"; // featured | price_asc | price_desc | name_asc

function restoreStateFromStorage() {
  const s = loadShopState();
  if (!s) return;

  const cat = (s.activeCategory || "").toString().toUpperCase();
  const sort = (s.sortMode || "").toString();

  if (cat === "ALL" || cat === "ART" || cat === "WEIN") activeCategory = cat;
  if (typeof s.searchQuery === "string") searchQuery = s.searchQuery.trim().toLowerCase();
  if (sort === "featured" || sort === "price_asc" || sort === "price_desc" || sort === "name_asc") sortMode = sort;
}

function persistState() {
  saveShopState({ activeCategory, searchQuery, sortMode });
}

// =====================
// QUICK VIEW STICKY CTA (mobile only, shows only when modal is open)
// =====================
const QV_STICKY_BREAKPOINT = 768;

function isMobileViewport() {
  return window.innerWidth <= QV_STICKY_BREAKPOINT;
}

function qvStickyEls() {
  return {
    root: document.getElementById("qvStickyCta"),
    wa: document.getElementById("qvStickyWhatsApp"),
    mail: document.getElementById("qvStickyEmail"),
  };
}

function showQvSticky() {
  const { root } = qvStickyEls();
  if (!root) return;

  if (!isMobileViewport()) {
    hideQvSticky();
    return;
  }

  root.classList.remove("is-hidden");
  root.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-sticky-cta");
}

function hideQvSticky() {
  const { root } = qvStickyEls();
  if (!root) return;

  root.classList.add("is-hidden");
  root.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-sticky-cta");
}

function updateQvSticky(product, selectedColor) {
  const { wa, mail, root } = qvStickyEls();
  if (!wa || !mail || !root || !product) return;

  const colorToSend =
    product.category === "ART" ? (selectedColor || ART_DEFAULT_COLOR) : null;

  wa.href = buildWhatsAppLink(product, colorToSend);
  mail.href = buildEmailLink(product, colorToSend);
}

// keep sticky in sync on resize while modal open
window.addEventListener("resize", () => {
  const modalOpen = document.body.classList.contains("modal-open");
  if (!modalOpen) return;

  if (isMobileViewport()) showQvSticky();
  else hideQvSticky();
});

// =====================
// QUICK VIEW MODAL
// =====================
let modalOverlay = null;
let lastFocusedEl = null;

function ensureModal() {
  if (modalOverlay) return;

  modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.id = "quickViewOverlay";

  modalOverlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="quickViewTitle">
      <button class="modal-close" type="button" aria-label="Close">×</button>
      <div class="modal-content" id="quickViewContent"></div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  modalOverlay.querySelector(".modal-close").addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModalForProduct(product, initialColor) {
  ensureModal();
  lastFocusedEl = document.activeElement;

  const content = modalOverlay.querySelector("#quickViewContent");
  const priceText = formatPriceEUR(product.price);
  const isArt = product.category === "ART";
  let selectedColor = isArt ? (initialColor || product.defaultColor || ART_DEFAULT_COLOR) : null;

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-media">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="modal-info">
        <h2 id="quickViewTitle">${product.name}</h2>
        <p class="price">${priceText}</p>

        ${
          isArt
            ? `
          <div class="color-options" data-color-options>
            <button type="button" class="color-btn ${selectedColor === "Schwarz" ? "active" : ""}" data-color="Schwarz">Schwarz</button>
            <button type="button" class="color-btn ${selectedColor === "Dunkelgold" ? "active" : ""}" data-color="Dunkelgold">Dunkelgold</button>
          </div>
          <div class="color-note hint">${ART_COLOR_NOTE}</div>
        `
            : ""
        }

        <div class="actions">
          <a class="action-btn btn-wa" target="_blank" rel="noopener">WhatsApp</a>
          <a class="action-btn btn-mail">E-Mail</a>
          <a class="action-btn btn-details" href="${productDetailsHref(product)}">Details</a>
        </div>
      </div>
    </div>
  `;

  const waLink = content.querySelector(".btn-wa");
  const mailLink = content.querySelector(".btn-mail");

  function refreshLinks() {
    const colorToSend = isArt ? selectedColor : null;
    waLink.href = buildWhatsAppLink(product, colorToSend);
    mailLink.href = buildEmailLink(product, colorToSend);
  }

  refreshLinks();

  // sync sticky CTA with current product + color
  updateQvSticky(product, selectedColor);
  showQvSticky();

  if (isArt) {
    const options = content.querySelector("[data-color-options]");
    options.addEventListener("click", (e) => {
      const btn = e.target.closest(".color-btn");
      if (!btn) return;

      selectedColor = btn.dataset.color;

      options.querySelectorAll(".color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      refreshLinks();
      updateQvSticky(product, selectedColor);
    });
  }

  modalOverlay.classList.add("open");
  document.body.classList.add("modal-open");

  const closeBtn = modalOverlay.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  if (!modalOverlay) return;

  modalOverlay.classList.remove("open");
  document.body.classList.remove("modal-open");

  hideQvSticky();

  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
  lastFocusedEl = null;
}

// =====================
// CONTROLS
// =====================
function setActiveFilterButton(controlsRoot, cat) {
  controlsRoot.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  const activeBtn = controlsRoot.querySelector(`.filter-btn[data-cat="${cat}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

function ensureControls() {
  const container = document.getElementById("products");
  if (!container) return;

  container.classList.add("products");
  if (document.getElementById("shopControls")) return;

  const controls = document.createElement("div");
  controls.id = "shopControls";
  controls.className = "shop-controls";

  controls.innerHTML = `
    <div class="controls-grid">
      <div class="filter-row">
        <button type="button" class="filter-btn" data-cat="ALL">All</button>
        <button type="button" class="filter-btn" data-cat="ART">Art</button>
        <button type="button" class="filter-btn" data-cat="WEIN">Wein</button>
      </div>

      <div class="search-row">
        <input type="text" id="productSearch" placeholder="Suche nach Name..." autocomplete="off">
      </div>

      <div class="sort-row">
        <select id="sortSelect">
          <option value="featured">Sortierung: Standard</option>
          <option value="price_asc">Preis: niedrig → hoch</option>
          <option value="price_desc">Preis: hoch → niedrig</option>
          <option value="name_asc">Name: A → Z</option>
        </select>
      </div>
    </div>

    <div class="status-row">
      <span class="status-pill" id="statusPill"></span>
      <span class="result-badge" id="resultBadge"></span>
      <button type="button" class="clear-btn" id="clearBtn">Zurücksetzen</button>
    </div>
  `;

  container.parentNode.insertBefore(controls, container);

  // init UI
  setActiveFilterButton(controls, activeCategory);
  const searchInput = controls.querySelector("#productSearch");
  const sortSelect = controls.querySelector("#sortSelect");
  searchInput.value = searchQuery || "";
  sortSelect.value = sortMode || "featured";

  // filter
  controls.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      setActiveFilterButton(controls, activeCategory);
      persistState();
      applyAndRender();
    });
  });

  // search
  searchInput.addEventListener("input", (e) => {
    searchQuery = (e.target.value || "").trim().toLowerCase();
    persistState();
    applyAndRender();
  });

  // sort
  sortSelect.addEventListener("change", (e) => {
    sortMode = e.target.value;
    persistState();
    applyAndRender();
  });

  // reset
  controls.querySelector("#clearBtn").addEventListener("click", () => {
    activeCategory = "ALL";
    searchQuery = "";
    sortMode = "featured";

    setActiveFilterButton(controls, activeCategory);
    searchInput.value = "";
    sortSelect.value = "featured";

    clearShopState();
    applyAndRender();
  });
}

function getFilteredSortedProducts() {
  let list = [...allProducts];

  if (activeCategory !== "ALL") list = list.filter((p) => p.category === activeCategory);
  if (searchQuery) list = list.filter((p) => normName(p.name).includes(searchQuery));

  if (sortMode === "price_asc") list.sort((a, b) => Number(a.price) - Number(b.price));
  else if (sortMode === "price_desc") list.sort((a, b) => Number(b.price) - Number(a.price));
  else if (sortMode === "name_asc") list.sort((a, b) => normName(a.name).localeCompare(normName(b.name)));

  return list;
}

function updateStatus(count) {
  const badge = document.getElementById("resultBadge");
  const pill = document.getElementById("statusPill");

  if (badge) badge.textContent = `${count} Produkte`;
  if (!pill) return;

  const catText = activeCategory === "ALL" ? "Kategorie: All" : `Kategorie: ${activeCategory}`;
  const qText = searchQuery ? `Suche: "${searchQuery}"` : "Suche: —";
  const sText =
    sortMode === "featured" ? "Sort: Standard" :
    sortMode === "price_asc" ? "Sort: Preis ↑" :
    sortMode === "price_desc" ? "Sort: Preis ↓" :
    "Sort: Name A–Z";

  pill.textContent = `${catText} | ${qText} | ${sText}`;
}

function applyAndRender() {
  const list = getFilteredSortedProducts();
  renderProducts(list);
  updateStatus(list.length);
}

// =====================
// PRODUCT CARD
// =====================
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card product";
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Quick View: ${product.name}`);

  const priceText = formatPriceEUR(product.price);
  const isArt = product.category === "ART";
  let selectedColor = isArt ? (product.defaultColor || ART_DEFAULT_COLOR) : null;

  card.innerHTML = `
    <img class="product-image" src="${product.image}" alt="${product.name}">
    <div class="product-body">
      <h3 class="product-title">${product.name}</h3>
      <p class="price">${priceText}</p>

      <div class="product-links">
        <a class="action-btn btn-details" href="${productDetailsHref(product)}">Details</a>
      </div>

      ${
        isArt
          ? `
        <div class="color-options" data-color-options>
          <button type="button" class="color-btn ${selectedColor === "Schwarz" ? "active" : ""}" data-color="Schwarz">Schwarz</button>
          <button type="button" class="color-btn ${selectedColor === "Dunkelgold" ? "active" : ""}" data-color="Dunkelgold">Dunkelgold</button>
        </div>
        <div class="color-note">${ART_COLOR_NOTE}</div>
      `
          : ""
      }

      <div class="actions">
        <a class="action-btn btn-wa" target="_blank" rel="noopener">WhatsApp</a>
        <a class="action-btn btn-mail">E-Mail</a>
      </div>
    </div>
  `;

  const waLink = card.querySelector(".btn-wa");
  const mailLink = card.querySelector(".btn-mail");

  function refreshLinks() {
    const colorToSend = isArt ? selectedColor : null;
    waLink.href = buildWhatsAppLink(product, colorToSend);
    mailLink.href = buildEmailLink(product, colorToSend);
  }

  refreshLinks();

  if (isArt) {
    const options = card.querySelector("[data-color-options]");
    options.addEventListener("click", (e) => {
      const btn = e.target.closest(".color-btn");
      if (!btn) return;

      selectedColor = btn.dataset.color;

      options.querySelectorAll(".color-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      refreshLinks();
    });
  }

  function maybeOpenQuickView(e) {
    if (e && e.target && e.target.closest("a, button, .color-options")) return;
    openModalForProduct(product, selectedColor);
  }

  card.addEventListener("click", maybeOpenQuickView);

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      maybeOpenQuickView(e);
    }
  });

  // stop bubbling from interactive elements
  card.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("click", (e) => e.stopPropagation());
  });

  return card;
}

// =====================
// RENDER
// =====================
function renderProducts(products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";
  products.forEach((p) => container.appendChild(createProductCard(p)));
}

// =====================
// INIT (safe)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // only run on products page
  const productsContainer = document.getElementById("products");
  if (!productsContainer) return;

  restoreStateFromStorage();
  ensureControls();
  applyAndRender();
  persistState();
});
