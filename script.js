const products = [
  {
    id: "art-001",
    title: "Innocent Gaze",
    artist: "Oheneba Studio",
    category: "portrait",
    priceGHS: 3200,
    image: "./assets/images/oheneba-child-portrait.jpg",
    description: "Expressive child portrait with warm tonal transitions.",
  },
  {
    id: "art-002",
    title: "Legacy in Kente",
    artist: "Oheneba Studio",
    category: "heritage",
    priceGHS: 4800,
    image: "./assets/images/oheneba-kente-portrait.jpg",
    description: "A stately portrait celebrating heritage and authority.",
  },
  {
    id: "art-003",
    title: "Executive Presence",
    artist: "Oheneba Studio",
    category: "contemporary",
    priceGHS: 5100,
    image: "./assets/images/oheneba-suit-portrait.jpg",
    description: "Refined formal portrait with confident posture and depth.",
  },
  {
    id: "art-004",
    title: "Emerald Reflection I",
    artist: "Oheneba Studio",
    category: "portrait",
    priceGHS: 2700,
    image: "./assets/images/oheneba-lady-green-reference.jpg",
    description: "A meditative visual study in shadow and texture.",
  },
  {
    id: "art-005",
    title: "Emerald Reflection II",
    artist: "Oheneba Studio",
    category: "contemporary",
    priceGHS: 3900,
    image: "./assets/images/oheneba-lady-green-finish.jpg",
    description: "Finished composition with luminous elegance and balance.",
  },
];

const USD_RATE = 13.2;
const STORAGE_KEYS = {
  cart: "oheneba-art-gallery-cart",
  currency: "oheneba-art-gallery-currency",
};

let cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
let currency = localStorage.getItem(STORAGE_KEYS.currency) || "GHS";

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const currencySelect = document.getElementById("currency-select");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckoutBtn = document.getElementById("close-checkout-btn");
const checkoutSummaryEl = document.getElementById("checkout-summary");
const checkoutTotalEl = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");
const mobileMoneyFields = document.getElementById("mobile-money-fields");
const cardFields = document.getElementById("card-fields");
const cardNumberInput = document.getElementById("card-number");
const cardExpiryInput = document.getElementById("card-expiry");
const cardCvvInput = document.getElementById("card-cvv");
const cardHolderInput = document.getElementById("card-holder");
const momoNumberInput = document.getElementById("momo-number");

function saveState() {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  localStorage.setItem(STORAGE_KEYS.currency, currency);
}

function createImageFallback(title, width = 600, height = 450) {
  const safeTitle = String(title).replace(/[<>&"']/g, "");
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#2f2b40'/>
      <stop offset='100%' stop-color='#151925'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#bg)'/>
  <circle cx='50%' cy='40%' r='95' fill='#f7ad451f'/>
  <text x='50%' y='58%' fill='#f7e8cf' font-family='Arial, sans-serif' font-size='32' text-anchor='middle'>
    ${safeTitle}
  </text>
  <text x='50%' y='68%' fill='#bdb7aa' font-family='Arial, sans-serif' font-size='18' text-anchor='middle'>
    Oheneba Art Gallery
  </text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function registerFallback(img) {
  if (!img || img.dataset.fallbackBound === "true") {
    return;
  }
  const fallbackTitle = img.dataset.fallbackTitle || "Artwork";
  img.addEventListener(
    "error",
    () => {
      img.src = createImageFallback(fallbackTitle);
    },
    { once: true },
  );
  img.dataset.fallbackBound = "true";
}

function applyImageFallbacks(scope = document) {
  scope.querySelectorAll(".art-image").forEach(registerFallback);
}

function formatPrice(priceGHS) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(priceGHS / USD_RATE);
  }

  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2,
  }).format(priceGHS);
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function cartTotalCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function cartSubtotal() {
  return cart.reduce((total, item) => {
    const product = getProductById(item.id);
    if (!product) {
      return total;
    }
    return total + product.priceGHS * item.quantity;
  }, 0);
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = products.filter((product) => {
    const categoryMatches = category === "all" || product.category === category;
    const queryMatches =
      product.title.toLowerCase().includes(query) ||
      product.artist.toLowerCase().includes(query);
    return categoryMatches && queryMatches;
  });

  if (!filtered.length) {
    productGrid.innerHTML = `
      <article class="empty-state">
        No artwork matches your filters. Try another search or category.
      </article>
    `;
    return;
  }

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image-wrap">
            <img
              class="art-image"
              src="${product.image}"
              alt="${product.title}"
              data-fallback-title="${product.title}"
            />
          </div>
          <div class="product-body">
            <div class="product-meta">
              <h3>${product.title}</h3>
              <span class="category-pill">${product.category}</span>
            </div>
            <p>${product.description}</p>
            <div class="product-footer">
              <span class="price">${formatPrice(product.priceGHS)}</span>
              <button
                type="button"
                class="btn ghost add-to-cart-btn"
                data-product-id="${product.id}"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  applyImageFallbacks(productGrid);
}

function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  saveState();
  renderCart();
  updateCheckoutSummary();
  showToast("Artwork added to cart.");
}

function updateItemQuantity(productId, delta) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) {
    return;
  }
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== productId);
  }
  saveState();
  renderCart();
  updateCheckoutSummary();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveState();
  renderCart();
  updateCheckoutSummary();
}

function renderCart() {
  cartCountEl.textContent = String(cartTotalCount());

  if (!cart.length) {
    cartItemsEl.innerHTML = `
      <article class="empty-state">
        Your cart is empty. Add artwork to continue.
      </article>
    `;
    cartSubtotalEl.textContent = formatPrice(0);
    return;
  }

  cartItemsEl.innerHTML = cart
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) {
        return "";
      }
      return `
        <article class="cart-item">
          <img
            class="art-image"
            src="${product.image}"
            alt="${product.title}"
            data-fallback-title="${product.title}"
          />
          <div>
            <h4>${product.title}</h4>
            <p>${formatPrice(product.priceGHS)}</p>
            <div class="cart-item-actions">
              <button class="qty-btn" data-action="decrement" data-product-id="${product.id}" type="button">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="increment" data-product-id="${product.id}" type="button">+</button>
              <button class="remove-btn" data-action="remove" data-product-id="${product.id}" type="button">Remove</button>
            </div>
          </div>
          <strong>${formatPrice(product.priceGHS * item.quantity)}</strong>
        </article>
      `;
    })
    .join("");

  cartSubtotalEl.textContent = formatPrice(cartSubtotal());
  applyImageFallbacks(cartItemsEl);
}

function updateCheckoutSummary() {
  if (!cart.length) {
    checkoutSummaryEl.innerHTML = "<li><span>No items yet.</span><strong>—</strong></li>";
    checkoutTotalEl.textContent = formatPrice(0);
    return;
  }

  checkoutSummaryEl.innerHTML = cart
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) {
        return "";
      }
      return `
        <li>
          <span>${product.title} × ${item.quantity}</span>
          <strong>${formatPrice(product.priceGHS * item.quantity)}</strong>
        </li>
      `;
    })
    .join("");

  checkoutTotalEl.textContent = formatPrice(cartSubtotal());
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function syncOverlay() {
  const isCartOpen = cartDrawer.classList.contains("open");
  const isCheckoutOpen = checkoutModal.classList.contains("open");
  overlay.hidden = !(isCartOpen || isCheckoutOpen);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  syncOverlay();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  syncOverlay();
}

function openCheckout() {
  if (!cart.length) {
    showToast("Add artwork to cart before checkout.");
    return;
  }
  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
  syncOverlay();
}

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
  syncOverlay();
}

function selectedPaymentMethod() {
  const selected = document.querySelector('input[name="payment"]:checked');
  return selected ? selected.value : "mobile-money";
}

function updatePaymentFields() {
  const method = selectedPaymentMethod();
  const isMobileMoney = method === "mobile-money";

  mobileMoneyFields.classList.toggle("hidden", !isMobileMoney);
  cardFields.classList.toggle("hidden", isMobileMoney);

  momoNumberInput.required = isMobileMoney;
  cardHolderInput.required = !isMobileMoney;
  cardNumberInput.required = !isMobileMoney;
  cardExpiryInput.required = !isMobileMoney;
  cardCvvInput.required = !isMobileMoney;
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatCardExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function setupEventListeners() {
  searchInput.addEventListener("input", renderProducts);
  categorySelect.addEventListener("change", renderProducts);

  currencySelect.value = currency;
  currencySelect.addEventListener("change", () => {
    currency = currencySelect.value;
    saveState();
    renderProducts();
    renderCart();
    updateCheckoutSummary();
  });

  productGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const button = target.closest(".add-to-cart-btn");
    if (!button) {
      return;
    }
    const productId = button.dataset.productId;
    if (!productId) {
      return;
    }
    addToCart(productId);
  });

  cartItemsEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const actionButton = target.closest("[data-action]");
    if (!actionButton) {
      return;
    }
    const productId = actionButton.dataset.productId;
    const action = actionButton.dataset.action;
    if (!productId || !action) {
      return;
    }

    if (action === "increment") {
      updateItemQuantity(productId, 1);
    } else if (action === "decrement") {
      updateItemQuantity(productId, -1);
    } else if (action === "remove") {
      removeFromCart(productId);
    }
  });

  openCartBtn.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  checkoutBtn.addEventListener("click", () => {
    closeCart();
    openCheckout();
  });
  closeCheckoutBtn.addEventListener("click", closeCheckout);

  overlay.addEventListener("click", () => {
    closeCart();
    closeCheckout();
  });

  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", updatePaymentFields);
  });

  cardNumberInput.addEventListener("input", () => {
    cardNumberInput.value = formatCardNumber(cardNumberInput.value);
  });

  cardExpiryInput.addEventListener("input", () => {
    cardExpiryInput.value = formatCardExpiry(cardExpiryInput.value);
  });

  cardCvvInput.addEventListener("input", () => {
    cardCvvInput.value = cardCvvInput.value.replace(/\D/g, "").slice(0, 4);
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!cart.length) {
      showToast("Your cart is empty.");
      return;
    }

    const method = selectedPaymentMethod();
    const readableMethod =
      method === "mobile-money" ? "Mobile Money" : method === "visa" ? "Visa" : "Mastercard";
    const orderId = `OHN-${Date.now().toString().slice(-6)}`;

    cart = [];
    saveState();
    renderCart();
    updateCheckoutSummary();
    checkoutForm.reset();
    document.querySelector('input[name="payment"][value="mobile-money"]').checked = true;
    updatePaymentFields();
    closeCheckout();
    showToast(`Payment initiated via ${readableMethod}. Order ${orderId} created.`);
  });
}

function init() {
  document.getElementById("year").textContent = String(new Date().getFullYear());
  setupEventListeners();
  renderProducts();
  renderCart();
  updateCheckoutSummary();
  updatePaymentFields();
  applyImageFallbacks(document);
}

init();
