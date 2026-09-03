/* Preview shim: vanilla replacements for the React behaviours, driven by data-* hooks. */
(function () {
  var app = document.getElementById("app");
  var tpls = {};
  document.querySelectorAll("template[data-route]").forEach(function (t) { tpls[t.getAttribute("data-route")] = t; });
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  var raf = 0;

  function routeFromHash() {
    var h = location.hash || "";
    if (h.indexOf("#/") !== 0) return "/";
    var p = h.slice(1).split("?")[0].replace(/\/+$/, "");
    return p || "/";
  }
  function queryFromHash() {
    var h = location.hash || ""; var i = h.indexOf("?");
    return i < 0 ? "" : h.slice(i + 1);
  }
  function render() {
    timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf);
    var path = routeFromHash();
    var tpl = tpls[path] || tpls["/__404"];
    app.innerHTML = tpl.innerHTML;
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    wire();
  }

  function cls(el, remove, add) { remove.forEach(function (c) { el.classList.remove(c); }); add.forEach(function (c) { el.classList.add(c); }); }

  function wire() {
    /* internal links → hash routes; in-page anchors → smooth scroll */
    app.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href.charAt(0) === "/" && href.charAt(1) !== "/") {
        a.addEventListener("click", function (e) { e.preventDefault(); location.hash = "#" + href; });
      } else if (href.charAt(0) === "#") {
        a.addEventListener("click", function (e) { e.preventDefault(); var t = app.querySelector(href); if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); });
      }
    });

    /* nav scroll state */
    var nav = app.querySelector("[data-nav]");
    var onScroll = function () { if (!nav) return; var s = window.scrollY > 24; nav.classList.toggle("bg-ink/70", s); nav.classList.toggle("backdrop-blur-xl", s); nav.classList.toggle("bg-transparent", !s && !nav.dataset.open); };
    window.onscroll = onScroll; onScroll();

    /* mega menu */
    var trigger = app.querySelector("[data-mega-trigger]"); var panel = app.querySelector("[data-mega-panel]");
    if (trigger && panel) {
      var show = function () { cls(panel, ["pointer-events-none", "translate-y-2", "opacity-0"], ["pointer-events-auto", "translate-y-0", "opacity-100"]); };
      var hide = function () { cls(panel, ["pointer-events-auto", "translate-y-0", "opacity-100"], ["pointer-events-none", "translate-y-2", "opacity-0"]); };
      trigger.addEventListener("mouseenter", show); trigger.closest("nav").addEventListener("mouseleave", hide);
    }

    /* mobile drawer */
    var toggle = app.querySelector("[data-menu-toggle]"); var drawer = app.querySelector("[data-drawer]");
    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        var open = drawer.classList.contains("opacity-0");
        if (open) { cls(drawer, ["pointer-events-none", "opacity-0"], ["pointer-events-auto", "opacity-100"]); nav.classList.add("bg-ink"); nav.classList.remove("bg-transparent"); nav.dataset.open = "1"; document.body.style.overflow = "hidden"; }
        else { cls(drawer, ["pointer-events-auto", "opacity-100"], ["pointer-events-none", "opacity-0"]); nav.classList.remove("bg-ink"); delete nav.dataset.open; document.body.style.overflow = ""; onScroll(); }
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    /* accordion */
    app.querySelectorAll("[data-accordion-item]").forEach(function (item) {
      var btn = item.querySelector("button"), body = item.querySelector("[data-accordion-body]"), icon = item.querySelector("[data-accordion-icon]");
      btn.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-accordion-item") === "open";
        item.parentElement.querySelectorAll("[data-accordion-item]").forEach(function (o) {
          o.setAttribute("data-accordion-item", "closed");
          cls(o.querySelector("[data-accordion-body]"), ["grid-rows-[1fr]"], ["grid-rows-[0fr]"]);
          o.querySelector("[data-accordion-icon]").classList.remove("rotate-45");
          o.querySelector("button").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) { item.setAttribute("data-accordion-item", "open"); cls(body, ["grid-rows-[0fr]"], ["grid-rows-[1fr]"]); icon.classList.add("rotate-45"); btn.setAttribute("aria-expanded", "true"); }
      });
    });

    /* reveal */
    document.documentElement.classList.add("js");
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    app.querySelectorAll(".reveal").forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight * 1.2) el.classList.add("in"); else io.observe(el); });

    /* stat count-up */
    app.querySelectorAll("[data-stat]").forEach(function (el) {
      var target = el.getAttribute("data-stat"); var num = Number(target.replace(/,/g, "")); var dec = target.indexOf(".") >= 0 ? target.split(".")[1].length : 0;
      var fmt = function (n) { return n.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec }); };
      if (reduced) { el.textContent = fmt(num); return; }
      var o = new IntersectionObserver(function (es) { if (!es[0].isIntersecting) return; o.disconnect(); var start = performance.now();
        (function step(t) { var p = Math.min(1, (t - start) / 1400); var ease = 1 - Math.pow(1 - p, 3); el.textContent = fmt(num * ease); if (p < 1) requestAnimationFrame(step); })(start); }, { threshold: 0.4 });
      o.observe(el);
    });

    /* filters (work + insights) */
    var pillOn = ["border-fg", "bg-fg", "text-ink"], pillOff = ["border-line", "text-muted"];
    var sideOn = ["bg-white/6", "text-fg"], sideOff = ["text-muted"];
    var active = { practice: "All", vertical: "All", cluster: "all" };
    var applyFilters = function () {
      app.querySelectorAll("[data-item]").forEach(function (it) {
        var ok = true;
        if (it.hasAttribute("data-practice")) ok = (active.practice === "All" || it.getAttribute("data-practice") === active.practice) && (active.vertical === "All" || it.getAttribute("data-vertical") === active.vertical);
        if (it.hasAttribute("data-cluster")) ok = active.cluster === "all" || it.getAttribute("data-cluster") === active.cluster;
        var host = it.hasAttribute("data-cluster") ? it.closest(".reveal") || it : it;
        host.hidden = !ok;
      });
    };
    app.querySelectorAll("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        var kind = b.getAttribute("data-filter"), val = b.getAttribute("data-value"); active[kind] = val;
        app.querySelectorAll('[data-filter="' + kind + '"]').forEach(function (o) {
          var on = o.getAttribute("data-value") === val;
          if (kind === "cluster") cls(o, on ? sideOff : sideOn, on ? sideOn : sideOff); else cls(o, on ? pillOff : pillOn, on ? pillOn : pillOff);
        });
        applyFilters();
      });
    });

    /* placeholder pill */
    var ph = app.querySelector("[data-ph-toggle]"); var phLabel = app.querySelector("[data-ph-label]");
    if (ph) {
      var hidden = document.body.classList.contains("ph-hidden");
      var setLabel = function () { var n = app.querySelectorAll("[data-placeholder]").length; phLabel.textContent = n + " placeholder" + (n === 1 ? "" : "s") + " · " + (hidden ? "show" : "hide"); ph.querySelector("span").className = "size-1.5 rounded-full " + (hidden ? "bg-dim" : "bg-ember"); };
      setLabel();
      ph.addEventListener("click", function () { hidden = !hidden; document.body.classList.toggle("ph-hidden", hidden); setLabel(); });
    }

    /* forms → thank-you */
    app.querySelectorAll("form").forEach(function (f) { f.addEventListener("submit", function (e) { e.preventDefault(); var t = f.querySelector('[name="type"]'); location.hash = "#/contact/thanks" + (t ? "?type=" + t.value : ""); }); });
    var q = queryFromHash(); var m = /type=([\w-]+)/.exec(q);
    if (m) { var sel = app.querySelector('select[name="type"]'); if (sel) sel.value = m[1]; }

    /* portal */
    var portal = app.querySelector("[data-portal]");
    if (portal) {
      var agents = portal.querySelector("[data-portal-agents]"), divider = portal.querySelector("[data-portal-divider]");
      var setX = function (x) { agents.style.clipPath = "inset(0 0 0 " + x + "%)"; divider.style.left = x + "%"; };
      portal.addEventListener("mousemove", function (e) { var r = portal.getBoundingClientRect(); setX(Math.max(12, Math.min(88, ((e.clientX - r.left) / r.width) * 100))); });
      portal.addEventListener("mouseleave", function () { setX(52); });
    }

    /* run log */
    var log = app.querySelector("[data-run-log]");
    if (log) {
      var LINES = [
        ["prospecting", "universe refreshed · 4,212 accounts scanned · 38 moved to active tier", ""],
        ["research", "brief built · Northwind Logistics · S/4 migration · new CIO · 3 open roles", ""],
        ["qualify", "PASS · ICP tier 1 · fit 0.91 · signal 0.84 · score 87", "text-fg"],
        ["outreach", "drafted 1/6 · VP Applications · email · references integration-risk checklist", ""],
        ["outreach", "sent · warmed domain ls-mail-03 · deliverability 99.2%", ""],
        ["conversation", "reply received · \"can you send the checklist and a case?\" · handled", "text-fg"],
        ["conversation", "reply received · \"how does pricing compare to Vendor X?\" · escalated → AE-North", "text-ember-2"],
        ["scheduling", "meeting booked · Thu 11:30 IST · calendar + CRM updated · brief sent to AE-North", "text-ion"],
        ["report", "today · 38 engaged · 11 replies · 2 escalations · 3 meetings booked", ""]
      ];
      var cursor = log.lastElementChild; var i = 0;
      var line = function (l) { var d = document.createElement("div"); d.className = "flex gap-3"; d.innerHTML = '<span class="w-[6.5rem] shrink-0 text-dim">▸ ' + l[0] + '</span><span class="' + (l[2] || "text-muted") + '"></span>'; d.lastChild.textContent = l[1]; log.insertBefore(d, cursor); };
      var clear = function () { while (log.firstElementChild !== cursor) log.removeChild(log.firstElementChild); };
      var tick = function () {
        line(LINES[i]); i += 1;
        if (i >= LINES.length) timers.push(setTimeout(function () { clear(); i = 0; timers.push(setTimeout(tick, 600)); }, 5000));
        else timers.push(setTimeout(tick, 900 + Math.random() * 700));
      };
      if (reduced) LINES.forEach(line); else timers.push(setTimeout(tick, 700));
    }

    /* signal field */
    var canvas = app.querySelector("[data-signal-field]");
    if (canvas) signalField(canvas);
  }

  function signalField(canvas) {
    var ctx = canvas.getContext("2d"); if (!ctx) return;
    var w = 0, h = 0, dpr = 1, ps = [], gates = [0.34, 0.6, 0.86];
    var N = function () { return w < 720 ? 60 : 140; };
    var spawn = function (p) { var q = p || {}; q.x = -0.02 - Math.random() * 0.2; q.y = 0.12 + Math.random() * 0.76; q.vx = 0.0009 + Math.random() * 0.0011; q.vy = (Math.random() - 0.5) * 0.0003; q.stage = 0; q.alive = true; q.t = 0; q.seed = Math.random(); q.fading = 0; return q; };
    var resize = function () { dpr = Math.min(2, window.devicePixelRatio || 1); w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = []; for (var k = 0; k < N(); k++) { var p = spawn(); p.x = Math.random() * 1.1 - 0.1; p.stage = gates.filter(function (g) { return p.x > g; }).length; if (p.stage === 3) p.alive = Math.random() < 0.35; ps.push(p); } };
    var ember = function (a) { return "rgba(255,107,61," + a + ")"; }, ion = function (a) { return "rgba(124,243,214," + a + ")"; }, gray = function (a) { return "rgba(237,235,230," + a + ")"; };
    var draw = function (time) {
      ctx.clearRect(0, 0, w, h);
      var meet = { x: w * 0.955, y: h * 0.5 };
      ctx.save();
      gates.forEach(function (g, i) { var x = w * g; ctx.strokeStyle = gray(0.10); ctx.lineWidth = 1; ctx.setLineDash([2, 6]); ctx.beginPath(); ctx.moveTo(x, h * 0.12); ctx.lineTo(x, h - 34); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = gray(0.38); ctx.font = "500 10px Geist Mono, monospace"; ctx.textAlign = "center"; ctx.fillText(["IDENTIFY", "QUALIFY", "BOOK"][i], x, h - 18); });
      ctx.restore();
      var pulse = 0.5 + 0.5 * Math.sin(time / 600);
      var grd = ctx.createRadialGradient(meet.x, meet.y, 0, meet.x, meet.y, 60 + pulse * 20); grd.addColorStop(0, ion(0.35)); grd.addColorStop(1, ion(0));
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(meet.x, meet.y, 80, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ion(0.95); ctx.beginPath(); ctx.arc(meet.x, meet.y, 4 + pulse * 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ion(0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(meet.x, meet.y, 12 + pulse * 4, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 0.6;
      for (var i = 0; i < ps.length; i++) { var a = ps[i]; if (!a.alive || a.stage < 1) continue; for (var j = i + 1; j < ps.length; j++) { var b = ps[j]; if (!b.alive || b.stage < 1) continue; var dx = (a.x - b.x) * w, dy = (a.y - b.y) * h, d2 = dx * dx + dy * dy; if (d2 < 8100) { ctx.strokeStyle = ember(0.08 * (1 - d2 / 8100)); ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); } } }
      ps.forEach(function (p) {
        if (!reduced) {
          p.t += 1;
          if (p.stage === 3 && p.alive) { var tx = meet.x / w, ty = meet.y / h; p.x += (tx - p.x) * 0.02 + 0.0004; p.y += (ty - p.y) * 0.03; if (Math.abs(p.x - tx) < 0.004 && Math.abs(p.y - ty) < 0.01) spawn(p); }
          else { p.x += p.vx; p.y += p.vy + Math.sin(p.t / 40 + p.seed * 10) * 0.00025; if (!p.alive) { p.fading += 0.02; if (p.fading >= 1) spawn(p); } }
          var next = gates[p.stage];
          if (next !== undefined && p.x >= next) { p.stage += 1; var keep = [0.62, 0.55, 0.5][p.stage - 1]; if (p.alive && Math.random() > keep) p.alive = false; }
          if (p.x > 1.05) spawn(p);
        }
        var base = p.alive ? [0.22, 0.45, 0.75, 0.95][p.stage] : Math.max(0, 0.25 - p.fading * 0.25);
        var r = p.alive ? [1.2, 1.6, 2.1, 2.6][p.stage] : 1.2;
        ctx.fillStyle = p.stage === 0 ? gray(base) : p.stage === 3 ? ion(base) : ember(base);
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2); ctx.fill();
        if (p.alive && p.stage >= 2) { ctx.fillStyle = p.stage === 3 ? ion(0.12) : ember(0.12); ctx.beginPath(); ctx.arc(p.x * w, p.y * h, r * 3.2, 0, Math.PI * 2); ctx.fill(); }
      });
      if (!reduced && canvas.isConnected) raf = requestAnimationFrame(draw);
    };
    resize(); draw(0);
    new ResizeObserver(function () { resize(); if (reduced) draw(0); }).observe(canvas);
  }

  window.addEventListener("hashchange", render);
  render();
})();
