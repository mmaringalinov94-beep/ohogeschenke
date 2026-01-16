// Footer year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

const demoProducts = [
  // 🍷 Weinständer (стойки)
  { title: "Herz-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product1.jpg" },
  { title: "Große Weinflasche (Dekor)", price: "120,00 €", img: "images/wein/product2.jpg" },
  { title: "Gitarren-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product3.jpg" },
  { title: "Weinflasche Deko", price: "50,00 €", img: "images/wein/product4.jpg" },
  { title: "Amphora Geschenkset", price: "50,00 €", img: "images/wein/product5.jpg" },

  // 🖼️ Bilder / Kunst (картини) – пример първите 10
  { title: "Bild 1", price: "50,00 €", img: "images/art/product1.jpg" },
  { title: "Bild 2", price: "50,00 €", img: "images/art/product2.jpg" },
  { title: "Bild 3", price: "50,00 €", img: "images/art/product3.jpg" },
  { title: "Bild 4", price: "50,00 €", img: "images/art/product4.jpg" },
  { title: "Bild 5", price: "50,00 €", img: "images/art/product5.jpg" },
  { title: "Bild 6", price: "50,00 €", img: "images/art/product6.jpg" },
  { title: "Bild 7", price: "50,00 €", img: "images/art/product7.jpg" },
  { title: "Bild 8", price: "50,00 €", img: "images/art/product8.jpg" },
  { title: "Bild 9", price: "50,00 €", img: "images/art/product9.jpg" },
  { title: "Bild 10", price: "50,00 €", img: "images/art/product10.jpg" }
];

];

productsEl.innerHTML = demoProducts.map(p => `
  <div class="product">
    <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none'">
    <div class="body">
      <div><b>${p.title}</b></div>
      <div class="price">${p.price}</div>

      <a class="btn" href="mailto:mmaringalinov94@gmail.com?subject=Bestellung: ${encodeURIComponent(p.title)}&body=Hallo,%0AIch möchte dieses Produkt bestellen:%0A${encodeURIComponent(p.title)}%0APreis: ${encodeURIComponent(p.price)}%0A%0AVielen Dank!">
        Jetzt bestellen
      </a>

    </div>
  </div>
`).join("");

