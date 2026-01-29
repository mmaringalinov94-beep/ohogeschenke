// data.js — single source of truth for products + contacts + shared helpers

export const CONTACTS = {
  whatsappNumber: "4915226216596", // ohne +
  emailTo: "mmaringalinov94@gmail.com",
};

export const STORAGE_KEY = "ohogeschenke_shop_state_v1";

export const ART_COLORS = ["Schwarz", "Dunkelgold"];
export const ART_DEFAULT_COLOR = "Dunkelgold";

export const ART_COLOR_NOTE =
  "Hinweis: Foto zeigt Dunkelgold. Andere Farben werden nach Auswahl gefertigt.";

// ===== price / messaging helpers (shared) =====
export function formatPriceEUR(value) {
  return `${Number(value).toFixed(2).replace(".", ",")} €`;
}

export function buildMessage(product, color) {
  const priceText = formatPriceEUR(product.price);
  const colorLine =
    product.category === "ART" ? `\nFarbe: ${color || ART_DEFAULT_COLOR}` : "";
  return `Produkt: ${product.name}\nPreis: ${priceText}${colorLine}`;
}

export function buildWhatsAppLink(product, color) {
  const text = encodeURIComponent(buildMessage(product, color));
  return `https://wa.me/${CONTACTS.whatsappNumber}?text=${text}`;
}

export function buildEmailLink(product, color) {
  const subject = encodeURIComponent(`Bestellung: ${product.name}`);
  const body = encodeURIComponent(buildMessage(product, color));
  return `mailto:${CONTACTS.emailTo}?subject=${subject}&body=${body}`;
}

export function productDetailsHref(product) {
  // IMPORTANT: avoid id collision by using category + id
  return `product.html?cat=${encodeURIComponent(product.category)}&id=${encodeURIComponent(
    product.id
  )}`;
}

// ===== DATA =====

// WEIN (5)
export const weinProducts = [
  { id: 1, category: "WEIN", name: "Herz-Weinflaschenhalter", price: 50, image: "images/wein/product1.jpg" },
  { id: 2, category: "WEIN", name: "Große Weinflasche (Dekor)", price: 120, image: "images/wein/product2.jpg" },
  { id: 3, category: "WEIN", name: "Gitarren-Weinflaschenhalter", price: 50, image: "images/wein/product3.jpg" },
  { id: 4, category: "WEIN", name: "Weinflasche Deko", price: 50, image: "images/wein/product4.jpg" },
  { id: 5, category: "WEIN", name: "Amphora Geschenkset", price: 50, image: "images/wein/product5.jpg" }
];

// ART (50)
export const artProducts = [
  { id: 1, category: "ART", name: "Pferd", price: 40, image: "images/art/product1.jpg" },
  { id: 2, category: "ART", name: "FC Bayern München", price: 35, image: "images/art/product2.jpg" },
  { id: 3, category: "ART", name: "BJK 1903", price: 35, image: "images/art/product3.jpg" },
  { id: 4, category: "ART", name: "Bayern Leverkusen", price: 35, image: "images/art/product4.jpg" },
  { id: 5, category: "ART", name: "Huhn mit Brille", price: 40, image: "images/art/product5.jpg" },
  { id: 6, category: "ART", name: "Fenerbahce", price: 35, image: "images/art/product6.jpg" },
  { id: 7, category: "ART", name: "Hirsch mit Geweih", price: 40, image: "images/art/product7.jpg" },
  { id: 8, category: "ART", name: "Chaplin", price: 40, image: "images/art/product8.jpg" },
  { id: 9, category: "ART", name: "Piratenschiff", price: 40, image: "images/art/product9.jpg" },
  { id: 10, category: "ART", name: "Mutter mit Kind", price: 40, image: "images/art/product10.jpg" },
  { id: 11, category: "ART", name: "Flugzeug", price: 40, image: "images/art/product11.jpg" },
  { id: 12, category: "ART", name: "Juventus", price: 35, image: "images/art/product12.jpg" },
  { id: 13, category: "ART", name: "Hirsch im Wald", price: 40, image: "images/art/product13.jpg" },
  { id: 14, category: "ART", name: "Stier", price: 40, image: "images/art/product14.jpg" },
  { id: 15, category: "ART", name: "Herz", price: 40, image: "images/art/product15.jpg" },
  { id: 16, category: "ART", name: "Blume", price: 40, image: "images/art/product16.jpg" },
  { id: 17, category: "ART", name: "Arsenal", price: 35, image: "images/art/product17.jpg" },
  { id: 18, category: "ART", name: "Pferd Masiv", price: 45, image: "images/art/product18.jpg" },
  { id: 19, category: "ART", name: "Flamingo", price: 40, image: "images/art/product19.jpg" },
  { id: 20, category: "ART", name: "Alpen", price: 40, image: "images/art/product20.jpg" },
  { id: 21, category: "ART", name: "Tiger", price: 40, image: "images/art/product21.jpg" },
  { id: 22, category: "ART", name: "Rose", price: 40, image: "images/art/product22.jpg" },
  { id: 23, category: "ART", name: "VfB Stuttgart", price: 35, image: "images/art/product23.jpg" },
  { id: 24, category: "ART", name: "Wanderer", price: 40, image: "images/art/product24.jpg" },
  { id: 25, category: "ART", name: "Christus der Erlöser", price: 40, image: "images/art/product25.jpg" },
  { id: 26, category: "ART", name: "Kosmonaut", price: 40, image: "images/art/product26.jpg" },
  { id: 27, category: "ART", name: "Fußballer", price: 40, image: "images/art/product27.jpg" },
  { id: 28, category: "ART", name: "Tulpen", price: 40, image: "images/art/product28.jpg" },
  { id: 29, category: "ART", name: "Bambi", price: 40, image: "images/art/product29.jpg" },
  { id: 30, category: "ART", name: "Samurai", price: 40, image: "images/art/product30.jpg" },
  { id: 31, category: "ART", name: "Mutter mit Baby", price: 40, image: "images/art/product31.jpg" },
  { id: 32, category: "ART", name: "Galatasaray S.K", price: 35, image: "images/art/product32.jpg" },
  { id: 33, category: "ART", name: "Frau mit Reh", price: 40, image: "images/art/product33.jpg" },
  { id: 34, category: "ART", name: "Schweißer", price: 40, image: "images/art/product34.jpg" },
  { id: 35, category: "ART", name: "Eiffelturm", price: 40, image: "images/art/product35.jpg" },
  { id: 36, category: "ART", name: "Landschaft", price: 40, image: "images/art/product36.jpg" },
  { id: 37, category: "ART", name: "Real Madrid CF", price: 35, image: "images/art/product37.jpg" },
  { id: 38, category: "ART", name: "Fischen", price: 40, image: "images/art/product38.jpg" },
  { id: 39, category: "ART", name: "Frau mit einem Tropfen", price: 40, image: "images/art/product39.jpg" },
  { id: 40, category: "ART", name: "Frau auf einer Schaukel", price: 40, image: "images/art/product40.jpg" },
  { id: 41, category: "ART", name: "Das Kamel", price: 40, image: "images/art/product41.jpg" },
  { id: 42, category: "ART", name: "Der springende Fisch", price: 40, image: "images/art/product42.jpg" },
  { id: 43, category: "ART", name: "Bear", price: 40, image: "images/art/product43.jpg" },
  { id: 44, category: "ART", name: "Manchester United", price: 35, image: "images/art/product44.jpg" },
  { id: 45, category: "ART", name: "Borusia Dortmund", price: 35, image: "images/art/product45.jpg" },
  { id: 46, category: "ART", name: "Barselona", price: 35, image: "images/art/product46.jpg" },
  { id: 47, category: "ART", name: "Das Schloss", price: 40, image: "images/art/product47.jpg" },
  { id: 48, category: "ART", name: "Liverpool", price: 35, image: "images/art/product48.jpg" },
  { id: 49, category: "ART", name: "Baum des Lebens", price: 45, image: "images/art/product49.jpg" },
  { id: 50, category: "ART", name: "Die Freiheitsstatue", price: 40, image: "images/art/product50.jpg" }
];

// attach ART meta
artProducts.forEach((p) => {
  p.colors = ART_COLORS;
  p.defaultColor = ART_DEFAULT_COLOR;
});

// master list
export const allProducts = [...weinProducts, ...artProducts];

// lookups
export function getProducts() {
  return allProducts.slice();
}

export function getProduct(category, id) {
  const cat = (category || "").toString().toUpperCase();
  const numId = Number(id);
  return allProducts.find((p) => p.category === cat && Number(p.id) === numId) || null;
}

export function getProductsByCategory(category) {
  const cat = (category || "").toString().toUpperCase();
  return allProducts.filter((p) => p.category === cat);
}
