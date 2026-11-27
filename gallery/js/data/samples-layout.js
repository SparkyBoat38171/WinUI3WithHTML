/* WinUI Gallery samples — Layout */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  Border: {
    examples: [
      {
        title: "A Border around content",
        center: true,
        preview: `
          <div class="win-border-control" style="width:320px">
            <div class="win-border-control__inner">
              <div class="win-subtitle">Border</div>
              <p class="win-caption win-text-secondary" style="margin-top:4px">A Border can draw a boundary, a background, or both.</p>
            </div>
          </div>`,
        xaml: `<Border BorderBrush="{ThemeResource AccentFillColorDefaultBrush}"
        BorderThickness="2"
        CornerRadius="12"
        Padding="24">
    <TextBlock Text="Border content" />
</Border>`,
        csharp: `// Border supports separate thickness values for each edge.
// Set Background for a filled boundary.`,
        html: `<div class="win-border-control">
  <div class="win-border-control__inner">Border</div>
</div>`
      },
      {
        title: "Border thickness and corner radius",
        center: true,
        preview: `
          <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">
            <div class="win-border-control win-border-control--thin" style="width:160px;min-height:100px;border-radius:0">Square</div>
            <div class="win-border-control win-border-control--dashed" style="width:160px;min-height:100px">Dashed</div>
            <div class="win-border-control" style="width:160px;min-height:100px;border-radius:24px">Rounded</div>
          </div>`,
        xaml: `<Border BorderThickness="0" />
<Border BorderThickness="2" BorderBrush="Gray" />
<Border CornerRadius="24" BorderThickness="2" />`,
        csharp: `// CornerRadius is a CornerRadius structure:
// uniform, or four values for each corner.`,
        html: `<div class="win-border-control" style="border-radius:24px">Rounded</div>`
      }
    ]
  },

  Canvas: {
    examples: [
      {
        title: "Absolutely positioned elements",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-canvas-demo">
            <div class="win-canvas-demo__shape win-canvas-demo__shape--1">Left: 24, Top: 24</div>
            <div class="win-canvas-demo__shape win-canvas-demo__shape--2"></div>
            <div class="win-canvas-demo__shape win-canvas-demo__shape--3"></div>
          </div>`,
        xaml: `<Canvas>
    <Rectangle Width="120" Height="72" Fill="SteelBlue"
               Canvas.Left="24" Canvas.Top="24" />
    <Ellipse Width="72" Height="72" Fill="MediumPurple"
             Canvas.Left="180" Canvas.Top="80" />
</Canvas>`,
        csharp: `// Canvas positions children with attached properties.
// It does not resize children or arrange them automatically.`,
        html: `<div class="win-canvas-demo">
  <div class="win-canvas-demo__shape win-canvas-demo__shape--1">…</div>
</div>`
      },
      {
        title: "Canvas with z-order",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-canvas-demo" style="height:240px">
            <div class="win-canvas-demo__shape" style="left:40px;top:40px;width:160px;height:120px;background:#0078d4;z-index:1">One</div>
            <div class="win-canvas-demo__shape" style="left:110px;top:80px;width:160px;height:120px;background:#8764b8;z-index:2">Two</div>
            <div class="win-canvas-demo__shape" style="left:180px;top:120px;width:160px;height:120px;background:#c239b3;z-index:3">Three</div>
          </div>`,
        xaml: `<Canvas>
    <Rectangle Canvas.Left="40" Canvas.Top="40" Width="160" Height="120" Fill="Blue" />
    <Rectangle Canvas.Left="110" Canvas.Top="80" Width="160" Height="120" Fill="Purple" />
    <Rectangle Canvas.Left="180" Canvas.Top="120" Width="160" Height="120" Fill="Magenta" />
</Canvas>`,
        csharp: `// Later children paint on top. Use Canvas.ZIndex to override.`,
        html: `<canvas> or absolutely positioned divs</div>`
      }
    ]
  },

  Expander: {
    examples: [
      {
        title: "An Expander",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <details class="win-expander" open style="width:100%;max-width:640px">
            <summary class="win-expander__header"><span class="win-expander__icon">&#xE8A5;</span><span class="win-expander__title">Getting started</span><span class="win-expander__chevron">&#xE70D;</span></summary>
            <div class="win-expander__body"><p class="win-text-secondary">Expander is a container with a header that expands to reveal content. Use it for advanced settings or optional details.</p></div>
          </details>
          <details class="win-expander" style="width:100%;max-width:640px">
            <summary class="win-expander__header"><span class="win-expander__icon">&#xE713;</span><span class="win-expander__title">Advanced settings</span><span class="win-expander__chevron">&#xE70D;</span></summary>
            <div class="win-expander__body"><p class="win-text-secondary">The content stays in the visual tree while collapsed.</p></div>
          </details>`,
        xaml: `<Expander Header="Getting started" IsExpanded="True">
    <TextBlock Text="Expander content" TextWrapping="Wrap" />
</Expander>`,
        csharp: `private void Expander_Expanding(Expander sender, ExpanderExpandingEventArgs args)
{
    // Load content lazily when expanded.
}`,
        html: `<details class="win-expander">
  <summary class="win-expander__header">Getting started</summary>
  <div class="win-expander__body">…</div>
</details>`
      },
      {
        title: "Expander with rich header",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <details class="win-expander" style="width:100%;max-width:640px">
            <summary class="win-expander__header">
              <span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:var(--win-accent-selected);color:var(--win-accent-text)"><span class="win-icon">&#xE8B3;</span></span>
              <span><span class="win-body-strong" style="display:block">Layout options</span><span class="win-caption win-text-secondary">12 settings</span></span>
              <span class="win-expander__chevron">&#xE70D;</span>
            </summary>
            <div class="win-expander__body"><div class="win-checkbox"><input type="checkbox" checked><span class="win-checkbox__box"></span><span class="win-checkbox__label">Enable responsive layout</span></div></div>
          </details>`,
        xaml: `<Expander>
    <Expander.Header>
        <StackPanel Orientation="Horizontal" Spacing="12">
            <FontIcon Glyph="&#xE8B3;" />
            <TextBlock Text="Layout options" />
        </StackPanel>
    </Expander.Header>
</Expander>`,
        csharp: `// Header can contain any content.`,
        html: `<summary class="win-expander__header">…rich header…</summary>`
      }
    ]
  },

  Grid: {
    examples: [
      {
        title: "A Grid with rows and columns",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-grid-panel" style="width:100%;max-width:640px">
            <div class="win-grid-panel__cell win-grid-panel__cell--span-2">ColumnSpan = 2</div>
            <div class="win-grid-panel__cell">Cell</div>
            <div class="win-grid-panel__cell">Cell</div>
            <div class="win-grid-panel__cell win-grid-panel__cell--row-2">RowSpan = 2</div>
            <div class="win-grid-panel__cell">Cell</div>
            <div class="win-grid-panel__cell">Cell</div>
          </div>`,
        xaml: `<Grid ColumnSpacing="8" RowSpacing="8">
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto" />
        <RowDefinition Height="*" />
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="Auto" />
        <ColumnDefinition Width="*" />
        <ColumnDefinition Width="*" />
    </Grid.ColumnDefinitions>
    <Rectangle Grid.Row="0" Grid.Column="0" Grid.ColumnSpan="2" />
</Grid>`,
        csharp: `// Grid is the most flexible WinUI layout panel.
// Use Auto, Star, and fixed sizing for rows and columns.`,
        html: `<div class="win-grid-panel">
  <div class="win-grid-panel__cell win-grid-panel__cell--span-2">Span 2</div>
</div>`
      },
      {
        title: "Adaptive Grid layout",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;width:100%;max-width:760px">
            ${["One", "Two", "Three", "Four", "Five", "Six"].map((x) => `<div class="win-card" style="min-height:72px;display:flex;align-items:center;justify-content:center">${x}</div>`).join("")}
          </div>
          <p class="win-caption win-text-secondary">Resize the window to see the content reflow.</p>`,
        xaml: `<GridView ItemsSource="{x:Bind Items}">
    <GridView.ItemsPanel>
        <ItemsPanelTemplate>
            <ItemsWrapGrid MaximumRowsOrColumns="4" />
        </ItemsPanelTemplate>
    </GridView.ItemsPanel>
</GridView>`,
        csharp: `// Use adaptive triggers and layout panels for responsive grids.`,
        html: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr))">…</div>`
      }
    ]
  },

  LayoutPanel: {
    examples: [
      {
        title: "A custom layout panel",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:grid;grid-template-columns:2fr 1fr;grid-template-rows:100px 100px;gap:8px;width:100%;max-width:680px">
            <div class="win-card" style="display:flex;align-items:center;justify-content:center;background:var(--win-accent-selected)">Featured</div>
            <div class="win-card" style="display:flex;align-items:center;justify-content:center">Small</div>
            <div class="win-card" style="display:flex;align-items:center;justify-content:center">Wide</div>
            <div class="win-card" style="display:flex;align-items:center;justify-content:center">Small</div>
          </div>`,
        xaml: `<labs:LayoutPanel>
    <labs:LayoutPanel.Layout>
        <local:FeaturedTileLayout />
    </labs:LayoutPanel.Layout>
</labs:LayoutPanel>`,
        csharp: `// LayoutPanel is a base class for custom layouts.
// Override MeasureOverride and ArrangeOverride.`,
        html: `<div style="display:grid;grid-template-columns:2fr 1fr">…</div>`
      }
    ]
  },

  RelativePanel: {
    examples: [
      {
        title: "Relative positioning",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-relative-panel">
            <div class="win-relative-panel__item win-relative-panel__item--a">A · left/top</div>
            <div class="win-relative-panel__item win-relative-panel__item--b">B · below A</div>
            <div class="win-relative-panel__item win-relative-panel__item--c">C · right of B</div>
            <div class="win-relative-panel__item win-relative-panel__item--e">E · centered</div>
            <div class="win-relative-panel__item win-relative-panel__item--d">D · bottom right</div>
          </div>`,
        xaml: `<RelativePanel>
    <Border x:Name="A" />
    <Border x:Name="B" RelativePanel.Below="A" />
    <Border x:Name="C" RelativePanel.RightOf="B" />
    <Border x:Name="D" RelativePanel.AlignBottomWithPanel="True"
            RelativePanel.AlignRightWithPanel="True" />
</RelativePanel>`,
        csharp: `// RelativePanel positions children relative to siblings or the panel.`,
        html: `<div class="win-relative-panel">
  <div class="win-relative-panel__item win-relative-panel__item--a">A</div>
</div>`
      }
    ]
  },

  SplitView: {
    examples: [
      {
        title: "A SplitView",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-split-view" style="height:380px;--split-pane-width:230px">
            <div class="win-split-view__pane">
              <div class="win-split-view__pane-inner">
                <div class="win-split-view__pane-header">Navigation</div>
                <div class="win-list-view win-list-view--borderless">
                  <div class="win-list-item is-selected"><span class="win-list-item__icon">&#xE80F;</span><div class="win-list-item__body"><div class="win-list-item__title">Home</div></div></div>
                  <div class="win-list-item"><span class="win-list-item__icon">&#xE8A5;</span><div class="win-list-item__body"><div class="win-list-item__title">Documents</div></div></div>
                  <div class="win-list-item"><span class="win-list-item__icon">&#xE713;</span><div class="win-list-item__body"><div class="win-list-item__title">Settings</div></div></div>
                </div>
              </div>
            </div>
            <div class="win-split-view__content">
              <button class="win-button" data-split-toggle><span class="win-icon">&#xE700;</span>Toggle pane</button>
              <h3 class="win-subtitle" style="margin-top:20px">Content</h3>
              <p class="win-text-secondary" style="margin-top:6px">SplitView has a pane and a content area. The pane can be inline or overlay.</p>
            </div>
          </div>`,
        xaml: `<SplitView x:Name="Split" PanePlacement="Left" OpenPaneLength="230">
    <SplitView.Pane>
        <ListView />
    </SplitView.Pane>
    <Frame />
</SplitView>`,
        csharp: `private void TogglePane_Click(object sender, RoutedEventArgs e)
{
    Split.IsPaneOpen = !Split.IsPaneOpen;
}`,
        html: `<div class="win-split-view">
  <div class="win-split-view__pane">…</div>
  <div class="win-split-view__content">…</div>
</div>`
      },
      {
        title: "Compact and overlay pane",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-split-view win-split-view--overlay win-split-view--compact" style="height:300px;--split-pane-width:220px">
            <div class="win-split-view__pane"><div class="win-split-view__pane-inner"><div class="win-split-view__pane-header">Overlay</div><p class="win-caption win-text-secondary">The pane overlays the content area.</p></div></div>
            <div class="win-split-view__scrim"></div>
            <div class="win-split-view__content"><button class="win-button" data-split-toggle><span class="win-icon">&#xE700;</span>Open overlay</button><p class="win-text-secondary" style="margin-top:16px">Use CompactOverlay for media and creative apps.</p></div>
          </div>`,
        xaml: `<SplitView DisplayMode="CompactOverlay" CompactPaneLength="48" OpenPaneLength="220" />`,
        csharp: `// DisplayMode can be Overlay, Inline, CompactInline, or CompactOverlay.`,
        html: `<div class="win-split-view win-split-view--overlay">…</div>`
      }
    ]
  },

  StackPanel: {
    examples: [
      {
        title: "A vertical StackPanel",
        center: true,
        preview: `
          <div class="win-stack-panel" style="gap:8px">
            <div class="win-stack-panel__item">Item 1</div>
            <div class="win-stack-panel__item">Item 2</div>
            <div class="win-stack-panel__item">Item 3</div>
          </div>`,
        xaml: `<StackPanel Spacing="8">
    <Button Content="Item 1" />
    <Button Content="Item 2" />
    <Button Content="Item 3" />
</StackPanel>`,
        csharp: `// StackPanel arranges children in a single line.`,
        html: `<div class="win-stack-panel">
  <button class="win-button">Item 1</button>
</div>`
      },
      {
        title: "A horizontal StackPanel",
        center: true,
        preview: `
          <div class="win-stack-panel win-stack-panel--horizontal" style="gap:8px">
            <div class="win-stack-panel__item">One</div>
            <div class="win-stack-panel__item">Two</div>
            <div class="win-stack-panel__item">Three</div>
          </div>`,
        xaml: `<StackPanel Orientation="Horizontal" Spacing="8">
    <Button Content="One" />
    <Button Content="Two" />
    <Button Content="Three" />
</StackPanel>`,
        csharp: `// Horizontal StackPanel can overflow; use a Grid or WrapPanel
// when horizontal space is constrained.`,
        html: `<div class="win-stack-panel win-stack-panel--horizontal">…</div>`
      }
    ]
  },

  VariableSizedWrapGrid: {
    examples: [
      {
        title: "Variable-sized tiles",
        center: true,
        preview: `
          <div class="win-vsw-grid">
            <div class="win-vsw-grid__item win-vsw-grid__item--large">Large</div>
            <div class="win-vsw-grid__item">1×1</div>
            <div class="win-vsw-grid__item">1×1</div>
            <div class="win-vsw-grid__item win-vsw-grid__item--wide">Wide</div>
            <div class="win-vsw-grid__item">1×1</div>
            <div class="win-vsw-grid__item win-vsw-grid__item--tall">Tall</div>
            <div class="win-vsw-grid__item">1×1</div>
          </div>`,
        xaml: `<VariableSizedWrapGrid ItemWidth="72" ItemHeight="72"
                          MaximumRowsOrColumns="4">
    <Border Grid.RowSpan="2" Grid.ColumnSpan="2" />
</VariableSizedWrapGrid>`,
        csharp: `// Use attached Grid.RowSpan and Grid.ColumnSpan
// to vary the size of individual items.`,
        html: `<div class="win-vsw-grid">
  <div class="win-vsw-grid__item win-vsw-grid__item--wide">Wide</div>
</div>`
      }
    ]
  },

  WrapPanel: {
    examples: [
      {
        title: "Wrapping items",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-wrap-panel" style="width:100%">
            ${Array.from({ length: 12 }, (_, i) => `<div class="win-wrap-panel__item">Item ${i + 1}</div>`).join("")}
          </div>
          <p class="win-caption win-text-secondary">Resize the panel to see items wrap.</p>`,
        xaml: `<labs:WrapPanel Orientation="Horizontal" ItemWidth="72"
                   HorizontalSpacing="8" VerticalSpacing="8" />`,
        csharp: `// WrapPanel is provided by the Community Toolkit.
// It wraps children onto new lines when space runs out.`,
        html: `<div class="win-wrap-panel">…items…</div>`
      },
      {
        title: "Stretch the final item",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-wrap-panel win-wrap-panel--stretch" style="width:100%">
            <div class="win-wrap-panel__item">One</div>
            <div class="win-wrap-panel__item">Two</div>
            <div class="win-wrap-panel__item">Three</div>
            <div class="win-wrap-panel__item">Stretch</div>
          </div>`,
        xaml: `<labs:WrapPanel ItemsStretch="Fill" />`,
        csharp: `// ItemsStretch.Fill stretches items to fill the last line.`,
        html: `<div class="win-wrap-panel win-wrap-panel--stretch">…</div>`
      }
    ]
  },

  Viewbox: {
    examples: [
      {
        title: "Scaling content",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-viewbox-demo" style="width:100%">
            <div class="win-viewbox-demo__content" id="viewboxContent"><span class="win-icon">&#xE790;</span><span>Scaled content</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="win-caption win-text-secondary">Scale</span>
            <input class="win-slider" type="range" min="25" max="100" value="100" style="max-width:240px" data-viewbox-scale="#viewboxContent" aria-label="Scale">
          </div>`,
        xaml: `<Viewbox Stretch="Uniform" MaxWidth="400">
    <Grid Width="300" Height="120">
        <TextBlock Text="Scaled content" FontSize="32" />
    </Grid>
</Viewbox>`,
        csharp: `// Viewbox scales a single child to fit the available space.
// Stretch can be Uniform, UniformToFill, or Fill.`,
        html: `<div class="win-viewbox-demo">
  <div class="win-viewbox-demo__content">Scaled content</div>
</div>`
      }
    ]
  }
});
