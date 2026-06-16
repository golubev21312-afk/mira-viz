/* dscc bundled */
!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return C={},n.m=t={"./src/index.ts":function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,t=1,C=arguments.length;t<C;t++)for(var n in R=arguments[t])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});var a=R("./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R("./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters.")};function E(e){return e.type===a.ConfigDataElementType.DIMENSION||e.type===a.ConfigDataElementType.METRIC}function r(e){return e===a.ConfigDataElementType.DIMENSION?-1:1}function _(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var t,C=(t=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return t(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return C.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var t,C,n={};return C=R,((t=e).length<C.length?t.map(function(e,R){return[e,C[R]]}):C.map(function(e,R){return[t[R],e]})).forEach(function(e){var R=e[0],t=e[1];void 0===n[t]&&(n[t]=[]),n[t].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),t={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){t[e.id]=e.value.map(function(e){return R[e]})})}),t};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case a.DSInteractionType.FILTER:return a.InteractionType.FILTER}}function s(e){var R=e.config.interactions;return void 0===R?{}:R.reduce(function(e,R){var t=R.supportedActions.map(n),C={type:n(R.value.type),data:R.value.data};return e[R.id]={value:C,supportedActions:t},e},{})}function u(e){return(e.dataResponse.dateRanges||[]).reduce(function(e,R){return e[R.id]={start:R.start,end:R.end},e},{})}function T(e){var R=e.dataResponse.colorMap||{};return i({},R)}N.tableTransform=function(e){return{tables:(R=e,C=N.fieldsByConfigId(R),n=_(R),E={},r=n.map(function(e){void 0===E[e]?E[e]=0:E[e]++;var R=E[e],t=C[e][R];return i(i({},t),{configId:e})}),(t={})[a.TableType.DEFAULT]={headers:[],rows:[]},o=t,R.dataResponse.tables.forEach(function(e){o[e.id]={headers:r,rows:e.rows}}),o),dateRanges:u(e),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e),colorMap:T(e)};var R,t,C,n,E,r,o},N.objectTransform=function(e){return{tables:(C=_(R=e),(t={})[a.TableType.DEFAULT]=[],n=t,R.dataResponse.tables.forEach(function(e){var R=e.rows.map(o(C));e.id===a.TableType.DEFAULT?n[e.id]=R:(void 0===n[e.id]&&(n[e.id]=[]),n[e.id]=n[e.id].concat(R))}),n),dateRanges:u(e),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e),colorMap:T(e)};var R,t,C,n};function c(e){return e===N.tableTransform||e===N.objectTransform}N.subscribeToData=function(R,t){if(c(t.transform)){var e=function(e){e.data.type===a.MessageType.RENDER?R(t.transform(e.data)):console.error("Unsupported MessageType: "+e.data.type)};window.addEventListener("message",e);var C={componentId:N.getComponentId(),type:a.ToDSMessageType.VIZ_READY};return window.parent.postMessage(C,"*"),function(){return window.removeEventListener("message",e)}}throw new Error("Only built in transform functions are supported.")}},"./src/types.ts":function(e,R,t){"use strict";var C,n,E,r,o,N,i;Object.defineProperty(R,"__esModule",{value:!0}),(C=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",C.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(R.TableType||(R.TableType={})).DEFAULT="DEFAULT",(r=R.DateRangeType||(R.DateRangeType={})).DEFAULT="DEFAULT",(o=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",o.DIMENSION="DIMENSION",o.MAX_RESULTS="MAX_RESULTS",(R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(i=R.ToDSMessageType||(R.ToDSMessageType={})).VIZ_READY="vizReady",i.INTERACTION="vizAction",(R.InteractionType||(R.InteractionType={})).FILTER="FILTER"}},n.c=C,n.d=function(e,R,t){n.o(e,R)||Object.defineProperty(e,R,{enumerable:!0,get:t})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.o=function(e,R){return Object.prototype.hasOwnProperty.call(e,R)},n.p="",n(n.s="./src/index.ts");function n(e){if(C[e])return C[e].exports;var R=C[e]={i:e,l:!1,exports:{}};return t[e].call(R.exports,R,R.exports,n),R.l=!0,R.exports}var t,C});

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
    var rows = (data.tables.concepts && data.tables.concepts.length ? data.tables.concepts : data.tables.DEFAULT) || [];

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

  init();

})();
