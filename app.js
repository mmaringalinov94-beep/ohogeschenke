// Footer year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Contacts
const EMAIL = "mmaringalinov94@gmail.com";
const WHATSAPP = "4915226216596"; // without +

// Helpers
function mailtoLink(title, price, category) {
  const subject = `Bestellung: ${title}`;
  const body =
`Hallo,
Ich möchte dieses Produkt bestellen:

Kategorie: ${category}
Produkt: ${title}
Preis: ${price}

Vielen Dank!`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function whatsappLink(title, price, category) {
  const text = `Hallo! Ich möchte bestellen:\nKategorie: ${category}\nProdukt: ${title}\nPreis: ${price}`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function cardHTML(p, category) {
  return `
    <div class="product" data-img="${p.img}">
      <img src="${p.img}" alt="${p.title}"
           onerror="this.closest('.product').style.display='none'">
      <div class="pbody">
        <div><b>${p.title}</b></div>
        <div class="price">${p.price}</div>

        <div class="actions">
          <a class="btn" href="${mailtoLink(p.title, p.price, category)}">E-Mail</a>
          <a class="btn whatsapp" target="_blank" rel="noopener"
             href="${whatsappLink(p.title, p.price, category)}">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
}

function sectionHTML(title, items, category) {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return `
    <h2 style="margin-top:22px">${title}</h2>
    <div class="products">
      ${sorted.map(p => cardHTML(p, category)).join("")}
    </div>
  `;
}

// =======================
// WEIN (5 products)
// =======================
const weinProducts = [
  { order: 1, title: "Herz-Weinflaschenhalter",       price: "50,00 €",  img: "images/wein/product1.jpg" },
  { order: 2, title: "Große Weinflasche (Dekor)",     price: "120,00 €", img: "images/wein/product2.jpg" },
  { order: 3, title: "Gitarren-Weinflaschenhalter",   price: "50,00 €",  img: "images/wein/product3.jpg" },
  { order: 4, title: "Weinflasche Deko",              price: "50,00 €",  img: "images/wein/product4.jpg" },
  { order: 5, title: "Amphora Geschenkset",           price: "50,00 €",  img: "images/wein/product5.jpg" }
];

// =======================
// ART (auto list 1..87)
// IMPORTANT: shows only uploaded images (missing -> card hidden)
// =======================
const ART_COUNT = 87;
const artProducts = Array.from({ length: ART_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    order: n,
    title: `Bild ${n}`,
    price: "40,00 €",
    img: `images/art/product${n}.jpg`
  };
});

// =======================
// Render
// =======================
const productsEl = document.getElementById("products");
if (productsEl) {
  productsEl.innerHTML =
    sectionHTML("🍷 Weinflaschenhalter", weinProducts, "Wein") +
    sectionHTML("🖼️ Bilder / Wandbilder", artProducts, "Art");
}
