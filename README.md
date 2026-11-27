# WinUI 3 for the Web

此项目的代码完全由 DeepSeek 管理。

用纯 HTML + CSS + JavaScript 复刻 WinUI 3 / Fluent Design 的界面库，以及完整的 WinUI Gallery 交互示例。

没有框架、没有构建步骤、没有运行时依赖。

[在线预览](https://winui3withhtml-gallery.pages.dev/) · [MIT License](LICENSE)

---

## 项目结构

```text
.
├─ library/              核心 UI 库
│  ├─ css/
│  │  ├─ winui.css       总入口
│  │  ├─ tokens.css      Fluent 颜色、字体、圆角、动效变量
│  │  ├─ reset.css
│  │  ├─ typography.css
│  │  ├─ base.css
│  │  ├─ layout.css
│  │  ├─ icons.css
│  │  ├─ scrollbars.css
│  │  ├─ motion.css
│  │  ├─ cursors.css
│  │  └─ controls/       84 个独立控件样式表
│  └─ js/
│     └─ winui.js        控件行为、主题、弹出层、对话框、选择器等
│
└─ gallery/              可直接部署的 WinUI Gallery
   ├─ index.html
   ├─ assets/            Gallery 图标、控件缩略图、示例图片
   ├─ css/
   ├─ js/
   └─ library/           嵌入的完整核心库副本
```

`library` 只包含可复用的核心代码。`gallery` 是自包含的，复制整个文件夹到静态服务器即可运行，不依赖上级目录。

---

## WinUI Gallery

在线预览：

**https://winui3withhtml-gallery.pages.dev/**

包含：

- 115 个可交互控件与设计示例
- 18 个示例分组
- 首页、全部控件、分类页、搜索、最近访问、收藏、设置
- XAML / C# / HTML 源码视图
- 文档、源代码与 API 详情浮出菜单
- 明暗主题、系统主题、紧凑密度
- 简体中文界面，可切换 English
- 响应式 NavigationView 与移动端覆盖式导航

示例覆盖 Button、TextBox、ComboBox、NavigationView、ListView、GridView、TreeView、TabView、ContentDialog、Flyout、TeachingTip、CalendarView、DatePicker、TimePicker、ColorPicker、NumberBox、InfoBar、ProgressBar、MediaPlayerElement、InkCanvas、TableView、SwipeControl、PullToRefresh、ParallaxView 等。

### 部署

`gallery` 目录没有构建步骤，也没有外部依赖。把整个目录上传到任意静态托管即可，输出目录为 `gallery`。

适用于 GitHub Pages、Cloudflare Pages、Netlify、Vercel 或普通 Web 服务器。

---

## 使用 UI 库

在页面中引入库的总入口和脚本：

```html
<link rel="stylesheet" href="library/css/winui.css">
<script src="library/js/winui.js"></script>
```

示例：

```html
<button class="win-button win-button--accent">
  <span class="win-icon">&#xE710;</span>
  <span class="win-button__content">Add item</span>
</button>
```

只引入单个控件：

```html
<link rel="stylesheet" href="library/css/tokens.css">
<link rel="stylesheet" href="library/css/reset.css">
<link rel="stylesheet" href="library/css/base.css">
<link rel="stylesheet" href="library/css/icons.css">
<link rel="stylesheet" href="library/css/controls/button.css">
```

`gallery/library/` 是 `library/` 的完整副本，用于保证 Gallery 目录可以独立部署。修改核心库后同步该副本即可。

### 主题

主题通过根元素的 `data-theme` 控制：

```html
<html lang="zh-CN" data-theme="light">
```

```js
WinUI.theme.set("dark");      // light / dark / system
WinUI.theme.toggle();
WinUI.theme.system();
```

CSS 变量位于 `library/css/tokens.css`。强调色默认读取系统 `AccentColor`，也可以通过 API 设置：

```js
WinUI.accent.set("#0078d4");
WinUI.accent.followSystem();
```

### 语言

日期选择器、日历、时间选择器、评分控件、TabView 等动态内容会根据根元素的 `lang` 生成对应文本：

```html
<html lang="zh-CN">
```

Gallery 的完整中文资源位于 `gallery/js/data/i18n.js` 和 `gallery/js/data/samples-zh.js`。

### 初始化

`winui.js` 会在 `DOMContentLoaded` 时自动初始化。动态插入内容后调用：

```js
WinUI.init(document.querySelector("#content"));
```

---

## 控件覆盖

`library/css/controls/` 中共有 84 个独立样式表：

AppBarButton · AppBarSeparator · AppBarToggleButton · AutoSuggestBox · Acrylic · AnimatedIcon · AnimatedVisualPlayer · Border · BreadcrumbBar · Button · CalendarDatePicker · CalendarView · Canvas · Chart · CheckBox · ColorPicker · ComboBox · CommandBar · ConnectedAnimation · ContentDialog · DatePicker · DropDownButton · Expander · FlipView · Flyout · Grid · GridView · HyperlinkButton · Image · InfoBadge · InfoBar · InkCanvas · ItemsRepeater · ItemsView · ListView · MediaPlayerElement · MenuBar · MenuFlyout · NavigationView · NumberBox · PagerControl · PageTransition · ParallaxView · PasswordBox · PersonPicture · PipsPager · Pivot · Popup · ProgressBar · ProgressRing · PullToRefresh · RadioButton · RatingControl · RelativePanel · RepeatButton · RichEditBox · RichTextBlock · ScrollView · SelectorBar · SemanticZoom · Shape/Line · Slider · SplitButton · SplitView · StackPanel · SwipeControl · SystemBackdrop · TableView · TabView · TeachingTip · TextBlock · TextBox · ThemeShadow · TimePicker · TitleBar · ToggleButton · ToggleSplitButton · ToggleSwitch · ToolTip · TreeView · VariableSizedWrapGrid · Viewbox · WrapPanel。

---

## 设计还原

- Mica / Acrylic 背景模拟与 Fluent 主题资源
- Segoe UI Variable 字体栈，Segoe Fluent Icons / Segoe MDL2 Assets 图标
- 4px 控件圆角与 8px 覆盖层圆角
- 明暗主题、系统主题、动态强调色
- Fluent 缓动、页面进入、弹出层、对话框、隐式过渡
- 3 秒自动收起/隐藏的滚动条
- 聚焦时向两侧展开的输入框底线
- 键盘焦点、对话框焦点循环、ARIA 状态与减少动效支持

---

## 有意省略的原生功能

以下内容依赖 Windows App SDK 的窗口、系统或硬件集成，无法在浏览器中真实还原：

- WebView2
- MapControl
- CaptureElement / Camera Preview
- ContentIsland
- AppWindow / AppWindowTitleBar / Window sizing
- App notifications / Badge notifications / JumpList
- AnnotatedScrollBar

TitleBar、Clipboard、StoragePickers、Sound 等保留为浏览器内可交互的模拟示例。

---

## 浏览器支持

建议使用最新版 Microsoft Edge 或 Chrome。

剪贴板读取、系统通知、全屏等 API 在 `file://` 下可能受限；通过 `http://localhost` 或 HTTPS 访问可以完整使用。主题、强调色、语言、收藏和最近访问保存在浏览器 `localStorage` 中。

---

## 素材与许可

- 项目代码：[MIT License](LICENSE)
- Microsoft WinUI Gallery 素材与目录文案归属：[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
- WinUI 设计规范与主题资源参考：[Windows App SDK](https://github.com/microsoft/WindowsAppSDK)

WinUI、Windows、Windows App SDK 和 Microsoft 是 Microsoft Corporation 的商标。本项目与 Microsoft 无隶属关系。
