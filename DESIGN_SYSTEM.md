# BabyGurl Crochet — Visual Design System & Brand Identity

An independent handmade boutique brand selling handcrafted crochet flowers, bouquets, plushies, accessories, bags, home decor, personalized items, and keepsake gifts.

---

## Brand Essence & Personality
- **Name**: BabyGurl Crochet
- **Personality**: Handmade, Warm, Cute, Romantic, Cozy, Feminine, Playful, Personal, Authentic, Premium but approachable.
- **Visual Feel**: Sophisticated boutique aesthetic, natural textiles, soft shadows, warm morning light.
- **Voice**:
  - “Little things, handmade with love.”
  - “Made one stitch at a time.”
  - “Something special, made just for you.”
  - “Flowers that never wilt.”
  - “Made slowly. Loved forever.”

---

## Color Palette & Design Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--bg-primary` | `#FFF9F5` | Warm Cream background canvas |
| `--color-primary` | `#D96C8A` | Soft Dusty Rose (buttons, active states, key accents) |
| `--color-secondary` | `#F3C6D3` | Blush Petal (soft backgrounds, borders, pill tints) |
| `--color-dark` | `#3D3033` | Deep Cocoa Brown (high-contrast, warm typography) |
| `--color-accent` | `#D9A441` | Muted Warm Gold (ratings, seals, badges) |
| `--color-white` | `#FFFFFF` | Pure White (clean card surfaces and contrast) |
| `--color-sage` | `#7B8F77` | Botanical Sage (foliage and natural accents) |
| `--bg-surface-tint` | `#FAF0EB` | Unbleached Linen (dividers, strips, announcement) |

---

## Typography

- **Headings & Display**: `Playfair Display` & `Fraunces` (Editorial serif with soft romantic italics)
- **UI & Body**: `Plus Jakarta Sans` (Crisp, clean, highly legible modern sans-serif)

---

## Codebase Architecture

```
Crochet Website/
├── index.html                 # Complete responsive storefront (all 13 views supported)
├── design-system.html         # Interactive Design System & Brand Guidelines Explorer
├── DESIGN_SYSTEM.md           # Design system documentation
├── css/
│   ├── tokens.css             # Colors, typography, spacing, shadows, radii, motion variables
│   ├── components.css         # Buttons, inputs, badges, cards, modals, drawer, accordions
│   ├── store.css              # Storefront layouts, hero, shop grid, product page, story, tracking
│   └── design-system.css      # Design system documentation showcase styles
├── js/
│   └── store.js               # Client router, product catalog data, cart drawer, wishlist, tracking
└── assets/
    └── images/
        ├── bouquet.jpg        # Artisanal handmade crochet floral bouquet
        ├── bunny.jpg          # Cozy handmade crochet bunny plushie with overalls
        ├── tote.jpg           # Floral granny square crochet tote bag
        └── tulips.jpg         # Kraft wrapped crochet tulips gift set
```

---

## Running the Storefront & Design System

The application is built with zero-dependency modern HTML5, Vanilla CSS, and JavaScript.

To run locally:
```bash
python3 -m http.server 3000
```
- Open `http://localhost:3000` to view the **Live Storefront**.
- Open `http://localhost:3000/design-system.html` to view the **Interactive Design System Explorer**.
