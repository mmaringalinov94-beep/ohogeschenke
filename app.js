// Footer year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

//const demoProducts = [
  { title: "Herz Geschenkset", price: "50,00 €", img: "images/product1.jpg" },
  { title: "Große Weinflasche", price: "120,00 €", img: "images/product2.jpg" },
  { title: "Gitarre Geschenkset", price: "50,00 €", img: "images/product3.jpg" },
  { title: "Weinflasche", price: "50,00 €", img: "images/product4.jpg" },
  { title: "Amphore Geschenkset", price: "50,00 €", img: "images/product5.jpg" }
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

