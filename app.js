// Footer year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// Products (5 items)
const demoProducts = [
  { title: "Herz-Weinflaschenhalter", price: "50,00 €", img: "images/product1.jpg" },
  { title: "Große Weinflasche (Dekor)", price: "120,00 €", img: "images/product2.jpg" },
  { title: "Gitarren-Weinflaschenhalter", price: "50,00 €", img: "images/product3.jpg" },
  { title: "Weinflaschenhalter (Design)", price: "50,00 €", img: "images/product4.jpg" },
  { title: "Amphore-Weinflaschenhalter", price: "50,00 €", img: "images/product5.jpg" }
];

const productsEl = document.getElementById("products");

if (productsEl) {
  productsEl.innerHTML = demoProducts.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none'">
      <div class="body">
        <div><b>${p.title}</b></div>
        <div class="price">${p.price}</div>

        <div class="actions">
          <a class="btn" href="mailto:mmaringalinov@gmail.com?subject=Bestellung:%20${encodeURIComponent(p.title)}&body=Hallo,%0A%0AIch%20mochte%20bestellen:%20${encodeURIComponent(p.title)}%0APreis:%20${encodeURIComponent(p.price)}">
            E-Mail
          </a>

          <a class="btn whatsapp" target="_blank"
             href="https://wa.me/4915226216596?text=Hallo%20ich%20mochte%20bestellen:%20${encodeURIComponent(p.title)}%20-%20Preis:%20${encodeURIComponent(p.price)}">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  `).join("");
}
