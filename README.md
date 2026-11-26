# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/weifu1997/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/weifu1997/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

China in Numbers — a national statistics atlas for China. Four linked pages (Overview, Population, Economy, Society) built from verified official figures: the 2024 statistical communiqué, the 2020 census and the provincial communiqués. A switchable ten-year chart (GDP growth, births, population, disposable income), census totals since 1982, an age-mix donut with a 2010/2020 census toggle, a GDP-by-sector donut, quarterly growth, and a sortable table of the twelve largest provincial economies — every figure labelled with its source and year. Plain static files, hand-drawn SVG charts, no frameworks, no network requests; works on desktop and phone.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies the site into `out/app/` and writes `out/dossier.json`. To browse the site itself, serve `app/` with any static file server (for example `python3 -m http.server --directory app`) and open `index.html`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=weifu1997&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
