/* WinUI Gallery samples — Status & info */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  InfoBar: {
    examples: [
      {
        title: "A closable InfoBar",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-info-bar win-info-bar--informational win-info-bar--closable" data-dismissable>
            <span class="win-info-bar__icon">&#xE946;</span>
            <div class="win-info-bar__content"><div class="win-info-bar__title">Informational</div><div class="win-info-bar__message">This is an informational message.</div></div>
            <button class="win-info-bar__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
          </div>
          <div class="win-info-bar win-info-bar--success win-info-bar--closable">
            <span class="win-info-bar__icon">&#xE73E;</span>
            <div class="win-info-bar__content"><div class="win-info-bar__title">Success</div><div class="win-info-bar__message">The command completed successfully.</div></div>
            <button class="win-info-bar__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
          </div>
          <div class="win-info-bar win-info-bar--warning win-info-bar--closable">
            <span class="win-info-bar__icon">&#xE7BA;</span>
            <div class="win-info-bar__content"><div class="win-info-bar__title">Warning</div><div class="win-info-bar__message">Check the settings before you continue.</div></div>
            <button class="win-info-bar__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
          </div>
          <div class="win-info-bar win-info-bar--error win-info-bar--closable">
            <span class="win-info-bar__icon">&#xEA39;</span>
            <div class="win-info-bar__content"><div class="win-info-bar__title">Error</div><div class="win-info-bar__message">Something went wrong. Try again.</div></div>
            <button class="win-info-bar__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
          </div>`,
        xaml: `<InfoBar Title="Informational"
        Message="This is an informational message."
        Severity="Informational"
        IsOpen="True" />`,
        csharp: `InfoBar.Severity = InfoBarSeverity.Success;
InfoBar.Title = "Success";
InfoBar.Message = "The command completed successfully.";
InfoBar.IsOpen = true;`,
        html: `<div class="win-info-bar win-info-bar--info win-info-bar--closable">
  <span class="win-info-bar__icon">&#xE946;</span>
  <div class="win-info-bar__content">…</div>
</div>`
      },
      {
        title: "InfoBar with an action button",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-info-bar win-info-bar--warning" style="width:100%">
            <span class="win-info-bar__icon">&#xE7BA;</span>
            <div class="win-info-bar__content">
              <div class="win-info-bar__title">Updates are available</div>
              <div class="win-info-bar__message">A new version of WinUI Gallery is ready to install.</div>
              <div class="win-info-bar__actions"><button class="win-button win-button--small" data-gallery-toast data-toast-title="Update" data-toast-message="Update started.">Update now</button><button class="win-button win-button--subtle win-button--small">Release notes</button></div>
            </div>
            <button class="win-info-bar__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
          </div>`,
        xaml: `<InfoBar Title="Updates are available"
        Message="A new version is ready to install."
        Severity="Warning" IsOpen="True">
    <InfoBar.ActionButton>
        <Button Content="Update now" />
    </InfoBar.ActionButton>
</InfoBar>`,
        csharp: `// ActionButton can contain any button. Handle Click in code.`,
        html: `<div class="win-info-bar win-info-bar--warning">
  <div class="win-info-bar__actions"><button class="win-button">Update now</button></div>
</div>`
      }
    ]
  },

  InfoBadge: {
    examples: [
      {
        title: "Different InfoBadge styles",
        center: true,
        preview: `
          <span class="win-info-badge">3</span>
          <span class="win-info-badge win-info-badge--attention">9+</span>
          <span class="win-info-badge win-info-badge--success">✓</span>
          <span class="win-info-badge win-info-badge--caution">!</span>
          <span class="win-info-badge win-info-badge--small"></span>`,
        xaml: `<InfoBadge Value="3" />
<InfoBadge Value="9" Background="{ThemeResource SystemFillColorCriticalBrush}" />
<InfoBadge IconSource="{StaticResource AcceptIconSource}" />
<InfoBadge Value="!" Severity="Caution" />`,
        csharp: `// InfoBadge is a lightweight, non-intrusive status indicator.
// Use Value, IconSource, or leave it dot-sized.`,
        html: `<span class="win-info-badge">3</span>
<span class="win-info-badge win-info-badge--attention">9+</span>
<span class="win-info-badge win-info-badge--small"></span>`
      },
      {
        title: "InfoBadge inside a NavigationView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-nav-view" style="height:300px;width:100%;border:1px solid var(--win-card-stroke);border-radius:8px;--nav-pane-width:240px">
            <aside class="win-nav-view__pane">
              <div class="win-nav-view__header"><button class="win-nav-view__toggle"><span class="win-icon">&#xE700;</span></button><div class="win-nav-view__brand"><img src="assets/GalleryIcon.png" alt=""><span class="win-nav-view__brand-text">App</span></div></div>
              <nav class="win-nav-view__items">
                <button class="win-nav-item is-selected"><span class="win-nav-item__icon">&#xE80F;</span><span class="win-nav-item__label">Home</span><span class="win-info-badge win-info-badge--attention">2</span></button>
                <button class="win-nav-item"><span class="win-nav-item__icon">&#xE715;</span><span class="win-nav-item__label">Inbox</span><span class="win-info-badge">12</span></button>
                <button class="win-nav-item"><span class="win-nav-item__icon">&#xE713;</span><span class="win-nav-item__label">Settings</span></button>
              </nav>
            </aside>
            <div class="win-nav-view__scrim"></div>
            <div class="win-nav-view__content"><div style="padding:24px"><h3 class="win-subtitle">Home</h3><p class="win-text-secondary" style="margin-top:6px">InfoBadges can be embedded in navigation items.</p></div></div>
          </div>`,
        xaml: `<NavigationViewItem Content="Inbox">
    <NavigationViewItem.InfoBadge>
        <InfoBadge Value="12" />
    </NavigationViewItem.InfoBadge>
</NavigationViewItem>`,
        csharp: `// InfoBadge integrates with NavigationViewItem
// and other controls that expose an InfoBadge property.`,
        html: `<button class="win-nav-item">
  <span class="win-nav-item__label">Inbox</span>
  <span class="win-info-badge">12</span>
</button>`
      }
    ]
  },

  ProgressBar: {
    examples: [
      {
        title: "A determinate progress bar",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;align-items:center;gap:16px;width:100%;max-width:560px">
            <div class="win-progress-bar" id="progressBarDemo" data-value="35"><div class="win-progress-bar__fill"></div></div>
            <span class="win-caption win-text-secondary" id="progressValue">35%</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <button class="win-button" data-progress-step="#progressBarDemo" data-step="-10">-10</button>
            <button class="win-button" data-progress-step="#progressBarDemo" data-step="10">+10</button>
            <input class="win-slider" style="width:180px" type="range" min="0" max="100" value="35" data-progress-control="#progressBarDemo" aria-label="Progress">
          </div>`,
        xaml: `<ProgressBar Value="35" Maximum="100" ShowError="False" />`,
        csharp: `ProgressBar.Value = 35;
ProgressValue.Text = $"35%";`,
        html: `<div class="win-progress-bar" data-value="35">
  <div class="win-progress-bar__fill"></div>
</div>`
      },
      {
        title: "An indeterminate progress bar",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-progress-bar win-progress-bar--indeterminate" style="width:100%;max-width:560px"><div class="win-progress-bar__fill"></div></div>
          <div class="win-progress-bar-dots" aria-label="Loading"><span></span><span></span><span></span></div>
          <p class="win-caption win-text-secondary">Use indeterminate progress when the duration is unknown.</p>`,
        xaml: `<ProgressBar IsIndeterminate="True" />`,
        csharp: `// Indeterminate progress gives feedback while the duration is unknown.`,
        html: `<div class="win-progress-bar win-progress-bar--indeterminate">
  <div class="win-progress-bar__fill"></div>
</div>`
      },
      {
        title: "Progress bar states",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;max-width:560px;display:flex;flex-direction:column;gap:16px">
            <div><div class="win-caption win-text-secondary" style="margin-bottom:4px">Paused</div><div class="win-progress-bar win-progress-bar--paused" data-value="50"><div class="win-progress-bar__fill"></div></div></div>
            <div><div class="win-caption win-text-secondary" style="margin-bottom:4px">Error</div><div class="win-progress-bar win-progress-bar--error" data-value="75"><div class="win-progress-bar__fill"></div></div></div>
            <div><div class="win-caption win-text-secondary" style="margin-bottom:4px">Success</div><div class="win-progress-bar win-progress-bar--success" data-value="100"><div class="win-progress-bar__fill"></div></div></div>
          </div>`,
        xaml: `<ProgressBar Value="50" ShowPaused="True" />
<ProgressBar Value="75" ShowError="True" />
<ProgressBar Value="100" />`,
        csharp: `// ShowPaused and ShowError switch the bar to a semantic color.`,
        html: `<div class="win-progress-bar win-progress-bar--error" data-value="75">…</div>`
      }
    ]
  },

  ProgressRing: {
    examples: [
      {
        title: "A determinate progress ring",
        center: true,
        preview: `
          <div style="display:flex;align-items:center;gap:24px">
            <div class="win-progress-ring win-progress-ring--large" id="ringDemo" data-value="65" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
              <svg viewBox="0 0 32 32"><circle class="win-progress-ring__track" cx="16" cy="16" r="14"></circle><circle class="win-progress-ring__value" cx="16" cy="16" r="14"></circle></svg>
              <span class="win-progress-ring__label">65%</span>
            </div>
            <div class="win-slider" style="width:180px"><input class="win-slider" type="range" min="0" max="100" value="65" data-progress-control="#ringDemo" aria-label="Ring progress"></div>
          </div>`,
        xaml: `<ProgressRing IsActive="True" Value="65" Maximum="100" />`,
        csharp: `// A determinate ProgressRing fills clockwise from the top.`,
        html: `<div class="win-progress-ring" data-value="65">
  <svg><circle class="win-progress-ring__track" /><circle class="win-progress-ring__value" /></svg>
</div>`
      },
      {
        title: "An indeterminate progress ring",
        center: true,
        preview: `
          <div class="win-progress-ring win-progress-ring--indeterminate" style="--ring-size:48px" role="progressbar">
            <svg viewBox="0 0 32 32"><circle class="win-progress-ring__value" cx="16" cy="16" r="14"></circle></svg>
          </div>
          <div class="win-progress-ring win-progress-ring--indeterminate win-progress-ring--large" role="progressbar">
            <svg viewBox="0 0 32 32"><circle class="win-progress-ring__value" cx="16" cy="16" r="14"></circle></svg>
          </div>`,
        xaml: `<ProgressRing IsActive="True" />`,
        csharp: `// ProgressRing blocks interaction less than a progress bar
// when the task needs the user's attention.`,
        html: `<div class="win-progress-ring win-progress-ring--indeterminate">…</div>`
      }
    ]
  },

  ToolTip: {
    examples: [
      {
        title: "A simple ToolTip",
        center: true,
        preview: `<button class="win-button" data-tooltip="This is a ToolTip. It appears after a short delay.">Hover over me</button>`,
        xaml: `<Button Content="Hover over me">
    <ToolTipService.ToolTip>
        <ToolTip Content="This is a ToolTip. It appears after a short delay." />
    </ToolTipService.ToolTip>
</Button>`,
        csharp: `// ToolTipService controls placement, offset and timing.
// Use ToolTip for rich content and ToolTipService for simple text.`,
        html: `<button class="win-button" data-tooltip="This is a ToolTip.">Hover over me</button>`
      },
      {
        title: "ToolTips on icon buttons",
        center: true,
        preview: `
          <button class="win-icon-button" data-tooltip="Settings" aria-label="Settings"><span class="win-icon">&#xE713;</span></button>
          <button class="win-icon-button" data-tooltip="Favorite" aria-label="Favorite"><span class="win-icon">&#xE734;</span></button>
          <button class="win-icon-button" data-tooltip="Share" aria-label="Share"><span class="win-icon">&#xE72D;</span></button>`,
        xaml: `<Button Style="{StaticResource SubtleButtonStyle}"
        ToolTipService.ToolTip="Settings"
        AutomationProperties.Name="Settings">
    <FontIcon Glyph="&#xE713;" />
</Button>`,
        csharp: `// Always pair an icon-only control with an accessible name
// as well as a ToolTip.`,
        html: `<button class="win-icon-button" data-tooltip="Settings">…</button>`
      },
      {
        title: "ToolTip with placement",
        center: true,
        preview: `
          <button class="win-button" data-tooltip="Placement: top" data-tooltip-placement="top">Top</button>
          <button class="win-button" data-tooltip="Placement: bottom" data-tooltip-placement="bottom">Bottom</button>
          <button class="win-button" data-tooltip="Placement: left" data-tooltip-placement="left">Left</button>
          <button class="win-button" data-tooltip="Placement: right" data-tooltip-placement="right">Right</button>`,
        xaml: `<Button Content="Top">
    <ToolTipService.ToolTip>
        <ToolTip Content="Placement: top" Placement="Top" />
    </ToolTipService.ToolTip>
</Button>`,
        csharp: `// ToolTip.Placement accepts Top, Bottom, Left, Right, Mouse and more.`,
        html: `<button data-tooltip="Top" data-tooltip-placement="top">Top</button>`
      }
    ]
  }
});
