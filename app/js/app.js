// China in Numbers — routing and views.
//
// A hash router with four pages: overview, population, economy, society.
// Every view is built from CN_DATA (js/data.js) and drawn with CN_CHARTS
// (js/charts.js). Controls re-render their panel in place: the home page's
// indicator switcher, the population page's census toggle and the economy
// page's sortable province table.

(() => {
  const D = window.CN_DATA;
  const C = window.CN_CHARTS;
  const app = document.getElementById('app');

  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  function statCards(items) {
    return `<div class="cards">${items.map((c) => `
      <article class="card">
        <div class="value">${esc(c.value)}${c.unit ? `<span class="unit">${esc(c.unit)}</span>` : ''}</div>
        <div class="label">${esc(c.label)}</div>
        <div class="note">${esc(c.note)}</div>
      </article>`).join('')}</div>`;
  }

  function noteCards(items) {
    return `<div class="cards">${items.map((c) => `
      <article class="card">
        <div class="value" style="font-size:23px">${esc(c.value)}</div>
        <div class="label">${esc(c.label)}</div>
        <div class="note">${esc(c.note)}</div>
      </article>`).join('')}</div>`;
  }

  // --- Home -------------------------------------------------------------
  let homeIndicator = 'gdpGrowth';

  function homeChart() {
    const s = D.series[homeIndicator];
    const points = D.series.years.map((y, i) => ({ label: String(y), value: s.values[i] }));
    const digits = homeIndicator === 'income' ? 0 : 1;
    const chart = homeIndicator === 'births' || homeIndicator === 'population'
      ? C.barChart(points, { digits, color: 'var(--teal)' })
      : C.lineChart(points, { digits });
    return `${chart}<p class="source">Source: National Bureau of Statistics, statistical communiqués 2015-2024. ${esc(s.label)}, ${esc(s.unit)}.</p>`;
  }

  function viewHome() {
    app.innerHTML = `
      <section class="hero">
        <h1>One country, counted carefully.</h1>
        <p class="lede">China in Numbers is an atlas of the official statistics of the world's second most
        populous country — how many people there are, what they produce, earn and spend — every figure
        taken from a published statistical release and labelled with its source.</p>
      </section>
      ${statCards(D.headline)}
      <p class="source">Source: National Bureau of Statistics, Statistical Communiqué 2024.</p>
      <section class="panel">
        <h3>Ten years in one chart</h3>
        <p class="panel-note">Pick an indicator. The chart below is drawn from the decade series published in the annual statistical communiqués.</p>
        <div class="controls" id="indicator-controls">
          ${Object.keys(D.series).filter((k) => k !== 'years').map((k) => `
            <button type="button" data-ind="${k}" aria-pressed="${k === homeIndicator}">${esc(D.series[k].label)}</button>`).join('')}
        </div>
        <div id="home-chart">${homeChart()}</div>
      </section>
      <h2>Explore the atlas</h2>
      <div class="sections">
        <a class="section-card" href="#/population">
          <span class="kicker">People</span>
          <h3>Population</h3>
          <p>1,408.28 million people at the end of 2024, a census count of 1,411.78 million in 2020, and a birth count that halved in eight years.</p>
          <span class="go">See population →</span>
        </a>
        <a class="section-card" href="#/economy">
          <span class="kicker">Output</span>
          <h3>Economy</h3>
          <p>A ¥134.91 trillion economy in 2024: services at 56.7% of GDP, the twelve largest provincial economies, trade, prices and jobs.</p>
          <span class="go">See economy →</span>
        </a>
        <a class="section-card" href="#/society">
          <span class="kicker">Livelihoods</span>
          <h3>Society</h3>
          <p>What people earn and how the income is shared, what they spend it on, how long they live and how households are changing.</p>
          <span class="go">See society →</span>
        </a>
      </div>`;
    document.getElementById('indicator-controls').addEventListener('click', (ev) => {
      const btn = ev.target.closest('button[data-ind]');
      if (!btn) return;
      homeIndicator = btn.dataset.ind;
      for (const b of ev.currentTarget.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b === btn));
      document.getElementById('home-chart').innerHTML = homeChart();
    });
  }

  // --- Population ---------------------------------------------------------
  let censusYear = 2020;

  function censusDonut() {
    const parts = D.censusAge[censusYear];
    const colors = ['var(--gold)', 'var(--teal)', 'var(--accent)'];
    return `
      <div class="donut-wrap">
        ${C.donutChart(parts.map((p, i) => ({ ...p, color: colors[i] })), { centerTop: String(censusYear), centerBottom: 'census age mix' })}
        <ul class="legend">${parts.map((p, i) => `
          <li><span class="swatch" style="background:${colors[i]}"></span>${esc(p.group)}<span class="share">${p.share.toFixed(2)}%</span></li>`).join('')}
        </ul>
      </div>
      <p class="source">Source: National Bureau of Statistics, ${censusYear === 2020 ? 'Seventh' : 'Sixth'} National Population Census.</p>`;
  }

  function viewPopulation() {
    const births = D.series.years.map((y, i) => ({ label: String(y), value: D.series.births.values[i] }));
    const census = D.censusTotals.map((d) => ({ label: String(d.year), value: d.total }));
    app.innerHTML = `
      <h2>Population</h2>
      <p class="section-note">China's population peaked at the end of 2021 and has eased since. The 2020 census
      counted 1,411.78 million people; by the end of 2024 the total was 1,408.28 million, with more deaths
      than births for a third year running.</p>
      ${noteCards(D.population2024)}
      <section class="panel">
        <h3>Population at each census</h3>
        <p class="panel-note">The mainland total counted by each national census, in millions. Growth between censuses has slowed from 12.5% in the 1980s to 5.38% in the 2010s.</p>
        ${C.barChart(census, { digits: 0, color: 'var(--teal)' })}
        <p class="source">Source: National Bureau of Statistics, census releases 1982-2020.</p>
      </section>
      <section class="panel">
        <h3>Births per year, 2015-2024</h3>
        <p class="panel-note">Births peaked at 17.86 million in 2016, the first year of the universal two-child policy, then fell for seven straight years before a small rise in 2024, a dragon year.</p>
        ${C.barChart(births, { digits: 1 })}
        <p class="source">Source: National Bureau of Statistics, statistical communiqués 2015-2024. Millions of births.</p>
      </section>
      <section class="panel">
        <h3>An ageing population</h3>
        <p class="panel-note">Compare the age mix of the last two censuses: the share aged 60 and over rose from 13.26% to 18.70% in a decade.</p>
        <div class="controls" id="census-controls">
          ${[2010, 2020].map((y) => `<button type="button" data-year="${y}" aria-pressed="${y === censusYear}">${y} census</button>`).join('')}
        </div>
        <div id="census-donut">${censusDonut()}</div>
      </section>`;
    document.getElementById('census-controls').addEventListener('click', (ev) => {
      const btn = ev.target.closest('button[data-year]');
      if (!btn) return;
      censusYear = Number(btn.dataset.year);
      for (const b of ev.currentTarget.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b === btn));
      document.getElementById('census-donut').innerHTML = censusDonut();
    });
  }

  // --- Economy ------------------------------------------------------------
  let sortKey = 'gdp';
  let sortDir = -1;

  function provinceRows() {
    const rows = [...D.provinces].sort((a, b) => {
      const cmp = sortKey === 'name' ? a.name.localeCompare(b.name) : a[sortKey] - b[sortKey];
      return cmp * sortDir;
    });
    return rows.map((p, i) => `
      <tr><td>${i + 1}. ${esc(p.name)}</td><td class="num">${C.fmt(p.gdp)}</td><td class="num">${p.growth.toFixed(1)}%</td></tr>`).join('');
  }

  function viewEconomy() {
    const sectorColors = ['var(--teal)', 'var(--gold)', 'var(--accent)'];
    const quarters = D.gdpQuarters2024.map((q) => ({ label: q.quarter, value: q.growth }));
    app.innerHTML = `
      <h2>Economy</h2>
      <p class="section-note">Gross domestic product reached ¥134,908.4 billion in 2024, up 5.0% in real
      terms, or ¥95,749 per person. Services now produce well over half of all output.</p>
      <section class="panel">
        <h3>What the economy is made of, 2024</h3>
        <div class="donut-wrap">
          ${C.donutChart(D.gdpSectors.map((s, i) => ({ label: s.sector, share: s.share, color: sectorColors[i] })), { centerTop: '¥134.91 tn', centerBottom: 'GDP, 2024' })}
          <ul class="legend">${D.gdpSectors.map((s, i) => `
            <li><span class="swatch" style="background:${sectorColors[i]}"></span>${esc(s.sector)} (¥${C.fmt(s.value / 10)} bn, +${s.growth.toFixed(1)}%)<span class="share">${s.share.toFixed(1)}%</span></li>`).join('')}
          </ul>
        </div>
        <p class="source">Source: National Bureau of Statistics, Statistical Communiqué 2024. Values in ¥100 million converted to billions.</p>
      </section>
      <section class="panel">
        <h3>Growth through 2024</h3>
        <p class="panel-note">Real GDP growth by quarter, year on year. The year ended stronger than it began.</p>
        ${C.barChart(quarters, { digits: 1, unit: '%', color: 'var(--teal)' })}
        <p class="source">Source: National Bureau of Statistics, Statistical Communiqué 2024.</p>
      </section>
      ${noteCards(D.economyCards)}
      <p class="source">Source: National Bureau of Statistics, Statistical Communiqué 2024.</p>
      <section class="panel">
        <h3>The twelve largest provincial economies, 2024</h3>
        <p class="panel-note">GDP in ¥100 million. Click a column heading to sort the table by it.</p>
        <div class="table-wrap"><table>
          <thead><tr>
            <th><button type="button" data-sort="name">Province</button></th>
            <th><button type="button" data-sort="gdp">GDP (¥100m)</button></th>
            <th><button type="button" data-sort="growth">Real growth</button></th>
          </tr></thead>
          <tbody id="province-rows">${provinceRows()}</tbody>
        </table></div>
        <p class="source">Sources: provincial bureaus of statistics, 2024 statistical communiqués. Guangdong alone, at ¥14.16 trillion, is larger than all but a handful of national economies.</p>
      </section>`;
    app.querySelector('thead').addEventListener('click', (ev) => {
      const btn = ev.target.closest('button[data-sort]');
      if (!btn) return;
      const key = btn.dataset.sort;
      // Clicking the active column flips its direction; a new column starts
      // descending (for names, A to Z). The data array itself is never sorted
      // in place, so the table can always return to any order.
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = key === 'name' ? 1 : -1; }
      document.getElementById('province-rows').innerHTML = provinceRows();
    });
  }

  // --- Society --------------------------------------------------------------
  function viewSociety() {
    const fifths = D.incomeFifths.map((f) => ({ label: f.group, value: f.income }));
    app.innerHTML = `
      <h2>Society &amp; living standards</h2>
      <p class="section-note">Average disposable income reached ¥41,314 per person in 2024. The averages
      hide a wide spread: the highest-earning fifth of households received more than ten times the
      income of the lowest fifth.</p>
      <section class="panel">
        <h3>Disposable income by fifth of the population, 2024</h3>
        <p class="panel-note">Yuan per person per year, households ranked by income and split into five equal groups.</p>
        ${C.barChart(fifths, { digits: 0 })}
        <p class="source">Source: National Bureau of Statistics, Statistical Communiqué 2024.</p>
      </section>
      ${noteCards(D.societyCards)}`;
  }

  // --- Router ---------------------------------------------------------------
  const routes = { '': viewHome, population: viewPopulation, economy: viewEconomy, society: viewSociety };

  function render() {
    const key = location.hash.replace(/^#\/?/, '').split('/')[0];
    (routes[key] ?? viewHome)();
    for (const a of document.querySelectorAll('.site-nav a')) {
      a.classList.toggle('active', a.dataset.route === (key === '' ? 'home' : key));
    }
    window.scrollTo(0, 0);
  }

  document.getElementById('sources-line').textContent = 'Sources: ' + D.sources.join(' ');
  window.addEventListener('hashchange', render);
  render();
})();
