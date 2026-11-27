/* WinUI Gallery samples — Styles & materials */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  Acrylic: {
    examples: [
      {
        title: "Acrylic material",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-acrylic-material" style="border-radius:0">
            <div class="win-acrylic-material__card">
              <div class="win-subtitle">Acrylic</div>
              <p class="win-body win-text-secondary" style="margin-top:4px">A translucent material that adds depth and hierarchy to surfaces.</p>
              <div style="display:flex;gap:8px;margin-top:12px"><button class="win-button win-button--accent">Action</button><button class="win-button">Cancel</button></div>
            </div>
          </div>`,
        xaml: `<Border Background="{ThemeResource AcrylicBackgroundFillColorDefaultBrush}">
    <TextBlock Text="Acrylic" />
</Border>`,
        csharp: `// Acrylic uses a tint, tint opacity, and a luminosity layer.
// Use it for transient surfaces such as flyouts and navigation panes.`,
        html: `<div class="win-acrylic-material">…</div>`
      },
      {
        title: "Acrylic in a flyout",
        center: true,
        preview: `
          <button class="win-button win-button--accent" data-flyout="acrylicFlyout">Open acrylic flyout</button>
          <template id="acrylicFlyout">
            <div class="win-flyout win-acrylic" style="width:300px;background:var(--win-flyout-acrylic)">
              <div class="win-body-strong">Acrylic flyout</div>
              <p class="win-caption win-text-secondary" style="margin-top:6px">Flyouts use acrylic by default to keep context visible.</p>
              <div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="win-button win-button--accent win-button--small" data-close-flyout>Done</button></div>
            </div>
          </template>`,
        xaml: `<Flyout>
    <Flyout.FlyoutPresenterStyle>
        <Style TargetType="FlyoutPresenter">
            <Setter Property="Background"
                    Value="{ThemeResource AcrylicBackgroundFillColorDefaultBrush}" />
        </Style>
    </Flyout.FlyoutPresenterStyle>
</Flyout>`,
        csharp: `// Flyouts use acrylic by default.
// Override the FlyoutPresenter background for custom materials.`,
        html: `<div class="win-flyout win-acrylic">…</div>`
      }
    ]
  },

  AnimatedIcon: {
    examples: [
      {
        title: "An animated icon",
        center: true,
        preview: `
          <div style="display:flex;gap:24px;align-items:center">
            <button class="win-animated-icon" data-animated-icon aria-label="Refresh"><span class="win-icon">&#xE72C;</span></button>
            <button class="win-animated-icon win-animated-icon--check" data-animated-icon aria-label="Accept"><span class="win-icon">&#xE73E;</span></button>
            <button class="win-animated-icon" data-animated-icon aria-label="Favorite"><span class="win-icon">&#xE734;</span></button>
          </div>
          <p class="win-caption win-text-secondary" style="flex-basis:100%;text-align:center">Click an icon to play its animation.</p>`,
        xaml: `<AnimatedIcon>
    <AnimatedIcon.Source>
        <animatedvisuals:AnimatedCheckmark />
    </AnimatedIcon.Source>
</AnimatedIcon>`,
        csharp: `// AnimatedIcon plays a Lottie animation tied to a control's visual state.
// AnimatedVisualPlayer can also play arbitrary Lottie content.`,
        html: `<button class="win-animated-icon">…</button>`
      },
      {
        title: "Animated icon in a button",
        center: true,
        preview: `
          <button class="win-button" data-animated-icon><span class="win-icon">&#xE72C;</span><span class="win-button__content">Refresh</span></button>
          <button class="win-button win-button--accent" data-animated-icon><span class="win-icon">&#xE73E;</span><span class="win-button__content">Accept</span></button>`,
        xaml: `<Button>
    <AnimatedIcon>
        <AnimatedIcon.Source>
            <animatedvisuals:AnimatedGlobalNavigationButtonVisualSource />
        </AnimatedIcon.Source>
    </AnimatedIcon>
</Button>`,
        csharp: `// AnimatedIcon responds to PointerEntered and PointerPressed
// visual states of the containing control.`,
        html: `<button class="win-button" data-animated-icon>Refresh</button>`
      }
    ]
  },

  CompactSizing: {
    examples: [
      {
        title: "Standard vs. compact density",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-split-2" style="width:100%">
            <div class="win-card">
              <div class="win-body-strong" style="margin-bottom:12px">Standard</div>
              <div style="display:flex;flex-direction:column;gap:6px"><button class="win-button">Button</button><label class="win-checkbox"><input type="checkbox" checked><span class="win-checkbox__box"></span><span class="win-checkbox__label">CheckBox</span></label></div>
            </div>
            <div class="win-card" data-density="compact" style="--win-control-height:24px">
              <div class="win-body-strong" style="margin-bottom:12px">Compact</div>
              <div style="display:flex;flex-direction:column;gap:4px"><button class="win-button" style="height:24px;padding:0 8px">Button</button><label class="win-checkbox" style="min-height:24px;padding:2px 0"><input type="checkbox" checked><span class="win-checkbox__box" style="width:16px;height:16px"></span><span class="win-checkbox__label">CheckBox</span></label></div>
            </div>
          </div>`,
        xaml: `<Page.Resources>
    <ResourceDictionary Source="ms-appx:///Microsoft.UI.Xaml/DensityStyles/Compact.xaml" />
</Page.Resources>`,
        csharp: `// Compact density reduces control heights and spacing.
// Apply the resource dictionary at app, page, or control scope.`,
        html: `<html data-density="compact">…</html>`
      }
    ]
  },

  IconElement: {
    examples: [
      {
        title: "Icon element types",
        center: true,
        preview: `
          <div style="display:flex;gap:28px;align-items:center;flex-wrap:wrap;justify-content:center">
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><span class="win-icon" style="font-size:32px">&#xE80F;</span><span class="win-caption">FontIcon</span></div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><span class="win-icon" style="font-size:32px">&#xE713;</span><span class="win-caption">SymbolIcon</span></div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><svg width="32" height="32" viewBox="0 0 24 24" fill="var(--win-accent)"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7L2 14l10 5 10-5-10-5Z"/></svg><span class="win-caption">PathIcon</span></div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px"><img src="assets/ControlImages/Button.png" alt="" style="width:32px;height:32px"><span class="win-caption">ImageIcon</span></div>
          </div>`,
        xaml: `<FontIcon Glyph="&#xE80F;" FontSize="32" />
<SymbolIcon Symbol="Setting" />
<PathIcon Data="M12 2 2 7l10 5 10-5-10-5Z" />
<ImageIcon Source="/Assets/ControlImages/Button.png" />`,
        csharp: `// FontIcon renders a glyph from the Segoe Fluent Icons font.
// PathIcon scales a Geometry without a font dependency.`,
        html: `<span class="win-icon">&#xE80F;</span>
<svg class="win-icon">…</svg>`
      },
      {
        title: "Icons in buttons",
        center: true,
        preview: `
          <button class="win-button"><span class="win-icon">&#xE710;</span><span class="win-button__content">Add</span></button>
          <button class="win-button win-button--accent"><span class="win-icon">&#xE74E;</span><span class="win-button__content">Save</span></button>
          <button class="win-icon-button" aria-label="Settings"><span class="win-icon">&#xE713;</span></button>
          <button class="win-icon-button" aria-label="More"><span class="win-icon">&#xE712;</span></button>`,
        xaml: `<Button Content="Add">
    <Button.Icon>
        <FontIcon Glyph="&#xE710;" />
    </Button.Icon>
</Button>`,
        csharp: `// Button.Icon is used by AppBarButton and other command surfaces.`,
        html: `<button class="win-button"><span class="win-icon">&#xE710;</span>Add</button>`
      }
    ]
  },

  Line: {
    examples: [
      {
        title: "Lines and paths",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-shape-stage">
            <figure class="win-shape-figure"><svg width="120" height="80"><line x1="10" y1="70" x2="110" y2="10" stroke="var(--win-accent)" stroke-width="3" stroke-linecap="round"/></svg><figcaption class="win-shape-label">Line</figcaption></figure>
            <figure class="win-shape-figure"><svg width="120" height="80"><polyline points="10,70 40,30 70,60 110,10" fill="none" stroke="var(--win-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><figcaption class="win-shape-label">Polyline</figcaption></figure>
            <figure class="win-shape-figure"><svg width="120" height="80"><path d="M10 70 C30 10, 60 90, 110 20" fill="none" stroke="var(--win-accent)" stroke-width="3" stroke-linecap="round"/></svg><figcaption class="win-shape-label">Path</figcaption></figure>
          </div>`,
        xaml: `<Line X1="10" Y1="70" X2="110" Y2="10"
      Stroke="SteelBlue" StrokeThickness="3" />
<Polyline Points="10,70 40,30 70,60 110,10"
          Stroke="SteelBlue" StrokeThickness="3" />
<Path Data="M10,70 C30,10 60,90 110,20" Stroke="SteelBlue" />`,
        csharp: `// Shapes are intended for decorative rendering,
// not for interactive controls.`,
        html: `<svg><line x1="10" y1="70" x2="110" y2="10" /></svg>`
      }
    ]
  },

  Shape: {
    examples: [
      {
        title: "Basic shapes",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-shape-stage">
            <figure class="win-shape-figure"><div class="win-shape-rect"></div><figcaption class="win-shape-label">Rectangle</figcaption></figure>
            <figure class="win-shape-figure"><div class="win-shape-ellipse"></div><figcaption class="win-shape-label">Ellipse</figcaption></figure>
            <figure class="win-shape-figure"><svg width="100" height="90"><polygon class="win-shape-polygon" points="50,4 96,88 4,88"/></svg><figcaption class="win-shape-label">Polygon</figcaption></figure>
            <figure class="win-shape-figure"><svg width="100" height="90"><path class="win-shape-path" d="M50 5 90 30 75 82 25 82 10 30Z"/></svg><figcaption class="win-shape-label">Path</figcaption></figure>
          </div>`,
        xaml: `<Rectangle Width="100" Height="70" Fill="SteelBlue" RadiusX="4" RadiusY="4" />
<Ellipse Width="90" Height="90" Fill="MediumPurple" />
<Polygon Points="50,4 96,88 4,88" Fill="SteelBlue" />
<Path Data="M50,5 90,30 75,82 25,82 10,30Z" Fill="SteelBlue" />`,
        csharp: `// Shape elements support Fill, Stroke, StrokeThickness,
// and geometry transforms.`,
        html: `<div class="win-shape-rect"></div>
<svg><polygon points="…" /></svg>`
      },
      {
        title: "Shape with stroke",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-shape-stage">
            <figure class="win-shape-figure"><svg width="140" height="110"><rect x="8" y="8" width="124" height="94" rx="12" fill="none" stroke="var(--win-accent)" stroke-width="4"/></svg><figcaption class="win-shape-label">Stroke only</figcaption></figure>
            <figure class="win-shape-figure"><svg width="140" height="110"><circle cx="70" cy="55" r="46" fill="var(--win-accent-selected)" stroke="var(--win-accent)" stroke-width="4"/></svg><figcaption class="win-shape-label">Fill and stroke</figcaption></figure>
          </div>`,
        xaml: `<Rectangle Fill="Transparent" Stroke="SteelBlue" StrokeThickness="4" />
<Ellipse Fill="LightBlue" Stroke="SteelBlue" StrokeThickness="4" />`,
        csharp: `// Set the StrokeDashArray property for dashed outlines.`,
        html: `<svg><rect fill="none" stroke="…" stroke-width="4" /></svg>`
      }
    ]
  },

  RadialGradientBrush: {
    examples: [
      {
        title: "Radial gradient",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
            <div style="width:240px;height:180px;border-radius:8px;background:radial-gradient(circle at 30% 30%,#7ad7ff,#005fb8 55%,#002b5c);display:flex;align-items:flex-end;padding:16px;color:white">Center 30%,30%</div>
            <div style="width:240px;height:180px;border-radius:8px;background:radial-gradient(ellipse at 70% 60%,#ffd36e,#ca5010 55%,#4a1200);display:flex;align-items:flex-end;padding:16px;color:white">Elliptical gradient</div>
          </div>`,
        xaml: `<Rectangle>
    <Rectangle.Fill>
        <RadialGradientBrush Center="0.3,0.3" RadiusX="0.7" RadiusY="0.7">
            <GradientStop Offset="0" Color="#7AD7FF" />
            <GradientStop Offset="0.55" Color="#005FB8" />
            <GradientStop Offset="1" Color="#002B5C" />
        </RadialGradientBrush>
    </Rectangle.Fill>
</Rectangle>`,
        csharp: `// RadialGradientBrush paints a circular or elliptical gradient.
// Center, RadiusX, RadiusY, and MappingMode control its geometry.`,
        html: `<div style="background:radial-gradient(circle at 30% 30%, #7ad7ff, #005fb8)">…</div>`
      }
    ]
  },

  SystemBackdrops: {
    examples: [
      {
        title: "Mica and Acrylic backdrops",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-backdrop-stage" id="backdropStage">
            <div class="win-backdrop-layer win-backdrop-layer--mica" data-backdrop-layer="mica"></div>
            <div class="win-backdrop-tabs" style="position:relative;z-index:2">
              <button class="win-backdrop-tab is-selected" data-backdrop="mica">Mica</button>
              <button class="win-backdrop-tab" data-backdrop="mica-alt">Mica Alt</button>
              <button class="win-backdrop-tab" data-backdrop="acrylic">Acrylic</button>
            </div>
            <div class="win-backdrop-content">
              <div class="win-subtitle">System backdrop</div>
              <p class="win-body win-text-secondary" style="margin-top:4px">Mica samples the desktop wallpaper. Acrylic also blurs content behind the window.</p>
            </div>
          </div>`,
        xaml: `<Window.SystemBackdrop>
    <MicaBackdrop Kind="Base" />
</Window.SystemBackdrop>`,
        csharp: `// Set Window.SystemBackdrop to MicaBackdrop or DesktopAcrylicBackdrop.
// Use MicaController for full customization.`,
        html: `<div class="win-backdrop-stage">
  <div class="win-backdrop-layer win-backdrop-layer--mica"></div>
</div>`
      },
      {
        title: "Desktop Acrylic",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-backdrop-stage" style="min-height:320px">
            <div class="win-backdrop-layer win-backdrop-layer--acrylic"></div>
            <div class="win-backdrop-content" style="max-width:360px">
              <div class="win-subtitle">Desktop Acrylic</div>
              <p class="win-body win-text-secondary" style="margin-top:4px">A semi-transparent material that shows a blurred view of the desktop behind the window.</p>
              <div class="win-info-bar win-info-bar--informational" style="margin-top:12px"><span class="win-info-bar__icon">&#xE946;</span><div class="win-caption">Acrylic can reduce contrast; use it behind transient surfaces.</div></div>
            </div>
          </div>`,
        xaml: `<Window.SystemBackdrop>
    <DesktopAcrylicBackdrop />
</Window.SystemBackdrop>`,
        csharp: `// DesktopAcrylicBackdrop requires Windows 11 or a supported fallback.`,
        html: `<div class="win-backdrop-layer win-backdrop-layer--acrylic"></div>`
      }
    ]
  },

  SystemBackdropElement: {
    examples: [
      {
        title: "A backdrop element",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-backdrop-stage" style="min-height:300px;display:flex;align-items:center;justify-content:center">
            <div class="win-backdrop-layer win-backdrop-layer--mica" style="inset:0"></div>
            <div class="win-card" style="position:relative;z-index:1;width:320px;text-align:center">
              <div class="win-subtitle">SystemBackdropElement</div>
              <p class="win-caption win-text-secondary" style="margin-top:4px">A UIElement that hosts a system backdrop material within a page.</p>
            </div>
          </div>`,
        xaml: `<SystemBackdropElement>
    <SystemBackdropElement.SystemBackdrop>
        <MicaBackdrop />
    </SystemBackdropElement.SystemBackdrop>
</SystemBackdropElement>`,
        csharp: `// SystemBackdropElement lets a backdrop apply to an element,
// not just the entire window.`,
        html: `<div class="win-backdrop-stage">…</div>`
      }
    ]
  },

  ThemeShadow: {
    examples: [
      {
        title: "Theme shadows",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-theme-shadow-stage">
            <div class="win-theme-shadow-card win-theme-shadow-card--1">Depth 1</div>
            <div class="win-theme-shadow-card win-theme-shadow-card--2">Depth 2</div>
            <div class="win-theme-shadow-card win-theme-shadow-card--3">Depth 3</div>
          </div>`,
        xaml: `<Grid Translation="0,0,32">
    <Grid.Shadow>
        <ThemeShadow />
    </Grid.Shadow>
</Grid>`,
        csharp: `// ThemeShadow uses the system light model.
// Set Translation.Z to lift an element above its parent.`,
        html: `<div style="box-shadow:0 24px 48px rgba(0,0,0,.28)">…</div>`
      },
      {
        title: "Shadow on a card",
        center: true,
        preview: `
          <div style="display:flex;gap:32px;align-items:flex-end;padding:40px 20px">
            <div class="win-card" style="width:180px;height:110px;box-shadow:0 4px 8px rgba(0,0,0,.18)">Low elevation</div>
            <div class="win-card" style="width:180px;height:110px;box-shadow:0 12px 24px rgba(0,0,0,.22)">Medium elevation</div>
            <div class="win-card" style="width:180px;height:110px;box-shadow:0 24px 48px rgba(0,0,0,.28)">High elevation</div>
          </div>`,
        xaml: `<Border Shadow="{ThemeShadow}" Translation="0,0,64" />`,
        csharp: `// ThemeShadow is depth-aware and follows the system lighting.`,
        html: `<div style="box-shadow:0 12px 24px rgba(0,0,0,.22)">…</div>`
      }
    ]
  }
});
