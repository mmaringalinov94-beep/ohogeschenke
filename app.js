// Footer year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// WhatsApp number (без +)
const WHATSAPP_NUMBER = "4915226216596";

// ---- ART NAMES (тук после ще сложим всички имена до 87) ----
const artNames = {
  1: "Pferd",
  2: "FC Bayern München",
  3: "BJK 1903",
  4: "Bayer Leverkusen",
  5: "Huhn mit Brille",
  6: "Fenerbahce",
  7: "Hirsch mit Geweih",
  8: "Chaplin",
  9: "Piratenschiff",
  10: "Mutter mit Kind"
  // ... после ще добавим до 87
};

// ---- PRODUCTS ----
const weinProducts = [
  { title: "Herz-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product1.jpg" },
  { title: "Große Weinflasche (Dekor)", price: "120,00 €", img: "images/wein/product2.jpg" },
  { title: "Gitarren-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product3.jpg" },
  { title: "Weinflasche Deko", price: "50,00 €", img: "images/wein/product4.jpg" },
  { title: "Amphora Geschenkset", price: "50,00 €", img: "images/wein/product5.jpg" }
];

// Генерираме Art (1..87)
const artProducts = Array.from({ length: 87 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    title: artNames[n] ? artNames[n] : `Bild ${n}`,
    price: "50,00 €",
    imgGold: `images/art/gold/product${n}.jpg`,
    imgBlack: `images/art/black/product${n}.jpg`
  };
});

function mailLink(title, price, extraText) {
  const subject = `Bestellung: ${title}`;
  const body =
    `Hallo,%0A` +
    `Ich möchte dieses Produkt bestellen:%0A` +
    `${title}%0A` +
    `Preis: ${price}%0A` +
    (extraText ? `${extraText}%0A` : "") +
    `%0AVielen Dank!`;

  return `mailto:mmaringalinov94@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function whatsappLink(title, price, extraText) {
  const txt = `Hallo! Ich möchte dieses Produkt bestellen: ${title} | Preis: ${price}` +
              (extraText ? ` | ${extraText}` : "");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(txt)}`;
}

const productsEl = document.getElementById("products");
if (productsEl) {

  // --- Wein section ---
  const weinHtml = `
    <h2 class="section-title">🍷 Weinflaschenhalter</h2>
    <div class="products">
      ${weinProducts.map(p => `
        <div class="product">
          <img src="${p.img}" alt="${p.title}">
          <div class="pbody">
            <div><b>${p.title}</b></div>
            <div class="price">${p.price}</div>

            <div class="actions">
              <a class="btn" href="${mailLink(p.title, p.price)}">E-Mail</a>
              <a class="btn whatsapp" target="_blank" href="${whatsappLink(p.title, p.price)}">WhatsApp</a>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  // --- Art section ---
  const artHtml = `
    <h2 class="section-title">🖼️ Bilder / Wandbilder</h2>
    <div class="products">
      ${artProducts.map(p => `
        <div class="product" data-art-id="${p.id}" data-color="gold">
          <img class="art-img" src="${p.imgGold}" alt="${p.title}"
               onerror="this.style.display='none'">
          <div class="pbody">
            <div><b>${p.title}</b></div>
            <div class="price">${p.price}</div>

            <div class="color-actions">
              <button class="color-btn gold" type="button" data-set-color="gold">Gold</button>
              <button class="color-btn black" type="button" data-set-color="black">Schwarz</button>
            </div>

            <div class="actions">
              <a class="btn email-btn" href="#">E-Mail</a>
              <a class="btn whatsapp wa-btn" target="_blank" href="#">WhatsApp</a>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  productsEl.innerHTML = weinHtml + artHtml;

  // --- Activate Art color switching ---
  document.querySelectorAll(".product[data-art-id]").forEach(card => {
    const id = Number(card.getAttribute("data-art-id"));
    const title = artNames[id] ? artNames[id] : `Bild ${id}`;
    const price = "50,00 €";

    const img = card.querySelector(".art-img");
    const emailBtn = card.querySelector(".email-btn");
    const waBtn = card.querySelector(".wa-btn");

    function updateLinks(color) {
      const colorText = `Farbe: ${color === "gold" ? "Gold" : "Schwarz"}`;
      emailBtn.href = mailLink(title, price, colorText);
      waBtn.href = whatsappLink(title, price, colorText);
    }

    // default
    updateLinks("gold");

    card.querySelectorAll(".color-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const color = btn.getAttribute("data-set-color");
        card.setAttribute("data-color", color);

        if (color === "gold") img.src = `images/art/gold/product${id}.jpg`;
        else img.src = `images/art/black/product${id}.jpg`;

        updateLinks(color);
      });
    });
  });

}
