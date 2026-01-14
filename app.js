// Footer year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// Demo products (по-късно ще ги правим от снимки/каталог)
const demoProducts = [
  { title: "Geschenkset Classic", price: "29,90 €", img: "assets/placeholder1.jpg" },
  { title: "Wein Geschenkbox", price: "39,90 €", img: "assets/placeholder2.jpg" },
  { title: "Premium Wein + Zubehör", price: "59,90 €", img: "assets/placeholder3.jpg" }
];

const productsEl = document.getElementById("products");
if (productsEl) {
  productsEl.innerHTML = demoProducts.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none'">
      <div class="pbody">
        <div><b>${p.title}</b></div>
        <div class="price">${p.price}</div>
      </div>
    </div>
  `).join("");
}
