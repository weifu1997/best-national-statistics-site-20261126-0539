// China in Numbers — chart drawing.
//
// Three small builders that return inline SVG strings: vertical bars, a line
// with dots, and a donut. No library, no canvas: the charts are part of the
// page, scale with it, and print cleanly. Each builder takes plain data and a
// few display options and handles its own scaling.

window.CN_CHARTS = (() => {
  const NS = 'http://www.w3.org/2000/svg';

  function fmt(n, digits = 0) {
    return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  // Vertical bars. items: [{label, value}]. options: {unit, color, height, digits}
  function barChart(items, options = {}) {
    const w = 720, h = options.height ?? 300, padTop = 26, padBottom = 30, padX = 8;
    const max = Math.max(...items.map((d) => d.value)) * 1.08;
    const step = (w - padX * 2) / items.length;
    const barW = Math.min(64, step * 0.62);
    let s = `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img">`;
    s += `<line x1="${padX}" y1="${h - padBottom}" x2="${w - padX}" y2="${h - padBottom}" class="axis"/>`;
    items.forEach((d, i) => {
      const bh = ((h - padTop - padBottom) * d.value) / max;
      const x = padX + step * i + (step - barW) / 2;
      const y = h - padBottom - bh;
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" class="bar" style="--bar:${options.color ?? 'var(--accent)'}"/>`;
      s += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" class="bar-value">${fmt(d.value, options.digits ?? 0)}${options.unit ?? ''}</text>`;
      s += `<text x="${(x + barW / 2).toFixed(1)}" y="${h - padBottom + 19}" class="bar-label">${d.label}</text>`;
    });
    return s + '</svg>';
  }

  // Line with dots. points: [{label, value}]. options: {unit, digits, height}
  function lineChart(points, options = {}) {
    const w = 720, h = options.height ?? 300, padTop = 28, padBottom = 30, padLeft = 14, padRight = 14;
    const values = points.map((d) => d.value);
    const min = Math.min(...values), max = Math.max(...values);
    const span = (max - min) || 1;
    const lo = min - span * 0.18, hi = max + span * 0.22;
    const x = (i) => padLeft + ((w - padLeft - padRight) * i) / (points.length - 1);
    const y = (v) => padTop + ((h - padTop - padBottom) * (hi - v)) / (hi - lo);
    const path = points.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
    let s = `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img">`;
    s += `<line x1="${padLeft}" y1="${h - padBottom}" x2="${w - padRight}" y2="${h - padBottom}" class="axis"/>`;
    s += `<path d="${path}" class="line"/>`;
    points.forEach((d, i) => {
      s += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="4" class="dot"/>`;
      s += `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 11).toFixed(1)}" class="bar-value">${fmt(d.value, options.digits ?? 0)}${options.unit ?? ''}</text>`;
      s += `<text x="${x(i).toFixed(1)}" y="${h - padBottom + 19}" class="bar-label">${d.label}</text>`;
    });
    return s + '</svg>';
  }

  // Donut of shares. parts: [{label, share, color}]. options: {centerTop, centerBottom}
  function donutChart(parts, options = {}) {
    const size = 260, cx = size / 2, cy = size / 2, r = 96, thick = 34;
    let angle = -90;
    let s = `<svg viewBox="0 0 ${size} ${size}" class="chart donut" role="img">`;
    for (const p of parts) {
      const sweep = (p.share / 100) * 360;
      const a0 = ((angle) * Math.PI) / 180, a1 = ((angle + sweep) * Math.PI) / 180;
      const large = sweep > 180 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}" class="slice" style="--slice:${p.color}" stroke-width="${thick}"/>`;
      angle += sweep;
    }
    s += `<text x="${cx}" y="${cy - 4}" class="donut-top">${options.centerTop ?? ''}</text>`;
    s += `<text x="${cx}" y="${cy + 18}" class="donut-bottom">${options.centerBottom ?? ''}</text>`;
    return s + '</svg>';
  }

  return { barChart, lineChart, donutChart, fmt };
})();
