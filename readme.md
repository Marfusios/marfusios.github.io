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
npm run deploy  # Manual deploy (wrangler deploy); pushes to master deploy automatically
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

Pushing to `master` deploys the site: Cloudflare Workers Builds is connected to this
repository and builds and deploys the worker on every push. The "Workers Builds:
marfusios" check on the commit shows the result, and the new version is live within a
minute. To undo a deploy, revert the commit and push.

`npm run deploy` uploads the local `public/` folder straight to Cloudflare and bypasses
git. Use it only as a fallback and push the same change afterwards, because the next
push replaces whatever it deployed. Wrangler needs Node.js 20 or newer.

Configure the custom domain (`mkotas.cz`) in the Cloudflare dashboard once the worker is deployed.

## URL migrations

`public/_redirects` preserves the old `index 2.html` and `index 3.html` homepage
copies and the portrait/logo paths used before the redesign. These are exact
permanent redirects to their current equivalents. Unknown URLs still return a
real 404; do not redirect every missing page to the homepage.

Keep `https://mkotas.cz/` as the canonical homepage. `src/worker.js` permanently
redirects `www.mkotas.cz` and HTTP to that origin, preserving the path and query
string. It runs before asset handling and passes all other requests to `ASSETS`,
including genuine 404 responses. Other subdomains and local previews are excluded.
