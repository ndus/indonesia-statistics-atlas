# Indonesia in Numbers

**NusaAngka — the Indonesia statistics atlas.** A self-contained, interactive national statistics website covering population, economy, trade, society and all 38 provinces. Built with plain HTML, CSS, JavaScript ES modules, system fonts and hand-drawn SVG charts. No build step, dependencies or remote requests.

Run `node serve.ts`, then open the local address printed in the terminal. Navigate through the seven sections with the header links. All data and controls run locally.

The reference edition preserves supplied figures for 2019–2025. Sources: BPS — Statistics Indonesia; World Bank World Development Indicators; national nutrition survey; industry internet survey. The About page documents reference periods, rounding and methods. Approximate values are labelled.

Package the site with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`. This copies the app and existing screenshots and writes `out/dossier.json`. Screenshot routes and viewports are specified in `shots.json`.

MIT licensed; see LICENSE.
