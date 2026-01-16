// Footer year
document.querySelectorAll('#year').forEach(el => (el.textContent = new Date().getFullYear()));

// ====== SETTINGS ======
const WHATSAPP_NUMBER = "4915226216596";
const EMAIL_TO = "mmaringalinov94@gmail.com";

// helper: build mail + whatsapp links
function mailtoLink(title, price) {
  const subject = `Bestellung: ${title}`;
  const body =
    `Hallo,%0A` +
    `ich möchte dieses Produkt bestellen:%0A` +
    `${title}%0A` +
    `Preis: ${price}%0A%0A` +
    `Vielen Dank!`;
  return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

function whatsappLink(title, price) {
  const text = `Hallo! Ich möchte dieses Produkt bestellen: ${title} | Preis: ${price}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// helper: create one product card (supports color variants)
function productCard(p) {
  const mainImg = p.variants?.[0]?.img || p.img || "";
  const mainAlt = p.title;

  const variantsHtml = (p.variants || []).map((v, idx) => {
    // buttons for colors/variants
    return `
      <button class="btn variant" type="button"
        data-img="${v.img}"
        data-title="${p.title}"
        data-price="${p.price}">
        ${v.label}
      </button>
    `;
  }).join("");

  // If there are no variants -> no variant buttons
  const variantsBlock = p.variants?.length
    ? `<div class="variants">${variantsHtml}</div>`
    : "";

  return `
    <div class="product" data-product>
      <img src="${mainImg}" alt="${mainAlt}" data-mainimg onerror="this.style.display='none'">
      <div class="pbody">
        <div><b>${p.title}</b></div>
        <div class="price">${p.price}</div>

        ${variantsBlock}

        <div class="actions">
          <a class="btn" href="${mailtoLink(p.title, p.price)}">E-Mail</a>
          <a class="btn whatsapp" target="_blank" rel="noopener"
             href="${whatsappLink(p.title, p.price)}">WhatsApp</a>
        </div>
      </div>
    </div>
  `;
}

// ====== DATA ======
// Weinständer (5 броя) – тези вече ги имаш
const WEIN_PRODUCTS = [
  { order: 1, title: "Herz-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product1.jpg" },
  { order: 2, title: "Große Weinflasche (Dekor)", price: "120,00 €", img: "images/wein/product2.jpg" },
  { order: 3, title: "Gitarren-Weinflaschenhalter", price: "50,00 €", img: "images/wein/product3.jpg" },
  { order: 4, title: "Weinflasche Deko", price: "50,00 €", img: "images/wein/product4.jpg" },
  { order: 5, title: "Amphora Geschenkset", price: "50,00 €", img: "images/wein/product5.jpg" }
];

// Картини – тук правим 1 продукт = 1 модел, а цветовете са варианти (бутони).
// Вариантите сочат към различни снимки по номер: images/art/productXX.jpg
// По твоя сниман списък (първите 36 реда). Ред 21 "нямам го" го пропускаме.
const ART_PRODUCTS = [
  { order: 1,  title: "Pferd",                  price: "40,00 €", img: "images/art/product1.jpg" },

  { order: 2,  title: "FC Bayern München",      price: "35,00 €",
    variants: [
      { label: "Standard", img: "images/art/product2.jpg" },
      { label: "Grau",     img: "images/art/product53.jpg" }
    ]
  },

  { order: 3,  title: "BJK 1903",               price: "35,00 €", img: "images/art/product3.jpg" },

  { order: 4,  title: "Bayern Leverkusen",      price: "35,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product4.jpg" },
      { label: "Anthrazit",  img: "images/art/product52.jpg" },
      { label: "Gold",       img: "images/art/product27.jpg" }
    ]
  },

  { order: 5,  title: "Huhn mit Brille",        price: "40,00 €",
    variants: [
      { label: "Standard",     img: "images/art/product5.jpg" },
      { label: "Dunkel Gold",  img: "images/art/product80.jpg" }
    ]
  },

  { order: 6,  title: "Fenerbahce",             price: "35,00 €", img: "images/art/product6.jpg" },

  { order: 7,  title: "Hirsch mit Geweih",      price: "40,00 €",
    variants: [
      { label: "Standard",     img: "images/art/product7.jpg" },
      { label: "Dunkel Gold",  img: "images/art/product81.jpg" }
    ]
  },

  { order: 8,  title: "Chaplin",                price: "40,00 €", img: "images/art/product8.jpg" },
  { order: 9,  title: "Piratenschiff",          price: "40,00 €", img: "images/art/product9.jpg" },

  { order: 10, title: "Mutter mit Kind",        price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product10.jpg" },
      { label: "Anthrazit",  img: "images/art/product78.jpg" }
    ]
  },

  { order: 11, title: "FC Barcelona",           price: "35,00 €", img: "images/art/product11.jpg" },

  { order: 12, title: "Flugzeug",               price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product12.jpg" },
      { label: "Anthrazit",  img: "images/art/product72.jpg" }
    ]
  },

  { order: 13, title: "Juventus",               price: "35,00 €", img: "images/art/product13.jpg" },

  { order: 14, title: "Hirsch im Wald",         price: "40,00 €",
    variants: [
      { label: "Standard",     img: "images/art/product14.jpg" },
      { label: "Dunkel Gold",  img: "images/art/product87.jpg" }
    ]
  },

  { order: 15, title: "Stier",                  price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product15.jpg" },
      { label: "Anthrazit",  img: "images/art/product77.jpg" }
    ]
  },

  { order: 16, title: "Herz",                   price: "40,00 €", img: "images/art/product16.jpg" },
  { order: 17, title: "Blume",                  price: "40,00 €", img: "images/art/product17.jpg" },
  { order: 18, title: "Arsenal",                price: "35,00 €", img: "images/art/product18.jpg" },

  { order: 19, title: "Pferd Massiv",           price: "45,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product19.jpg" },
      { label: "Anthrazit",  img: "images/art/product62.jpg" }
    ]
  },

  { order: 20, title: "Flamingo",               price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product20.jpg" },
      { label: "Anthrazit",  img: "images/art/product75.jpg" }
    ]
  },

  // 21: "нямам го" -> пропускаме

  { order: 22, title: "Alpen",                  price: "40,00 €",
    variants: [
      { label: "Standard",  img: "images/art/product22.jpg" },
      { label: "Gold",      img: "images/art/product60.jpg" }
    ]
  },

  { order: 23, title: "Tiger",                  price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product23.jpg" },
      { label: "Anthrazit",  img: "images/art/product70.jpg" }
    ]
  },

  { order: 24, title: "Rose",                   price: "40,00 €", img: "images/art/product24.jpg" },
  { order: 25, title: "VfB Stuttgart",          price: "35,00 €", img: "images/art/product25.jpg" },

  { order: 26, title: "Wanderer",               price: "40,00 €",
    variants: [
      { label: "Standard",     img: "images/art/product26.jpg" },
      { label: "Grau",         img: "images/art/product63.jpg" }
      // ако имаш и тъмно-златната версия като отделна снимка – добавяме я тук
    ]
  },

  { order: 27, title: "Christus der Erlöser",   price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product28.jpg" }, // ако при теб е на 28
      { label: "Anthrazit",  img: "images/art/product71.jpg" }
    ]
  },

  { order: 28, title: "Kosmonaut",              price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product29.jpg" },
      { label: "Anthrazit",  img: "images/art/product82.jpg" }
    ]
  },

  { order: 29, title: "Fußballer",              price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product30.jpg" },
      { label: "Anthrazit",  img: "images/art/product76.jpg" }
    ]
  },

  { order: 30, title: "Tulpen",                 price: "40,00 €",
    variants: [
      { label: "Standard",  img: "images/art/product31.jpg" },
      { label: "Gold",      img: "images/art/product59.jpg" }
    ]
  },

  { order: 31, title: "Bambi",                  price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product32.jpg" },
      { label: "Anthrazit",  img: "images/art/product68.jpg" }
    ]
  },

  { order: 32, title: "Samurai",                price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product33.jpg" },
      { label: "Anthrazit",  img: "images/art/product67.jpg" }
    ]
  },

  { order: 33, title: "Mutter mit Baby",        price: "40,00 €", img: "images/art/product34.jpg" },

  { order: 34, title: "Galatasaray S.K.",       price: "35,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product35.jpg" },
      { label: "Anthrazit",  img: "images/art/product54.jpg" }
    ]
  },

  { order: 35, title: "Frau mit Reh",           price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product36.jpg" },
      { label: "Anthrazit",  img: "images/art/product79.jpg" }
    ]
  },

  { order: 36, title: "Schweißer",              price: "40,00 €",
    variants: [
      { label: "Standard",   img: "images/art/product37.jpg" },
      { label: "Anthrazit",  img: "images/art/product86.jpg" }
    ]
  }
];

// ====== RENDER ======
function render() {
  const productsEl = document.getElementById("products");
  if (!productsEl) return;

  // sort
  WEIN_PRODUCTS.sort((a,b) => a.order - b.order);
  ART_PRODUCTS.sort((a,b) => a.order - b.order);

  const html = `
    <p class="muted">Примерен каталог. По-късно ще добавим снимки + цени.</p>

    <h2>Weinflaschenhalter</h2>
    <div class="products">${WEIN_PRODUCTS.map(productCard).join("")}</div>

    <h2>Bilder / Wandbilder</h2>
    <div class="products">${ART_PRODUCTS.map(productCard).join("")}</div>
  `;

  productsEl.innerHTML = html;

  // variant switching
  productsEl.querySelectorAll('button.variant').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-product]');
      const img = card.querySelector('[data-mainimg]');
      const newImg = btn.getAttribute('data-img');
      if (img && newImg) img.src = newImg;
    });
  });
}

render();
