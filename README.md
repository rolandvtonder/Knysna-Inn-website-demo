# Knysna Inn — website demo

A five-page site for Knysna Inn, a boutique self-catering hotel at 42 Main Street, Knysna: Home, Rooms & rates, The Inn & gallery, Explore Knysna and Contact & booking.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev
```

`npm run build` writes a static site to `dist/` that can be hosted anywhere. Each page also gets its own folder there, so links like `/rooms` work when opened directly.

## Live demo

https://rolandvtonder.github.io/Knysna-Inn-website-demo/

After changing anything, publish the update with:

```bash
npm run deploy
```

This builds the site for the `/Knysna-Inn-website-demo/` address and pushes it to the `gh-pages` branch, which GitHub Pages serves. Commit and push your source changes to `main` as usual.

## Editing content

All text, room details, rates and contact details live in `src/content.ts`. Lines marked `TODO` (the enquiries email, WhatsApp number and rates) still need to be confirmed with the inn before going live.

Photos are in `public/media/`. The originals they were copied from are in `media/`.
