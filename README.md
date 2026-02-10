# Oheneba Art Gallery Ecommerce Website

A polished ecommerce storefront for **Oheneba Art Gallery** with local and international checkout support.

---

## What this website includes

- Premium homepage + product gallery
- Search and category filters
- Shopping cart with quantity updates
- Checkout supporting:
  - **Mobile Money** (MTN / Vodafone / AirtelTigo)
  - **Visa**
  - **Mastercard**
- Currency switch (**GHS / USD**)
- Payment mode indicator:
  - **Demo mode** (works immediately)
  - **Live mode via Paystack** (when key is added)
- Contact + WhatsApp support links

---

## 1) Add your artwork images

Put your artwork files in:

`assets/images/`

Use these exact file names (already wired in the website):

1. `oheneba-child-portrait.jpg`
2. `oheneba-kente-portrait.jpg`
3. `oheneba-suit-portrait.jpg`
4. `oheneba-lady-green-reference.jpg`
5. `oheneba-lady-green-finish.jpg`

If any image is missing, the site automatically shows a branded fallback.

---

## 2) Edit owner settings (easy)

Open:

`site-config.js`

You can update:

- Gallery contact email
- Phone number
- WhatsApp number
- USD exchange rate
- `paystackPublicKey` for live payments

Example:

```js
paystackPublicKey: "pk_live_xxxxxxxxxxxxxxxxxxxxx";
```

### Add or edit artwork products

Open `script.js` and edit the `DEFAULT_PRODUCTS` list at the top.

Each product uses this format:

```js
{
  id: "art-006",
  title: "Artwork Title",
  artist: "Oheneba Studio",
  category: "portrait", // portrait | heritage | contemporary
  priceGHS: 4200,
  image: "./assets/images/your-file-name.jpg",
  description: "Short artwork description.",
}
```

---

## 3) Run locally (preview on your computer)

```bash
python3 -m http.server 8080
```

Then open:

`http://localhost:8080`

---

## 4) Publish to GitHub + Vercel (beginner guide)

### GitHub (already connected in this project)

If you change files later, use:

```bash
git add .
git commit -m "Update gallery content"
git push
```

### Vercel deployment

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **Add New Project**
4. Import this repository
5. Click **Deploy**

After first deployment:

- Every push to your main/production branch updates live site
- Every push to feature branches creates a **Preview URL**

---

## 5) Enabling real payments (Paystack)

1. Create a Paystack account
2. Get your **Public Key** from dashboard
3. Paste it into `site-config.js`:

```js
paystackPublicKey: "pk_live_...";
```

4. Redeploy on Vercel

Now checkout will move from **Demo mode** to **Live mode** for Mobile Money and card payments.
