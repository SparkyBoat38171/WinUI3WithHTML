/* ==========================================================================
   WinUI 3 for the Web — behavior layer
   No dependencies. Exposes window.WinUI.
   ========================================================================== */
(function (global) {
  "use strict";

  const doc = document;
  const html = doc.documentElement;
  const $ = (selector, root = doc) => root.querySelector(selector);
  const $$ = (selector, root = doc) => Array.from(root.querySelectorAll(selector));
  const on = (target, type, handler, opts) => target.addEventListener(type, handler, opts);
  const uid = (() => { let n = 0; return (p = "winui") => `${p}-${++n}`; })();
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const raf = (fn) => global.requestAnimationFrame(fn);
  const intlLocale = () => html.lang || "en-US";
  const uiText = (en, zh) => String(intlLocale()).toLowerCase().startsWith("zh") ? zh : en;
  const storage = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (_) { /* private mode */ }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (_) { /* private mode */ }
    }
  };

  const KEYS = {
    theme: "winui3.theme",
    accent: "winui3.accent",
    density: "winui3.density",
    favorites: "winui3.gallery.favorites",
    recent: "winui3.gallery.recent",
    language: "winui3.gallery.language"
  };

  /* ---------------------------------------------------------------------
     Color utilities
     --------------------------------------------------------------------- */
  function normalizeHex(value) {
    if (!value) return "#005fb8";
    value = String(value).trim();
    if (/^#?[0-9a-f]{3}$/i.test(value)) {
      value = "#" + value.replace("#", "").split("").map((c) => c + c).join("");
    }
    if (/^#?[0-9a-f]{6}$/i.test(value)) {
      return "#" + value.replace("#", "").toLowerCase();
    }
    return "#005fb8";
  }

  function hexToRgb(hex) {
    hex = normalizeHex(hex);
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("");
  }

  function luminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    const channels = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  function mix(hexA, hexB, amount) {
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    return rgbToHex(
      a.r + (b.r - a.r) * amount,
      a.g + (b.g - a.g) * amount,
      a.b + (b.b - a.b) * amount
    );
  }

  function hsvToRgb(h, s, v) {
    h = ((h % 360) + 360) % 360;
    s = clamp(s, 0, 1);
    v = clamp(v, 0, 1);
    const c = v * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - c;
    let r = 0, g = 0, b = 0;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
  }

  function rgbToHsv(hex) {
    const { r, g, b } = hexToRgb(hex);
    const rr = r / 255, gg = g / 255, bb = b / 255;
    const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === rr) h = 60 * (((gg - bb) / d) % 6);
      else if (max === gg) h = 60 * ((bb - rr) / d + 2);
      else h = 60 * ((rr - gg) / d + 4);
    }
    if (h < 0) h += 360;
    return { h, s: max === 0 ? 0 : d / max, v: max };
  }

  const ACCENT_PRESETS = [
    { name: "Windows blue", value: "#0078d4" },
    { name: "Sea foam", value: "#00b7c3" },
    { name: "Mint", value: "#00cc6a" },
    { name: "Lime", value: "#7a9e00" },
    { name: "Gold", value: "#c19c00" },
    { name: "Orange", value: "#ca5010" },
    { name: "Coral", value: "#e3008c" },
    { name: "Rose", value: "#c239b3" },
    { name: "Violet", value: "#8764b8" },
    { name: "Iris", value: "#6b69d6" }
  ];

  function readSystemAccent() {
    try {
      const probe = doc.createElement("span");
      probe.style.cssText = "position:fixed;left:-9999px;top:-9999px;color:AccentColor;";
      doc.documentElement.appendChild(probe);
      const color = global.getComputedStyle(probe).color;
      probe.remove();
      const match = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
      if (match) {
        const r = Number(match[1]), g = Number(match[2]), b = Number(match[3]);
        if (r + g + b > 0) return rgbToHex(r, g, b);
      }
    } catch (_) { /* AccentColor is not available in every browser. */ }
    return "#0078d4";
  }

  /* ---------------------------------------------------------------------
     Theme + accent
     --------------------------------------------------------------------- */
  let accentValue = normalizeHex(storage.get(KEYS.accent, readSystemAccent()));
  const systemTheme = global.matchMedia("(prefers-color-scheme: dark)");

  function effectiveTheme(theme) {
    return theme === "system" ? (systemTheme.matches ? "dark" : "light") : theme;
  }

  function applyTheme(theme, persist = true) {
    theme = ["light", "dark", "system"].includes(theme) ? theme : "system";
    const resolved = effectiveTheme(theme);
    html.dataset.theme = resolved;
    html.dataset.themeMode = theme;
    html.style.colorScheme = resolved;
    if (persist) storage.set(KEYS.theme, theme);
    applyAccent(accentValue, false);
    doc.dispatchEvent(new CustomEvent("winui:themechange", { detail: { theme: resolved, mode: theme } }));
    return resolved;
  }

  function applyAccent(value, persist = true) {
    const accent = normalizeHex(value);
    accentValue = accent;
    const dark = html.dataset.theme === "dark";
    const rgb = hexToRgb(accent);
    const onAccent = luminance(accent) > 0.52 ? "#000000" : "#ffffff";
    html.style.setProperty("--win-accent", accent);
    html.style.setProperty("--win-accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    html.style.setProperty("--win-accent-hover", mix(accent, dark ? "#ffffff" : "#ffffff", dark ? 0.12 : 0.08));
    html.style.setProperty("--win-accent-pressed", mix(accent, "#000000", dark ? 0.18 : 0.12));
    html.style.setProperty("--win-accent-text", mix(accent, dark ? "#ffffff" : "#000000", dark ? 0.28 : 0.34));
    html.style.setProperty("--win-on-accent", onAccent);
    html.style.setProperty("--win-text-on-accent", onAccent);
    html.style.setProperty("--win-accent-selected", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${dark ? 0.16 : 0.1})`);
    if (persist) storage.set(KEYS.accent, accent);
    doc.dispatchEvent(new CustomEvent("winui:accentchange", { detail: { accent } }));
    return accent;
  }

  function applyDensity(density, persist = true) {
    if (density === "compact") html.dataset.density = "compact";
    else delete html.dataset.density;
    if (persist) storage.set(KEYS.density, density);
    return density;
  }

  systemTheme.addEventListener("change", () => {
    if (html.dataset.themeMode === "system") applyTheme("system", false);
  });

  // Initial theme: stored preference, or system.
  const queryTheme = new URLSearchParams(global.location.search).get("theme");
  html.dataset.themeMode = ["light", "dark", "system"].includes(queryTheme) ? queryTheme : storage.get(KEYS.theme, "system");
  applyTheme(html.dataset.themeMode, false);
  applyDensity(storage.get(KEYS.density, "normal"), false);

  /* ---------------------------------------------------------------------
     Focus / a11y helpers
     --------------------------------------------------------------------- */
  const focusableSelector = [
    "a[href]", "button:not([disabled])", "input:not([disabled])",
    "select:not([disabled])", "textarea:not([disabled])", "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  function trapFocus(container, event) {
    const nodes = $$(focusableSelector, container).filter((el) => el.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  /* ---------------------------------------------------------------------
     Tooltips
     --------------------------------------------------------------------- */
  let tooltipEl = null;
  let tooltipAnchor = null;
  let tooltipPending = null;
  let tooltipTimer = 0;

  function showTooltip(anchor) {
    hideTooltip();
    const text = anchor.getAttribute("data-tooltip");
    if (!text) return;
    tooltipPending = null;
    const compactNav = anchor.closest(".win-nav-view--compact") && anchor.classList.contains("win-nav-item");
    tooltipAnchor = anchor;
    tooltipEl = doc.createElement("div");
    tooltipEl.className = compactNav ? "win-tooltip win-nav-tooltip" : "win-tooltip";
    tooltipEl.setAttribute("role", "tooltip");
    tooltipEl.textContent = text;
    if (!compactNav) {
      const beak = doc.createElement("span");
      beak.className = "win-tooltip__beak";
      tooltipEl.appendChild(beak);
    }
    doc.body.appendChild(tooltipEl);
    positionTooltip(anchor, compactNav ? "right" : (anchor.getAttribute("data-tooltip-placement") || "top"));
  }

  function positionTooltip(anchor, preferred) {
    if (!tooltipEl) return;
    const r = anchor.getBoundingClientRect();
    const w = tooltipEl.offsetWidth, h = tooltipEl.offsetHeight;
    let placement = preferred;
    if (preferred === "auto") {
      placement = r.top > h + 12 ? "top" : "bottom";
    }
    let top, left;
    if (placement === "top") { top = r.top - h - 8; left = r.left + r.width / 2 - w / 2; }
    else if (placement === "bottom") { top = r.bottom + 8; left = r.left + r.width / 2 - w / 2; }
    else if (placement === "left") { top = r.top + r.height / 2 - h / 2; left = r.left - w - 8; }
    else { top = r.top + r.height / 2 - h / 2; left = r.right + 8; }
    left = clamp(left, 8, global.innerWidth - w - 8);
    top = clamp(top, 8, global.innerHeight - h - 8);
    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
    tooltipEl.dataset.placement = placement;
  }

  function hideTooltip() {
    clearTimeout(tooltipTimer);
    if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
    tooltipAnchor = null;
    tooltipPending = null;
  }

  on(doc, "pointerover", (event) => {
    const anchor = event.target.closest && event.target.closest("[data-tooltip]");
    if (!anchor) return;
    if (anchor.classList.contains("win-nav-item") && !anchor.closest(".win-nav-view--compact")) return;
    if (anchor === tooltipAnchor || anchor === tooltipPending) return;
    clearTimeout(tooltipTimer);
    tooltipPending = anchor;
    tooltipTimer = setTimeout(() => {
      if (tooltipPending === anchor) showTooltip(anchor);
    }, 400);
  }, true);

  on(doc, "pointerout", (event) => {
    const anchor = event.target.closest && event.target.closest("[data-tooltip]");
    if (!anchor) return;
    if (event.relatedTarget && anchor.contains(event.relatedTarget)) return;
    if (tooltipPending === anchor) {
      clearTimeout(tooltipTimer);
      tooltipPending = null;
    }
    if (tooltipAnchor === anchor) hideTooltip();
  }, true);

  on(doc, "pointerdown", hideTooltip, true);
  on(global, "scroll", hideTooltip, true);

  /* ---------------------------------------------------------------------
     Floating layer management
     --------------------------------------------------------------------- */
  const floating = { flyout: null, anchor: null, recalc: null, timer: 0 };
  let teachingTipEl = null;

  function positionFloating(el, anchor, preferred = "bottom", align = "start") {
    const r = anchor.getBoundingClientRect();
    const w = el.offsetWidth, h = el.offsetHeight;
    const margin = 8;
    let placement = preferred;
    if (placement === "auto") {
      placement = r.bottom + h + 6 < global.innerHeight - margin || r.top < h + 8 ? "bottom" : "top";
    }
    let top, left;
    if (placement === "top") top = r.top - h - 6;
    else if (placement === "left") top = r.top + r.height / 2 - h / 2;
    else if (placement === "right") top = r.top + r.height / 2 - h / 2;
    else top = r.bottom + 6;

    if (placement === "left") left = r.left - w - 6;
    else if (placement === "right") left = r.right + 6;
    else if (align === "end") left = r.right - w;
    else if (align === "center") left = r.left + r.width / 2 - w / 2;
    else left = r.left;

    left = clamp(left, margin, Math.max(margin, global.innerWidth - w - margin));
    top = clamp(top, margin, Math.max(margin, global.innerHeight - h - margin));
    el.dataset.placement = placement;
    el.style.left = `${Math.round(left)}px`;
    el.style.top = `${Math.round(top)}px`;
    const beakLeft = r.left + r.width / 2 - left - 6;
    const beakTop = r.top + r.height / 2 - top - 6;
    el.style.setProperty("--beak-left", `${clamp(beakLeft, 12, w - 24)}px`);
    el.style.setProperty("--beak-top", `${clamp(beakTop, 12, h - 24)}px`);
  }

  function closeFlyout() {
    $$(".win-menu-submenu").forEach((menu) => menu.remove());
    if (floating.flyout) {
      const el = floating.flyout;
      el.classList.add("is-closing");
      setTimeout(() => el.remove(), 120);
    }
    floating.flyout = null;
    floating.anchor = null;
    if (floating.recalc) {
      global.removeEventListener("resize", floating.recalc);
      global.removeEventListener("scroll", floating.recalc, true);
      floating.recalc = null;
    }
  }

  function openFlyout(anchor, templateId, options = {}) {
    if (!anchor || !templateId) return null;
    if (floating.flyout && floating.anchor === anchor) { closeFlyout(); return null; }
    closeFlyout();
    const template = doc.getElementById(templateId);
    if (!template) return null;

    let flyout;
    const first = template.content && template.content.firstElementChild;
    if (first && first.classList.contains("win-flyout")) {
      flyout = first.cloneNode(true);
    } else {
      flyout = doc.createElement("div");
      flyout.className = "win-flyout";
      flyout.innerHTML = template.innerHTML;
    }
    flyout.classList.add("is-open");
    if (options.menu) flyout.classList.add("win-flyout--menu");
    if (!flyout.querySelector(".win-flyout__beak")) {
      const beak = doc.createElement("span");
      beak.className = "win-flyout__beak";
      flyout.appendChild(beak);
    }
    flyout.style.visibility = "hidden";
    doc.body.appendChild(flyout);
    flyout.style.visibility = "";
    positionFloating(flyout, anchor, options.placement || anchor.getAttribute("data-flyout-placement") || "auto", options.align || "start");
    floating.flyout = flyout;
    floating.anchor = anchor;
    floating.recalc = () => { if (floating.flyout) positionFloating(floating.flyout, anchor, options.placement || anchor.getAttribute("data-flyout-placement") || "auto", options.align || "start"); };
    on(global, "resize", floating.recalc);
    on(global, "scroll", floating.recalc, true);
    anchor.setAttribute("aria-expanded", "true");
    const target = flyout.querySelector("[autofocus]") || flyout.querySelector(focusableSelector);
    if (target) setTimeout(() => target.focus(), 20);
    return flyout;
  }

  function openMenu(anchor, templateId) {
    return openFlyout(anchor, templateId, { menu: true, align: "start" });
  }

  on(doc, "pointerdown", (event) => {
    if (!floating.flyout) return;
    if (event.target.closest && event.target.closest(".win-menu-submenu")) return;
    if (floating.flyout.contains(event.target) || (floating.anchor && floating.anchor.contains(event.target))) return;
    closeFlyout();
  }, true);

  on(doc, "keydown", (event) => {
    if (event.key === "Escape") {
      if (floating.flyout) { closeFlyout(); event.preventDefault(); }
      if (tooltipEl) hideTooltip();
      hideTeachingTip();
    }
  });

  /* ---------------------------------------------------------------------
     Menu / flyout click behavior
     --------------------------------------------------------------------- */
  function handleMenuAction(item, event) {
    if (item.hasAttribute("data-submenu")) {
      event.preventDefault();
      event.stopPropagation();
      const id = item.getAttribute("data-submenu");
      if (floating.flyout) {
        const rect = item.getBoundingClientRect();
        const sub = doc.getElementById(id);
        if (sub) {
          const existing = document.querySelector(".win-menu-submenu[data-owner='" + id + "']");
          if (existing) existing.remove();
          const menu = doc.createElement("div");
          menu.className = "win-menu-submenu";
          menu.dataset.owner = id;
          if (sub.content) {
            const fragment = sub.content.cloneNode(true);
            const first = fragment.firstElementChild;
            if (first && first.classList.contains("win-flyout")) menu.innerHTML = first.innerHTML;
            else menu.appendChild(fragment);
          } else {
            menu.innerHTML = sub.innerHTML;
          }
          doc.body.appendChild(menu);
          menu.style.left = `${Math.min(rect.right + 4, global.innerWidth - menu.offsetWidth - 8)}px`;
          menu.style.top = `${Math.min(rect.top, global.innerHeight - menu.offsetHeight - 8)}px`;
          menu.dataset.parentMenu = "true";
        }
      }
      return;
    }
    if (item.getAttribute("role") === "menuitemcheckbox") {
      const checked = item.getAttribute("aria-checked") === "true";
      item.setAttribute("aria-checked", String(!checked));
      item.classList.toggle("is-checked", !checked);
      return;
    }
    if (item.getAttribute("role") === "menuitemradio") {
      const group = item.closest(".win-menu-flyout, .win-menu-submenu");
      if (group) {
        $$("[role='menuitemradio']", group).forEach((el) => {
          el.setAttribute("aria-checked", "false");
          const dot = el.querySelector(".win-menu-radio-dot");
          if (dot) dot.innerHTML = "";
        });
      }
      item.setAttribute("aria-checked", "true");
      const dot = item.querySelector(".win-menu-radio-dot");
      if (dot) dot.innerHTML = "";
      closeFlyout();
      return;
    }
    if (item.hasAttribute("data-keep-open")) return;
    closeFlyout();
    setTimeout(() => $$(".win-menu-submenu").forEach((m) => m.remove()), 0);
  }

  /* ---------------------------------------------------------------------
     Dialogs
     --------------------------------------------------------------------- */
  const dialogState = { el: null, layer: null, resolve: null, dismissible: true };

  function closeDialog(result) {
    if (!dialogState.el) return;
    const { layer, el, resolve } = dialogState;
    el.classList.add("win-dialog--closing");
    layer.style.animation = "win-fade-out 167ms linear forwards";
    setTimeout(() => {
      layer.remove();
      if (dialogState.el === el) {
        dialogState.el = null; dialogState.layer = null;
        if (resolve) resolve(result);
        dialogState.resolve = null;
        doc.dispatchEvent(new CustomEvent("winui:dialogclosed", { detail: { result } }));
      }
    }, 167);
    doc.body.style.removeProperty("overflow");
  }

  function openDialog(options = {}) {
    if (typeof options === "string") options = { template: options };
    if (dialogState.el) closeDialog("superseded");
    const template = options.template ? doc.getElementById(options.template) : null;
    let dialog;
    if (template) {
      const first = template.content && template.content.firstElementChild;
      dialog = first && first.classList.contains("win-dialog") ? first.cloneNode(true) :
        Object.assign(doc.createElement("div"), { className: "win-dialog", innerHTML: template.innerHTML });
    } else {
      dialog = doc.createElement("div");
      dialog.className = "win-dialog";
      dialog.innerHTML = `
        <div class="win-dialog__title">${options.title || "Dialog"}</div>
        <div class="win-dialog__body">${options.body || ""}</div>
        <div class="win-dialog__commands">
          ${options.secondary ? `<button class="win-button" data-dialog-result="secondary">${options.secondary}</button>` : ""}
          ${options.close ? `<button class="win-button" data-dialog-result="close">${options.close}</button>` : ""}
          ${options.primary ? `<button class="win-button win-button--accent" data-dialog-result="primary">${options.primary}</button>` : ""}
        </div>`;
    }
    const layer = doc.createElement("div");
    layer.className = "win-dialog-layer";
    layer.setAttribute("role", "presentation");
    layer.appendChild(dialog);
    doc.body.appendChild(layer);
    doc.body.style.overflow = "hidden";
    if (options.dismissible === false) layer.dataset.dismissible = "false";
    dialogState.el = dialog;
    dialogState.layer = layer;
    dialogState.dismissible = options.dismissible !== false;

    const result = new Promise((resolve) => { dialogState.resolve = resolve; });
    raf(() => {
      const focusTarget = dialog.querySelector("[autofocus]") || dialog.querySelector(".win-button--accent") || dialog.querySelector(focusableSelector);
      if (focusTarget) focusTarget.focus();
    });
    return result;
  }

  on(doc, "click", (event) => {
    const layer = event.target.closest(".win-dialog-layer");
    if (layer) {
      if (event.target === layer && dialogState.dismissible) { closeDialog("dismiss"); return; }
      const resultButton = event.target.closest("[data-dialog-result]");
      if (resultButton) {
        closeDialog(resultButton.dataset.dialogResult);
        return;
      }
      if (event.target.closest("[data-dialog-close]")) { closeDialog("close"); return; }
    }
    const trigger = event.target.closest("[data-dialog]");
    if (trigger) {
      event.preventDefault();
      openDialog({
        template: trigger.getAttribute("data-dialog"),
        dismissible: trigger.getAttribute("data-dialog-dismissible") !== "false"
      });
    }
  });

  on(doc, "keydown", (event) => {
    if (!dialogState.el) return;
    if (event.key === "Escape" && dialogState.dismissible) { event.preventDefault(); closeDialog("dismiss"); }
    if (event.key === "Tab") trapFocus(dialogState.el, event);
  });

  /* ---------------------------------------------------------------------
     Teaching tips
     --------------------------------------------------------------------- */
  function hideTeachingTip() {
    if (teachingTipEl) { teachingTipEl.remove(); teachingTipEl = null; }
  }

  function showTeachingTip(anchor, templateId, options = {}) {
    hideTeachingTip();
    const template = doc.getElementById(templateId);
    if (!template) return null;
    const first = template.content && template.content.firstElementChild;
    let tip;
    if (first && first.classList.contains("win-teaching-tip")) tip = first.cloneNode(true);
    else {
      tip = doc.createElement("div");
      tip.className = "win-teaching-tip";
      tip.innerHTML = template.innerHTML;
    }
    if (!tip.querySelector(".win-teaching-tip__beak")) {
      const beak = doc.createElement("span");
      beak.className = "win-teaching-tip__beak";
      tip.appendChild(beak);
    }
    doc.body.appendChild(tip);
    teachingTipEl = tip;
    positionFloating(tip, anchor, options.placement || "bottom", "center");
    return tip;
  }

  on(doc, "click", (event) => {
    const trigger = event.target.closest("[data-teaching-tip]");
    if (trigger) {
      event.preventDefault();
      const tip = showTeachingTip(trigger, trigger.getAttribute("data-teaching-tip"), { placement: trigger.getAttribute("data-tip-placement") || "bottom" });
      if (tip) tip.dataset.anchorId = trigger.id || "";
      return;
    }
    if (event.target.closest(".win-teaching-tip__close") || event.target.closest("[data-close-teaching-tip]")) hideTeachingTip();
  });

  /* ---------------------------------------------------------------------
     Toasts
     --------------------------------------------------------------------- */
  function toast(options = {}) {
    let region = $(".win-toast-region");
    if (!region) {
      region = doc.createElement("div");
      region.className = "win-toast-region";
      region.setAttribute("aria-live", "polite");
      doc.body.appendChild(region);
    }
    const el = doc.createElement("div");
    el.className = "win-toast";
    el.innerHTML = `
      <div class="win-toast__icon"><span class="win-icon">&#xE7BA;</span></div>
      <div class="win-toast__body">
        <div class="win-toast__title">${options.title || "WinUI Gallery"}</div>
        ${options.message ? `<div class="win-toast__message">${options.message}</div>` : ""}
      </div>
      <button class="win-toast__close" aria-label="Dismiss"><span class="win-icon">&#xE711;</span></button>`;
    region.appendChild(el);
    const dismiss = () => {
      el.classList.add("is-closing");
      setTimeout(() => el.remove(), 200);
    };
    el.querySelector(".win-toast__close").addEventListener("click", dismiss);
    setTimeout(dismiss, options.duration || 4500);
    return el;
  }

  /* ---------------------------------------------------------------------
     Popover state / combo boxes / suggestions
     --------------------------------------------------------------------- */
  function closeCombo(combo) {
    if (!combo) return;
    const button = $(".win-combo-box__button", combo);
    const popup = $(".win-combo-box__popup", combo);
    if (button) button.setAttribute("aria-expanded", "false");
    if (popup) popup.hidden = true;
  }

  function openCombo(combo) {
    $$(".win-combo-box").forEach((other) => { if (other !== combo) closeCombo(other); });
    const button = $(".win-combo-box__button", combo);
    const popup = $(".win-combo-box__popup", combo);
    if (button) button.setAttribute("aria-expanded", "true");
    if (popup) {
      popup.hidden = false;
      const selected = $(".win-combo-box__option[aria-selected='true']", popup);
      const target = selected || $(".win-combo-box__option", popup);
      if (target) target.scrollIntoView({ block: "nearest" });
    }
  }

  function selectComboOption(option) {
    const combo = option.closest(".win-combo-box");
    if (!combo) return;
    $$(".win-combo-box__option", combo).forEach((el) => el.setAttribute("aria-selected", "false"));
    option.setAttribute("aria-selected", "true");
    const value = $(".win-combo-box__value", combo);
    if (value) value.textContent = option.dataset.value || option.textContent.trim();
    combo.dataset.value = option.dataset.value || option.textContent.trim();
    const hidden = $("input[type='hidden']", combo);
    if (hidden) hidden.value = combo.dataset.value;
    closeCombo(combo);
    combo.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: combo.dataset.value } }));
    combo.dispatchEvent(new CustomEvent("winui:change", { bubbles: true, detail: { value: combo.dataset.value } }));
  }

  function initComboBox(root) {
    $$(".win-combo-box", root).forEach((combo) => {
      if (combo.dataset.bound) return;
      combo.dataset.bound = "true";
      const selected = $(".win-combo-box__option[aria-selected='true']", combo);
      const value = $(".win-combo-box__value", combo);
      if (selected) {
        combo.dataset.value = selected.dataset.value || selected.textContent.trim();
        if (value) value.textContent = selected.dataset.value || selected.textContent.trim();
      }
      const popup = $(".win-combo-box__popup", combo);
      if (popup) popup.hidden = true;
    });
  }

  function initAutoSuggest(root) {
    $$(".win-auto-suggest", root).forEach((box) => {
      if (box.dataset.bound) return;
      box.dataset.bound = "true";
      const input = $("input", box);
      let popup = $(".win-auto-suggest__popup", box);
      if (!popup) {
        popup = doc.createElement("div");
        popup.className = "win-auto-suggest__popup";
        popup.hidden = true;
        box.appendChild(popup);
      }
      const raw = input ? (input.getAttribute("data-suggestions") || "") : "";
      const initialSuggestions = raw ? raw.split("|").map((s) => s.trim()).filter(Boolean) : [];
      const getSuggestions = () => {
        const current = input ? (input.getAttribute("data-suggestions") || "") : "";
        return current ? current.split("|").map((s) => s.trim()).filter(Boolean) : initialSuggestions;
      };
      function render(filter = "") {
        const query = filter.trim().toLowerCase();
        const suggestions = getSuggestions();
        const matches = suggestions.filter((s) => s.toLowerCase().includes(query)).sort((a, b) => {
          if (!query) return 0;
          const al = a.toLowerCase(), bl = b.toLowerCase();
          const score = (value) => value === query ? 0 : value.startsWith(query) ? 1 : 2;
          return score(al) - score(bl) || a.localeCompare(b);
        });
        popup.innerHTML = matches.length ? matches.slice(0, 8).map((s) => {
          const idx = s.toLowerCase().indexOf(query);
          const label = idx >= 0 && query
            ? `${escapeHtml(s.slice(0, idx))}<mark>${escapeHtml(s.slice(idx, idx + query.length))}</mark>${escapeHtml(s.slice(idx + query.length))}`
            : escapeHtml(s);
          return `<div class="win-auto-suggest__item" role="option" tabindex="-1" data-value="${escapeAttr(s)}"><span class="win-icon win-auto-suggest__icon">&#xE721;</span><span>${label}</span></div>`;
        }).join("") : `<div class="win-auto-suggest__empty">${uiText("No suggestions found", "没有建议")}</div>`;
        popup.hidden = false;
      }
      if (input) {
        input.addEventListener("input", () => render(input.value));
        input.addEventListener("focus", () => { if (input.value) render(input.value); });
        input.addEventListener("keydown", (event) => {
          if (event.key === "Escape") { popup.hidden = true; input.blur(); }
          if (event.key === "ArrowDown") {
            const first = $(".win-auto-suggest__item", popup);
            if (first) { event.preventDefault(); first.focus(); }
          }
          if (event.key === "Enter") {
            const active = $(".win-auto-suggest__item.is-active", popup);
            if (active) { input.value = active.dataset.value; popup.hidden = true; }
            box.dispatchEvent(new CustomEvent("querysubmitted", { bubbles: true, detail: { query: input.value } }));
          }
        });
      }
      popup.addEventListener("mousedown", (event) => event.preventDefault());
      popup.addEventListener("click", (event) => {
        const item = event.target.closest(".win-auto-suggest__item");
        if (!item || !input) return;
        input.value = item.dataset.value;
        popup.hidden = true;
        box.dispatchEvent(new CustomEvent("suggestionchosen", { bubbles: true, detail: { value: input.value } }));
      });
      popup.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(event.key)) return;
        if (event.key === "Escape") { popup.hidden = true; input.focus(); return; }
        const items = $$(".win-auto-suggest__item", popup);
        const current = doc.activeElement;
        const index = items.indexOf(current);
        if (event.key === "Enter") {
          if (current && current.dataset.value) { input.value = current.dataset.value; popup.hidden = true; input.focus(); }
          return;
        }
        event.preventDefault();
        const next = event.key === "ArrowDown" ? Math.min(items.length - 1, index + 1) : Math.max(0, index - 1);
        items[next].focus();
      });
      box._suggest = render;
    });
  }

  on(doc, "pointerdown", (event) => {
    if (!event.target.closest(".win-combo-box")) $$(".win-combo-box").forEach(closeCombo);
    if (!event.target.closest(".win-auto-suggest")) {
      $$(".win-auto-suggest__popup").forEach((p) => { p.hidden = true; });
    }
  }, true);

  /* ---------------------------------------------------------------------
     Calendar / date / time
     --------------------------------------------------------------------- */
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  function parseDate(value) {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  function renderCalendar(calendar) {
    const now = new Date();
    const selected = parseDate(calendar.dataset.selected || dateKey(now));
    let year = Number(calendar.dataset.year) || selected.getFullYear();
    let month = calendar.dataset.month !== undefined ? Number(calendar.dataset.month) : selected.getMonth();
    const today = dateKey(now);
    const first = new Date(year, month, 1);
    const start = new Date(year, month, 1 - first.getDay());
    const selectedKey = calendar.dataset.selected || today;
    calendar.dataset.year = String(year);
    calendar.dataset.month = String(month);
    let header = $(".win-calendar__title", calendar);
    if (header) header.textContent = new Intl.DateTimeFormat(intlLocale(), { month: "long", year: "numeric" }).format(new Date(year, month, 1));

    let grid = $(".win-calendar__grid", calendar);
    if (!grid) {
      const weekdays = doc.createElement("div");
      weekdays.className = "win-calendar__weekdays";
      const weekdayFormatter = new Intl.DateTimeFormat(intlLocale(), { weekday: "narrow" });
      weekdays.innerHTML = Array.from({ length: 7 }, (_, index) =>
        `<div class="win-calendar__weekday">${weekdayFormatter.format(new Date(2024, 0, 7 + index))}</div>`
      ).join("");
      calendar.appendChild(weekdays);
      grid = doc.createElement("div");
      grid.className = "win-calendar__grid";
      calendar.appendChild(grid);
    }
    grid.innerHTML = "";
    for (let i = 0; i < 42; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "win-calendar__day";
      btn.dataset.date = dateKey(d);
      btn.textContent = d.getDate();
      if (d.getMonth() !== month) btn.classList.add("is-outside");
      if (dateKey(d) === today) btn.classList.add("is-today");
      if (dateKey(d) === selectedKey) btn.classList.add("is-selected");
      const min = calendar.dataset.min ? parseDate(calendar.dataset.min) : null;
      const max = calendar.dataset.max ? parseDate(calendar.dataset.max) : null;
      if ((min && d < min) || (max && d > max)) { btn.disabled = true; btn.classList.add("is-disabled"); }
      btn.setAttribute("aria-label", d.toDateString());
      grid.appendChild(btn);
    }
  }

  function initCalendar(calendar) {
    if (calendar.dataset.bound) { renderCalendar(calendar); return; }
    calendar.dataset.bound = "true";
    const now = new Date();
    if (!calendar.dataset.selected) calendar.dataset.selected = dateKey(now);
    if (!calendar.querySelector(".win-calendar__header")) {
      const header = doc.createElement("div");
      header.className = "win-calendar__header";
      header.innerHTML = `
        <div class="win-calendar__title"></div>
        <div class="win-calendar__nav">
          <button type="button" data-calendar-prev aria-label="Previous month"><span class="win-icon">&#xE76B;</span></button>
          <button type="button" data-calendar-next aria-label="Next month"><span class="win-icon">&#xE76C;</span></button>
        </div>`;
      calendar.insertBefore(header, calendar.firstChild);
    }
    renderCalendar(calendar);
    if (!calendar.querySelector(".win-calendar__footer")) {
      const footer = doc.createElement("div");
      footer.className = "win-calendar__footer";
      footer.innerHTML = `<button type="button" class="win-calendar__today-link" data-calendar-today>${uiText("Today", "今天")}</button><span class="win-caption win-text-tertiary">${uiText("Month view", "月视图")}</span>`;
      calendar.appendChild(footer);
    }
  }

  function updateDatePicker(picker, date) {
    const hidden = $("input[type='hidden']", picker);
    if (hidden) hidden.value = dateKey(date);
    const value = $(".win-date-picker__value, .win-calendar-date-picker__value", picker);
    if (value) {
      value.textContent = date.toLocaleDateString(intlLocale(), { month: "short", day: "numeric", year: "numeric" });
      value.classList.remove("win-calendar-date-picker__placeholder");
    }
    picker.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { date: dateKey(date) } }));
  }

  function openDatePicker(picker) {
    let flyout = $(".win-date-picker__flyout, .win-calendar-date-picker__flyout", picker);
    if (!flyout) {
      flyout = doc.createElement("div");
      flyout.className = "win-date-picker__flyout";
      const calendar = doc.createElement("div");
      calendar.className = "win-calendar";
      const hidden = $("input[type='hidden']", picker);
      if (hidden && hidden.value) calendar.dataset.selected = hidden.value;
      flyout.appendChild(calendar);
      picker.appendChild(flyout);
    }
    flyout.hidden = false;
    const calendar = $(".win-calendar", flyout);
    if (!calendar.dataset.bound) initCalendar(calendar);
    const button = picker.querySelector(".win-date-picker__button, .win-calendar-date-picker__button");
    if (button) button.setAttribute("aria-expanded", "true");
    const close = (event) => {
      if (!picker.contains(event.target)) {
        flyout.hidden = true;
        if (button) button.setAttribute("aria-expanded", "false");
        doc.removeEventListener("pointerdown", close, true);
      }
    };
    setTimeout(() => doc.addEventListener("pointerdown", close, true), 0);
  }

  function initCalendars(root) {
    $$(".win-calendar", root).forEach(initCalendar);
  }

  function initDatePickers(root) {
    $$(".win-date-picker, .win-calendar-date-picker", root).forEach((picker) => {
      if (picker.dataset.bound) return;
      picker.dataset.bound = "true";
      const hidden = $("input[type='hidden']", picker);
      if (hidden && hidden.value) updateDatePicker(picker, parseDate(hidden.value));
      const button = picker.querySelector(".win-date-picker__button, .win-calendar-date-picker__button");
      if (button) {
        button.setAttribute("aria-haspopup", "dialog");
        button.setAttribute("aria-expanded", "false");
      }
      const flyout = $(".win-date-picker__flyout, .win-calendar-date-picker__flyout", picker);
      if (flyout) {
        flyout.hidden = true;
        const calendar = $(".win-calendar", flyout);
        if (calendar) initCalendar(calendar);
      }
    });
  }

  function initTimePickers(root) {
    $$(".win-time-picker", root).forEach(initTimePicker);
  }

  function initTimePicker(picker) {
    if (picker.dataset.bound) return;
    picker.dataset.bound = "true";
    let flyout = $(".win-time-picker__flyout", picker);
    if (!flyout) {
      flyout = doc.createElement("div");
      flyout.className = "win-time-picker__flyout";
      picker.appendChild(flyout);
    }
    flyout.hidden = true;
    const parts = $(".win-time-picker__value", picker);
    const initial = (parts && parts.dataset.value) || picker.dataset.value || "09:30";
    let [hour, minute] = initial.split(":").map(Number);
    hour = Number.isFinite(hour) ? hour : 9;
    minute = Number.isFinite(minute) ? minute : 30;
    function render() {
      const use24 = picker.dataset.clock === "24";
      const displayHour = use24 ? hour : (hour % 12 || 12);
      const meridiem = hour < 12 ? "AM" : "PM";
      if (parts) parts.innerHTML = `<span class="win-time-picker__part">${pad(displayHour)}</span><span class="win-time-picker__colon">:</span><span class="win-time-picker__part">${pad(minute)}</span>${use24 ? "" : `<span class="win-time-picker__meridiem">${meridiem}</span>`}`;
      flyout.innerHTML = "";
      const hours = doc.createElement("div");
      hours.className = "win-time-picker__column";
      const minutes = doc.createElement("div");
      minutes.className = "win-time-picker__column";
      const hourLabel = doc.createElement("div");
      hourLabel.className = "win-time-picker__option";
      hourLabel.style.cssText = "font-size:11px;color:var(--win-text-secondary);cursor:default";
      hourLabel.textContent = uiText("Hour", "小时");
      const minuteLabel = hourLabel.cloneNode(true);
      minuteLabel.textContent = uiText("Minute", "分钟");
      hours.appendChild(hourLabel);
      minutes.appendChild(minuteLabel);
      const startH = use24 ? 0 : 1, endH = use24 ? 23 : 12;
      for (let h = startH; h <= endH; h++) {
        const b = doc.createElement("button");
        b.type = "button";
        b.className = "win-time-picker__option" + ((use24 ? h : h) === displayHour ? " is-selected" : "");
        b.textContent = pad(h);
        b.dataset.hour = String(h);
        b.addEventListener("click", () => {
          if (use24) hour = h;
          else {
            const pm = hour >= 12;
            hour = (h % 12) + (pm ? 12 : 0);
          }
          render();
        });
        hours.appendChild(b);
      }
      for (let m = 0; m < 60; m += Number(picker.dataset.minuteIncrement || 1)) {
        const b = doc.createElement("button");
        b.type = "button";
        b.className = "win-time-picker__option" + (m === minute ? " is-selected" : "");
        b.textContent = pad(m);
        b.addEventListener("click", () => { minute = m; render(); });
        minutes.appendChild(b);
      }
      if (!use24) {
        const mer = doc.createElement("div");
        mer.className = "win-time-picker__column";
        ["AM", "PM"].forEach((value) => {
          const b = doc.createElement("button");
          b.type = "button";
          b.className = "win-time-picker__option" + (meridiem === value ? " is-selected" : "");
          b.textContent = value;
          b.addEventListener("click", () => {
            const display = hour % 12 || 12;
            hour = value === "PM" ? (display % 12) + 12 : display % 12;
            render();
          });
          mer.appendChild(b);
        });
        flyout.append(hours, minutes, mer);
      } else {
        flyout.append(hours, minutes);
      }
      requestAnimationFrame(() => {
        $(".win-time-picker__column:first-child .is-selected", flyout)?.scrollIntoView({ block: "center" });
        $(".win-time-picker__column:nth-child(2) .is-selected", flyout)?.scrollIntoView({ block: "center" });
      });
      const hidden = $("input[type='hidden']", picker);
      if (hidden) hidden.value = `${pad(hour)}:${pad(minute)}`;
      picker.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { time: `${pad(hour)}:${pad(minute)}` } }));
    }
    const button = $(".win-time-picker__button", picker);
    if (button) {
      button.addEventListener("click", () => {
        flyout.hidden = !flyout.hidden;
        if (!flyout.hidden) {
          render();
          const close = (event) => {
            if (!picker.contains(event.target)) {
              flyout.hidden = true;
              doc.removeEventListener("pointerdown", close, true);
            }
          };
          setTimeout(() => doc.addEventListener("pointerdown", close, true), 0);
        }
      });
    }
    render();
  }

  on(doc, "click", (event) => {
    const prev = event.target.closest("[data-calendar-prev]");
    const next = event.target.closest("[data-calendar-next]");
    if (prev || next) {
      const calendar = (prev || next).closest(".win-calendar");
      let year = Number(calendar.dataset.year) || new Date().getFullYear();
      let month = calendar.dataset.month !== undefined ? Number(calendar.dataset.month) : new Date().getMonth();
      if (!calendar.dataset.year) { calendar.dataset.year = String(year); calendar.dataset.month = String(month); }
      month += prev ? -1 : 1;
      if (month < 0) { month = 11; year--; }
      if (month > 11) { month = 0; year++; }
      calendar.dataset.year = String(year);
      calendar.dataset.month = String(month);
      renderCalendar(calendar);
      return;
    }
    const todayBtn = event.target.closest("[data-calendar-today]");
    if (todayBtn) {
      const calendar = todayBtn.closest(".win-calendar");
      const now = new Date();
      calendar.dataset.year = String(now.getFullYear());
      calendar.dataset.month = String(now.getMonth());
      calendar.dataset.selected = dateKey(now);
      renderCalendar(calendar);
      const picker = calendar.closest(".win-date-picker, .win-calendar-date-picker");
      if (picker) { updateDatePicker(picker, now); const fly = $(".win-date-picker__flyout, .win-calendar-date-picker__flyout", picker); if (fly) fly.hidden = true; }
      return;
    }
    const day = event.target.closest(".win-calendar__day");
    if (day && !day.disabled) {
      const calendar = day.closest(".win-calendar");
      calendar.dataset.selected = day.dataset.date;
      renderCalendar(calendar);
      const picker = calendar.closest(".win-date-picker, .win-calendar-date-picker");
      if (picker) {
        updateDatePicker(picker, parseDate(day.dataset.date));
        const fly = $(".win-date-picker__flyout, .win-calendar-date-picker__flyout", picker);
        if (fly) fly.hidden = true;
      }
      calendar.dispatchEvent(new CustomEvent("dateselected", { bubbles: true, detail: { date: day.dataset.date } }));
      return;
    }
    const dateButton = event.target.closest(".win-date-picker__button, .win-calendar-date-picker__button");
    if (dateButton) {
      event.preventDefault();
      const picker = dateButton.closest(".win-date-picker, .win-calendar-date-picker");
      const fly = $(".win-date-picker__flyout, .win-calendar-date-picker__flyout", picker);
      if (fly && !fly.hidden) { fly.hidden = true; dateButton.setAttribute("aria-expanded", "false"); }
      else openDatePicker(picker);
    }
  });

  /* ---------------------------------------------------------------------
     Sliders, number boxes, ratings, progress
     --------------------------------------------------------------------- */
  function updateSlider(slider) {
    const min = Number(slider.min || 0);
    const max = Number(slider.max || 100);
    const value = Number(slider.value || 0);
    const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
    slider.style.setProperty("--win-slider-value", `${pct}%`);
    const output = slider.parentElement && slider.parentElement.querySelector("[data-slider-value]");
    if (output) output.textContent = value;
  }

  function initSliders(root) {
    $$(".win-slider", root).forEach((slider) => {
      if (slider.dataset.bound) return;
      slider.dataset.bound = "true";
      updateSlider(slider);
      slider.addEventListener("input", () => updateSlider(slider));
    });
    $$(".win-range-slider", root).forEach((range) => {
      if (range.dataset.bound) return;
      range.dataset.bound = "true";
      const inputs = $$("input[type='range']", range);
      if (inputs.length < 2) return;
      const update = () => {
        let a = Number(inputs[0].value), b = Number(inputs[1].value);
        if (a > b) [a, b] = [b, a];
        const min = Number(inputs[0].min || 0), max = Number(inputs[0].max || 100);
        const start = ((a - min) / (max - min)) * 100;
        const end = ((b - min) / (max - min)) * 100;
        range.style.setProperty("--range-start", `${start}%`);
        range.style.setProperty("--range-end", `${end}%`);
        const output = range.parentElement && range.parentElement.querySelector("[data-range-value]");
        if (output) output.textContent = `${a} – ${b}`;
      };
      inputs.forEach((input) => input.addEventListener("input", update));
      update();
    });
  }

  function initNumberBoxes(root) {
    $$(".win-number-box", root).forEach((box) => {
      if (box.dataset.bound) return;
      box.dataset.bound = "true";
      const input = $(".win-number-box__input", box);
      if (!input) return;
      const step = Number(box.dataset.step || 1);
      const min = box.dataset.min !== undefined ? Number(box.dataset.min) : -Infinity;
      const max = box.dataset.max !== undefined ? Number(box.dataset.max) : Infinity;
      const wrap = box.dataset.wrap === "true";
      const set = (value) => {
        let n = Number(value);
        if (!Number.isFinite(n)) n = min === -Infinity ? 0 : min;
        if (wrap && Number.isFinite(min) && Number.isFinite(max)) {
          if (n > max) n = min;
          if (n < min) n = max;
        }
        n = clamp(n, min, max);
        input.value = String(Math.round(n * 1e6) / 1e6);
        box.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: n } }));
      };
      const up = $("[data-number-up]", box);
      const down = $("[data-number-down]", box);
      if (up) up.addEventListener("click", () => set((Number(input.value) || 0) + step));
      if (down) down.addEventListener("click", () => set((Number(input.value) || 0) - step));
      input.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") { event.preventDefault(); set((Number(input.value) || 0) + step); }
        if (event.key === "ArrowDown") { event.preventDefault(); set((Number(input.value) || 0) - step); }
        if (event.key === "Enter") {
          const raw = input.value.trim();
          if (/^[0-9+\-*/().\s%]+$/.test(raw)) {
            try { set(Function(`"use strict";return (${raw.replace(/%/g, "/100")})`)()); } catch (_) { /* keep value */ }
          } else set(raw);
          input.blur();
        }
      });
      input.addEventListener("blur", () => {
        const raw = input.value.trim();
        if (/^[0-9+\-*/().\s%]+$/.test(raw) && /[+\-*/]/.test(raw)) {
          try { set(Function(`"use strict";return (${raw.replace(/%/g, "/100")})`)()); } catch (_) { /* keep */ }
        }
      });
    });
  }

  function renderRating(rating) {
    const max = Number(rating.dataset.max || 5);
    const value = clamp(Number(rating.dataset.value || 0), 0, max);
    if (!$(".win-rating__star", rating)) {
      for (let i = 1; i <= max; i++) {
        const button = doc.createElement("button");
        button.type = "button";
        button.className = "win-rating__star";
        button.dataset.value = String(i);
        button.setAttribute("aria-label", `${i} star${i === 1 ? "" : "s"}`);
        button.textContent = "★";
        rating.appendChild(button);
      }
      const label = doc.createElement("span");
      label.className = "win-rating__value";
      rating.appendChild(label);
      rating.tabIndex = 0;
      rating.setAttribute("role", "slider");
      rating.setAttribute("aria-valuemin", "0");
      rating.setAttribute("aria-valuemax", String(max));
    }
    const stars = $$(".win-rating__star", rating);
    stars.forEach((star, index) => {
      star.classList.toggle("is-filled", index < value);
      star.style.color = index < value ? "var(--win-accent)" : "var(--win-text-tertiary)";
      star.textContent = index < value ? "★" : "☆";
    });
    const label = $(".win-rating__value", rating);
    if (label) label.textContent = value ? `${value} / ${max}` : uiText("Set rating", "设置评分");
    rating.setAttribute("aria-valuenow", String(value));
  }

  function initRatings(root) {
    $$(".win-rating", root).forEach((rating) => {
      if (rating.dataset.bound) return;
      rating.dataset.bound = "true";
      renderRating(rating);
      const set = (value) => {
        rating.dataset.value = String(clamp(value, 0, Number(rating.dataset.max || 5)));
        renderRating(rating);
        rating.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: Number(rating.dataset.value) } }));
      };
      rating.addEventListener("click", (event) => {
        const star = event.target.closest(".win-rating__star");
        if (star) {
          const v = Number(star.dataset.value);
          set(Number(rating.dataset.value) === v ? v - 1 : v);
        }
      });
      rating.addEventListener("pointermove", (event) => {
        const star = event.target.closest(".win-rating__star");
        if (!star) return;
        const hover = Number(star.dataset.value);
        $$(".win-rating__star", rating).forEach((s, index) => {
          s.classList.toggle("is-filled", index < hover);
          s.style.color = index < hover ? "var(--win-accent)" : "var(--win-text-tertiary)";
          s.textContent = index < hover ? "★" : "☆";
        });
      });
      rating.addEventListener("pointerleave", () => renderRating(rating));
      rating.addEventListener("keydown", (event) => {
        const current = Number(rating.dataset.value || 0);
        if (event.key === "ArrowRight" || event.key === "ArrowUp") { event.preventDefault(); set(current + 1); }
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") { event.preventDefault(); set(current - 1); }
        if (event.key === "Home") { event.preventDefault(); set(0); }
        if (event.key === "End") { event.preventDefault(); set(Number(rating.dataset.max || 5)); }
      });
    });
  }

  function setProgress(el, value) {
    const max = Number(el.dataset.max || 100);
    const pct = clamp((Number(value) / max) * 100, 0, 100);
    el.dataset.value = String(value);
    const fill = $(".win-progress-bar__fill", el);
    if (fill) fill.style.width = `${pct}%`;
    el.style.setProperty("--progress", `${pct}%`);
    const ringValue = $(".win-progress-ring__value", el);
    if (ringValue) ringValue.style.strokeDashoffset = String(100 - pct);
    el.setAttribute("aria-valuenow", String(value));
  }

  function initProgress(root) {
    $$(".win-progress-bar", root).forEach((bar) => {
      if (bar.dataset.bound) return;
      bar.dataset.bound = "true";
      const fill = $(".win-progress-bar__fill", bar);
      if (fill && !fill.style.width) fill.style.width = `${Number(bar.dataset.value || 0)}%`;
      setProgress(bar, bar.dataset.value || 0);
    });
    $$(".win-progress-ring", root).forEach((ring) => {
      if (ring.dataset.bound) return;
      ring.dataset.bound = "true";
      setProgress(ring, ring.dataset.value || 0);
    });
  }

  /* ---------------------------------------------------------------------
     Color picker
     --------------------------------------------------------------------- */
  function initColorPickers(root) {
    $$(".win-color-picker", root).forEach((picker) => {
      if (picker.dataset.bound) return;
      picker.dataset.bound = "true";
      const spectrum = $(".win-color-picker__spectrum", picker);
      const cursor = $(".win-color-picker__cursor", picker);
      const hueSlider = $(".win-color-picker__hue", picker);
      const hexInput = $(".win-color-picker__hex input", picker);
      const preview = $(".win-color-picker__swatch", picker);
      const valueEl = $(".win-color-picker__rgb", picker);
      let hue = Number(picker.dataset.hue || 210);
      let saturation = 0.7, value = 0.8;
      function render(h = hue, s = saturation, v = value) {
        hue = h; saturation = s; value = v;
        const color = hsvToRgb(hue, saturation, value);
        picker.style.setProperty("--picker-hue", hue);
        picker.style.setProperty("--picker-color", color);
        if (preview) preview.style.background = color;
        if (cursor) { cursor.style.left = `${s * 100}%`; cursor.style.top = `${(1 - v) * 100}%`; }
        if (hexInput) hexInput.value = color.toUpperCase();
        if (valueEl) valueEl.textContent = color.toUpperCase();
        if (hueSlider) hueSlider.value = String(hue);
        picker.dataset.value = color;
        picker.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { color } }));
      }
      if (hexInput && !hexInput.value) hexInput.value = "#005FB8";
      if (spectrum) {
        const handle = (event) => {
          const r = spectrum.getBoundingClientRect();
          render(hue, clamp((event.clientX - r.left) / r.width, 0, 1), clamp(1 - (event.clientY - r.top) / r.height, 0, 1));
        };
        spectrum.addEventListener("pointerdown", (event) => {
          spectrum.setPointerCapture(event.pointerId);
          handle(event);
          const move = (e) => handle(e);
          const up = (e) => { spectrum.releasePointerCapture(e.pointerId); spectrum.removeEventListener("pointermove", move); spectrum.removeEventListener("pointerup", up); };
          spectrum.addEventListener("pointermove", move);
          spectrum.addEventListener("pointerup", up);
        });
      }
      if (hueSlider) hueSlider.addEventListener("input", () => render(Number(hueSlider.value)));
      if (hexInput) hexInput.addEventListener("change", () => {
        const col = normalizeHex(hexInput.value);
        const hsv = rgbToHsv(col);
        render(hsv.h, hsv.s, hsv.v);
      });
      $$(".win-color-picker__swatch-button", picker).forEach((sw) => {
        sw.style.setProperty("--swatch", sw.dataset.color || "#005fb8");
        sw.addEventListener("click", () => {
          const hsv = rgbToHsv(normalizeHex(sw.dataset.color));
          render(hsv.h, hsv.s, hsv.v);
        });
      });
      render(hue, saturation, value);
    });
  }

  /* ---------------------------------------------------------------------
     Selection: lists, grids, tabs, selectors, pivots, pips
     --------------------------------------------------------------------- */
  function selectOne(container, item, selector) {
    $$(selector, container).forEach((el) => {
      const active = el === item;
      el.classList.toggle("is-selected", active);
      el.setAttribute("aria-selected", active ? "true" : "false");
      el.tabIndex = active ? 0 : -1;
    });
    container.dispatchEvent(new CustomEvent("winui:selectionchange", { bubbles: true, detail: { item } }));
  }

  function initTabView(tabView) {
    if (tabView.dataset.bound) return;
    tabView.dataset.bound = "true";
    const tabs = $$(".win-tab-view__tab[data-tab]", tabView);
    const panels = $$(".win-tab-view__panel", tabView);
    const activate = (id) => {
      tabs.forEach((t) => {
        const selected = t.dataset.tab === id;
        t.classList.toggle("is-selected", selected);
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        const selected = p.dataset.tabPanel === id;
        p.hidden = !selected;
        p.classList.toggle("is-active", selected);
      });
      tabView.dataset.selectedTab = id;
    };
    const selected = $(".win-tab-view__tab.is-selected", tabView) || tabs[0];
    if (selected) activate(selected.dataset.tab);
    const add = $(".win-tab-view__add", tabView);
    if (add) {
      add.addEventListener("click", () => {
        const count = $$(".win-tab-view__tab[data-tab]", tabView).length + 1;
        const id = `doc-${count}-${uid()}`;
        const tab = doc.createElement("button");
        tab.type = "button";
        tab.className = "win-tab-view__tab";
        tab.dataset.tab = id;
        tab.innerHTML = `<span class="win-tab-view__tab-icon win-icon">&#xE8A5;</span><span class="win-tab-view__tab-title">${uiText("Document", "文档")} ${count}</span><span class="win-tab-view__tab-close" role="button" tabindex="0" aria-label="${uiText("Close tab", "关闭选项卡")}"><span class="win-icon">&#xE711;</span></span>`;
        const strip = $(".win-tab-view__strip", tabView);
        strip.insertBefore(tab, add);
        const panel = doc.createElement("div");
        panel.className = "win-tab-view__panel";
        panel.dataset.tabPanel = id;
        panel.innerHTML = `<h3 class="win-subtitle" style="margin-bottom:8px">${uiText("Document", "文档")} ${count}</h3><p class="win-text-secondary">${uiText("A new tab. Use the × button to close it, or the + button to add another.", "新选项卡。使用 × 按钮关闭，或使用 + 按钮再添加一个。")}</p>`;
        $(".win-tab-view__content", tabView).appendChild(panel);
        activate(id);
        tab.focus();
      });
    }
  }

  function initTabs(root) {
    $$(".win-tab-view", root).forEach(initTabView);
  }

  on(doc, "click", (event) => {
    const closeTab = event.target.closest(".win-tab-view__tab-close");
    if (closeTab) {
      event.stopPropagation();
      const tab = closeTab.closest(".win-tab-view__tab");
      const tabView = tab.closest(".win-tab-view");
      const id = tab.dataset.tab;
      const tabs = $$(".win-tab-view__tab[data-tab]", tabView);
      const index = tabs.indexOf(tab);
      tab.remove();
      $(`.win-tab-view__panel[data-tab-panel="${CSS.escape(id)}"]`, tabView)?.remove();
      const next = tabs[index + 1] || tabs[index - 1];
      if (next && !next.classList.contains("is-selected")) next.click();
      return;
    }
    const tab = event.target.closest(".win-tab-view__tab[data-tab]");
    if (tab && !closeTab) {
      const tabView = tab.closest(".win-tab-view");
      const id = tab.dataset.tab;
      $$(".win-tab-view__tab", tabView).forEach((t) => t.classList.toggle("is-selected", t === tab));
      $$(".win-tab-view__panel", tabView).forEach((p) => { const active = p.dataset.tabPanel === id; p.hidden = !active; });
      return;
    }

    const selector = event.target.closest(".win-selector-bar__item");
    if (selector) {
      const bar = selector.closest(".win-selector-bar");
      $$(".win-selector-bar__item", bar).forEach((el) => el.classList.toggle("is-selected", el === selector));
      const target = selector.dataset.selector;
      if (target) {
        const panels = $$("[data-selector-panel]", bar.parentElement || doc);
        panels.forEach((p) => { p.hidden = p.dataset.selectorPanel !== target; });
      }
      bar.dispatchEvent(new CustomEvent("winui:selectionchange", { bubbles: true, detail: { item: selector } }));
      return;
    }

    const pivot = event.target.closest(".win-pivot__header");
    if (pivot) {
      const rootEl = pivot.closest(".win-pivot");
      $$(".win-pivot__header", rootEl).forEach((el) => el.classList.toggle("is-selected", el === pivot));
      $$(".win-pivot__panel", rootEl).forEach((p) => { p.hidden = p.dataset.pivotPanel !== pivot.dataset.pivot; });
      return;
    }

    const pagerBtn = event.target.closest(".win-pager__button");
    if (pagerBtn) {
      const pager = pagerBtn.closest(".win-pager");
      if (!pagerBtn.disabled) {
        if (pagerBtn.dataset.page) {
          $$(".win-pager__button", pager).forEach((b) => b.classList.toggle("is-selected", b === pagerBtn));
          pager.dataset.page = pagerBtn.dataset.page;
        }
        pager.dispatchEvent(new CustomEvent("winui:pagechange", { bubbles: true, detail: { page: pager.dataset.page } }));
      }
      return;
    }

    const pip = event.target.closest(".win-pip");
    if (pip) {
      const pips = pip.closest(".win-pips-pager");
      $$(".win-pip", pips).forEach((p) => p.classList.toggle("is-selected", p === pip));
      pips.dataset.selected = pip.dataset.index;
      pips.dispatchEvent(new CustomEvent("winui:pipchange", { bubbles: true, detail: { index: Number(pip.dataset.index) } }));
      const target = pips.dataset.flipTarget;
      if (target) {
        const flip = doc.getElementById(target) || doc.querySelector(target);
        if (flip && flip._goTo) flip._goTo(Number(pip.dataset.index));
      }
      return;
    }

    const pipNav = event.target.closest(".win-pips-pager__nav");
    if (pipNav) {
      const pips = pipNav.closest(".win-pips-pager");
      const all = $$(".win-pip", pips);
      let index = all.findIndex((p) => p.classList.contains("is-selected"));
      index += pipNav.dataset.dir === "next" ? 1 : -1;
      index = clamp(index, 0, all.length - 1);
      all[index].click();
      return;
    }

    const listItem = event.target.closest(".win-list-item, .win-grid-item, .win-items-view__item");
    if (listItem && !listItem.closest(".win-tab-view")) {
      const container = listItem.closest(".win-list-view, .win-grid-view, .win-items-view");
      if (container) {
        selectOne(container, listItem, ".win-list-item, .win-grid-item, .win-items-view__item");
        return;
      }
    }

    const treeItem = event.target.closest(".win-tree-item");
    if (treeItem) {
      const tree = treeItem.closest(".win-tree-view");
      const children = treeItem.nextElementSibling && treeItem.nextElementSibling.classList.contains("win-tree-children") ? treeItem.nextElementSibling : null;
      if (event.target.closest(".win-tree-item__chevron") || (children && !event.target.closest(".win-tree-item__label"))) {
        if (children) {
          const open = children.classList.toggle("is-open");
          treeItem.setAttribute("aria-expanded", String(open));
        }
      } else {
        $$(".win-tree-item", tree).forEach((el) => el.classList.toggle("is-selected", el === treeItem));
        if (children) {
          const open = children.classList.toggle("is-open");
          treeItem.setAttribute("aria-expanded", String(open));
        }
      }
      return;
    }
  });

  /* ---------------------------------------------------------------------
     NavigationView
     --------------------------------------------------------------------- */
  function navIsMobile() {
    return global.matchMedia("(max-width: 720px)").matches;
  }

  function syncNavState(nav) {
    const mobile = navIsMobile();
    const expanded = mobile ? nav.classList.contains("is-pane-open") : !nav.classList.contains("win-nav-view--compact");
    $$(".win-nav-view__toggle", nav).forEach((button) => button.setAttribute("aria-expanded", String(expanded)));
    $$("[data-nav-toggle]").forEach((button) => {
      const selector = button.getAttribute("data-nav-target");
      const target = selector ? $(selector) : (button.closest(".win-nav-view") || nav);
      if (target === nav) {
        button.setAttribute("aria-expanded", String(expanded));
        button.setAttribute("aria-label", uiText(expanded ? "Collapse navigation" : "Expand navigation", expanded ? "折叠导航" : "展开导航"));
      }
    });
    nav.dispatchEvent(new CustomEvent("winui:panechange", { bubbles: true, detail: { expanded, mobile } }));
  }

  function toggleNav(nav, force) {
    if (!nav) return;
    const mobile = navIsMobile();
    if (mobile) {
      const open = typeof force === "boolean" ? force : !nav.classList.contains("is-pane-open");
      nav.classList.toggle("is-pane-open", open);
      nav.classList.remove("win-nav-view--compact");
    } else {
      const collapsed = typeof force === "boolean" ? !force : !nav.classList.contains("win-nav-view--compact");
      nav.classList.toggle("win-nav-view--compact", collapsed);
      nav.classList.remove("win-nav-view--closed", "is-pane-open");
    }
    hideTooltip();
    syncNavState(nav);
  }

  function resolveNavTarget(toggle) {
    const selector = toggle.getAttribute("data-nav-target");
    if (selector) return $(selector);
    const scoped = toggle.closest(".win-nav-view");
    if (scoped) return scoped;
    return doc.getElementById("galleryNav") || doc.getElementById("showcaseNav") || $(".win-nav-view");
  }

  function initNav(root) {
    $$(".win-nav-view", root).forEach((nav) => {
      if (nav.dataset.bound) return;
      nav.dataset.bound = "true";
      if (!nav.querySelector(".win-nav-view__scrim")) {
        const scrim = doc.createElement("div");
        scrim.className = "win-nav-view__scrim";
        nav.appendChild(scrim);
      }
      const toggle = $(".win-nav-view__toggle", nav);
      if (toggle && !toggle.dataset.bound) {
        toggle.dataset.bound = "true";
        toggle.addEventListener("click", (event) => {
          event.preventDefault();
          toggleNav(nav);
        });
      }
      const scrim = $(".win-nav-view__scrim", nav);
      if (scrim && !scrim.dataset.bound) {
        scrim.dataset.bound = "true";
        scrim.addEventListener("click", () => {
          nav.classList.remove("is-pane-open");
          syncNavState(nav);
        });
      }
      if (!nav.hasAttribute("data-nav-ready")) {
        nav.setAttribute("data-nav-ready", "true");
        syncNavState(nav);
      }
    });
  }

  on(doc, "click", (event) => {
    const toggle = event.target.closest("[data-nav-toggle]");
    if (toggle) {
      event.preventDefault();
      toggleNav(resolveNavTarget(toggle));
      return;
    }

    const parent = event.target.closest(".win-nav-item[data-nav-parent]");
    if (parent) {
      const nav = parent.closest(".win-nav-view");
      if (!nav) return;
      if (!navIsMobile() && nav.classList.contains("win-nav-view--compact")) {
        toggleNav(nav, true);
        return;
      }
      const submenu = parent.nextElementSibling;
      if (submenu && submenu.classList.contains("win-nav-submenu")) {
        const willOpen = !submenu.classList.contains("is-open");
        if (willOpen) {
          $$(".win-nav-submenu.is-open", nav).forEach((openMenu) => {
            openMenu.classList.remove("is-open");
            const owner = openMenu.previousElementSibling;
            if (owner && owner.hasAttribute("data-nav-parent")) owner.setAttribute("aria-expanded", "false");
          });
        }
        submenu.classList.toggle("is-open", willOpen);
        parent.setAttribute("aria-expanded", String(willOpen));
      }
      return;
    }

    const navItem = event.target.closest(".win-nav-item");
    if (navItem && !navItem.classList.contains("win-nav-item--header")) {
      const nav = navItem.closest(".win-nav-view");
      if (nav) {
        $$(".win-nav-item", nav).forEach((el) => el.classList.toggle("is-selected", el === navItem));
        if (navIsMobile()) {
          nav.classList.remove("is-pane-open");
          syncNavState(nav);
        }
        const href = navItem.getAttribute("href");
        if (!href || href === "#") navItem.dispatchEvent(new CustomEvent("winui:navigate", { bubbles: true, detail: { item: navItem } }));
      }
    }
  });

  /* ---------------------------------------------------------------------
     SplitView
     --------------------------------------------------------------------- */
  on(doc, "click", (event) => {
    const toggle = event.target.closest("[data-split-toggle]");
    if (toggle) {
      const split = toggle.closest(".win-split-view");
      if (split) split.classList.toggle("is-pane-open");
    }
    const scrim = event.target.closest(".win-split-view__scrim");
    if (scrim) scrim.closest(".win-split-view").classList.remove("is-pane-open");
  });

  /* ---------------------------------------------------------------------
     FlipView
     --------------------------------------------------------------------- */
  function initFlipViews(root) {
    $$(".win-flip-view", root).forEach((flip) => {
      if (flip.dataset.bound) return;
      flip.dataset.bound = "true";
      const track = $(".win-flip-view__track", flip);
      const pages = $$(".win-flip-view__page", flip);
      if (!track || !pages.length) return;
      const dots = $(".win-flip-view__dots", flip);
      if (dots && !dots.children.length) {
        pages.forEach((_, i) => {
          const pip = doc.createElement("button");
          pip.type = "button";
          pip.className = "win-pip" + (i === 0 ? " is-selected" : "");
          pip.dataset.index = String(i);
          pip.setAttribute("aria-label", `Page ${i + 1}`);
          dots.appendChild(pip);
        });
      }
      let index = 0;
      const go = (next) => {
        index = clamp(next, 0, pages.length - 1);
        track.style.transform = `translateX(-${index * 100}%)`;
        $$(".win-flip-view__page", flip).forEach((p, i) => p.setAttribute("aria-hidden", String(i !== index)));
        if (dots) $$(".win-pip", dots).forEach((p, i) => p.classList.toggle("is-selected", i === index));
        const prev = $(".win-flip-view__nav--prev", flip), nextBtn = $(".win-flip-view__nav--next", flip);
        if (prev) prev.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === pages.length - 1;
        flip.dataset.index = String(index);
      };
      flip._goTo = go;
      $(".win-flip-view__nav--prev", flip)?.addEventListener("click", () => go(index - 1));
      $(".win-flip-view__nav--next", flip)?.addEventListener("click", () => go(index + 1));
      if (dots) dots.addEventListener("click", (event) => {
        const pip = event.target.closest(".win-pip");
        if (pip) go(Number(pip.dataset.index));
      });
      go(0);
    });
  }

  /* ---------------------------------------------------------------------
     Tables
     --------------------------------------------------------------------- */
  function initTables(root) {
    $$(".win-table", root).forEach((table) => {
      if (table.dataset.bound) return;
      table.dataset.bound = "true";
      $$("th[data-sort]", table).forEach((th) => {
        th.addEventListener("click", () => {
          const tbody = table.tBodies[0];
          if (!tbody) return;
          const col = Array.from(th.parentElement.children).indexOf(th);
          const direction = th.dataset.direction === "asc" ? "desc" : "asc";
          $$("th", table).forEach((other) => { delete other.dataset.direction; const icon = $(".win-table__sort", other); if (icon) icon.textContent = ""; });
          th.dataset.direction = direction;
          const icon = $(".win-table__sort", th);
          if (icon) icon.textContent = direction === "asc" ? "\uE70E" : "\uE70D";
          const rows = Array.from(tbody.rows);
          rows.sort((a, b) => {
            const av = a.cells[col]?.textContent.trim() || "";
            const bv = b.cells[col]?.textContent.trim() || "";
            const an = parseFloat(av.replace(/[^0-9.\-]/g, ""));
            const bn = parseFloat(bv.replace(/[^0-9.\-]/g, ""));
            let result;
            if (!Number.isNaN(an) && !Number.isNaN(bn)) result = an - bn;
            else result = av.localeCompare(bv);
            return direction === "asc" ? result : -result;
          });
          rows.forEach((row) => tbody.appendChild(row));
        });
      });
      $$("tbody tr", table).forEach((row) => {
        row.addEventListener("click", () => {
          $$("tbody tr", table).forEach((r) => r.classList.toggle("is-selected", r === row));
        });
      });
    });
  }

  /* ---------------------------------------------------------------------
     SwipeControl
     --------------------------------------------------------------------- */
  function initSwipe(root) {
    $$(".win-swipe-control", root).forEach((control) => {
      if (control.dataset.bound) return;
      control.dataset.bound = "true";
      const content = $(".win-swipe-control__content", control);
      if (!content) return;
      let startX = 0, startY = 0, dx = 0, dragging = false, horizontal = null;
      content.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        startX = event.clientX; startY = event.clientY; dx = 0;
        dragging = true; horizontal = null;
        content.setPointerCapture(event.pointerId);
      });
      content.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        dx = event.clientX - startX;
        const dy = event.clientY - startY;
        if (horizontal === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) horizontal = Math.abs(dx) > Math.abs(dy);
        if (!horizontal) return;
        event.preventDefault();
        content.classList.add("is-dragging");
        const base = control.classList.contains("is-open") ? -144 : 0;
        const value = clamp(base + dx, -144, 0);
        content.style.transform = `translateX(${value}px)`;
      });
      const finish = () => {
        if (!dragging) return;
        dragging = false;
        content.classList.remove("is-dragging");
        content.style.transform = "";
        const base = control.classList.contains("is-open") ? -144 : 0;
        const value = base + dx;
        control.classList.toggle("is-open", horizontal && value < -72);
      };
      content.addEventListener("pointerup", finish);
      content.addEventListener("pointercancel", finish);
      $$(".win-swipe-action", control).forEach((action) => action.addEventListener("click", () => {
        control.classList.remove("is-open");
        control.dispatchEvent(new CustomEvent("winui:swipeaction", { bubbles: true, detail: { action: action.dataset.action } }));
      }));
    });
  }

  /* ---------------------------------------------------------------------
     PullToRefresh
     --------------------------------------------------------------------- */
  function initPullToRefresh(root) {
    $$(".win-pull-to-refresh", root).forEach((refresh) => {
      if (refresh.dataset.bound) return;
      refresh.dataset.bound = "true";
      const content = $(".win-pull-to-refresh__content", refresh);
      if (!content) return;
      let startY = 0, pulling = false, offset = 0;
      const finish = () => {
        pulling = false;
        refresh.classList.remove("is-pulling");
        refresh.style.removeProperty("--pull-offset");
        if (offset > 64) {
          refresh.classList.add("is-refreshing");
          const icon = $(".win-pull-to-refresh__indicator .win-icon", refresh);
          if (icon) icon.classList.add("win-icon-spin");
          setTimeout(() => {
            refresh.classList.remove("is-refreshing");
            if (icon) icon.classList.remove("win-icon-spin");
            refresh.dispatchEvent(new CustomEvent("winui:refresh", { bubbles: true }));
          }, 1200);
        }
        offset = 0;
      };
      content.addEventListener("pointerdown", (event) => {
        if (content.scrollTop <= 0) { startY = event.clientY; pulling = true; offset = 0; }
      });
      content.addEventListener("pointermove", (event) => {
        if (!pulling) return;
        offset = clamp(event.clientY - startY, 0, 96);
        if (offset > 8) {
          refresh.classList.add("is-pulling");
          refresh.style.setProperty("--pull-offset", `${offset * 0.5}px`);
        }
      });
      content.addEventListener("pointerup", finish);
      content.addEventListener("pointercancel", finish);
      $("[data-refresh]", refresh)?.addEventListener("click", finish);
    });
  }

  /* ---------------------------------------------------------------------
     Parallax
     --------------------------------------------------------------------- */
  function initParallax(root) {
    $$(".win-parallax", root).forEach((box) => {
      if (box.dataset.bound) return;
      box.dataset.bound = "true";
      const bg = $(".win-parallax__background", box);
      box.addEventListener("scroll", () => {
        if (bg) bg.style.transform = `translateY(${box.scrollTop * 0.35}px)`;
      }, { passive: true });
    });
  }

  /* ---------------------------------------------------------------------
     MediaPlayerElement
     --------------------------------------------------------------------- */
  function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds || 0));
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function initMedia(root) {
    $$("[data-media-player]", root).forEach((player) => {
      if (player.dataset.bound) return;
      player.dataset.bound = "true";
      const video = $("video", player);
      const button = $("[data-media-play]", player);
      const bigPlay = $(".win-media-player__big-play", player);
      const progress = $(".win-media-player__progress", player);
      const fill = $(".win-media-player__progress-fill", player);
      const time = $("[data-media-time]", player);
      let playing = false;
      let simulated = 0;
      function update() {
        if (video) {
          const duration = video.duration || 1;
          const pct = (video.currentTime / duration) * 100;
          if (fill) fill.style.width = `${pct}%`;
          if (progress) progress.style.setProperty("--progress", `${pct}%`);
          if (time) time.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        } else {
          const pct = simulated % 100;
          if (fill) fill.style.width = `${pct}%`;
          if (progress) progress.style.setProperty("--progress", `${pct}%`);
          if (time) time.textContent = `${formatTime((pct / 100) * 158)} / 2:38`;
        }
      }
      function toggle(event) {
        if (event) event.stopPropagation();
        playing = !playing;
        player.classList.toggle("is-playing", playing);
        if (video) { if (playing) video.play().catch(() => {}); else video.pause(); }
        const icon = button ? $(".win-icon", button) : null;
        if (icon) icon.innerHTML = playing ? "&#xE769;" : "&#xE768;";
        if (bigPlay) bigPlay.style.display = playing ? "none" : "";
        player.dispatchEvent(new CustomEvent("winui:playstate", { bubbles: true, detail: { playing } }));
      }
      button?.addEventListener("click", toggle);
      bigPlay?.addEventListener("click", toggle);
      player.addEventListener("click", (event) => {
        if (event.target.closest(".win-media-player__controls") || event.target.closest(".win-media-player__big-play")) return;
        if (!video) toggle(event);
      });
      if (video) {
        video.addEventListener("timeupdate", update);
        video.addEventListener("play", () => { if (!playing) toggle(); });
        video.addEventListener("pause", () => { if (playing) toggle(); });
      } else {
        setInterval(() => { if (playing) { simulated += 0.35; update(); } }, 300);
      }
      if (progress) progress.addEventListener("click", (event) => {
        const r = progress.getBoundingClientRect();
        const pct = clamp((event.clientX - r.left) / r.width, 0, 1);
        simulated = pct * 100;
        if (video && video.duration) video.currentTime = pct * video.duration;
        update();
      });
      update();
    });
  }

  /* ---------------------------------------------------------------------
     InkCanvas
     --------------------------------------------------------------------- */
  function initInk(root) {
    $$("[data-ink]").forEach((ink) => {
      if (ink.dataset.bound) return;
      ink.dataset.bound = "true";
      const canvas = $(".win-ink-canvas", ink);
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const state = ink._inkState || (ink._inkState = { color: "#005fb8", size: 3, drawing: false, strokes: [], redo: [] });
      function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = global.devicePixelRatio || 1;
        const snapshot = ink._inkSnapshot;
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        if (snapshot) ctx.drawImage(snapshot, 0, 0, rect.width, rect.height);
      }
      function snapshot() {
        try {
          const tmp = doc.createElement("canvas");
          tmp.width = canvas.width; tmp.height = canvas.height;
          tmp.getContext("2d").drawImage(canvas, 0, 0);
          ink._inkSnapshot = tmp;
        } catch (_) { /* ignore */ }
      }
      ink._inkResize = resize;
      resize();
      if (global.ResizeObserver) new ResizeObserver(() => resize()).observe(canvas);
      const pos = (event) => {
        const r = canvas.getBoundingClientRect();
        return { x: event.clientX - r.left, y: event.clientY - r.top };
      };
      canvas.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        state.drawing = true;
        state.current = [pos(event)];
        canvas.setPointerCapture(event.pointerId);
        ctx.globalCompositeOperation = state.eraser ? "destination-out" : "source-over";
        ctx.beginPath();
        ctx.strokeStyle = state.eraser ? "rgba(0,0,0,1)" : state.color;
        ctx.lineWidth = state.eraser ? state.size * 3 : state.size;
        ctx.moveTo(state.current[0].x, state.current[0].y);
      });
      canvas.addEventListener("pointermove", (event) => {
        if (!state.drawing) return;
        const p = pos(event);
        state.current.push(p);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });
      const end = () => {
        if (!state.drawing) return;
        state.drawing = false;
        if (state.current && state.current.length > 1) {
          state.strokes.push({ points: state.current, color: state.color, size: state.size, eraser: state.eraser });
          state.redo = [];
        }
        state.current = null;
        ctx.globalCompositeOperation = "source-over";
        snapshot();
        ink.dispatchEvent(new CustomEvent("winui:inkchange", { bubbles: true, detail: { strokes: state.strokes.length } }));
      };
      canvas.addEventListener("pointerup", end);
      canvas.addEventListener("pointercancel", end);
      $$("[data-ink-tool]", ink).forEach((tool) => {
        tool.addEventListener("click", () => {
          $$("[data-ink-tool]", ink).forEach((t) => t.classList.toggle("is-selected", t === tool));
          if (tool.dataset.inkTool === "eraser") {
            state.color = "rgba(0,0,0,0)";
            state.eraser = true;
          } else {
            state.eraser = false;
            state.color = tool.dataset.color || ink.dataset.color || "#005fb8";
            if (tool.dataset.inkTool === "highlighter") state.size = 14;
            else if (tool.dataset.inkTool === "pencil") state.size = 1.6;
            else state.size = 3;
          }
        });
      });
      $$("[data-ink-color]", ink).forEach((sw) => {
        sw.style.setProperty("--swatch", sw.dataset.inkColor);
        sw.addEventListener("click", () => { state.color = sw.dataset.inkColor; state.eraser = false; $$("[data-ink-color]", ink).forEach((s) => s.classList.toggle("is-selected", s === sw)); });
      });
      const size = $("[data-ink-size]", ink);
      if (size) size.addEventListener("input", () => { state.size = Number(size.value); });
      $("[data-ink-clear]", ink)?.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state.strokes = []; state.redo = []; snapshot();
      });
      $("[data-ink-undo]", ink)?.addEventListener("click", () => {
        const stroke = state.strokes.pop();
        if (stroke) { state.redo.push(stroke); redraw(); }
      });
      function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state.strokes.forEach((stroke) => {
          ctx.beginPath();
          ctx.globalCompositeOperation = stroke.eraser ? "destination-out" : "source-over";
          ctx.strokeStyle = stroke.eraser ? "rgba(0,0,0,1)" : stroke.color;
          ctx.lineWidth = stroke.eraser ? stroke.size * 3 : stroke.size;
          stroke.points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
          ctx.stroke();
        });
        ctx.globalCompositeOperation = "source-over";
        snapshot();
      }
    });
  }

  /* ---------------------------------------------------------------------
     ScrollView zoom, chart tooltips, color swatches
     --------------------------------------------------------------------- */
  on(doc, "input", (event) => {
    const zoom = event.target.closest("[data-scroll-zoom]");
    if (zoom) {
      const root = zoom.closest(".win-scroll-view");
      const target = $(".win-scroll-view__zoom", root);
      if (target) target.style.transform = `scale(${Number(zoom.value) / 100})`;
    }
  });

  /* ---------------------------------------------------------------------
     Command/copy actions
     --------------------------------------------------------------------- */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const area = doc.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      doc.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = doc.execCommand("copy"); } catch (err) { ok = false; }
      area.remove();
      return ok;
    }
  }

  on(doc, "click", async (event) => {
    const copy = event.target.closest("[data-copy]");
    if (copy) {
      event.preventDefault();
      const text = copy.getAttribute("data-copy") || copy.dataset.copyTarget && $(copy.dataset.copyTarget)?.textContent || "";
      const ok = await copyText(text);
      copy.dispatchEvent(new CustomEvent("winui:copied", { bubbles: true, detail: { ok } }));
      const original = copy.getAttribute("aria-label");
      copy.classList.add("is-copied");
      if (copy.classList.contains("win-button")) {
        const label = $(".win-button__content", copy) || copy;
        const previous = label.textContent;
        label.textContent = ok ? "Copied!" : "Copy failed";
        setTimeout(() => { label.textContent = previous; copy.classList.remove("is-copied"); }, 1400);
      }
      if (original) copy.setAttribute("aria-label", original);
    }
    const titlebarAction = event.target.closest("[data-caption]");
    if (titlebarAction) {
      const action = titlebarAction.dataset.caption;
      doc.dispatchEvent(new CustomEvent("winui:titlebaraction", { detail: { action } }));
    }
  });

  /* ---------------------------------------------------------------------
     RepeatButton
     --------------------------------------------------------------------- */
  on(doc, "pointerdown", (event) => {
    const repeat = event.target.closest(".win-repeat-button");
    if (!repeat || repeat.disabled) return;
    let count = 0;
    const fire = () => {
      count += 1;
      repeat.dispatchEvent(new CustomEvent("winui:repeat", { bubbles: true, detail: { count } }));
    };
    fire();
    repeat.classList.add("is-repeating");
    let interval = 0;
    const delay = setTimeout(() => {
      interval = setInterval(fire, Number(repeat.dataset.interval || 120));
    }, Number(repeat.dataset.delay || 450));
    const stop = () => {
      clearTimeout(delay);
      clearInterval(interval);
      repeat.classList.remove("is-repeating");
      doc.removeEventListener("pointerup", stop);
      doc.removeEventListener("pointercancel", stop);
    };
    doc.addEventListener("pointerup", stop);
    doc.addEventListener("pointercancel", stop);
  });

  /* ---------------------------------------------------------------------
     Generic toggle buttons
     --------------------------------------------------------------------- */
  on(doc, "click", (event) => {
    const toggle = event.target.closest(".win-toggle-button:not([aria-pressed='mixed']), .win-appbar-toggle-button, .win-toggle-split-button__primary");
    if (toggle) {
      const host = toggle.classList.contains("win-toggle-split-button__primary") ? toggle.closest(".win-toggle-split-button") : toggle;
      const next = host.getAttribute("aria-pressed") !== "true";
      host.setAttribute("aria-pressed", String(next));
      host.classList.toggle("is-checked", next);
      host.dispatchEvent(new CustomEvent("winui:toggle", { bubbles: true, detail: { checked: next } }));
    }
  });

  /* ---------------------------------------------------------------------
     Generic menu / flyout triggers
     --------------------------------------------------------------------- */
  on(doc, "click", (event) => {
    const trigger = event.target.closest("[data-flyout], [data-menu]");
    if (trigger) {
      event.preventDefault();
      const id = trigger.getAttribute("data-flyout") || trigger.getAttribute("data-menu");
      openFlyout(trigger, id, { menu: trigger.hasAttribute("data-menu"), align: trigger.getAttribute("data-align") || "start" });
      return;
    }
    const menuItem = event.target.closest(".win-menu-item");
    if (menuItem && !menuItem.hasAttribute("data-no-close")) { handleMenuAction(menuItem, event); return; }
    const closeBtn = event.target.closest("[data-close-flyout]");
    if (closeBtn) closeFlyout();
  });

  on(doc, "click", (event) => {
    const reveal = event.target.closest(".win-password-box__reveal");
    if (reveal) {
      const box = reveal.closest(".win-password-box");
      const input = $(".win-password-box__input", box);
      if (input) {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        reveal.setAttribute("aria-label", show ? "Hide password" : "Show password");
        const icon = $(".win-icon", reveal);
        if (icon) icon.innerHTML = "&#xE7B3;";
      }
      return;
    }
    const infoClose = event.target.closest(".win-info-bar__close");
    if (infoClose) {
      const bar = infoClose.closest(".win-info-bar");
      bar.style.transition = "opacity 120ms linear, transform 120ms ease";
      bar.style.opacity = "0";
      bar.style.transform = "translateY(-4px)";
      setTimeout(() => bar.remove(), 130);
      return;
    }
    const comboButton = event.target.closest(".win-combo-box__button");
    if (comboButton) {
      const combo = comboButton.closest(".win-combo-box");
      const popup = $(".win-combo-box__popup", combo);
      if (popup && !popup.hidden) closeCombo(combo); else openCombo(combo);
      return;
    }
    const option = event.target.closest(".win-combo-box__option");
    if (option) { selectComboOption(option); return; }
    const tabClose = event.target.closest("[data-close-tab]");
    if (tabClose) event.stopPropagation();
  });

  /* ---------------------------------------------------------------------
     Splitters (simple draggable panes)
     --------------------------------------------------------------------- */
  on(doc, "pointerdown", (event) => {
    const splitter = event.target.closest("[data-splitter]");
    if (!splitter) return;
    event.preventDefault();
    const container = splitter.closest("[data-splitter-container]") || splitter.parentElement;
    const target = splitter.dataset.splitter ? $(splitter.dataset.splitter, container) : container.firstElementChild;
    if (!target) return;
    const startX = event.clientX;
    const startWidth = target.getBoundingClientRect().width;
    splitter.setPointerCapture(event.pointerId);
    const move = (e) => {
      const width = clamp(startWidth + (e.clientX - startX), 120, container.getBoundingClientRect().width - 160);
      target.style.width = `${width}px`;
      target.style.flex = "none";
    };
    const up = (e) => {
      splitter.releasePointerCapture(e.pointerId);
      splitter.removeEventListener("pointermove", move);
      splitter.removeEventListener("pointerup", up);
    };
    splitter.addEventListener("pointermove", move);
    splitter.addEventListener("pointerup", up);
  });

  /* ---------------------------------------------------------------------
     Keyboard navigation
     --------------------------------------------------------------------- */
  on(doc, "keydown", (event) => {
    const combo = event.target.closest(".win-combo-box");
    if (combo) {
      const button = $(".win-combo-box__button", combo);
      const popup = $(".win-combo-box__popup", combo);
      if (!popup) return;
      const options = $$(".win-combo-box__option", combo);
      let index = options.findIndex((o) => o.getAttribute("aria-selected") === "true");
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (popup.hidden) openCombo(combo);
        index = clamp(index + (event.key === "ArrowDown" ? 1 : -1), 0, options.length - 1);
        if (options[index]) options[index].scrollIntoView({ block: "nearest" });
        options.forEach((o, i) => o.classList.toggle("is-active", i === index));
      }
      if (event.key === "Enter" && !popup.hidden) {
        const active = $(".win-combo-box__option.is-active", combo);
        if (active) selectComboOption(active);
      }
      if (event.key === "Escape") { closeCombo(combo); button.focus(); }
    }
    const menu = event.target.closest(".win-menu-flyout, .win-menu-submenu");
    if (menu && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      const items = $$(".win-menu-item:not([aria-disabled='true'])", menu);
      const index = items.indexOf(doc.activeElement);
      event.preventDefault();
      items[(index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
    }
  });

  /* ---------------------------------------------------------------------
     Escape-safe cleanup
     --------------------------------------------------------------------- */
  on(doc, "click", (event) => {
    if (event.target.closest("[data-dismiss]")) event.target.closest("[data-dismiss]").remove();
  });

  /* ---------------------------------------------------------------------
     HTML escaping helpers
     --------------------------------------------------------------------- */
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttr(value) { return escapeHtml(value).replace(/`/g, "&#96;"); }

  /* ---------------------------------------------------------------------
     Public API
     --------------------------------------------------------------------- */
  const SCROLLBAR_SELECTOR = [
    ".gallery-main",
    ".showcase-page",
    ".win-nav-view__items",
    ".win-scroll-view",
    ".win-list-view",
    ".win-grid-view",
    ".win-tree-view",
    ".win-table-view",
    ".win-items-repeater",
    ".win-items-view",
    ".win-flip-view__viewport",
    ".win-dialog__body",
    ".win-rich-edit-box__content",
    ".win-tab-view__content",
    ".win-pivot__content",
    ".win-code",
    ".sample__code pre",
    "textarea.win-textbox"
  ].join(", ");

  function initScrollbars(root = doc) {
    const scope = root || doc;
    const hosts = [];
    if (scope.matches?.(SCROLLBAR_SELECTOR)) hosts.push(scope);
    $$(SCROLLBAR_SELECTOR, scope).forEach((host) => hosts.push(host));
    hosts.forEach((host) => {
      if (host.dataset.scrollbarBound) return;
      host.dataset.scrollbarBound = "true";
      host.classList.add("win-scroll-host", "is-scrollbar-hidden");
      let idleTimer = 0;
      const state = (name) => {
        host.classList.toggle("is-scrollbar-active", name === "active");
        host.classList.toggle("is-scrollbar-thin", name === "thin");
        host.classList.toggle("is-scrollbar-hidden", name === "hidden");
      };
      const schedule = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (host.matches(":hover") || host.contains(document.activeElement)) state("thin");
          else state("hidden");
        }, 3000);
      };
      const activate = () => {
        state("active");
        schedule();
      };
      host.addEventListener("scroll", activate, { passive: true });
      host.addEventListener("pointerenter", () => {
        if (!host.classList.contains("is-scrollbar-active")) state("thin");
      });
      host.addEventListener("pointerleave", schedule);
      host.addEventListener("focusin", activate);
      host.addEventListener("focusout", schedule);
    });
  }

  const WinUI = global.WinUI = {
    version: "1.0.0",
    theme: {
      get: () => html.dataset.theme,
      mode: () => html.dataset.themeMode,
      set: (theme) => applyTheme(theme),
      toggle: () => applyTheme(html.dataset.theme === "dark" ? "light" : "dark"),
      system: () => applyTheme("system")
    },
    accent: {
      get: () => accentValue,
      set: (value) => applyAccent(value),
      system: () => readSystemAccent(),
      followSystem: () => {
        const value = readSystemAccent();
        storage.remove(KEYS.accent);
        applyAccent(value, false);
        return value;
      },
      presets: ACCENT_PRESETS
    },
    density: {
      get: () => html.dataset.density || "normal",
      set: (value) => applyDensity(value)
    },
    dialogs: { open: openDialog, close: closeDialog },
    flyouts: { open: openFlyout, close: closeFlyout, menu: openMenu },
    tips: { show: showTeachingTip, hide: hideTeachingTip },
    toast,
    copy: copyText,
    nav: {
      toggle: () => toggleNav(doc.getElementById("galleryNav") || doc.getElementById("showcaseNav") || $(".win-nav-view")),
      set: (expanded) => {
        const target = doc.getElementById("galleryNav") || doc.getElementById("showcaseNav") || $(".win-nav-view");
        toggleNav(target, expanded);
      },
      isOpen: () => {
        const target = doc.getElementById("galleryNav") || doc.getElementById("showcaseNav") || $(".win-nav-view");
        if (!target) return false;
        return navIsMobile() ? target.classList.contains("is-pane-open") : !target.classList.contains("win-nav-view--compact");
      }
    },
    color: { normalizeHex, hexToRgb, rgbToHex, hsvToRgb, rgbToHsv, mix, luminance },
    setProgress,
    openDatePicker,
    showTooltip,
    hideTooltip,
    escapeHtml,
    escapeAttr,
    keys: KEYS,
    init(root = doc) {
      const scope = root || doc;
      initComboBox(scope);
      initAutoSuggest(scope);
      initSliders(scope);
      initNumberBoxes(scope);
      initRatings(scope);
      initProgress(scope);
      initColorPickers(scope);
      initCalendars(scope);
      initDatePickers(scope);
      initTimePickers(scope);
      initTabs(scope);
      initNav(scope);
      initFlipViews(scope);
      initTables(scope);
      initSwipe(scope);
      initPullToRefresh(scope);
      initParallax(scope);
      initMedia(scope);
      initInk(scope);
      initScrollbars(scope);
      $$(".win-calendar", scope).forEach(initCalendar);
      $$(".win-time-picker", scope).forEach(initTimePicker);
      $$("[data-selectable]", scope).forEach((group) => {
        if (!group.querySelector("[aria-selected='true']")) {
          const first = group.querySelector(".win-list-item, .win-grid-item, .win-items-view__item");
          if (first && !group.dataset.noAutoSelect) first.classList.add("is-selected");
        }
      });
      return WinUI;
    }
  };

  doc.addEventListener("DOMContentLoaded", () => WinUI.init(doc));
  if (doc.readyState === "interactive" || doc.readyState === "complete") WinUI.init(doc);

  let navResizeTimer = 0;
  global.addEventListener("resize", () => {
    clearTimeout(navResizeTimer);
    navResizeTimer = setTimeout(() => {
      $$(".win-nav-view").forEach((nav) => {
        nav.classList.remove("is-pane-open");
        if (!navIsMobile()) nav.classList.remove("win-nav-view--compact");
        syncNavState(nav);
      });
    }, 120);
  });
})(window);
