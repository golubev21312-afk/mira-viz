(function () {

  function fmt(val) {
    if (val === null || val === undefined || val === 0) return '—';
    return Math.round(val * 100) + '%';
  }

  function drawViz(data) {
    var rows = data.tables.DEFAULT;

    // Sort: section_order → step_order
    rows.sort(function (a, b) {
      var sd = Number(a.section_order[0]) - Number(b.section_order[0]);
      return sd !== 0 ? sd : Number(a.step_order[0]) - Number(b.step_order[0]);
    });

    // Group by section
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
      'body { font-family: "Courier New", monospace; font-size: 12px; color: #111; background: #fff; }' +
      '.wrap { padding: 8px 14px 16px; }' +
      '.legend { display: flex; gap: 16px; padding: 6px 0 10px; }' +
      '.legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #555; }' +
      '.dot { width: 9px; height: 9px; border-radius: 1px; }' +
      '.row { display: grid; grid-template-columns: 170px 1fr 58px 60px 60px 62px; align-items: center; gap: 6px; padding: 4px 0; border-bottom: 1px solid #f0f0f0; }' +
      '.row:last-child { border-bottom: none; }' +
      '.sec-hdr { grid-column: 1/-1; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold; background: #f9f9f9; padding: 5px 4px 3px; margin-top: 4px; }' +
      '.col-hdr { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #aaa; text-align: right; }' +
      '.step { font-size: 11px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.bar-wrap { height: 13px; background: #f0f0f0; border-radius: 2px; overflow: hidden; display: flex; }' +
      '.bf { background: #111; height: 100%; }' +
      '.bs { background: #bbb; height: 100%; }' +
      '.bd { background: #e8b4b0; height: 100%; }' +
      '.n  { font-size: 11px; text-align: right; font-weight: bold; }' +
      '.ng { font-size: 11px; text-align: right; color: #999; }' +
      '.nr { font-size: 11px; text-align: right; color: #c0392b; font-weight: bold; }' +
      '</style>';

    var body = '<div class="wrap">';

    body += '<div class="legend">' +
      '<div class="legend-item"><div class="dot" style="background:#111"></div>completed</div>' +
      '<div class="legend-item"><div class="dot" style="background:#bbb"></div>skipped</div>' +
      '<div class="legend-item"><div class="dot" style="background:#e8b4b0"></div>dropped</div>' +
      '</div>';

    body += '<div class="row" style="border-bottom:2px solid #e0e0e0;padding-bottom:5px;">' +
      '<div class="col-hdr" style="text-align:left">Step</div>' +
      '<div class="col-hdr" style="text-align:left">Progress</div>' +
      '<div class="col-hdr">reach</div>' +
      '<div class="col-hdr">filled</div>' +
      '<div class="col-hdr">skipped</div>' +
      '<div class="col-hdr">dropped</div>' +
      '</div>';

    sections.forEach(function (sec) {
      var label = sec.name.replace(/_/g, ' ');
      body += '<div class="row"><div class="sec-hdr">— ' + label + ' —</div></div>';

      sec.steps.forEach(function (s) {
        var hasSkipped = s.skipped > 0.001;

        // Bar widths as % of container
        var bFilled  = (s.reach * s.filled  * 100).toFixed(1);
        var bSkipped = (s.reach * s.skipped * 100).toFixed(1);
        // Sequential: dropped is absolute step-to-step delta
        // Optional (has skipped): dropped is relative to reach
        var bDropped = hasSkipped
          ? (s.reach * s.dropped * 100).toFixed(1)
          : (s.dropped * 100).toFixed(1);

        var droppedCls = s.dropped > 0.05 ? 'nr' : 'ng';
        var droppedStr = s.dropped > 0 ? '-' + Math.round(s.dropped * 100) + '%' : '—';

        body += '<div class="row">' +
          '<div class="step">' + s.name + '</div>' +
          '<div class="bar-wrap">' +
            '<div class="bf" style="width:' + bFilled  + '%"></div>' +
            '<div class="bs" style="width:' + bSkipped + '%"></div>' +
            '<div class="bd" style="width:' + bDropped + '%"></div>' +
          '</div>' +
          '<div class="n">'  + fmt(s.reach)   + '</div>' +
          '<div class="ng">' + fmt(s.filled)  + '</div>' +
          '<div class="ng">' + (s.skipped > 0 ? fmt(s.skipped) : '—') + '</div>' +
          '<div class="' + droppedCls + '">' + droppedStr + '</div>' +
          '</div>';
      });
    });

    body += '</div>';
    document.body.innerHTML = css + body;
  }

  dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });

})();
