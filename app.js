// app.js — FINAL (Wein + Art) with variants + Email/WhatsApp

// Footer year
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const EMAIL_TO = "mmaringalinov94@gmail.com";
const WHATSAPP_PHONE = "4915226216596"; // without +

// ---------- Helpers ----------
function mailtoHref(title, price) {
  const subject = `Bestellung: ${title}`;
  const body =
    `Hallo,\n` +
    `ich möchte dieses Produkt bestellen:\n` +
    `${title}\n` +
    `Preis: ${price}\n\n` +
    `Vielen Dank!`;
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function whatsappHref(title, price) {
  const text = `Hallo! Ich möchte dieses Produkt bestellen: ${title} | Preis: ${price}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function euro(n) {
  // n can be number or string like "40,00 €"
  if (typeof n === "string") return n.includes("€") ? n : `${n} €`;
  const val = Number(n).toFixed(2).replace(".", ",");
  return `${val} €`;
}

// Inject small CSS for variant buttons (safe, does not break existing styles)
(function injectVariantStyles() {
  const css = `
    .variants { margin-top: 10px; display:flex; gap:8px; flex-wrap:wrap; }
    .btn.variant { padding:8px 10px; border-radius:12px; font-weight:700; }
    .btn.variant.active { outline: 2px solid rgba(255,255,255,0.35); }
    .section-title { margin: 18px 0 10px; font-size: 18px; font-weight: 900; color: rgba(255,255,255,0.92); display:flex; gap:10px; align-items:center; }
    .section-title small { color: rgba(255,255,255,0.55); font-weight:700; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

// ---------- Catalog data ----------
// NOTE about images:
// Current code uses paths like "images/art/product52.jpg" etc.
// If later you move colors into folders (e.g. images/art/gold/product27.jpg),
// just change the paths here for the variants.

const catalog = [
  {
    section: "Weinflaschenhalter",
    note: "Handgemachte Geschenksets",
    items: [
      { order: 1, title: "Herz-Weinflaschenhalter", price: euro("50,00"), img: "images/wein/product1.jpg" },
      { order: 2, title: "Große Weinflasche (Dekor)", price: euro("120,00"), img: "images/wein/product2.jpg" },
      { order: 3, title: "Gitarren-Weinflaschenhalter", price: euro("50,00"), img: "images/wein/product3.jpg" },
      { order: 4, title: "Weinflasche Deko", price: euro("50,00"), img: "images/wein/product4.jpg" },
      { order: 5, title: "Amphora Geschenkset", price: euro("50,00"), img: "images/wein/product5.jpg" },
    ],
  },
  {
    section: "Bilder / Wandbilder",
    note: "Metall-Kunst",
    items: [
      { order: 1, title: "Pferd", price: euro("40,00"), img: "images/art/product1.jpg" },

      { order: 2, title: "FC Bayern München", price: euro("35,00"), img: "images/art/product2.jpg",
        variants: [
          { label: "Grau", img: "images/art/product53.jpg" },
        ],
      },

      { order: 3, title: "BJK 1903", price: euro("35,00"), img: "images/art/product3.jpg" },

      { order: 4, title: "Bayern Leverkusen", price: euro("35,00"), img: "images/art/product4.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product52.jpg" },
          { label: "Gold", img: "images/art/product27.jpg" },
        ],
      },

      { order: 5, title: "Huhn mit Brille", price: euro("40,00"), img: "images/art/product5.jpg",
        variants: [
          { label: "Dunkelgold", img: "images/art/product80.jpg" },
        ],
      },

      { order: 6, title: "Fenerbahce", price: euro("35,00"), img: "images/art/product6.jpg" },

      { order: 7, title: "Hirsch mit Geweih", price: euro("40,00"), img: "images/art/product7.jpg",
        variants: [
          { label: "Dunkelgold", img: "images/art/product81.jpg" },
        ],
      },

      { order: 8, title: "Chaplin", price: euro("40,00"), img: "images/art/product8.jpg" },
      { order: 9, title: "Piratenschiff", price: euro("40,00"), img: "images/art/product9.jpg" },

      { order: 10, title: "Mutter mit Kind", price: euro("40,00"), img: "images/art/product10.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product78.jpg" },
        ],
      },

      { order: 11, title: "FC Barcelona", price: euro("35,00"), img: "images/art/product11.jpg" },

      { order: 12, title: "Flugzeug", price: euro("40,00"), img: "images/art/product12.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product72.jpg" },
        ],
      },

      { order: 13, title: "Juventus", price: euro("35,00"), img: "images/art/product13.jpg" },

      { order: 14, title: "Hirsch im Wald", price: euro("40,00"), img: "images/art/product14.jpg",
        variants: [
          { label: "Dunkelgold", img: "images/art/product87.jpg" },
        ],
      },

      { order: 15, title: "Stier", price: euro("40,00"), img: "images/art/product15.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product77.jpg" },
        ],
      },

      { order: 16, title: "Herz", price: euro("40,00"), img: "images/art/product16.jpg" },
      { order: 17, title: "Blume", price: euro("40,00"), img: "images/art/product17.jpg" },
      { order: 18, title: "Arsenal", price: euro("35,00"), img: "images/art/product18.jpg" },

      { order: 19, title: "Pferd Massiv", price: euro("45,00"), img: "images/art/product19.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product62.jpg" },
        ],
      },

      { order: 20, title: "Flamingo", price: euro("40,00"), img: "images/art/product20.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product75.jpg" },
        ],
      },

      // 21 — missing (you wrote "нямам го")
      // If you later have the photo, add it like:
      // { order: 21, title: "…", price: euro("40,00"), img: "images/art/product21.jpg" },

      { order: 22, title: "Alpen", price: euro("40,00"), img: "images/art/product22.jpg",
        variants: [
          { label: "Gold", img: "images/art/product60.jpg" },
        ],
      },

      { order: 23, title: "Tiger", price: euro("40,00"), img: "images/art/product23.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product70.jpg" },
        ],
      },

      { order: 24, title: "Rose", price: euro("40,00"), img: "images/art/product24.jpg" },
      { order: 25, title: "VfB Stuttgart", price: euro("35,00"), img: "images/art/product25.jpg" },

      { order: 26, title: "Wanderer", price: euro("40,00"), img: "images/art/product26.jpg",
        variants: [
          { label: "Grau / Dunkelgold", img: "images/art/product63.jpg" },
        ],
      },

      { order: 27, title: "Christus der Erlöser", price: euro("40,00"), img: "images/art/product27.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product71.jpg" },
        ],
      },

      { order: 28, title: "Kosmonaut", price: euro("40,00"), img: "images/art/product28.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product82.jpg" },
        ],
      },

      { order: 29, title: "Fußballer", price: euro("40,00"), img: "images/art/product29.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product76.jpg" },
        ],
      },

      { order: 30, title: "Tulpen", price: euro("40,00"), img: "images/art/product30.jpg",
        variants: [
          { label: "Gold", img: "images/art/product59.jpg" },
        ],
      },

      { order: 31, title: "Bambi", price: euro("40,00"), img: "images/art/product31.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product68.jpg" },
        ],
      },

      { order: 32, title: "Samurai", price: euro("40,00"), img: "images/art/product32.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product67.jpg" },
        ],
      },

      { order: 33, title: "Mutter mit Baby", price: euro("40,00"), img: "images/art/product33.jpg" },

      { order: 34, title: "Galatasaray S.K.", price: euro("35,00"), img: "images/art/product34.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product54.jpg" },
        ],
      },

      { order: 35, title: "Frau mit Reh", price: euro("40,00"), img: "images/art/product35.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product79.jpg" },
        ],
      },

      { order: 36, title: "Schweißer", price: euro("40,00"), img: "images/art/product36.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product86.jpg" },
        ],
      },

      { order: 37, title: "Eiffelturm", price: euro("40,00"), img: "images/art/product37.jpg",
        variants: [
          { label: "Dunkelgold", img: "images/art/product65.jpg" },
        ],
      },

      { order: 38, title: "Landschaft", price: euro("40,00"), img: "images/art/product38.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product66.jpg" },
        ],
      },

      { order: 39, title: "Real Madrid CF", price: euro("35,00"), img: "images/art/product39.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product55.jpg" },
        ],
      },

      { order: 40, title: "Fischen", price: euro("40,00"), img: "images/art/product40.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product73.jpg" },
        ],
      },

      { order: 41, title: "Frau mit einem Tropfen", price: euro("40,00"), img: "images/art/product41.jpg" },

      { order: 42, title: "Frau auf einer Schaukel", price: euro("40,00"), img: "images/art/product42.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product84.jpg" },
        ],
      },

      { order: 43, title: "Das Kamel", price: euro("40,00"), img: "images/art/product43.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product85.jpg" },
        ],
      },

      { order: 44, title: "Der springende Fisch", price: euro("40,00"), img: "images/art/product44.jpg",
        variants: [
          { label: "Dunkelgold", img: "images/art/product64.jpg" },
        ],
      },

      { order: 45, title: "Bear", price: euro("40,00"), img: "images/art/product45.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product74.jpg" },
        ],
      },

      { order: 46, title: "Manchester United", price: euro("35,00"), img: "images/art/product46.jpg",
        variants: [
          { label: "Gold", img: "images/art/product56.jpg" },
        ],
      },

      { order: 47, title: "Borussia Dortmund", price: euro("35,00"), img: "images/art/product47.jpg" },

      { order: 48, title: "Das Schloss", price: euro("40,00"), img: "images/art/product48.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product69.jpg" },
        ],
      },

      { order: 49, title: "Liverpool", price: euro("35,00"), img: "images/art/product49.jpg" },

      { order: 50, title: "Baum des Lebens", price: euro("45,00"), img: "images/art/product50.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product61.jpg" },
          // Когато качиш златната и сивата снимка, добави тук номерата:
          // { label: "Gold", img: "images/art/productXX.jpg" },
          // { label: "Grau", img: "images/art/productYY.jpg" },
        ],
      },

      { order: 51, title: "Die Freiheitsstatue", price: euro("40,00"), img: "images/art/product51.jpg",
        variants: [
          { label: "Anthrazit", img: "images/art/product83.jpg" },
        ],
      },
    ],
  },
];

// ---------- Rendering ----------
const productsEl = document.getElementById("products");

function safeImgTag(src, alt, imgId) {
  // show image; if missing -> hide
  const idAttr = imgId ? `id="${imgId}"` : "";
  return `<img ${idAttr} src="${src}" alt="${alt}" onerror="this.style.display='none'">`;
}

function renderItem(item, sectionKey) {
  const key = `${sectionKey}-${item.order}`;
  const imgId = `img-${key}`;

  const baseButtons = `
    <div class="actions">
      <a class="btn" href="${mailtoHref(item.title, item.price)}">E-Mail</a>
      <a class="btn whatsapp" target="_blank" rel="noopener" href="${whatsappHref(item.title, item.price)}">WhatsApp</a>
    </div>
  `;

  // Variants buttons (if any)
  const variants = Array.isArray(item.variants) ? item.variants.filter(v => v && v.img) : [];
  const variantsHtml = variants.length
    ? `
      <div class="variants" data-img-id="${imgId}">
        ${variants.map((v, idx) => {
          const active = idx === 0 ? "active" : "";
          return `<a href="#" class="btn variant ${active}" data-src="${v.img}">${v.label}</a>`;
        }).join("")}
      </div>
    `
    : "";

  // If variants exist, we show first variant as initial image, else item.img
  const initialImg = variants.length ? variants[0].img : item.img;

  return `
    <div class="product" data-key="${key}">
      ${safeImgTag(initialImg, item.title, imgId)}
      <div class="pbody">
        <div><b>${item.title}</b></div>
        <div class="price">${item.price}</div>
        ${baseButtons}
        ${variantsHtml}
      </div>
    </div>
  `;
}

function renderCatalog() {
  if (!productsEl) return;

  let html = "";
  catalog.forEach((group, gi) => {
    const sectionKey = `s${gi + 1}`;
    html += `
      <div class="section-title">
        <span>${group.section}</span>
        ${group.note ? `<small>${group.note}</small>` : ""}
      </div>
      <div class="products">
        ${group.items.map((item) => renderItem(item, sectionKey)).join("")}
      </div>
    `;
  });

  productsEl.innerHTML = html;

  // Wire up variant switching
  productsEl.querySelectorAll(".variants").forEach((wrap) => {
    const imgId = wrap.getAttribute("data-img-id");
    const imgEl = document.getElementById(imgId);
    if (!imgEl) return;

    wrap.querySelectorAll(".btn.variant").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const src = btn.getAttribute("data-src");
        if (!src) return;

        // set active
        wrap.querySelectorAll(".btn.variant").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // swap image
        imgEl.style.display = "block";
        imgEl.src = src;
      });
    });
  });
}

renderCatalog();
