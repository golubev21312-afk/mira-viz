(function () {

  function fmt(val) {
    if (val === null || val === undefined || val === 0) return '—';
    return Math.round(val * 100) + '%';
  }

  function drawViz(data) {
    try { _draw(data); } catch(e) {
      document.body.innerHTML = '<pre style="padding:10px;font-size:10px;color:red;white-space:pre-wrap">' +
        'ERR: ' + e.message + '\n\nDATA:\n' + JSON.stringify(data, null, 2).slice(0, 3000) + '</pre>';
    }
  }

  function _draw(data) {
    var rows = data.tables.DEFAULT || data.tables.concepts || [];

    if (!rows || rows.length === 0) {
      document.body.innerHTML = '<div style="padding:20px;font-family:\'Courier New\',monospace;color:#888;font-size:12px;">Connect a data source</div>';
      return;
    }

    rows.sort(function (a, b) {
      var sd = Number(a.section_order[0]) - Number(b.section_order[0]);
      return sd !== 0 ? sd : Number(a.step_order[0]) - Number(b.step_order[0]);
    });

    var sections = [];
    var seen = {};
    rows.forEach(function (r) {
      var sec = r.section[0];
      if (!seen[sec]) {
        seen[sec] = { name: sec, steps: [] };
        sections.push(seen[sec]);
      }
      seen[sec].steps.push({
        name:    r.step_name[0],
        reach:   r.reach_pct[0]   || 0,
        filled:  r.filled_pct[0]  || 0,
        skipped: (r.skipped_pct  && r.skipped_pct[0])  || 0,
        dropped: Math.abs((r.dropped_pct && r.dropped_pct[0]) || 0)
      });
    });

    var css = '<style>' +
      '* { box-sizing: border-box; margin: 0; padding: 0; }' +
      'body { font-family: "Courier New", monospace; font-size: 13px; color: #111; background: #fff; }' +
      '.wrap { padding: 8px 14px 16px; }' +
      '.legend { display: flex; gap: 20px; margin-bottom: 16px; }' +
      '.legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #555; }' +
      '.legend-dot { width: 10px; height: 10px; border-radius: 1px; }' +
      '.dot-filled    { background: #111; }' +
      '.dot-skipped   { background: #aaa; }' +
      '.dot-abandoned { background: #e8b4b0; }' +
      '.funnel-row { display: grid; grid-template-columns: 220px 1fr 60px 70px 70px 70px; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f0f0f0; }' +
      '.funnel-row:last-child { border-bottom: none; }' +
      '.funnel-row.section-header { background: #f9f9f9; padding: 8px 4px 4px 4px; margin-top: 4px; }' +
      '.funnel-step-name { font-size: 11px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold; }' +
      '.bar-container { height: 16px; background: #f0f0f0; border-radius: 2px; overflow: hidden; display: flex; }' +
      '.bar-filled    { background: #111; height: 100%; }' +
      '.bar-skipped   { background: #bbb; height: 100%; }' +
      '.bar-abandoned { background: #e8b4b0; height: 100%; }' +
      '.pct       { font-size: 12px; font-weight: bold; text-align: right; }' +
      '.pct-small { font-size: 11px; text-align: right; color: #888; }' +
      '.pct-red   { font-size: 11px; text-align: right; color: #c0392b; font-weight: bold; }' +
      '.col-header     { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; text-align: right; }' +
      '.col-header-bar { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; }' +
      '</style>';

    var body = '<div class="wrap">';

    body += '<div class="legend">' +
      '<div class="legend-item"><div class="legend-dot dot-filled"></div>completed</div>' +
      '<div class="legend-item"><div class="legend-dot dot-skipped"></div>skipped</div>' +
      '<div class="legend-item"><div class="legend-dot dot-abandoned"></div>abandoned</div>' +
      '</div>';

    body += '<div class="funnel-row" style="border-bottom: 2px solid #e0e0e0; padding-bottom: 6px;">' +
      '<div class="col-header" style="text-align:left">Step</div>' +
      '<div class="col-header-bar">Progress</div>' +
      '<div class="col-header">% reach</div>' +
      '<div class="col-header">filled</div>' +
      '<div class="col-header">skipped</div>' +
      '<div class="col-header">dropped</div>' +
      '</div>';

    sections.forEach(function (sec) {
      var label = sec.name.replace(/_/g, ' ');
      body += '<div class="funnel-row section-header"><div class="funnel-step-name section-label" style="grid-column:1/-1">— ' + label + ' —</div></div>';

      sec.steps.forEach(function (s) {
        var hasSkipped = s.skipped > 0.001;

        var bFilled   = (s.reach * s.filled  * 100).toFixed(1);
        var bSkipped  = (s.reach * s.skipped * 100).toFixed(1);
        var bAbandoned = hasSkipped
          ? (s.reach * s.dropped * 100).toFixed(1)
          : (s.dropped * 100).toFixed(1);

        var droppedCls = s.dropped > 0.05 ? 'pct-red' : 'pct-small';
        var droppedStr = s.dropped > 0 ? '-' + Math.round(s.dropped * 100) + '%' : '—';

        body += '<div class="funnel-row">' +
          '<div class="funnel-step-name">' + s.name + '</div>' +
          '<div class="bar-container">' +
            '<div class="bar-filled"    style="width:' + bFilled    + '%"></div>' +
            '<div class="bar-skipped"   style="width:' + bSkipped   + '%"></div>' +
            '<div class="bar-abandoned" style="width:' + bAbandoned + '%"></div>' +
          '</div>' +
          '<div class="pct">'       + fmt(s.reach)   + '</div>' +
          '<div class="pct-small">' + fmt(s.filled)  + '</div>' +
          '<div class="pct-small">' + (s.skipped > 0 ? fmt(s.skipped) : '—') + '</div>' +
          '<div class="' + droppedCls + '">' + droppedStr + '</div>' +
          '</div>';
      });
    });

    body += '</div>';
    document.body.innerHTML = css + body;
  }

  function init() {
    try {
      dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
    } catch(e) {
      document.body.innerHTML = '<pre style="padding:10px;font-size:10px;color:red;white-space:pre-wrap">INIT ERR: ' + e.message + '</pre>';
    }
  }

  if (typeof dscc !== 'undefined') {
    init();
  } else {
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/@google/dscc/dist/dscc.min.js';
    s.onload = init;
    s.onerror = function() {
      document.body.innerHTML = '<pre style="padding:10px;font-size:10px;color:red;">dscc library failed to load</pre>';
    };
    document.head.appendChild(s);
  }

})();
