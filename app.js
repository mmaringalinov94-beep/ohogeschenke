// Footer year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const WHATSAPP = "4915226216596";
const EMAIL = "mmaringalinov94@gmail.com";

function mailtoLink(title, price) {
  const subject = `Bestellung: ${title}`;
  const body = `Hallo,%0A%0AIch möchte dieses Produkt bestellen:%0A${title}%0APreis: ${price}%0A%0AVielen Dank!`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function whatsappLink(title, price) {
  const text = `Hallo! Ich möchte dieses Produkt bestellen: ${title} | Preis: ${price}`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function renderSection(container, heading, items) {
  const section = document.createElement("section");
  section.className = "cat";

  const h2 = document.createElement("h2");
  h2.textContent = heading;
  section.appendChild(h2);

  const grid = document.createElement("div");
  grid.className = "products";

  grid.innerHTML = items.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none'">
      <div class="pbody">
        <div><b>${p.title}</b></div>
        <div class="price">${p.price}</div>

        <div class="actions">
          <a class="btn" href="${mailtoLink(p.title, p.price)}">E-Mail</a>
          <a class="btn whatsapp" target="_blank" rel="noopener" href="${whatsappLink(p.title, p.price)}">WhatsApp</a>
        </div>
      </div>
    </div>
  `).join("");

  section.appendChild(grid);
  container.appendChild(section);
}

// 🍷 Weinständer
const wein = [
  { title: "Herz-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product1.jpg" },
  { title: "Große Weinflasche (Dekor)", price: "120,00 €", img: "images/wein/product2.jpg" },
  { title: "Gitarren-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product3.jpg" },
  { title: "Weinflasche Deko", price: "50,00 €", img: "images/wein/product4.jpg" },
  { title: "Amphora Geschenkset", price: "50,00 €", img: "images/wein/product5.jpg" }
];

// 🖼️ Bilder 1–87
const bilder = [];
for (let i = 1; i <= 87; i++) {
  bilder.push({
    title: `Bild ${i}`,
    price: "50,00 €",
    img: `images/art/product${i}.jpg`
  });
}

// Render
const productsEl = document.getElementById("products");
if (productsEl) {
  productsEl.innerHTML = "";
  renderSection(productsEl, "🍷 Weinflaschenhalter", wein);
  renderSection(productsEl, "🖼️ Bilder / Wandbilder", bilder);
}
