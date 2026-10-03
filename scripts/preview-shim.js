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
    var p = h.slice(1).split("?")[0].split("#")[0].replace(/\/+$/, "");
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
    /* images are embedded once in the bundle and referenced by index */
    app.querySelectorAll("[data-pv-img]").forEach(function (img) { img.src = (window.__PV_IMG || [])[+img.getAttribute("data-pv-img")]; });
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    wire();
    /* a second fragment (#/about#kingshuk-hazra) names a founder: open their
       popup, as FounderGrid does; any other id is scrolled into view */
    var frag = decodeURIComponent(location.hash.slice(1).split("?")[0].split("#")[1] || "");
    if (frag) {
      var dlg = document.getElementById("founder-" + frag);
      var host = document.getElementById(frag);
      if (dlg && dlg.showModal) { if (host) host.scrollIntoView({ block: "center" }); dlg.showModal(); }
      else if (host) setTimeout(function () { host.scrollIntoView({ block: "start" }); }, 60);
    }
  }

  function cls(el, remove, add) { remove.forEach(function (c) { el.classList.remove(c); }); add.forEach(function (c) { el.classList.add(c); }); }

  /* which nav rail item the current hash route belongs to, mirrors Nav.tsx */
  function railRoute(track) {
    if (!track.closest("[data-nav]")) return null;
    var p = routeFromHash();
    var starts = function (x) { return p === x || p.indexOf(x + "/") === 0; };
    if (p === "/") return "home";
    if (starts("/services") || starts("/practices")) return "services";
    if (starts("/insights") || starts("/resources") || starts("/work") || starts("/faq")) return "resources";
    if (starts("/about")) return "about";
    return null;
  }

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

    /* founder popups, mirrors Founders.tsx: the card opens a modal dialog;
       a click on the backdrop or the close button shuts it */
    app.querySelectorAll("[data-founder-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var d = document.getElementById("founder-" + btn.getAttribute("data-founder-open"));
        if (d && !d.open) d.showModal();
      });
    });
    app.querySelectorAll("[data-founder-dialog]").forEach(function (d) {
      d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
      var x = d.querySelector("[data-founder-close]");
      if (x) x.addEventListener("click", function () { d.close(); });
    });

    /* nav scroll state */
    var nav = app.querySelector("[data-nav]");
    var onScroll = function () {
      if (!nav) return;
      nav.classList.toggle("shadow-e2", window.scrollY > 20);
    };
    window.onscroll = onScroll; onScroll();

    /* services + resources panels (click to open, Escape or outside click to close) */
    var panels = {
      services: app.querySelector('[data-mega-panel="services"]'),
      resources: app.querySelector('[data-mega-panel="resources"]'),
    };
    var openPanel = null;
    var showPanel = function (key) {
      Object.keys(panels).forEach(function (k) {
        var el = panels[k]; if (!el) return;
        var on = k === key;
        cls(el, on ? ["pointer-events-none", "opacity-0"] : ["pointer-events-auto", "opacity-100"],
                on ? ["pointer-events-auto", "opacity-100"] : ["pointer-events-none", "opacity-0"]);
        el.classList.toggle("-translate-y-3", !on);
        el.classList.toggle("translate-y-0", on);
      });
      openPanel = key;
      app.querySelectorAll("[aria-haspopup]").forEach(function (b) {
        var mine = (b.textContent || "").trim().toLowerCase().indexOf(key || "\u0000") === 0;
        b.setAttribute("aria-expanded", String(!!key && mine));
        var chev = b.querySelector("svg:last-child");
        if (chev) chev.classList.toggle("rotate-180", !!key && mine);
      });
    };
    showPanel(null);
    app.querySelectorAll("[aria-haspopup]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var key = (btn.textContent || "").trim().toLowerCase().indexOf("service") === 0 ? "services" : "resources";
        showPanel(openPanel === key ? null : key);
      });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") showPanel(null); });
    document.addEventListener("mousedown", function (e) {
      var nav = app.querySelector("[data-nav]");
      if (openPanel && nav && !nav.contains(e.target)) showPanel(null);
    });

    /* mobile drawer */
    var toggle = app.querySelector("[data-menu-toggle]"); var drawer = app.querySelector("[data-drawer]");
    if (toggle && drawer) {
      toggle.addEventListener("click", function () {
        var open = drawer.classList.contains("opacity-0");
        if (open) { cls(drawer, ["pointer-events-none", "opacity-0"], ["pointer-events-auto", "opacity-100"]); nav.dataset.open = "1"; document.body.style.overflow = "hidden"; }
        else { cls(drawer, ["pointer-events-auto", "opacity-100"], ["pointer-events-none", "opacity-0"]); delete nav.dataset.open; document.body.style.overflow = ""; }
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    /* agent map, hover on a pointer device, tap on touch */
    (function () {
      var map = app.querySelector("#agents"); if (!map) return;
      var cards = [].slice.call(map.querySelectorAll("button[aria-expanded]"));
      var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      var onCls = ["border-ember", "bg-ember-wash", "shadow-[0_12px_30px_-20px_rgba(228,18,31,.5)]"];
      var offCls = ["border-rule", "bg-paper", "hover:border-rule-strong"];
      var set = function (card, on) {
        cls(card, on ? offCls : onCls, on ? onCls : offCls);
        card.setAttribute("aria-expanded", String(on));
        var body = card.querySelector(".grid");
        if (body) cls(body, on ? ["grid-rows-[0fr]"] : ["grid-rows-[1fr]"], on ? ["grid-rows-[1fr]"] : ["grid-rows-[0fr]"]);
        var lead = card.querySelector("p");
        if (lead) lead.classList.toggle("line-clamp-2", !on);
      };
      var clear = function () { cards.forEach(function (c) { set(c, false); }); };
      cards.forEach(function (card) {
        set(card, false);
        card.addEventListener("click", function (e) {
          e.preventDefault();
          var was = card.getAttribute("aria-expanded") === "true";
          clear(); if (!was) set(card, true);
        });
        if (canHover) {
          card.addEventListener("mouseenter", function () { clear(); set(card, true); });
          card.addEventListener("mouseleave", function () { set(card, false); });
        }
      });
      var hint = [].slice.call(map.querySelectorAll("span")).filter(function (n) {
        return (n.textContent || "").indexOf("agent for detail") >= 0;
      })[0];
      if (hint) hint.textContent = canHover ? "Hover an agent for detail" : "Tap an agent for detail";
    })();

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

    /* filters (work + insights), segmented controls with a travelling thumb */
    var pillOn = ["text-paper"], pillOff = ["text-muted", "hover:text-fg"];
    var sideOn = ["bg-sand", "text-fg", "shadow-[inset_0_0_0_1px_var(--color-rule)]"], sideOff = ["text-muted", "hover:bg-sand/60", "hover:text-fg"];
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
          o.setAttribute("aria-pressed", on ? "true" : "false");
          if (kind === "cluster") cls(o, on ? sideOff : sideOn, on ? sideOn : sideOff); else cls(o, on ? pillOff : pillOn, on ? pillOn : pillOff);
        });
        var track = b.closest(".rail-track");
        if (track) rails.forEach(function (r) { if (r.track === track) { r.current = val; r.place(val); } });
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
      portal.addEventListener("mouseleave", function () { setX(54); });
    }

    /* pipeline funnel, scroll-scrubbed bars, mirrors PipelineBars.tsx */
    var pipeline = app.querySelector("[data-pipeline]");
    if (pipeline) {
      var PSTAGES = [{ pct: 100 }, { pct: 34 }, { pct: 12 }, { pct: 5.5 }, { pct: 2.1 }];
      var PSCAN = [
        { name: "Northwind Logistics", fit: 0.91 }, { name: "Bracknell Systems", fit: 0.84 },
        { name: "Vantage Cloud", fit: 0.88 }, { name: "Fenwick Analytics", fit: 0.79 },
        { name: "Solara Health", fit: 0.93 }, { name: "Marlowe Data", fit: 0.86 },
      ];
      var PCOHORT = 10000, POVERLAP = 1.35;
      var pRows = [].slice.call(pipeline.querySelectorAll("[data-pipeline-stage]"));
      var pScanline = pipeline.querySelector("[data-pipeline-scanline]");
      var pTicker = pipeline.querySelector("[data-pipeline-ticker]");
      var pCaption = pipeline.querySelector("[data-pipeline-caption]");

      var paintStage = function (row, local, pct) {
        var livePct = pct * local;
        var count = Math.round((PCOHORT * pct) / 100 * local);
        var on = local > 0.02;
        var label = row.querySelector("[data-pipeline-label]");
        var countEl = row.querySelector("[data-pipeline-count]");
        var pctEl = row.querySelector("[data-pipeline-pct]");
        var bar = row.querySelector("[data-pipeline-bar]");
        var flow = row.querySelector("[data-pipeline-flow]");
        if (label) cls(label, on ? ["text-dim"] : ["text-fg"], on ? ["text-fg"] : ["text-dim"]);
        if (countEl) { countEl.style.opacity = on ? "1" : "0"; countEl.textContent = count.toLocaleString("en-IN"); }
        if (pctEl) pctEl.textContent = (local >= 0.999 ? pct : livePct.toFixed(1)) + "%";
        if (bar) bar.style.width = livePct + "%";
        if (flow) flow.style.opacity = on && local < 1 ? "1" : "0";
      };

      if (reduced) {
        pRows.forEach(function (row) { paintStage(row, 1, parseFloat(row.getAttribute("data-pct"))); });
        if (pScanline) pScanline.style.opacity = "0";
        if (pTicker) pTicker.innerHTML = "";
        if (pCaption) pCaption.textContent = "cohort of 10,000 accounts";
      } else {
        var pTarget = 0, pShown = 0, pRaf = 0, pTickTimer = null, pTickIndex = 0, pTickerOn = false;

        var pComputeTarget = function () {
          var rect = pipeline.getBoundingClientRect();
          var vh = window.innerHeight;
          var startY = vh * 0.88, endY = vh * 0.22;
          pTarget = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
        };

        var pSetTicker = function (on) {
          if (on === pTickerOn) return;
          pTickerOn = on;
          if (on) {
            var tick = function () {
              var cur = PSCAN[pTickIndex % PSCAN.length]; pTickIndex++;
              pTicker.innerHTML = '<div class="transition-all duration-500 translate-y-0 opacity-100">now scoring &middot; ' + cur.name + ' <span class="text-ember-ink">' + cur.fit.toFixed(2) + '</span></div>';
            };
            tick();
            pTickTimer = setInterval(tick, 1650);
          } else {
            if (pTickTimer) { clearInterval(pTickTimer); pTickTimer = null; }
            pTicker.innerHTML = '<div class="transition-all duration-500 translate-y-1 opacity-0"></div>';
          }
        };

        var pFrame = function () {
          pShown += (pTarget - pShown) * 0.16;
          if (Math.abs(pTarget - pShown) < 0.0008) pShown = pTarget;
          var progress = pShown;

          if (pTicker) pSetTicker(progress > 0.02 && progress < 0.999);
          if (pScanline) { pScanline.style.top = (progress * 100) + "%"; pScanline.style.opacity = (progress > 0.004 && progress < 0.996) ? "0.85" : "0"; }
          pRows.forEach(function (row) {
            var i = parseInt(row.getAttribute("data-i"), 10);
            var pct = parseFloat(row.getAttribute("data-pct"));
            var local = Math.max(0, Math.min(1, progress * PSTAGES.length * POVERLAP - i * POVERLAP));
            paintStage(row, local, pct);
          });
          if (pCaption) pCaption.textContent = progress >= 0.999 ? "cohort of 10,000 accounts \u00b7 run complete" : "cohort of 10,000 accounts \u00b7 scroll to run the funnel";

          if (pipeline.isConnected) pRaf = requestAnimationFrame(pFrame);
        };

        pComputeTarget();
        var prevScrollForPipeline = window.onscroll;
        window.onscroll = function () { if (prevScrollForPipeline) prevScrollForPipeline(); pComputeTarget(); };
        pRaf = requestAnimationFrame(pFrame);
      }
    }

    /* run log */
    var log = app.querySelector("[data-run-log]");
    if (log) {
      var LINES = [
        ["prospecting", "universe refreshed · 4,212 accounts scanned · 38 moved to active tier", ""],
        ["research", "brief built · Northwind Logistics · S/4 migration · new CIO · 3 open roles", ""],
        ["qualify", "PASS · ICP tier 1 · fit 0.91 · signal 0.84 · score 87", "text-[#f6f2ec]"],
        ["outreach", "drafted 1/6 · VP Applications · email · references integration-risk checklist", ""],
        ["outreach", "sent · warmed domain ls-mail-03 · deliverability 99.2%", ""],
        ["conversation", "reply · \"can you send the checklist and a case?\" · handled", "text-[#f6f2ec]"],
        ["conversation", "reply · \"how does pricing compare to Vendor X?\" · escalated → AE-North", "text-ember-2"],
        ["scheduling", "meeting booked · Thu 11:30 IST · calendar + CRM updated · brief sent", "text-ion-2"],
        ["report", "today · 38 engaged · 11 replies · 2 escalations · 3 meetings booked", ""]
      ];
      var cursor = log.lastElementChild; var i = 0;
      var line = function (l) { var d = document.createElement("div"); d.className = "flex gap-3"; d.innerHTML = '<span class="w-[6.2rem] shrink-0 text-[#7d7264]">▸ ' + l[0] + '</span><span class="' + (l[2] || "text-[#c3b9ac]") + '"></span>'; d.lastChild.textContent = l[1]; log.insertBefore(d, cursor); };
      var clear = function () { while (log.firstElementChild !== cursor) log.removeChild(log.firstElementChild); };
      var tick = function () {
        line(LINES[i]); i += 1;
        if (i >= LINES.length) timers.push(setTimeout(function () { clear(); i = 0; timers.push(setTimeout(tick, 600)); }, 5000));
        else timers.push(setTimeout(tick, 900 + Math.random() * 700));
      };
      if (reduced) LINES.forEach(line); else timers.push(setTimeout(tick, 700));
    }


    /* rail indicators, mirrors RailIndicator.tsx */
    var rails = [];
    app.querySelectorAll(".rail-track").forEach(function (track) {
      var head = track.querySelector(".rail-head");
      if (!head) return;
      var place = function (key) {
        var el = key ? track.querySelector('[data-rail-item="' + key.replace(/"/g, '\\"') + '"]') : null;
        if (!el) { head.style.opacity = "0"; return; }
        var t = track.getBoundingClientRect(), r = el.getBoundingClientRect(), x = r.left - t.left + track.scrollLeft, y = r.top - t.top + track.scrollTop;
        head.style.opacity = "1";
        if (head.hasAttribute("data-fill")) {
          head.style.transform = "translate(" + x + "px," + y + "px)";
          head.style.width = r.width + "px";
          head.style.height = r.height + "px";
        } else if (head.getAttribute("data-orientation") === "vertical") {
          head.style.transform = "translateY(" + y + "px)";
          head.style.height = r.height + "px";
        } else {
          head.style.transform = "translateX(" + x + "px)";
          head.style.width = r.width + "px";
        }
      };
      // the active item is whichever one the server rendered as pressed, or the
      // one matching the route the nav marked
      var pressed = track.querySelector('[data-rail-item][aria-pressed="true"]');
      var current = pressed ? pressed.getAttribute("data-rail-item") : railRoute(track);
      head.style.transition = "none"; place(current); void head.offsetWidth; head.style.transition = "";
      rails.push({ track: track, place: place, current: current });
    });
    window.addEventListener("resize", function () { rails.forEach(function (r) { r.place(r.current); }); });

    // one late pass: fonts land after first paint, so the rails move
    setTimeout(function () { rails.forEach(function (r) { r.place(r.current); }); }, 700);

    /* signal field */
    var canvas = app.querySelector("[data-signal-field]");
    if (canvas) signalField(canvas);
  }

  function signalField(canvas) {
    var ctx = canvas.getContext("2d"); if (!ctx) return;
    var w = 0, h = 0, dpr = 1, ps = [], gates = [0.3, 0.56, 0.8];
    var N = function () { return w < 700 ? 54 : w < 1100 ? 96 : 150; };
    var spawn = function (p) { var q = p || {}; q.x = -0.04 - Math.random() * 0.22; q.y = 0.1 + Math.random() * 0.8; q.vx = 0.0010 + Math.random() * 0.0012; q.vy = (Math.random() - 0.5) * 0.0003; q.stage = 0; q.alive = true; q.t = 0; q.seed = Math.random(); q.fading = 0; return q; };
    var resize = function () { dpr = Math.min(2, window.devicePixelRatio || 1); w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = []; for (var k = 0; k < N(); k++) { var p = spawn(); p.x = Math.random() * 1.15 - 0.15; p.stage = gates.filter(function (g) { return p.x > g; }).length; if (p.stage === 3) p.alive = Math.random() < 0.4; ps.push(p); } };
    var ember = function (a) { return "rgba(228,18,31," + a + ")"; }, ink = function (a) { return "rgba(23,18,13," + a + ")"; };
    var draw = function (time) {
      ctx.clearRect(0, 0, w, h);
      var meet = { x: w * 0.945, y: h * 0.5 };
      ctx.save();
      gates.forEach(function (g, i) { var x = w * g; ctx.strokeStyle = ink(0.13); ctx.lineWidth = 1; ctx.setLineDash([2, 7]); ctx.beginPath(); ctx.moveTo(x, h * 0.1); ctx.lineTo(x, h - 30); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = ink(0.42); ctx.font = "500 10px ui-monospace, monospace"; ctx.textAlign = "center"; ctx.letterSpacing = "1.5px"; ctx.fillText(["IDENTIFY", "QUALIFY", "BOOK"][i], x, h - 14); });
      ctx.restore();
      var pulse = 0.5 + 0.5 * Math.sin(time / 600);
      var grd = ctx.createRadialGradient(meet.x, meet.y, 0, meet.x, meet.y, 54 + pulse * 16); grd.addColorStop(0, ember(0.22)); grd.addColorStop(1, ember(0));
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(meet.x, meet.y, 72, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ember(1); ctx.beginPath(); ctx.arc(meet.x, meet.y, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = ember(0.45); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(meet.x, meet.y, 11 + pulse * 5, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 0.7;
      for (var i = 0; i < ps.length; i++) { var a = ps[i]; if (!a.alive || a.stage < 1) continue; for (var j = i + 1; j < ps.length; j++) { var b = ps[j]; if (!b.alive || b.stage < 1) continue; var dx = (a.x - b.x) * w, dy = (a.y - b.y) * h, d2 = dx * dx + dy * dy; if (d2 < 7400) { ctx.strokeStyle = ember(0.10 * (1 - d2 / 7400)); ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); } } }
      ps.forEach(function (p) {
        if (!reduced) {
          p.t += 1;
          if (p.stage === 3 && p.alive) { var tx = meet.x / w, ty = meet.y / h; p.x += (tx - p.x) * 0.022 + 0.0004; p.y += (ty - p.y) * 0.035; if (Math.abs(p.x - tx) < 0.004 && Math.abs(p.y - ty) < 0.012) spawn(p); }
          else { p.x += p.vx; p.y += p.vy + Math.sin(p.t / 44 + p.seed * 10) * 0.00022; if (!p.alive) { p.fading += 0.022; if (p.fading >= 1) spawn(p); } }
          var next = gates[p.stage];
          if (next !== undefined && p.x >= next) { p.stage += 1; var keep = [0.6, 0.55, 0.5][p.stage - 1]; if (p.alive && Math.random() > keep) p.alive = false; }
          if (p.x > 1.06) spawn(p);
        }
        var base = p.alive ? [0.16, 0.3, 0.55, 0.9][p.stage] : Math.max(0, 0.16 - p.fading * 0.16);
        var r = p.alive ? [1.3, 1.7, 2.2, 2.8][p.stage] : 1.3;
        ctx.fillStyle = p.stage === 0 ? ink(base) : ember(base);
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, r, 0, Math.PI * 2); ctx.fill();
        if (p.alive && p.stage >= 2) { ctx.fillStyle = ember(0.1); ctx.beginPath(); ctx.arc(p.x * w, p.y * h, r * 3.4, 0, Math.PI * 2); ctx.fill(); }
      });
      if (!reduced && canvas.isConnected) raf = requestAnimationFrame(draw);
    };
    resize(); draw(0);
    new ResizeObserver(function () { resize(); if (reduced) draw(0); }).observe(canvas);
  }

  window.addEventListener("hashchange", render);
  render();
})();
