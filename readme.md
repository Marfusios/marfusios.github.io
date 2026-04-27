# mkotas.cz — Personal site

Personal site for Mariusz Kotas. Static HTML/CSS/JS, deployed to Cloudflare Workers (Static Assets).

## Stack

- Plain HTML / CSS / JS — no build step
- Fonts via Google Fonts (Inter, Fraunces, JetBrains Mono)
- Cloudflare Workers Static Assets for hosting
- Wrangler CLI for dev and deploy

## Commands

```bash
npm install     # Install wrangler
npm run dev     # Local dev server (wrangler dev)
npm run deploy  # Deploy to Cloudflare (wrangler deploy)
```

## Structure

```
public/                     # All deployable static files
  index.html
  favicon.ico
  robots.txt
  sitemap.xml
  styles/
    colors-and-type.css     # Design tokens
    styles.css              # Layout + components
  scripts/
    main.js                 # Header scroll, project tabs, copy email
  images/
    logo.png                # MK monogram
    head.png                # Portrait
    maze-pattern.png        # Background texture
  .well-known/              # Preserved Let's Encrypt artifact

wrangler.jsonc              # Cloudflare Workers config (assets dir = ./public)
package.json                # Wrangler dev dep + scripts
```

## Design

A single long-scroll page:

1. Sticky header
2. Hero (portrait + intro)
3. About (bio + facts panel)
4. Now (Mitil + day-to-day focus)
5. Projects (tabbed: Open source / Products & ventures)
6. Experience (timeline on dark navy)
7. Contact (email + copy-to-clipboard + socials)
8. Footer

Design tokens live in `public/styles/colors-and-type.css`. Layout in `public/styles/styles.css`.

Colors: navy + gold + warm paper neutrals (~70% neutral / 25% navy / 5% gold).
Typography: Fraunces (display), Inter (body), JetBrains Mono (code/locations).

## Deploy

Cloudflare Workers Static Assets:

```bash
npm install
npm run deploy
```

Configure the custom domain (`mkotas.cz`) in the Cloudflare dashboard once the worker is deployed.
