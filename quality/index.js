/* MIRA — Profile Quality Community Visualization
   Точная копия ТЗ: grid 180px 1fr 55px 70px 70px */

(function () {

  var SECTION_LABELS = {
    'basic_info':       'Basic Info',
    'values_lifestyle': 'Optional',
    'visual_test':      'Visual Test',
    'swot':             'SWOT',
    'question_photos':  'Question + Photos'
  };

  function fmtPct(val) {
    if (val === null || val === undefined) return '—';
    return Math.round(val * 100) + '%';
  }

  function fmtCount(n) {
    if (n === null || n === undefined || n === 0) return '—';
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function drawViz(data) {
    var rows = data.tables.DEFAULT;

    rows.sort(function (a, b) {
      var sd = Number(a.section_order[0]) - Number(b.section_order[0]);
      return sd !== 0 ? sd : Number(a.step_order[0]) - Number(b.step_order[0]);
    });

    var sections = [];
    var seen = {};
    rows.forEach(function (r) {
      var sec = r.section[0];
      if (!seen[sec]) {
        seen[sec] = { key: sec, steps: [] };
        sections.push(seen[sec]);
      }
      seen[sec].steps.push({
        label:   r.step_label[0],
        fillPct: r.fill_pct[0]  || 0,
        filled:  r.filled[0]    || 0,
        skipped: r.skipped[0]   || 0
      });
    });

    /* ── CSS точно из ТЗ ── */
    var css = '<style>' +
      '* { box-sizing: border-box; margin: 0; padding: 0; }' +
      'body { font-family: "Courier New", monospace; background: #fff; color: #111; font-size: 13px; }' +
      '.wrap { padding: 16px 20px; }' +
      '.legend { display: flex; gap: 20px; margin-bottom: 16px; }' +
      '.legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #555; }' +
      '.legend-dot { width: 10px; height: 10px; border-radius: 1px; }' +
      '.dot-filled  { background: #111; }' +
      '.dot-skipped { background: #aaa; }' +
      '.quality-row { display: grid; grid-template-columns: 180px 1fr 55px 70px 70px; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f0f0f0; }' +
      '.quality-row:last-child { border-bottom: none; }' +
      '.quality-row.section-header { background: #f9f9f9; padding: 8px 4px 4px 4px; }' +
      '.section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold; }' +
      '.field-name { font-size: 11px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.bar-container { height: 16px; background: #f0f0f0; border-radius: 2px; overflow: hidden; display: flex; }' +
      '.bar-filled  { background: #111; height: 100%; }' +
      '.bar-skipped { background: #bbb; height: 100%; }' +
      '.pct       { font-size: 12px; font-weight: bold; text-align: right; }' +
      '.pct-small { font-size: 11px; text-align: right; color: #888; }' +
      '.col-header     { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; text-align: right; }' +
      '.col-header-bar { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; }' +
      '</style>';

    var html = '<div class="wrap">';

    /* Legend */
    html += '<div class="legend">' +
      '<div class="legend-item"><div class="legend-dot dot-filled"></div>filled</div>' +
      '<div class="legend-item"><div class="legend-dot dot-skipped"></div>skipped</div>' +
      '</div>';

    /* Column headers */
    html += '<div class="quality-row" style="border-bottom: 2px solid #e0e0e0; padding-bottom: 6px;">' +
      '<div class="col-header" style="text-align:left;">Field</div>' +
      '<div class="col-header-bar">Fill rate</div>' +
      '<div class="col-header">%</div>' +
      '<div class="col-header">filled</div>' +
      '<div class="col-header">skipped</div>' +
      '</div>';

    /* Rows */
    sections.forEach(function (sec) {
      var label = SECTION_LABELS[sec.key] || sec.key.replace(/_/g, ' ');

      html += '<div class="quality-row section-header">' +
        '<div class="section-label" style="grid-column:1/-1">— ' + label + ' —</div>' +
        '</div>';

      sec.steps.forEach(function (s) {
        /* Бар: filled занимает fill_pct%, skipped занимает оставшиеся (1-fill_pct)% */
        var bFilled  = (s.fillPct * 100).toFixed(1);
        var bSkipped = ((1 - s.fillPct) * 100).toFixed(1);

        html += '<div class="quality-row">' +
          '<div class="field-name">' + s.label + '</div>' +
          '<div class="bar-container">' +
            '<div class="bar-filled"  style="width:' + bFilled  + '%"></div>' +
            '<div class="bar-skipped" style="width:' + bSkipped + '%"></div>' +
          '</div>' +
          '<div class="pct">'       + fmtPct(s.fillPct) + '</div>' +
          '<div class="pct-small">' + fmtCount(s.filled)  + '</div>' +
          '<div class="pct-small">' + fmtCount(s.skipped) + '</div>' +
          '</div>';
      });
    });

    html += '</div>';
    document.body.innerHTML = css + html;
  }

  dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });

})();
