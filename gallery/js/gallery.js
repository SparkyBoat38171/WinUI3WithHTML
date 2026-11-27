/* ==========================================================================
   WinUI Gallery — application
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const main = () => document.getElementById("galleryMain");
  const content = () => document.getElementById("galleryContent");
  const catalog = window.GALLERY_CATALOG || [];
  const samples = window.GALLERY_SAMPLES || (window.GALLERY_SAMPLES = {});
  const esc = window.WinUI.escapeHtml;
  const attr = window.WinUI.escapeAttr;

  const allItems = [];
  const itemMap = new Map();
  const groupMap = new Map();
  catalog.forEach((group) => {
    groupMap.set(group.id, group);
    group.items.forEach((item) => {
      item.groupTitle = group.title;
      allItems.push(item);
      itemMap.set(item.id, item);
    });
  });

  const decodeGlyph = (value) => {
    if (!value) return "\uE8B3";
    if (value.startsWith("\\u")) return String.fromCharCode(parseInt(value.slice(2), 16));
    return value;
  };

  const i18n = window.GALLERY_I18N || { defaultLocale: "en-US", locales: { "en-US": { ui: {}, groups: {}, items: {} } } };
  const localeKeys = Object.keys(i18n.locales || {});
  const detectLocale = () => {
    const fromQuery = new URLSearchParams(location.search).get("lang");
    if (fromQuery && localeKeys.includes(fromQuery)) return fromQuery;
    const stored = (() => { try { return localStorage.getItem(window.WinUI.keys.language); } catch (_) { return ""; } })();
    if (stored && localeKeys.includes(stored)) return stored;
    const preferred = navigator.languages?.find((lang) => lang.toLowerCase().startsWith("zh")) || navigator.language || "";
    if (preferred.toLowerCase().startsWith("zh") && localeKeys.includes("zh-CN")) return "zh-CN";
    return localeKeys.includes("zh-CN") ? "zh-CN" : "en-US";
  };

  const state = {
    favorites: new Set(readJSON(window.WinUI.keys.favorites, [])),
    recent: readJSON(window.WinUI.keys.recent, []),
    homeFilter: "recent",
    currentRoute: "",
    searchQuery: "",
    density: window.WinUI.density.get(),
    lang: detectLocale()
  };
  let navDepth = 0;

  function localeStrings() {
    return i18n.locales[state.lang]?.ui || i18n.locales["en-US"]?.ui || {};
  }

  function t(key, params = {}) {
    const table = localeStrings();
    let value = table[key] ?? i18n.locales["en-US"]?.ui?.[key] ?? key;
    Object.keys(params).forEach((name) => {
      value = String(value).replaceAll(`{${name}}`, String(params[name]));
    });
    return value;
  }

  function setLanguage(lang) {
    if (!localeKeys.includes(lang) || lang === state.lang) return;
    state.lang = lang;
    try { localStorage.setItem(window.WinUI.keys.language, lang); } catch (_) { /* ignore */ }
    document.documentElement.lang = lang === "zh-CN" ? "zh-CN" : "en";
    document.title = t("appTitle");
    buildNav();
    updateStaticText();
    updateSearchSuggestions();
    renderRoute(state.currentRoute || "home");
  }

  function localizedItem(item) {
    const translation = i18n.locales[state.lang]?.items?.[item.id];
    return translation ? { ...item, ...translation } : item;
  }

  function groupTitle(group) {
    return i18n.locales[state.lang]?.groups?.[group.id] || group.title;
  }

  function localizedExampleTitle(text) {
    const map = i18n.locales[state.lang]?.exampleTitles || {};
    return map[text] || text;
  }

  function translateSampleDom(root) {
    if (state.lang !== "zh-CN" || !root) return;
    const locale = i18n.locales["zh-CN"];
    const map = { ...(locale?.sampleText || {}), ...(locale?.sampleTextExtra || {}) };
    const translate = (value) => {
      const trimmed = value.trim();
      if (!trimmed) return value;
      const sampleMeta = trimmed.match(/^Sample\s+(\d+)\s*·\s*(\d+)\s*min read$/i);
      if (sampleMeta) return value.replace(trimmed, `示例 ${sampleMeta[1]} · 阅读 ${sampleMeta[2]} 分钟`);
      const minutes = trimmed.match(/^(\d+)\s*min$/i);
      if (minutes) return value.replace(trimmed, `${minutes[1]} 分钟`);
      const pagerRange = trimmed.match(/^(\d+)[–-](\d+)\s+of\s+(\d+)$/i);
      if (pagerRange) return value.replace(trimmed, `第 ${pagerRange[1]}–${pagerRange[2]} 项，共 ${pagerRange[3]} 项`);
      const itemNumber = trimmed.match(/^Item\s+(\d+)$/i);
      if (itemNumber) return value.replace(trimmed, `项目 ${itemNumber[1]}`);
      const sectionNumber = trimmed.match(/^Content section\s+(\d+)$/i);
      if (sectionNumber) return value.replace(trimmed, `内容区域 ${sectionNumber[1]}`);
      const pageNumber = trimmed.match(/^Page\s+(\d+)$/i);
      if (pageNumber) return value.replace(trimmed, `第 ${pageNumber[1]} 页`);
      const members = trimmed.match(/^(\d+)\s+members$/i);
      if (members) return value.replace(trimmed, `${members[1]} 名成员`);
      const settingsCount = trimmed.match(/^(\d+)\s+settings$/i);
      if (settingsCount) return value.replace(trimmed, `${settingsCount[1]} 项设置`);
      const cardNumber = trimmed.match(/^Card\s+(One|Two|Three|Four|Five|Six)$/i);
      if (cardNumber) {
        const cardNames = { one: "一", two: "二", three: "三", four: "四", five: "五", six: "六" };
        return value.replace(trimmed, `卡片${cardNames[cardNumber[1].toLowerCase()]}`);
      }
      const depth = trimmed.match(/^Depth\s+(\d+)$/i);
      if (depth) return value.replace(trimmed, `深度 ${depth[1]}`);
      if (!map[trimmed]) return value;
      const start = value.indexOf(trimmed);
      return value.slice(0, start) + map[trimmed] + value.slice(start + trimmed.length);
    };
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest("pre, code, script, style")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => { node.nodeValue = translate(node.nodeValue); });
    $$("[placeholder], [aria-label], [title], [data-tooltip]", root).forEach((element) => {
      ["placeholder", "aria-label", "title", "data-tooltip"].forEach((name) => {
        if (element.hasAttribute(name)) element.setAttribute(name, translate(element.getAttribute(name)));
      });
    });
  }

  function updateStaticText() {
    const title = document.querySelector(".win-title-bar__title");
    if (title) title.textContent = t("appTitle");
    const search = document.getElementById("gallerySearch");
    if (search) {
      search.placeholder = t("searchPlaceholder");
      search.setAttribute("aria-label", t("searchLabel"));
    }
    const settingsLabel = document.querySelector('.win-nav-view__footer [data-route="settings"] .win-nav-item__label');
    if (settingsLabel) settingsLabel.textContent = t("settings");
    const settingsLink = document.querySelector('.win-nav-view__footer [data-route="settings"]');
    if (settingsLink) settingsLink.dataset.tooltip = t("settings");
    const navToggle = document.querySelector(".gallery-titlebar [data-nav-toggle]");
    if (navToggle) {
      navToggle.dataset.tooltip = t("navigation");
      navToggle.setAttribute("aria-label", t("navigation"));
    }
    const back = document.getElementById("backButton");
    if (back) back.setAttribute("aria-label", t("back"));
    const searchClear = document.getElementById("clearSearch");
    if (searchClear) searchClear.setAttribute("aria-label", t("clearSearch"));
    $$("[data-caption]").forEach((button) => {
      const action = button.dataset.caption;
      const label = action === "minimize" ? t("minimize") : action === "maximize" ? t("maximize") : t("close");
      button.setAttribute("aria-label", label);
      button.dataset.tooltip = label;
    });
  }

  function refreshNavLabels() {
    updateStaticText();
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* ignore */ }
  }
  function persistState() {
    writeJSON(window.WinUI.keys.favorites, Array.from(state.favorites));
    writeJSON(window.WinUI.keys.recent, state.recent);
  }
  function addRecent(id) {
    state.recent = [id, ...state.recent.filter((x) => x !== id)].slice(0, 12);
    persistState();
  }
  function isFavorite(id) { return state.favorites.has(id); }
  function toggleFavorite(id) {
    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);
    persistState();
  }

  /* ---------------------------------------------------------------------
     Navigation
     --------------------------------------------------------------------- */
  function buildNav() {
    const nav = document.getElementById("galleryNavItems");
    const specialGroups = catalog.filter((g) => g.special);
    const controlGroups = catalog.filter((g) => !g.special)
      .sort((a, b) => groupTitle(a).localeCompare(groupTitle(b), state.lang));
    let html = `
      <a class="win-nav-item" href="#home" data-route="home" data-tooltip="${attr(t("home"))}">
        <span class="win-nav-item__icon">&#xE80F;</span><span class="win-nav-item__label">${esc(t("home"))}</span>
      </a>`;
    specialGroups.forEach((group) => {
      const id = `nav-group-${group.id}`;
      const title = groupTitle(group);
      html += `
        <button type="button" class="win-nav-item" data-nav-parent data-route="group/${group.id}" aria-expanded="false" data-tooltip="${attr(title)}">
          <span class="win-nav-item__icon">${decodeGlyph(group.icon)}</span>
          <span class="win-nav-item__label">${esc(title)}</span>
          <span class="win-nav-item__chevron">&#xE76C;</span>
        </button>
        <div class="win-nav-submenu" id="${id}"><div>
          ${group.items.map((item) => {
            const meta = localizedItem(item);
            return `
            <a class="win-nav-item win-nav-item--indent" href="#item/${item.id}" data-route="item/${item.id}" data-tooltip="${attr(meta.title)}">
              <span class="win-nav-item__label">${esc(meta.title)}</span>
            </a>`;
          }).join("")}
        </div></div>`;
    });
    html += `<div class="win-nav-item win-nav-item--header">${esc(t("controls"))}</div>`;
    html += `
      <a class="win-nav-item" href="#all" data-route="all" data-tooltip="${attr(t("allControls"))}">
        <span class="win-nav-item__icon">&#xE8A9;</span><span class="win-nav-item__label">${esc(t("allControls"))}</span>
      </a>`;
    controlGroups.forEach((group) => {
      const id = `nav-group-${group.id}`;
      const title = groupTitle(group);
      html += `
        <button type="button" class="win-nav-item" data-nav-parent data-route="group/${group.id}" aria-expanded="false" data-tooltip="${attr(title)}">
          <span class="win-nav-item__icon">${decodeGlyph(group.icon)}</span>
          <span class="win-nav-item__label">${esc(title)}</span>
          <span class="win-nav-item__chevron">&#xE76C;</span>
        </button>
        <div class="win-nav-submenu" id="${id}"><div>
          ${group.items.map((item) => {
            const meta = localizedItem(item);
            return `
            <a class="win-nav-item win-nav-item--indent" href="#item/${item.id}" data-route="item/${item.id}" data-tooltip="${attr(meta.title)}">
              <span class="win-nav-item__label">${esc(meta.title)}</span>
            </a>`;
          }).join("")}
        </div></div>`;
    });
    nav.innerHTML = html;
    refreshNavLabels();
  }

  function updateNav(route) {
    const parts = route.split("/");
    const itemId = parts[0] === "item" ? parts[1] : "";
    const groupId = parts[0] === "group" ? parts[1] : (itemId ? itemMap.get(itemId)?.group : "");
    $$("[data-route]", document).forEach((el) => {
      const active = el.dataset.route === route;
      el.classList.toggle("is-selected", active);
      if (active) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current");
    });
    const nav = document.getElementById("galleryNav");
    if (nav) {
      $$(".win-nav-submenu.is-open", nav).forEach((submenu) => {
        submenu.classList.remove("is-open");
        const parent = submenu.previousElementSibling;
        if (parent?.hasAttribute("data-nav-parent")) parent.setAttribute("aria-expanded", "false");
      });
      if (groupId) {
        const group = groupMap.get(groupId);
        const parent = group ? $(`#nav-group-${group.id}`)?.previousElementSibling : null;
        const submenu = group ? document.getElementById(`nav-group-${group.id}`) : null;
        if (parent && submenu) {
          parent.setAttribute("aria-expanded", "true");
          submenu.classList.add("is-open");
        }
      }
    }
    const back = document.getElementById("backButton");
    if (back) back.hidden = route === "home";
    if (nav && window.innerWidth <= 720) nav.classList.remove("is-pane-open");
  }

  /* ---------------------------------------------------------------------
     Card rendering
     --------------------------------------------------------------------- */
  function card(item, options = {}) {
    const meta = localizedItem(item);
    return `
      <button class="gallery-card ${options.vertical ? "gallery-card--vertical" : ""}" data-route="item/${meta.id}" aria-label="${attr(meta.title)} sample">
        <img class="gallery-card__image" src="${attr(meta.image)}" alt="" loading="lazy">
        <span class="gallery-card__body">
          <span class="gallery-card__title">${esc(meta.title)}</span>
          <span class="gallery-card__subtitle">${esc(meta.subtitle)}</span>
          <span class="gallery-card__meta">${esc(groupTitle(groupMap.get(meta.group)))}</span>
        </span>
        <span class="gallery-card__status">
          ${meta.isNew ? `<span class="gallery-card__badge gallery-card__badge--new">${esc(t("new"))}</span>` : ""}
          ${meta.isUpdated ? `<span class="gallery-card__badge">${esc(t("updated"))}</span>` : ""}
          ${meta.isExperimental ? `<span class="gallery-card__badge gallery-card__badge--warning">${esc(t("experimental"))}</span>` : ""}
        </span>
      </button>`;
  }

  function recentItems() {
    const stored = state.recent.map((id) => itemMap.get(id)).filter(Boolean);
    if (stored.length) return stored.slice(0, 8);
    return ["Button", "NavigationView", "ContentDialog", "ColorPicker", "Typography", "TreeView"]
      .map((id) => itemMap.get(id)).filter(Boolean);
  }

  function updatedItems() {
    const list = allItems.filter((item) => item.isNew || item.isUpdated);
    return (list.length ? list : allItems).slice(0, 8);
  }

  function favoriteItems() {
    return Array.from(state.favorites).map((id) => itemMap.get(id)).filter(Boolean);
  }

  /* ---------------------------------------------------------------------
     Home
     --------------------------------------------------------------------- */
  function homeTiles() {
    if (state.lang === "zh-CN") {
      return [
        { title: "入门", desc: "开始使用 WinUI，并浏览详细文档。", image: "assets/HomeHeaderTiles/Header-WinUI.png", href: "https://aka.ms/winui-getstarted" },
        { title: "设计", desc: "创建出色 WinUI 体验的指南和工具包。", image: "assets/HomeHeaderTiles/Header-WindowsDesign.png", href: "https://learn.microsoft.com/windows/apps/design/" },
        { title: "GitHub 上的 WinUI", desc: "浏览 WinUI 源代码和代码仓库。", icon: "&#xE943;", svg: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`, href: "https://github.com/microsoft/microsoft-ui-xaml" },
        { title: "社区工具包", desc: "一组辅助函数、控件和应用服务。", image: "assets/HomeHeaderTiles/Header-Toolkit.png", href: "https://github.com/CommunityToolkit/WindowsCommunityToolkit" },
        { title: "代码示例", desc: "查找演示特定任务、功能和 API 的示例。", icon: "&#xE8A5;", href: "https://learn.microsoft.com/windows/apps/get-started/samples" },
        { title: "合作伙伴中心", desc: "将应用发布到 Microsoft Store。", image: "assets/HomeHeaderTiles/Header-Store.light.png", href: "https://developer.microsoft.com/windows/" }
      ];
    }
    return [
      { title: "Getting started", desc: "Get started with WinUI and explore detailed documentation.", image: "assets/HomeHeaderTiles/Header-WinUI.png", href: "https://aka.ms/winui-getstarted" },
      { title: "Design", desc: "Guidelines and toolkits for creating stunning WinUI experiences.", image: "assets/HomeHeaderTiles/Header-WindowsDesign.png", href: "https://learn.microsoft.com/windows/apps/design/" },
      { title: "WinUI on GitHub", desc: "Explore the WinUI source code and repository.", icon: "&#xE943;", svg: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`, href: "https://github.com/microsoft/microsoft-ui-xaml" },
      { title: "Community Toolkit", desc: "A collection of helper functions, controls, and app services.", image: "assets/HomeHeaderTiles/Header-Toolkit.png", href: "https://github.com/CommunityToolkit/WindowsCommunityToolkit" },
      { title: "Code samples", desc: "Find samples that demonstrate specific tasks, features, and APIs.", icon: "&#xE8A5;", href: "https://learn.microsoft.com/windows/apps/get-started/samples" },
      { title: "Partner Center", desc: "Upload your app to the Store.", image: "assets/HomeHeaderTiles/Header-Store.light.png", href: "https://developer.microsoft.com/windows/" }
    ];
  }

  function renderHome() {
    const tiles = homeTiles();
    const recent = recentItems();
    const updated = updatedItems();
    const favorites = favoriteItems();
    content().innerHTML = `
      <section class="gallery-home-hero">
        <div class="gallery-home-hero__image"></div>
        <div class="gallery-home-hero__content">
          <div class="gallery-home-hero__eyebrow">${esc(t("homeEyebrow"))}</div>
          <h1 class="gallery-home-hero__title">${esc(t("appTitle"))}</h1>
          <p class="gallery-home-hero__subtitle">${esc(t("homeSubtitle"))}</p>
          <div class="gallery-home-hero__actions">
            <button class="win-button win-button--accent" data-route="all"><span class="win-icon">&#xE8A9;</span><span class="win-button__content">${esc(t("browseAllControls"))}</span></button>
            <button class="win-button" data-route="item/Button"><span class="win-icon win-icon--play">&#xE768;</span><span class="win-button__content">${esc(t("startWithButton"))}</span></button>
          </div>
          <div class="gallery-home-tiles">
            ${tiles.map((tile) => `
              <a class="gallery-tile" href="${tile.href}" target="_blank" rel="noopener">
                <span class="gallery-tile__visual">${tile.image ? `<img src="${tile.image}" alt="">` : tile.svg ? tile.svg : `<span class="win-icon">${tile.icon}</span>`}</span>
                <span class="gallery-tile__body"><span class="gallery-tile__title">${esc(tile.title)}</span><span class="gallery-tile__desc">${esc(tile.desc)}</span></span>
                <span class="gallery-tile__arrow"><span class="win-icon">&#xE8A7;</span></span>
              </a>`).join("")}
          </div>
        </div>
      </section>
      <div class="gallery-home-body">
        <div class="gallery-home-toolbar">
          <div class="win-selector-bar" id="homeFilterBar">
            <button class="win-selector-bar__item ${state.homeFilter === "recent" ? "is-selected" : ""}" data-home-filter="recent"><span class="win-icon">&#xE823;</span>${esc(t("recent"))}</button>
            <button class="win-selector-bar__item ${state.homeFilter === "favorites" ? "is-selected" : ""}" data-home-filter="favorites"><span class="win-icon">&#xE734;</span>${esc(t("favorites"))}</button>
          </div>
        </div>
        <div id="homeFilterContent">
          ${state.homeFilter === "recent" ? renderRecentHome(recent, updated) : renderFavoritesHome(favorites)}
        </div>
      </div>`;
  }

  function renderRecentHome(recent, updated) {
    return `
      <div class="gallery-home-section"><h2>${esc(t("recentlyVisited"))}</h2><p>${esc(state.recent.length ? t("recentlyVisitedDesc") : t("recentlyVisitedFallback"))}</p></div>
      <div class="gallery-hscroll">${recent.map((item) => card(item)).join("")}</div>
      <div class="gallery-home-section" style="margin-top:26px"><h2>${esc(t("recentlyAdded"))}</h2><button class="win-button win-button--subtle" data-route="all">${esc(t("seeAll"))} <span class="win-icon">&#xE72A;</span></button></div>
      <div class="gallery-grid">${updated.map((item) => card(item)).join("")}</div>`;
  }

  function renderFavoritesHome(favorites) {
    if (!favorites.length) {
      return `
        <div class="gallery-empty">
          <img src="assets/ControlImages/RatingControl.png" alt="">
          <h2>${esc(t("noFavorites"))}</h2>
          <p>${esc(t("noFavoritesDesc"))}</p>
          <button class="win-button win-button--accent" data-route="all">${esc(t("browseControls"))}</button>
        </div>`;
    }
    return `
      <div class="gallery-home-section"><h2>${esc(t("favorites"))}</h2><p>${esc(t("savedSamples", { count: favorites.length }))}</p></div>
      <div class="gallery-grid">${favorites.map((item) => card(item)).join("")}</div>`;
  }

  /* ---------------------------------------------------------------------
     All controls / group / search
     --------------------------------------------------------------------- */
  function renderAll() {
    const items = allItems.slice().sort((a, b) => localizedItem(a).title.localeCompare(localizedItem(b).title, state.lang));
    content().innerHTML = `
      <div class="gallery-page gallery-page--wide">
        <header class="gallery-page-header">
          <div><h1>${esc(t("allControlsTitle"))}</h1></div>
        </header>
        <div class="gallery-grid">${items.map((item) => card(item)).join("")}</div>
      </div>`;
  }

  function renderGroup(groupId) {
    const group = groupMap.get(groupId);
    if (!group) { renderNotFound(); return; }
    const title = groupTitle(group);
    content().innerHTML = `
      <div class="gallery-page gallery-page--wide">
        <header class="gallery-page-header">
          <div><h1>${esc(title)}</h1></div>
        </header>
        <div class="gallery-grid">${group.items.map((item) => card(item)).join("")}</div>
      </div>`;
  }

  function renderSearch(query) {
    state.searchQuery = query;
    const q = (query || "").trim().toLowerCase();
    const matches = allItems.filter((item) => {
      const meta = localizedItem(item);
      return `${meta.title} ${meta.subtitle} ${meta.description} ${item.tags.join(" ")} ${groupTitle(groupMap.get(item.group))}`.toLowerCase().includes(q);
    });
    content().innerHTML = `
      <div class="gallery-page gallery-page--wide">
        <header class="gallery-page-header gallery-search-header">
          <div><h1>${esc(t("searchResults"))}</h1><p>${esc(t("resultsFor", { count: matches.length, query: query || "" }))}</p></div>
        </header>
        ${matches.length ? `<div class="gallery-grid gallery-search-results">${matches.map((item) => card(item)).join("")}</div>` : `
          <div class="gallery-empty">
            <img src="assets/${window.WinUI.theme.get() === "dark" ? "NoResults.dark.png" : "NoResults.light.png"}" alt="">
            <h2>${esc(t("noResults"))}</h2>
            <p>${esc(t("noResultsDesc"))}</p>
            <button class="win-button win-button--accent" data-route="all">${esc(t("browseControls"))}</button>
          </div>`}
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Sample rendering
     --------------------------------------------------------------------- */
  function getExamples(item) {
    const custom = samples[item.id];
    if (custom && custom.examples && custom.examples.length) return custom;
    const meta = localizedItem(item);
    return {
      examples: [{
        title: `${meta.title} ${state.lang === "zh-CN" ? "概述" : "overview"}`,
        center: true,
        preview: `
          <div class="win-card" style="max-width:520px;text-align:center;padding:28px 32px">
            <img src="${attr(item.image)}" alt="" style="width:48px;height:48px;margin:0 auto 12px">
            <div class="win-subtitle">${esc(meta.title)}</div>
            <p class="win-body win-text-secondary" style="margin-top:6px">${esc(meta.subtitle)}</p>
            <div class="win-caption win-text-tertiary" style="margin-top:12px">${esc(t("webImplementation"))}</div>
          </div>`,
        xaml: `<${item.title.replace(/[^A-Za-z0-9_]/g, "")} />`,
        csharp: `// ${item.title}\n// See the WinUI Gallery for the complete native sample.`,
        html: `<!-- The equivalent HTML implementation is available in the Code library. -->`
      }]
    };
  }

  function renderCodeTabs(sampleId, example) {
    const tabs = [
      example.xaml ? { id: "xaml", label: "XAML", code: example.xaml } : null,
      example.csharp ? { id: "csharp", label: "C#", code: example.csharp } : null,
      example.html ? { id: "html", label: "HTML", code: example.html } : null
    ].filter(Boolean);
    if (!tabs.length) return "";
    return `
      <div class="sample__code">
        <div class="sample__code-header">
          <div class="sample__code-tabs">
            ${tabs.map((tab, i) => `<button class="sample__code-tab ${i === 0 ? "is-selected" : ""}" data-code-tab="${sampleId}-${tab.id}">${tab.label}</button>`).join("")}
          </div>
          <span class="win-spacer"></span>
          <button class="win-button win-button--subtle win-button--small" data-copy-code="${sampleId}" aria-label="${attr(t("copyCode"))}"><span class="win-icon">&#xE8C8;</span><span>${esc(t("copy"))}</span></button>
        </div>
        ${tabs.map((tab, i) => `<pre data-code-panel="${sampleId}-${tab.id}" ${i === 0 ? "" : "hidden"}><code>${esc(tab.code)}</code></pre>`).join("")}
      </div>`;
  }

  function renderExample(item, example, index) {
    const sampleId = `sample-${item.id}-${index}`;
    const stageClass = [
      "sample__stage",
      example.center !== false && !example.stageClass ? "sample__stage--center" : "",
      example.stageClass || ""
    ].filter(Boolean).join(" ");
    return `
      <section class="sample" data-sample-id="${sampleId}">
        <div class="sample__header">
          <h3>${esc(localizedExampleTitle(example.title || t("example")))}</h3>
          ${example.experimental ? `<span class="sample__experimental">${esc(t("experimental"))}</span>` : ""}
          ${example.description ? `<span class="win-caption win-text-tertiary">${esc(example.description)}</span>` : ""}
        </div>
        <div class="sample__frame">
          <div class="sample__display">
            <div class="${stageClass}">${example.preview || ""}</div>
            ${example.options ? `<div class="sample__options">${example.options}</div>` : ""}
            ${example.output ? `<div class="sample__output"><div class="sample__output-label">${esc(t("output"))}</div>${example.output}</div>` : ""}
          </div>
          ${renderCodeTabs(sampleId, example) ? `
            <details class="sample__source">
              <summary><span class="win-icon">&#xE943;</span><span>${esc(t("sourceCode"))}</span><span class="win-icon">&#xE70D;</span></summary>
              ${renderCodeTabs(sampleId, example)}
            </details>` : ""}
        </div>
      </section>`;
  }

  function renderItem(itemId) {
    const item = itemMap.get(itemId);
    if (!item) { renderNotFound(); return; }
    addRecent(item.id);
    const meta = localizedItem(item);
    const data = getExamples(item);
    const docs = meta.docs || item.docs || [];
    const fav = isFavorite(item.id);
    content().innerHTML = `
      <div class="gallery-item-header">
        <div class="gallery-item-title-row">
          <h1>${esc(meta.title)}</h1>
          <button class="win-icon-button" data-flyout="api-${item.id}" aria-label="${attr(t("apiDetails"))}" data-tooltip="${attr(t("apiDetails"))}">
            <span class="win-icon" style="color:var(--win-accent-text)">&#xE946;</span>
          </button>
        </div>
        <div class="gallery-item-actions">
          ${docs.length ? `<button class="win-drop-down-button win-drop-down-button--subtle" data-flyout="docs-${item.id}"><span class="win-icon">&#xE8A5;</span>${esc(t("docs"))} <span class="win-icon">&#xE70D;</span></button>` : ""}
          <button class="win-drop-down-button win-drop-down-button--subtle" data-flyout="source-${item.id}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style="display:inline-block"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
            ${esc(t("source"))} <span class="win-icon">&#xE70D;</span>
          </button>
          <span class="win-spacer"></span>
          ${item.isExperimental ? `<span class="win-info-badge win-info-badge--caution" style="box-shadow:none">${esc(t("experimental"))}</span>` : ""}
          <button class="win-button win-button--icon-only" id="itemThemeButton" aria-label="${attr(t("toggleTheme"))}" data-tooltip="${attr(t("toggleTheme"))}"><span class="win-icon">&#xE793;</span></button>
          <button class="win-button win-button--icon-only" id="copyItemLink" aria-label="${attr(t("copyLink"))}" data-tooltip="${attr(t("copyLink"))}"><span class="win-icon">&#xE71B;</span></button>
          <button class="win-toggle-button win-toggle-button--icon-only ${fav ? "is-checked" : ""}" id="favoriteItem" aria-pressed="${fav}" aria-label="${attr(t("favorite"))}" data-tooltip="${attr(fav ? t("unfavorite") : t("favorite"))}">
            <span class="win-icon">${fav ? "&#xE735;" : "&#xE734;"}</span>
          </button>
        </div>
        <p class="gallery-item-description">${esc(meta.description || meta.subtitle)}</p>
      </div>
      <div class="gallery-item-content">
        ${item.isExperimental ? `
          <div class="win-info-bar win-info-bar--warning win-info-bar--closable" style="margin:20px 0">
            <span class="win-info-bar__icon">&#xE7BA;</span>
            <div class="win-info-bar__content"><div class="win-info-bar__title">${esc(t("experimental"))}</div><div class="win-info-bar__message">${esc(t("experimentalDesc"))}</div></div>
            <button class="win-info-bar__close" aria-label="${attr(t("close"))}"><span class="win-icon">&#xE711;</span></button>
          </div>` : ""}
        <div class="sample-list">${data.examples.map((example, index) => renderExample(item, example, index)).join("")}</div>
      </div>
      ${buildItemTemplates(item, docs)}
    `;
    const page = content();
    window.WinUI.init(page);
    translateSampleDom(page.querySelector(".sample-list"));
    $$("template", page).forEach((template) => translateSampleDom(template.content));
    bindItemActions(item);
  }

  function buildItemTemplates(item, docs) {
    const meta = localizedItem(item);
    return `
      <template id="docs-${item.id}">
        <div class="win-flyout gallery-menu-list">
          <div class="win-flyout__title">${esc(t("docs"))}</div>
          ${docs.length ? docs.map((doc) => `<a class="gallery-menu-link" href="${attr(doc.Uri)}" target="_blank" rel="noopener"><span class="win-icon">&#xE8A7;</span><span>${esc(doc.Title)}</span></a>`).join("") : `<p class="win-caption win-text-secondary">${esc(t("noDocs"))}</p>`}
        </div>
      </template>
      <template id="source-${item.id}">
        <div class="win-flyout gallery-menu-list">
          <div class="win-flyout__title">${esc(t("sourceCode"))}</div>
          <a class="gallery-menu-link" href="https://github.com/microsoft/WinUI-Gallery" target="_blank" rel="noopener"><span class="win-icon">&#xE8A7;</span>${esc(t("samplePageSource"))}</a>
          <a class="gallery-menu-link" href="https://github.com/microsoft/microsoft-ui-xaml" target="_blank" rel="noopener"><span class="win-icon">&#xE8A7;</span>${esc(t("controlSource"))}</a>
          <div class="win-menu-separator"></div>
          <p class="win-caption win-text-secondary" style="padding:4px 10px">${esc(t("sourceNote"))}</p>
        </div>
      </template>
      <template id="api-${item.id}">
        <div class="win-flyout gallery-api-flyout">
          <div class="win-flyout__title">${esc(meta.title)}</div>
          ${item.apiNamespace ? `<div class="gallery-api-flyout__label">${esc(t("namespace"))}</div><div class="gallery-api-flyout__value">${esc(item.apiNamespace)}</div>` : ""}
          ${item.baseClasses && item.baseClasses.length ? `<div class="gallery-api-flyout__label">${esc(t("inheritance"))}</div><div class="gallery-inheritance">${item.baseClasses.map((base) => `<span>${esc(base)}</span>`).join('<span class="win-icon" style="font-size:8px">&#xE76C;</span>')}</div>` : ""}
          <div class="gallery-api-flyout__label" style="margin-top:12px">${esc(t("sampleGroup"))}</div>
          <div class="gallery-api-flyout__value">${esc(groupTitle(groupMap.get(item.group)))}</div>
        </div>
      </template>`;
  }

  function bindItemActions(item) {
    const favorite = document.getElementById("favoriteItem");
    if (favorite) favorite.addEventListener("click", () => {
      toggleFavorite(item.id);
      const active = isFavorite(item.id);
      favorite.setAttribute("aria-pressed", String(active));
      favorite.classList.toggle("is-checked", active);
      favorite.querySelector(".win-icon").innerHTML = active ? "&#xE735;" : "&#xE734;";
      favorite.setAttribute("data-tooltip", active ? t("unfavorite") : t("favorite"));
      window.WinUI.toast({ title: active ? t("favoriteAdded") : t("favoriteRemoved"), message: localizedItem(item).title });
    });
    const copy = document.getElementById("copyItemLink");
    if (copy) copy.addEventListener("click", async () => {
      const url = `${location.href.split("#")[0]}#item/${item.id}`;
      await window.WinUI.copy(url);
      window.WinUI.toast({ title: t("linkCopied"), message: localizedItem(item).title });
    });
    const themeButton = document.getElementById("itemThemeButton");
    if (themeButton) themeButton.addEventListener("click", () => {
      window.WinUI.theme.toggle();
      themeButton.querySelector(".win-icon").innerHTML = window.WinUI.theme.get() === "dark" ? "&#xE706;" : "&#xE708;";
    });
  }

  function renderNotFound() {
    content().innerHTML = `<div class="gallery-page"><div class="gallery-empty"><h2>${esc(t("notFound"))}</h2><p>${esc(t("notFoundDesc"))}</p><button class="win-button win-button--accent" data-route="home">${esc(t("goHome"))}</button></div></div>`;
  }

  /* ---------------------------------------------------------------------
     Settings
     --------------------------------------------------------------------- */
  function renderSettings() {
    const theme = window.WinUI.theme.mode();
    const langOptions = Object.entries(i18n.locales);
    content().innerHTML = `
      <div class="gallery-page">
        <header class="gallery-page-header">
          <div><h1>${esc(t("settingsTitle"))}</h1><p>${esc(t("settingsDesc"))}</p></div>
        </header>
        <section class="settings-section">
          <h2>${esc(t("appearance"))}</h2>
          <p>${esc(t("appearanceDesc"))}</p>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("theme"))}</div><div class="settings-row__hint">${esc(t("themeDesc"))}</div></div>
            <div class="settings-theme-options">
              ${[["light", t("light")], ["dark", t("dark")], ["system", t("system")]].map(([value, label]) => `
                <button class="settings-theme-card ${theme === value ? "is-selected" : ""}" data-settings-theme="${value}">
                  <div class="settings-theme-preview settings-theme-preview--${value}"></div>
                  <div class="settings-theme-label">${esc(label)}</div>
                </button>`).join("")}
            </div>
          </div>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("accentColor"))}</div><div class="settings-row__hint">${esc(t("accentDesc"))}</div></div>
            <div class="settings-swatches">
              ${(() => {
                const systemAccent = window.WinUI.accent.system();
                const hasPreset = window.WinUI.accent.presets.some((preset) => preset.value.toLowerCase() === systemAccent.toLowerCase());
                const current = window.WinUI.accent.get().toLowerCase();
                return `${hasPreset ? "" : `<button class="settings-swatch settings-swatch--system ${current === systemAccent.toLowerCase() ? "is-selected" : ""}" style="--swatch:${systemAccent}" data-settings-accent="system" aria-label="${attr(t("systemAccent"))}" data-tooltip="${attr(t("systemAccent"))}"></button>`}
                ${window.WinUI.accent.presets.map((preset) => `<button class="settings-swatch ${current === preset.value.toLowerCase() ? "is-selected" : ""}" style="--swatch:${preset.value}" data-settings-accent="${preset.value}" aria-label="${attr(preset.name)}" data-tooltip="${attr(preset.name)}"></button>`).join("")}`;
              })()}
            </div>
          </div>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("density"))}</div><div class="settings-row__hint">${esc(t("densityDesc"))}</div></div>
            <div class="win-selector-bar">
              <button class="win-selector-bar__item ${window.WinUI.density.get() === "normal" ? "is-selected" : ""}" data-settings-density="normal">${esc(t("standard"))}</button>
              <button class="win-selector-bar__item ${window.WinUI.density.get() === "compact" ? "is-selected" : ""}" data-settings-density="compact">${esc(t("compact"))}</button>
            </div>
          </div>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("language"))}</div><div class="settings-row__hint">${esc(t("languageDesc"))}</div></div>
            <div class="win-selector-bar">
              ${langOptions.map(([code, locale]) => `<button class="win-selector-bar__item ${state.lang === code ? "is-selected" : ""}" data-settings-language="${code}">${esc(locale.label)}</button>`).join("")}
            </div>
          </div>
        </section>
        <section class="settings-section">
          <h2>${esc(t("yourData"))}</h2>
          <p>${esc(t("yourDataDesc"))}</p>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("favorites"))}</div><div class="settings-row__hint">${esc(t("savedSamples", { count: state.favorites.size }))}</div></div>
            <button class="win-button" data-settings-clear="favorites">${esc(t("clearFavorites"))}</button>
          </div>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("recentlyVisited"))}</div><div class="settings-row__hint">${esc(t("recentSamples", { count: state.recent.length }))}</div></div>
            <button class="win-button" data-settings-clear="recent">${esc(t("clearHistory"))}</button>
          </div>
        </section>
        <section class="settings-section">
          <h2>${esc(t("about"))}</h2>
          <p>${esc(t("aboutDesc"))}</p>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("version"))}</div><div class="settings-row__hint">${esc(t("versionValue", { count: allItems.length }))}</div></div>
            <span class="win-info-badge">HTML</span>
          </div>
          <div class="settings-row">
            <div><div class="settings-row__text">${esc(t("originalGallery"))}</div><div class="settings-row__hint">${esc(t("originalGalleryDesc"))}</div></div>
            <a class="win-button" href="https://github.com/microsoft/WinUI-Gallery" target="_blank" rel="noopener">GitHub <span class="win-icon">&#xE8A7;</span></a>
          </div>
          <p class="settings-about" style="margin-top:12px">${esc(t("notAffiliated"))}</p>
        </section>
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Sample-only interactions
     --------------------------------------------------------------------- */
  function wireSampleExtras() {
    const tri = document.getElementById("cbTri");
    if (tri && !tri.dataset.wired) {
      tri.dataset.wired = "true";
      tri.indeterminate = true;
      const out = document.getElementById("triOut");
      tri.addEventListener("click", (event) => {
        event.preventDefault();
        const stage = tri.dataset.stage || "indeterminate";
        if (stage === "indeterminate") {
          tri.indeterminate = false;
          tri.checked = true;
          tri.dataset.stage = "checked";
          if (out) out.textContent = "Checked";
        } else if (stage === "checked") {
          tri.checked = false;
          tri.dataset.stage = "unchecked";
          if (out) out.textContent = "Unchecked";
        } else {
          tri.checked = false;
          tri.indeterminate = true;
          tri.dataset.stage = "indeterminate";
          if (out) out.textContent = "Indeterminate";
        }
      });
    }
    const clearRating = document.getElementById("clearRating");
    if (clearRating && !clearRating.dataset.wired) {
      clearRating.dataset.wired = "true";
      clearRating.addEventListener("click", () => {
        const rating = clearRating.closest(".sample__stage")?.querySelector(".win-rating");
        if (!rating) return;
        rating.dataset.value = "0";
        const stars = $$(".win-rating__star", rating);
        stars.forEach((star) => { star.classList.remove("is-filled"); star.style.color = "var(--win-text-tertiary)"; });
        const label = $(".win-rating__value", rating);
        if (label) label.textContent = "Set rating";
      });
    }
    const ratingOut = document.getElementById("ratingOut");
    if (ratingOut) {
      const rating = ratingOut.closest(".sample__display")?.querySelector(".win-rating");
      if (rating) rating.addEventListener("change", (event) => {
        ratingOut.textContent = `${event.detail.value} / ${rating.dataset.max || 5}`;
      });
    }
  }

  /* ---------------------------------------------------------------------
     Rich text, audio and animation helpers
     --------------------------------------------------------------------- */
  document.addEventListener("mousedown", (event) => {
    if (event.target.closest("[data-rich-command]")) event.preventDefault();
  });

  document.addEventListener("click", (event) => {
    const rich = event.target.closest("[data-rich-command]");
    if (rich) {
      const editor = rich.closest(".win-rich-edit-box")?.querySelector("[contenteditable]");
      if (editor) {
        editor.focus();
        document.execCommand(rich.dataset.richCommand, false, null);
      }
      return;
    }
    const sound = event.target.closest("[data-play-sound]");
    if (sound) {
      playTone(Number(sound.dataset.frequency || 660));
      return;
    }
    const visual = event.target.closest("[data-animated-visual-play]");
    if (visual) {
      const stage = $(visual.dataset.animatedVisualPlay);
      if (stage) {
        const check = $("#lottieCheck", stage);
        const circle = $("#lottieCircle", stage);
        if (check && circle) {
          check.style.transition = "none";
          check.style.strokeDasharray = "130";
          check.style.strokeDashoffset = "130";
          circle.style.transition = "none";
          circle.style.strokeDashoffset = "302";
          void check.getBoundingClientRect();
          check.style.transition = "stroke-dashoffset 600ms cubic-bezier(.1,.9,.2,1) 120ms";
          circle.style.transition = "stroke-dashoffset 700ms cubic-bezier(.1,.9,.2,1)";
          check.style.strokeDashoffset = "0";
          circle.style.strokeDashoffset = "0";
        }
      }
      return;
    }
    const interop = event.target.closest("[data-interop-move]");
    if (interop) {
      const ball = document.getElementById("interopBall");
      if (ball) {
        const where = interop.dataset.interopMove;
        ball.style.transform = where === "left" ? "translateX(-140px)" : where === "right" ? "translateX(140px)" : "translateX(0)";
      }
      return;
    }
    const easing = event.target.closest("[data-run-easing]");
    if (easing) {
      const demo = easing.closest("[data-easing-demo]");
      const dot = $(".win-easing-demo-dot", demo);
      if (dot && dot.animate) {
        dot.animate(
          [{ transform: "translateX(0)" }, { transform: `translateX(${Math.max(0, demo.clientWidth - 20)}px)` }],
          { duration: 2000, easing: demo.dataset.easing || "cubic-bezier(0.1, 0.9, 0.2, 1)", fill: "forwards" }
        );
      }
      return;
    }
    const transition = event.target.closest("[data-page-transition]");
    if (transition) {
      const page = $("[data-page-transition-page]");
      if (!page) return;
      const mode = transition.dataset.pageTransition;
      page.classList.add("is-leaving");
      setTimeout(() => {
        const next = !page.dataset.second;
        page.dataset.second = next ? "true" : "";
        page.innerHTML = `<span class="win-icon">${next ? "\uE8B3" : "\uE8A5"}</span><div class="win-subtitle">${next ? "Page two" : "Page one"}</div><div class="win-caption win-text-secondary">${next ? "Transitioned with " + mode : "Choose a transition"}</div>`;
        page.classList.remove("is-leaving", "is-entering");
        page.style.animation = "";
        if (mode === "fade") page.style.animation = "win-fade-in 333ms var(--win-ease-standard) both";
        else if (mode === "scale") page.style.animation = "win-scale-in 333ms var(--win-ease-decelerate) both";
        else page.style.animation = "win-slide-left-in 333ms var(--win-ease-decelerate) both";
      }, 220);
      return;
    }
    const implicitAdd = event.target.closest("[data-implicit-add]");
    if (implicitAdd) {
      const stage = $("[data-implicit-stage]");
      const count = stage.querySelectorAll(".win-card").length + 1;
      const cardEl = document.createElement("div");
      cardEl.className = "win-card";
      cardEl.style.cssText = "padding:16px 24px;animation:win-slide-up-in .4s var(--win-ease-decelerate) both";
      cardEl.textContent = `Card ${count}`;
      stage.appendChild(cardEl);
      return;
    }
    if (event.target.closest("[data-implicit-clear]")) {
      const stage = $("[data-implicit-stage]");
      if (stage) stage.innerHTML = "";
      return;
    }
    const themeAdd = event.target.closest("[data-theme-transition-add]");
    if (themeAdd) {
      const stage = $("[data-theme-transition-stage]");
      const count = stage.querySelectorAll(".win-transition-item").length + 1;
      const item = document.createElement("div");
      item.className = "win-card win-transition-item";
      item.textContent = `Item ${count}`;
      stage.appendChild(item);
      return;
    }
    if (event.target.closest("[data-reposition]")) {
      const stage = $("[data-reposition-stage]");
      const first = stage?.querySelector("[data-reposition-item]");
      if (first) {
        first.style.transition = "opacity .15s, transform .15s";
        first.style.opacity = "0";
        first.style.transform = "translateX(-20px)";
        setTimeout(() => first.remove(), 160);
      }
      return;
    }
    const backdrop = event.target.closest("[data-backdrop]");
    if (backdrop) {
      const stage = document.getElementById("backdropStage");
      const layer = $("[data-backdrop-layer]", stage);
      if (layer) layer.className = `win-backdrop-layer win-backdrop-layer--${backdrop.dataset.backdrop}`;
      $$(".win-backdrop-tab", stage).forEach((tab) => tab.classList.toggle("is-selected", tab === backdrop));
      return;
    }
    const itemsLayout = event.target.closest("[data-items-layout]");
    if (itemsLayout) {
      const view = document.getElementById("itemsLayoutView");
      if (view) view.classList.toggle("win-items-view--list", itemsLayout.dataset.itemsLayout === "list");
      $$("[data-items-layout]").forEach((button) => button.classList.toggle("is-selected", button === itemsLayout));
      return;
    }
    if (event.target.closest("[data-semantic-toggle]")) {
      $("[data-semantic-zoom]")?.classList.toggle("is-zoomed");
      return;
    }
    const icon = event.target.closest("[data-icon-copy]");
    if (icon) {
      const code = icon.dataset.iconCopy;
      window.WinUI.copy(`\\u${code}`);
      window.WinUI.toast({ title: "Glyph copied", message: `\\u${code} · ${icon.querySelector(".win-caption")?.textContent || ""}` });
      return;
    }
    const connected = event.target.closest("[data-connected-image]");
    if (connected) {
      openConnectedImage(connected);
      return;
    }
    const pagePrev = event.target.closest("[data-page-prev]");
    const pageNext = event.target.closest("[data-page-next]");
    if (pagePrev || pageNext) {
      const pager = (pagePrev || pageNext).closest(".win-pager");
      const buttons = $$(".win-pager__button[data-page]", pager);
      let index = buttons.findIndex((button) => button.classList.contains("is-selected"));
      index = Math.max(0, Math.min(buttons.length - 1, index + (pageNext ? 1 : -1)));
      buttons[index]?.click();
      return;
    }
  });

  document.addEventListener("input", (event) => {
    const bind = event.target.closest("[data-bind-source]");
    if (bind) {
      const target = $(bind.dataset.bindSource);
      if (target) target.textContent = bind.value || target.dataset.bindEmpty || "";
      return;
    }
    const bindValue = event.target.closest("[data-bind-value]");
    if (bindValue) {
      const target = $(bindValue.dataset.bindValue);
      if (target) target.textContent = bindValue.value;
      const stage = bindValue.closest(".sample__stage");
      const bar = stage?.querySelector(".win-progress-bar");
      if (bar) window.WinUI.setProgress(bar, Number(bindValue.value));
      return;
    }
    const viewbox = event.target.closest("[data-viewbox-scale]");
    if (viewbox) {
      const target = $(viewbox.dataset.viewboxScale);
      if (target) target.style.transform = `scale(${Number(viewbox.value) / 100})`;
      return;
    }
    const zoom = event.target.closest("[data-zoom-control]");
    if (zoom) {
      const target = $(zoom.dataset.zoomControl);
      if (target) target.style.transform = `scale(${Number(zoom.value) / 100})`;
    }
  });

  document.addEventListener("change", (event) => {
    const picker = event.target.closest("[data-file-picker]");
    if (picker) {
      const out = document.getElementById("filePickerOut");
      if (out) {
        const file = picker.files && picker.files[0];
        out.textContent = file ? `Selected: ${file.name} · ${(file.size / 1024).toFixed(1)} KB` : "No file selected.";
      }
    }
  });

  document.addEventListener("click", async (event) => {
    const copy = event.target.closest("[data-clipboard-copy]");
    if (copy) {
      const input = $(copy.dataset.clipboardCopy);
      const text = input ? input.value : copy.dataset.clipboardCopy;
      await window.WinUI.copy(text);
      const out = document.getElementById("clipboardOut");
      if (out) out.textContent = "Copied to clipboard.";
      return;
    }
    const paste = event.target.closest("[data-clipboard-paste]");
    if (paste) {
      try {
        const text = await navigator.clipboard.readText();
        const input = $(paste.dataset.clipboardPaste);
        if (input) input.value = text;
        const out = document.getElementById("clipboardOut");
        if (out) out.textContent = `Pasted ${text.length} characters.`;
      } catch (_) {
        const out = document.getElementById("clipboardOut");
        if (out) out.textContent = "Clipboard read permission was denied.";
      }
    }
  });

  let audioContext = null;
  function playTone(frequency) {
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.16, audioContext.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.28);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (_) { /* audio unavailable */ }
  }

  function openConnectedImage(source) {
    const rect = source.getBoundingClientRect();
    const detail = document.createElement("div");
    detail.className = "win-connected-detail";
    detail.style.backgroundImage = `url("${source.dataset.connectedImage}")`;
    detail.style.left = `${rect.left}px`;
    detail.style.top = `${rect.top}px`;
    detail.style.width = `${rect.width}px`;
    detail.style.height = `${rect.height}px`;
    detail.style.borderRadius = "8px";
    detail.setAttribute("role", "dialog");
    detail.setAttribute("aria-label", "Enlarged image. Click to close.");
    document.body.appendChild(detail);
    requestAnimationFrame(() => {
      const width = Math.min(640, window.innerWidth - 64);
      const height = width * 0.66;
      detail.style.left = `${(window.innerWidth - width) / 2}px`;
      detail.style.top = `${(window.innerHeight - height) / 2}px`;
      detail.style.width = `${width}px`;
      detail.style.height = `${height}px`;
      detail.style.borderRadius = "12px";
    });
    const close = () => {
      detail.style.left = `${rect.left}px`;
      detail.style.top = `${rect.top}px`;
      detail.style.width = `${rect.width}px`;
      detail.style.height = `${rect.height}px`;
      detail.style.borderRadius = "8px";
      setTimeout(() => detail.remove(), 360);
      document.removeEventListener("keydown", onKey);
    };
    const onKey = (event) => { if (event.key === "Escape") close(); };
    detail.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
  }

  /* ---------------------------------------------------------------------
     Router
     --------------------------------------------------------------------- */
  function routeFromHash() {
    const raw = location.hash.replace(/^#/, "");
    return raw || "home";
  }

  function playRouteTransition() {
    const root = content();
    root.classList.remove("is-route-entering");
    void root.offsetWidth;
    root.classList.add("is-route-entering");
  }

  function renderRoute(route) {
    state.currentRoute = route;
    const [path, queryString] = route.split("?");
    const parts = path.split("/");
    window.WinUI.hideTooltip?.();
    window.WinUI.flyouts?.close?.();
    if (path === "home") renderHome();
    else if (path === "all") renderAll();
    else if (path === "settings") renderSettings();
    else if (parts[0] === "group") renderGroup(parts[1]);
    else if (parts[0] === "item") renderItem(parts[1]);
    else if (path === "search") {
      const params = new URLSearchParams(queryString || "");
      renderSearch(params.get("q") || "");
    } else renderHome();
    updateNav(path);
    main().scrollTop = 0;
    playRouteTransition();
    window.WinUI.init(content());
    wireSampleExtras();
    const back = document.getElementById("backButton");
    if (back) back.hidden = path === "home";
  }

  function navigate(route, push = true) {
    if (push) {
      history.pushState({ gallery: true, route }, "", `#${route}`);
      navDepth += 1;
    }
    renderRoute(route);
  }

  window.addEventListener("popstate", () => {
    navDepth = Math.max(0, navDepth - 1);
    renderRoute(routeFromHash());
  });
  window.addEventListener("hashchange", () => {
    const route = routeFromHash();
    if (route !== state.currentRoute) renderRoute(route);
  });

  document.addEventListener("click", (event) => {
    const routeEl = event.target.closest("[data-route]");
    if (routeEl) {
      event.preventDefault();
      navigate(routeEl.dataset.route);
      return;
    }
    const homeFilter = event.target.closest("[data-home-filter]");
    if (homeFilter) {
      state.homeFilter = homeFilter.dataset.homeFilter;
      $$("[data-home-filter]").forEach((el) => el.classList.toggle("is-selected", el === homeFilter));
      const target = document.getElementById("homeFilterContent");
      if (target) target.innerHTML = state.homeFilter === "recent" ? renderRecentHome(recentItems(), updatedItems()) : renderFavoritesHome(favoriteItems());
      return;
    }
    const theme = event.target.closest("[data-settings-theme]");
    if (theme) {
      window.WinUI.theme.set(theme.dataset.settingsTheme);
      renderSettings();
      return;
    }
    const accent = event.target.closest("[data-settings-accent]");
    if (accent) {
      if (accent.dataset.settingsAccent === "system") window.WinUI.accent.followSystem();
      else window.WinUI.accent.set(accent.dataset.settingsAccent);
      renderSettings();
      return;
    }
    const density = event.target.closest("[data-settings-density]");
    if (density) {
      window.WinUI.density.set(density.dataset.settingsDensity);
      state.density = density.dataset.settingsDensity;
      renderSettings();
      return;
    }
    const language = event.target.closest("[data-settings-language]");
    if (language) {
      setLanguage(language.dataset.settingsLanguage);
      return;
    }
    const clear = event.target.closest("[data-settings-clear]");
    if (clear) {
      if (clear.dataset.settingsClear === "favorites") state.favorites.clear(); else state.recent = [];
      persistState();
      renderSettings();
      window.WinUI.toast({ title: "Cleared", message: clear.dataset.settingsClear === "favorites" ? "Favorites removed." : "Recent history removed." });
      return;
    }
    const codeTab = event.target.closest("[data-code-tab]");
    if (codeTab) {
      const id = codeTab.dataset.codeTab;
      const panel = $(`[data-code-panel="${id}"]`);
      if (!panel) return;
      const code = codeTab.closest(".sample__code");
      $$("[data-code-tab]", code).forEach((tab) => tab.classList.toggle("is-selected", tab === codeTab));
      $$("[data-code-panel]", code).forEach((p) => { p.hidden = p !== panel; });
      return;
    }
    const copyCode = event.target.closest("[data-copy-code]");
    if (copyCode) {
      const code = copyCode.closest(".sample__code");
      const panel = $$("[data-code-panel]", code).find((p) => !p.hidden);
      if (panel) {
        window.WinUI.copy(panel.textContent);
        window.WinUI.toast({ title: "Code copied", message: "Source is on your clipboard." });
      }
      return;
    }
    const output = event.target.closest("[data-gallery-output]");
    if (output) {
      const target = $(output.dataset.galleryOutput);
      if (target) {
        let text = output.dataset.outputText || `You clicked: ${output.textContent.trim()}`;
        if (state.lang === "zh-CN") {
          const locale = i18n.locales["zh-CN"];
          const map = { ...(locale?.sampleText || {}), ...(locale?.sampleTextExtra || {}) };
          text = text.replace(/^You clicked:\s*/, "你点击了：");
          Object.keys(map).forEach((key) => { text = text.replaceAll(key, map[key]); });
        }
        target.textContent = text;
      }
      return;
    }
    const toast = event.target.closest("[data-gallery-toast]");
    if (toast) {
      window.WinUI.toast({ title: toast.dataset.toastTitle || "WinUI Gallery", message: toast.dataset.toastMessage || "Notification from a sample." });
      return;
    }
    const progressStep = event.target.closest("[data-progress-step]");
    if (progressStep) {
      const target = $(progressStep.dataset.progressStep);
      if (target) {
        const step = Number(progressStep.dataset.step || 10);
        const value = Math.max(0, Math.min(100, Number(target.dataset.value || 0) + step));
        window.WinUI.setProgress(target, value);
        const label = target.parentElement.querySelector("#progressValue") || document.getElementById("progressValue");
        if (label) label.textContent = `${value}%`;
        const slider = target.closest(".sample__stage")?.querySelector("[data-progress-control]");
        if (slider) slider.value = String(value);
      }
      return;
    }
    const refreshButton = event.target.closest("[data-refresh]");
    if (refreshButton) {
      const stage = refreshButton.closest(".sample__stage");
      const refresh = stage?.querySelector(".win-pull-to-refresh");
      if (refresh) {
        refresh.classList.add("is-refreshing");
        $(".win-pull-to-refresh__indicator .win-icon", refresh)?.classList.add("win-icon-spin");
        setTimeout(() => {
          refresh.classList.remove("is-refreshing");
          $(".win-pull-to-refresh__indicator .win-icon", refresh)?.classList.remove("win-icon-spin");
          window.WinUI.toast({ title: t("sampleAction"), message: t("actionTriggered", { name: t("refresh") }) });
        }, 1100);
      }
      return;
    }

    const demoAction = event.target.closest(".sample__stage .win-button, .sample__stage .win-appbar-button, .sample__stage .win-split-button__primary, .sample__stage .win-menu-bar__item");
    if (demoAction &&
        !demoAction.closest("[data-dialog], [data-flyout], [data-menu], [data-teaching-tip], [data-gallery-output], [data-progress-step], [data-refresh], [data-split-toggle], [data-copy], [data-clipboard-copy], [data-clipboard-paste], [data-animated-icon], [data-animated-visual-play]") &&
        !demoAction.hasAttribute("aria-pressed") &&
        !demoAction.closest(".win-flyout, .win-dialog, .win-menu-flyout")) {
      const name = demoAction.textContent.trim().replace(/\s+/g, " ");
      if (name) window.WinUI.toast({ title: t("sampleAction"), message: t("actionTriggered", { name }) });
    }
  });

  document.addEventListener("change", (event) => {
    const disable = event.target.closest("[data-disable-target]");
    if (disable) {
      const target = $(disable.dataset.disableTarget);
      if (target) target.disabled = disable.checked;
      return;
    }
    const hide = event.target.closest("[data-hide-target]");
    if (hide) {
      const target = $(hide.dataset.hideTarget);
      if (target) target.hidden = hide.checked;
    }
  });

  document.addEventListener("input", (event) => {
    const live = event.target.closest("[data-gallery-live]");
    if (live) {
      const target = $(live.dataset.galleryLive);
      if (target) target.textContent = live.value;
    }
    const progress = event.target.closest("[data-progress-control]");
    if (progress) {
      const target = $(progress.dataset.progressControl);
      if (target) {
        const value = Number(progress.value);
        window.WinUI.setProgress(target, value);
        const label = document.getElementById("progressValue");
        if (label) label.textContent = `${value}%`;
        const ringLabel = target.querySelector(".win-progress-ring__label");
        if (ringLabel) ringLabel.textContent = `${Math.round(value)}%`;
      }
    }
  });

  document.addEventListener("winui:toggle", (event) => {
    const host = event.target.closest("[data-toggle-output]");
    if (!host) return;
    const target = $(host.dataset.toggleOutput);
    if (target) target.textContent = event.detail.checked ? "State: On (checked)" : "State: Off (unchecked)";
  });

  document.addEventListener("winui:repeat", (event) => {
    const host = event.target.closest("[data-repeat-output]");
    if (!host) return;
    const target = $(host.dataset.repeatOutput);
    if (target) target.textContent = `Repeat count: ${event.detail.count}`;
  });

  document.addEventListener("winui:titlebaraction", (event) => {
    const action = event.detail.action;
    if (action === "close") {
      window.WinUI.dialogs.open({
        title: "Close WinUI Gallery?",
        body: "<p>This is a browser recreation. Use the tab controls to close or reload the page.</p>",
        close: "Stay",
        primary: "Close preview"
      }).then((result) => {
        if (result === "primary") window.WinUI.toast({ title: "Still here", message: "Browsers only allow script-opened windows to close themselves." });
      });
    } else if (action === "maximize") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
      else document.exitFullscreen?.().catch(() => {});
    } else {
      window.WinUI.toast({ title: "Window controls", message: `${action} is simulated in the browser.` });
    }
  });

  /* ---------------------------------------------------------------------
     Search
     --------------------------------------------------------------------- */
  function updateSearchSuggestions() {
    const input = document.getElementById("gallerySearch");
    if (!input) return;
    input.setAttribute("data-suggestions", allItems.map((item) => localizedItem(item).title).join("|"));
  }

  function setupSearch() {
    const input = document.getElementById("gallerySearch");
    const clear = document.getElementById("clearSearch");
    if (!input) return;
    updateSearchSuggestions();
    input.addEventListener("input", () => {
      clear.hidden = !input.value;
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !$(".win-auto-suggest__item.is-active, .win-auto-suggest__item:focus")) {
        const q = input.value.trim();
        if (q) navigate(`search?q=${encodeURIComponent(q)}`);
      }
    });
    clear.addEventListener("click", () => {
      input.value = "";
      clear.hidden = true;
      input.focus();
    });
    document.addEventListener("querysubmitted", (event) => {
      const q = (event.detail.query || "").trim();
      if (q) navigate(`search?q=${encodeURIComponent(q)}`);
    });
    document.addEventListener("suggestionchosen", (event) => {
      const title = event.detail.value;
      const item = allItems.find((candidate) => localizedItem(candidate).title.toLowerCase() === title.toLowerCase());
      if (item) navigate(`item/${item.id}`);
      else navigate(`search?q=${encodeURIComponent(title)}`);
    });
  }

  document.addEventListener("keydown", (event) => {
    const input = document.getElementById("gallerySearch");
    const editing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "") || document.activeElement?.isContentEditable;
    if (!editing && (event.key === "/" || (event.ctrlKey && event.key.toLowerCase() === "f"))) {
      event.preventDefault();
      input?.focus();
      input?.select();
    }
  });

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  function boot() {
    document.documentElement.lang = state.lang === "zh-CN" ? "zh-CN" : "en";
    document.title = t("appTitle");
    buildNav();
    updateStaticText();
    setupSearch();
    document.getElementById("backButton")?.addEventListener("click", () => {
      if (navDepth > 0 && history.length > 1) history.back();
      else navigate("home");
    });
    const route = routeFromHash();
    history.replaceState({ gallery: true, route }, "", `#${route}`);
    renderRoute(route);
    document.documentElement.dataset.sampleCount = String(Object.keys(samples).length);
    document.documentElement.dataset.catalogCount = String(allItems.length);
    if (window.__galleryErrors && window.__galleryErrors.length) {
      document.documentElement.dataset.jsErrors = window.__galleryErrors.join(" | ");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
