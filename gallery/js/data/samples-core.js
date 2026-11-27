/* WinUI Gallery samples — Fundamentals, Design, Accessibility */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

const iconList = [
  ["GlobalNavButton", "E700"], ["Home", "E80F"], ["Search", "E721"], ["Settings", "E713"],
  ["Add", "E710"], ["Delete", "E74D"], ["Edit", "E70F"], ["Save", "E74E"],
  ["Refresh", "E72C"], ["Share", "E72D"], ["FavoriteStar", "E734"], ["FavoriteStarFill", "E735"],
  ["ChevronDown", "E70D"], ["ChevronRight", "E76C"], ["Back", "E72B"], ["Forward", "E72A"],
  ["Mail", "E715"], ["People", "E716"], ["Calendar", "E787"], ["Camera", "E722"],
  ["Photo", "E91B"], ["Video", "E714"], ["Play", "E768"], ["Pause", "E769"],
  ["Volume", "E767"], ["Mute", "E74F"], ["Folder", "E8B7"], ["Document", "E8A5"],
  ["Download", "E896"], ["Upload", "E898"], ["Cloud", "E753"], ["Wifi", "E701"],
  ["Bluetooth", "E702"], ["Battery", "E83F"], ["Brightness", "E706"], ["Color", "E790"],
  ["Font", "E8D2"], ["Code", "E943"], ["Link", "E71B"], ["Copy", "E8C8"],
  ["Cut", "E8C6"], ["Paste", "E77F"], ["Undo", "E7A7"], ["Redo", "E7A6"],
  ["Filter", "E71C"], ["Sort", "E8CB"], ["View", "E890"], ["More", "E712"]
];

Object.assign(window.GALLERY_SAMPLES, {
  XamlResources: {
    examples: [
      {
        title: "Theme resources",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-grid win-grid--3" style="width:100%">
            ${[
              ["AccentFillColorDefaultBrush", "var(--win-accent)", "Accent fill"],
              ["CardBackgroundFillColorDefaultBrush", "var(--win-card-bg)", "Card background"],
              ["TextFillColorPrimaryBrush", "var(--win-text-primary)", "Primary text"],
              ["SystemFillColorSuccessBrush", "var(--win-success)", "Success"],
              ["SystemFillColorCautionBrush", "var(--win-caution)", "Caution"],
              ["SystemFillColorCriticalBrush", "var(--win-critical)", "Critical"]
            ].map(([resource, color, label]) => `
              <div class="win-card" style="padding:12px">
                <div style="height:44px;border-radius:4px;background:${color};border:1px solid var(--win-card-stroke)"></div>
                <div class="win-caption win-text-secondary" style="margin-top:8px">${resource}</div>
                <div class="win-caption win-text-tertiary">${label}</div>
              </div>`).join("")}
          </div>`,
        xaml: `<Page.Resources>
    <SolidColorBrush x:Key="BrandBrush" Color="#0078D4" />
    <x:Double x:Key="CardCornerRadius">8</x:Double>
</Page.Resources>

<Border Background="{ThemeResource CardBackgroundFillColorDefaultBrush}"
        BorderBrush="{ThemeResource CardStrokeColorDefaultBrush}"
        CornerRadius="{StaticResource CardCornerRadius}" />`,
        csharp: `// ThemeResource updates automatically when the theme changes.
// StaticResource is resolved once and does not update.`,
        html: `<div style="background:var(--win-card-bg)">
  Theme-aware resources
</div>`
      },
      {
        title: "StaticResource vs ThemeResource",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-split-2" style="width:100%">
            <div class="win-card">
              <div class="win-body-strong">ThemeResource</div>
              <p class="win-caption win-text-secondary">Updates when the app theme changes.</p>
              <div style="height:36px;border-radius:4px;background:var(--win-accent);margin-top:12px"></div>
            </div>
            <div class="win-card">
              <div class="win-body-strong">StaticResource</div>
              <p class="win-caption win-text-secondary">Resolved once; remains the same.</p>
              <div style="height:36px;border-radius:4px;background:#0078d4;margin-top:12px"></div>
            </div>
          </div>`,
        xaml: `<Border Background="{ThemeResource AccentFillColorDefaultBrush}" />
<Border Background="{StaticResource AccentFillColorDefaultBrush}" />`,
        csharp: `// Prefer ThemeResource for brushes and colors
// that should adapt to light and dark mode.`,
        html: `<div style="background:var(--win-accent)">…</div>`
      }
    ]
  },

  XamlStyles: {
    examples: [
      {
        title: "An explicit style",
        center: true,
        preview: `
          <button class="win-button">Default Button</button>
          <button class="win-button" style="background:linear-gradient(135deg,#6b69d6,#c239b3);border-color:transparent;color:#fff;border-radius:999px;padding-inline:20px;box-shadow:0 4px 10px rgba(107,105,214,.3)">Brand Button</button>`,
        xaml: `<Page.Resources>
    <Style x:Key="BrandButtonStyle" TargetType="Button">
        <Setter Property="Background">
            <Setter.Value>
                <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                    <GradientStop Color="#6B69D6" Offset="0" />
                    <GradientStop Color="#C239B3" Offset="1" />
                </LinearGradientBrush>
            </Setter.Value>
        </Setter>
        <Setter Property="Foreground" Value="White" />
        <Setter Property="CornerRadius" Value="20" />
    </Style>
</Page.Resources>

<Button Content="Brand Button" Style="{StaticResource BrandButtonStyle}" />`,
        csharp: `// Styles are reusable sets of property values.
// Give a style a key and apply it with StaticResource.`,
        html: `<button class="win-button" style="border-radius:999px">Brand Button</button>`
      },
      {
        title: "An implicit style",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:480px">
            <div class="win-body-strong">Implicit styles</div>
            <p class="win-caption win-text-secondary">A style without an x:Key applies to every control of its TargetType in scope.</p>
            <button class="win-button" style="margin-top:12px">Every button looks different</button>
            <button class="win-button" style="margin-top:8px">In this scope</button>
          </div>`,
        xaml: `<Page.Resources>
    <Style TargetType="Button">
        <Setter Property="FontWeight" Value="SemiBold" />
        <Setter Property="CornerRadius" Value="12" />
    </Style>
</Page.Resources>`,
        csharp: `// Implicit styles automatically apply to all controls of the target type.
// Use BasedOn to extend a built-in style.`,
        html: `<style>
  .scope .win-button { border-radius: 12px; font-weight: 600; }
</style>`
      }
    ]
  },

  Binding: {
    examples: [
      {
        title: "One-way binding",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;width:100%;max-width:640px">
            <div class="win-text-field" style="flex:1;min-width:220px">
              <label class="win-text-field__header">Name</label>
              <div class="win-textbox-wrap"><input class="win-textbox" id="bindName" data-bind-source="#bindPreview" placeholder="Type a name"></div>
            </div>
            <div class="win-card" style="flex:1;min-width:220px">
              <div class="win-caption win-text-secondary">Preview</div>
              <div class="win-subtitle" id="bindPreview" data-bind-empty="Hello, WinUI">Hello, WinUI</div>
            </div>
          </div>`,
        xaml: `<TextBox x:Name="NameBox" Header="Name" />
<TextBlock Text="{x:Bind NameBox.Text, Mode=OneWay}" />`,
        csharp: `// In a page, x:Bind is compile-time bound and fast.
// {Binding} is resolved at runtime and supports DataContext.`,
        html: `<input class="win-textbox" data-bind-source="#bindPreview">
<div id="bindPreview">Hello, WinUI</div>`
      },
      {
        title: "Two-way binding with a slider",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;max-width:560px">
            <div style="display:flex;justify-content:space-between;margin-bottom:12px"><span class="win-caption win-text-secondary">Volume</span><span class="win-body-strong" id="bindVolume">65</span></div>
            <input class="win-slider" type="range" min="0" max="100" value="65" data-bind-value="#bindVolume" aria-label="Volume">
            <div style="margin-top:16px"><div class="win-progress-bar" id="bindProgress" data-value="65"><div class="win-progress-bar__fill"></div></div></div>
          </div>`,
        xaml: `<Slider Value="{x:Bind ViewModel.Volume, Mode=TwoWay}" />
<ProgressBar Value="{x:Bind ViewModel.Volume, Mode=OneWay}" />`,
        csharp: `public class MainViewModel : INotifyPropertyChanged
{
    private double _volume = 65;
    public double Volume
    {
        get => _volume;
        set { _volume = value; OnPropertyChanged(); }
    }
}`,
        html: `<input class="win-slider" data-bind-value="#bindVolume">`
      }
    ]
  },

  Templates: {
    examples: [
      {
        title: "A data template",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr));width:100%">
            ${[
              ["Aurora", "Sunrise", "assets/SampleMedia/sunset.jpg"],
              ["Rainier", "Mountain", "assets/SampleMedia/rainier.jpg"],
              ["Valley", "Landscape", "assets/SampleMedia/valley.jpg"]
            ].map(([title, subtitle, image]) => `<div class="win-card" style="padding:0;overflow:hidden"><img src="${image}" alt="" style="width:100%;height:100px;object-fit:cover"><div style="padding:10px"><div class="win-body-strong">${title}</div><div class="win-caption win-text-secondary">${subtitle}</div></div></div>`).join("")}
          </div>`,
        xaml: `<GridView ItemsSource="{x:Bind Photos}">
    <GridView.ItemTemplate>
        <DataTemplate x:DataType="local:Photo">
            <StackPanel Width="180">
                <Image Source="{x:Bind Image}" Height="100" Stretch="UniformToFill" />
                <TextBlock Text="{x:Bind Title}" FontWeight="SemiBold" />
                <TextBlock Text="{x:Bind Subtitle}" Style="{StaticResource CaptionTextBlockStyle}" />
            </StackPanel>
        </DataTemplate>
    </GridView.ItemTemplate>
</GridView>`,
        csharp: `// DataTemplate defines how each item in a collection is displayed.
// Use x:DataType for compiled bindings.`,
        html: `<template id="cardTemplate">
  <div class="win-card">…</div>
</template>`
      },
      {
        title: "A control template",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:400px;border-radius:16px">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="win-person-picture win-person-picture--large" style="background:linear-gradient(135deg,#0078d4,#8764b8)">JK</div>
              <div><div class="win-body-strong">Jordan Kim</div><div class="win-caption win-text-secondary">Designer · Seattle</div></div>
              <span class="win-info-badge win-info-badge--success" style="margin-left:auto">Online</span>
            </div>
          </div>`,
        xaml: `<Style TargetType="local:ProfileCard">
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="local:ProfileCard">
                <Border Background="{TemplateBinding Background}"
                        CornerRadius="16" Padding="16">
                    <ContentPresenter />
                </Border>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>`,
        csharp: `// ControlTemplate replaces the visual tree of a control.
// TemplateBinding links template properties to the control.`,
        html: `<div class="win-card" style="border-radius:16px">…</div>`
      }
    ]
  },

  CustomUserControls: {
    examples: [
      {
        title: "A custom user control",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            ${[["Jordan Kim", "Designer", "JK", "linear-gradient(135deg,#0078d4,#8764b8)"], ["Sam Lee", "Engineer", "SL", "linear-gradient(135deg,#ca5010,#e3008c)"], ["Alex Morgan", "PM", "AM", "linear-gradient(135deg,#0f7b0f,#00b7c3)"]].map(([name, role, initials, bg]) => `
              <div class="win-card" style="width:220px">
                <div style="display:flex;align-items:center;gap:12px">
                  <div class="win-person-picture" style="background:${bg}">${initials}</div>
                  <div><div class="win-body-strong">${name}</div><div class="win-caption win-text-secondary">${role}</div></div>
                </div>
                <div class="win-caption win-text-secondary" style="margin-top:12px">Member since 2024</div>
              </div>`).join("")}
          </div>`,
        xaml: `<local:ProfileCard DisplayName="Jordan Kim"
                  Role="Designer"
                  Initials="JK" />`,
        csharp: `public sealed partial class ProfileCard : UserControl
{
    public ProfileCard() => InitializeComponent();

    public string DisplayName { get; set; }
    public string Role { get; set; }
}`,
        html: `<div class="profile-card">
  <div class="win-person-picture">JK</div>
  <div>Jordan Kim</div>
</div>`
      }
    ]
  },

  CustomXamlConditionals: {
    examples: [
      {
        title: "Conditional XAML",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-split-2" style="width:100%">
            <div class="win-card">
              <div class="win-body-strong">Condition is true</div>
              <p class="win-caption win-text-secondary">This branch is visible when the condition evaluates to true.</p>
              <button class="win-button win-button--accent" style="margin-top:12px">Enabled feature</button>
            </div>
            <div class="win-card" style="opacity:0.55">
              <div class="win-body-strong">Fallback</div>
              <p class="win-caption win-text-secondary">This branch is used when the feature is unavailable.</p>
              <button class="win-button" style="margin-top:12px" disabled>Unavailable</button>
            </div>
          </div>`,
        xaml: `<Page xmlns:conditions="using:MyApp.Conditions">
    <conditions:FeatureCondition x:Key="HasFeature" />
    <Button x:Load="{x:Bind HasFeature.Value}" Content="Enabled feature" />
</Page>`,
        csharp: `// IXamlCondition allows XAML to evaluate a condition at parse time.
// Use it for feature flags, device capabilities, and version checks.`,
        html: `<button class="win-button" hidden>Fallback</button>`
      }
    ]
  },

  ScratchPad: {
    examples: [
      {
        title: "A simple scratch pad",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-split-2" style="padding:16px;gap:0;height:360px">
            <div style="border-right:1px solid var(--win-divider-stroke);padding-right:12px;display:flex;flex-direction:column">
              <div class="win-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><span class="win-body-strong">XAML</span><button class="win-button win-button--small" data-gallery-toast data-toast-title="Scratch pad" data-toast-message="Rendered with the web control library.">Run</button></div>
              <textarea class="win-textbox win-textbox--multiline" style="width:100%;height:100%;resize:none;font-family:var(--win-font-mono);font-size:12px" aria-label="XAML scratch pad">&lt;StackPanel Spacing="12"&gt;
  &lt;TextBlock Text="Hello, WinUI!"
             Style="{StaticResource TitleTextBlockStyle}" /&gt;
  &lt;Button Content="Click me"
          Style="{StaticResource AccentButtonStyle}" /&gt;
&lt;/StackPanel&gt;</textarea>
            </div>
            <div style="padding-left:16px;display:flex;align-items:center;justify-content:center">
              <div><div class="win-title">Hello, WinUI!</div><button class="win-button win-button--accent" style="margin-top:12px">Click me</button></div>
            </div>
          </div>`,
        xaml: `<!-- Type XAML, then run it in the native sample. -->`,
        csharp: `// The native Scratch Pad uses XamlReader.Load
// to parse and display arbitrary XAML at runtime.`,
        html: `<!-- Browser sandbox note: this recreation previews a prebuilt sample. -->`
      }
    ]
  },

  Color: {
    examples: [
      {
        title: "WinUI color palette",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;flex-direction:column;gap:14px;width:100%">
            <div><div class="win-body-strong" style="margin-bottom:6px">Accent</div><div style="display:flex;gap:8px;flex-wrap:wrap">${["#005fb8", "#0078d4", "#60cdff", "#99ebff"].map((c) => `<div style="width:92px"><div style="height:52px;border-radius:6px;background:${c};border:1px solid var(--win-card-stroke)"></div><div class="win-caption win-text-tertiary" style="margin-top:4px">${c}</div></div>`).join("")}</div></div>
            <div><div class="win-body-strong" style="margin-bottom:6px">System status</div><div style="display:flex;gap:8px;flex-wrap:wrap">${[["Success", "#0f7b0f"], ["Caution", "#9d5d00"], ["Critical", "#c42b1c"], ["Neutral", "#8a8a8a"]].map(([name, c]) => `<div style="width:92px"><div style="height:52px;border-radius:6px;background:${c}"></div><div class="win-caption win-text-tertiary" style="margin-top:4px">${name}</div></div>`).join("")}</div></div>
            <div><div class="win-body-strong" style="margin-bottom:6px">Neutrals</div><div style="display:flex;gap:8px;flex-wrap:wrap">${[["Base", "var(--win-mica-bg)"], ["Layer", "var(--win-layer-bg)"], ["Card", "var(--win-card-bg)"], ["Stroke", "var(--win-card-stroke)"]].map(([name, c]) => `<div style="width:92px"><div style="height:52px;border-radius:6px;background:${c};border:1px solid var(--win-card-stroke)"></div><div class="win-caption win-text-tertiary" style="margin-top:4px">${name}</div></div>`).join("")}</div></div>
          </div>`,
        xaml: `<ResourceDictionary.ThemeDictionaries>
    <ResourceDictionary x:Key="Light">
        <Color x:Key="BrandColor">#005FB8</Color>
    </ResourceDictionary>
    <ResourceDictionary x:Key="Dark">
        <Color x:Key="BrandColor">#60CDFF</Color>
    </ResourceDictionary>
</ResourceDictionary.ThemeDictionaries>`,
        csharp: `// Use accent resources for interactive elements.
// Use SystemFillColor* resources for status, never as decoration.`,
        html: `<div style="background:var(--win-accent)">Accent</div>`
      },
      {
        title: "Color and hierarchy",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:560px">
            <div class="win-body-strong">Surface hierarchy</div>
            <p class="win-caption win-text-secondary">Mica → layer → card → flyout. Each step adds elevation and contrast.</p>
            <div style="display:flex;height:120px;margin-top:14px;border-radius:8px;overflow:hidden;border:1px solid var(--win-card-stroke)">
              <div style="flex:1;background:var(--win-mica-bg);display:flex;align-items:flex-end;padding:8px"><span class="win-caption">Mica</span></div>
              <div style="flex:1;background:var(--win-layer-bg);display:flex;align-items:flex-end;padding:8px"><span class="win-caption">Layer</span></div>
              <div style="flex:1;background:var(--win-card-bg);display:flex;align-items:flex-end;padding:8px"><span class="win-caption">Card</span></div>
              <div style="flex:1;background:var(--win-flyout-bg);display:flex;align-items:flex-end;padding:8px"><span class="win-caption">Flyout</span></div>
            </div>
          </div>`,
        xaml: `<Border Background="{ThemeResource LayerFillColorDefaultBrush}" />
<Border Background="{ThemeResource CardBackgroundFillColorDefaultBrush}" />`,
        csharp: `// Use color to create hierarchy, not decoration.
// Ensure text contrast meets accessibility requirements.`,
        html: `<div style="background:var(--win-card-bg)">Card</div>`
      }
    ]
  },

  Geometry: {
    examples: [
      {
        title: "Rounded corners",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;padding:20px">
            ${[["4px", "4px"], ["8px", "8px"], ["12px", "12px"], ["24px", "24px"], ["50%", "50%"]].map(([radius, label]) => `<div style="display:flex;flex-direction:column;gap:6px;align-items:center"><div style="width:96px;height:72px;background:var(--win-accent-selected);border:2px solid var(--win-accent);border-radius:${radius}"></div><span class="win-caption win-text-secondary">${label}</span></div>`).join("")}
          </div>`,
        xaml: `<Border CornerRadius="4" />
<Border CornerRadius="8" />
<Border CornerRadius="12" />
<Border CornerRadius="24" />`,
        csharp: `// WinUI uses 4px for controls, 8px for overlays and cards,
// and fully rounded shapes for pills and avatars.`,
        html: `<div style="border-radius:8px">Card</div>`
      },
      {
        title: "Grid and alignment",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div style="position:relative;height:240px;border:1px dashed var(--win-control-stroke-secondary);border-radius:8px;background:repeating-linear-gradient(45deg,transparent 0 11px,var(--win-divider-stroke) 11px 12px)">
            <div style="position:absolute;left:24px;top:24px;width:120px;height:80px;border-radius:6px;background:var(--win-accent);opacity:.75;display:flex;align-items:center;justify-content:center;color:#fff">24,24</div>
            <div style="position:absolute;right:24px;top:24px;width:80px;height:80px;border-radius:50%;background:#8764b8;opacity:.8"></div>
            <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:10px 18px;border-radius:20px;background:var(--win-flyout-bg);box-shadow:var(--win-shadow-flyout)">Centered</div>
          </div>`,
        xaml: `<Grid>
    <Rectangle HorizontalAlignment="Left" VerticalAlignment="Top"
               Margin="24" Width="120" Height="80" />
    <Ellipse HorizontalAlignment="Right" VerticalAlignment="Top"
             Margin="24" Width="80" Height="80" />
</Grid>`,
        csharp: `// Use the layout system instead of absolute positioning
// when content needs to respond to window size.`,
        html: `<div class="win-grid-panel">…</div>`
      }
    ]
  },

  Iconography: {
    examples: [
      {
        title: "Segoe Fluent Icons",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:4px;width:100%">
            ${iconList.map(([name, code]) => `<button class="win-card" style="padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:6px;min-height:72px" data-icon-copy="${code}" data-tooltip="Copy glyph ${code}"><span class="win-icon" style="font-size:22px">&#x${code};</span><span class="win-caption win-text-tertiary" style="font-size:9px;text-align:center">${name}</span></button>`).join("")}
          </div>`,
        xaml: `<FontIcon Glyph="&#xE80F;" />
<FontIcon Glyph="&#xE713;" />
<FontIcon Glyph="&#xE721;" />`,
        csharp: `// Use Segoe Fluent Icons on Windows 11.
// Provide AutomationProperties.Name for icon-only controls.`,
        html: `<span class="win-icon">&#xE80F;</span>`
      }
    ]
  },

  Spacing: {
    examples: [
      {
        title: "The 4px spacing scale",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;display:flex;flex-direction:column;gap:12px">
            ${[4, 8, 12, 16, 20, 24, 32, 40].map((value) => `<div style="display:flex;align-items:center;gap:12px"><span class="win-caption win-text-secondary" style="width:48px">${value}px</span><div style="height:14px;width:${value * 6}px;background:var(--win-accent);border-radius:2px;opacity:${0.45 + value / 80}"></div><span class="win-caption win-text-tertiary">Spacing.${value === 4 ? "S" : value === 8 ? "M" : value === 16 ? "L" : value === 24 ? "XL" : ""}</span></div>`).join("")}
          </div>`,
        xaml: `<StackPanel Spacing="8" Padding="16">
    <TextBlock Text="Title" />
    <TextBlock Text="Body" />
</StackPanel>`,
        csharp: `// Base spacing is 4px. Use 4, 8, 12, 16, 24, 32, and 40.
// Consistent spacing creates rhythm and improves scanability.`,
        html: `<div style="display:flex;gap:16px;padding:24px">…</div>`
      },
      {
        title: "Spacing in a card",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:420px">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="win-person-picture">AL</div>
              <div><div class="win-body-strong">Alex Lee</div><div class="win-caption win-text-secondary">Product designer</div></div>
            </div>
            <p class="win-body win-text-secondary" style="margin-top:16px">Internal padding and spacing follow the 4px grid. Related items are closer together than unrelated groups.</p>
            <div style="display:flex;gap:8px;margin-top:16px"><button class="win-button win-button--accent">Follow</button><button class="win-button">Message</button></div>
          </div>`,
        xaml: `<StackPanel Padding="16" Spacing="16">
    <StackPanel Orientation="Horizontal" Spacing="12" />
    <TextBlock Text="Body copy" />
    <StackPanel Orientation="Horizontal" Spacing="8" />
</StackPanel>`,
        csharp: `// Use the smallest spacing that still communicates grouping.`,
        html: `<div class="win-card" style="padding:16px">…</div>`
      }
    ]
  },

  Typography: {
    examples: [
      {
        title: "Type ramp",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;flex-direction:column;gap:18px;width:100%;max-width:760px">
            ${[["Display", "68 / 92", "win-display"], ["Title Large", "40 / 52", "win-title-large"], ["Title", "28 / 36", "win-title"], ["Subtitle", "20 / 28", "win-subtitle"], ["Body Large", "18 / 24", "win-body-large"], ["Body Strong", "14 / 20", "win-body-strong"], ["Body", "14 / 20", "win-body"], ["Caption", "12 / 16", "win-caption"]].map(([name, size, cls]) => `
              <div style="display:flex;align-items:baseline;gap:20px;border-bottom:1px solid var(--win-divider-stroke);padding-bottom:10px">
                <span class="win-caption win-text-tertiary" style="width:92px;flex:none">${name}</span>
                <span class="${cls}" style="font-size:${cls === "win-display" ? "68px" : cls === "win-title-large" ? "40px" : cls === "win-title" ? "28px" : ""};line-height:1.1">${name}</span>
                <span class="win-caption win-text-tertiary" style="margin-left:auto">${size}</span>
              </div>`).join("")}
          </div>`,
        xaml: `<TextBlock Text="Title" Style="{StaticResource TitleTextBlockStyle}" />
<TextBlock Text="Subtitle" Style="{StaticResource SubtitleTextBlockStyle}" />
<TextBlock Text="Body" Style="{StaticResource BodyTextBlockStyle}" />
<TextBlock Text="Caption" Style="{StaticResource CaptionTextBlockStyle}" />`,
        csharp: `// Use the built-in text styles to keep hierarchy consistent.
// Segoe UI Variable provides optical sizing for display text.`,
        html: `<div class="win-title">Title</div>
<div class="win-subtitle">Subtitle</div>
<div class="win-caption">Caption</div>`
      },
      {
        title: "Line length and alignment",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;max-width:680px;display:flex;flex-direction:column;gap:16px">
            <div class="win-card"><div class="win-body-strong">Optimal line length</div><p class="win-body win-text-secondary" style="margin-top:6px;max-width:62ch">Body text is easiest to read at roughly 50–75 characters per line. Very long lines make it difficult for the eye to find the start of the next line.</p></div>
            <div class="win-card"><div class="win-body-strong">Left-aligned</div><p class="win-body win-text-secondary" style="margin-top:6px;text-align:left">Left-aligned text is the default for the type ramp. Center alignment is reserved for short labels, empty states, and dialogs.</p></div>
          </div>`,
        xaml: `<TextBlock MaxWidth="720" TextWrapping="Wrap" Text="Body copy" />`,
        csharp: `// Keep body text within a comfortable measure.
// Avoid justified text, which creates uneven gaps.`,
        html: `<p style="max-width:62ch">Body text…</p>`
      }
    ]
  },

  AccessibilityColorContrast: {
    examples: [
      {
        title: "Text contrast",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-grid win-grid--2" style="width:100%">
            <div style="padding:20px;border-radius:8px;background:#ffffff;color:#000000"><div class="win-body-strong">21:1 · Excellent</div><p class="win-caption" style="margin-top:4px">Primary text on white meets WCAG AAA.</p></div>
            <div style="padding:20px;border-radius:8px;background:#202020;color:#ffffff"><div class="win-body-strong">17.4:1 · Excellent</div><p class="win-caption" style="margin-top:4px">Primary text on dark surface.</p></div>
            <div style="padding:20px;border-radius:8px;background:#f3f3f3;color:#767676"><div class="win-body-strong">4.5:1 · Minimum</div><p class="win-caption" style="margin-top:4px">Secondary text at the AA threshold.</p></div>
            <div style="padding:20px;border-radius:8px;background:#f3f3f3;color:#c0c0c0"><div class="win-body-strong">1.9:1 · Fails</div><p class="win-caption" style="margin-top:4px">Insufficient contrast for text.</p></div>
          </div>`,
        xaml: `<TextBlock Foreground="{ThemeResource TextFillColorPrimaryBrush}" />
<TextBlock Foreground="{ThemeResource TextFillColorSecondaryBrush}" />`,
        csharp: `// Use TextFillColorPrimaryBrush for body text.
// Secondary text must still meet 4.5:1 for normal text.`,
        html: `<div style="color:var(--win-text-primary)">Primary text</div>`
      }
    ]
  },

  AccessibilityKeyboard: {
    examples: [
      {
        title: "Keyboard navigation",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:560px">
            <div class="win-body-strong">Tab through these controls</div>
            <p class="win-caption win-text-secondary" style="margin-bottom:12px">Press Tab and Shift+Tab. Activate with Enter or Space.</p>
            <div class="win-demo-row"><button class="win-button">First</button><button class="win-button">Second</button><button class="win-button">Third</button><button class="win-button win-button--accent">Primary</button></div>
            <div style="display:flex;gap:8px;margin-top:12px"><span class="win-kbd">Tab</span><span class="win-kbd">Shift</span><span class="win-kbd">Enter</span><span class="win-kbd">Space</span><span class="win-kbd">Esc</span></div>
          </div>`,
        xaml: `<Button Content="First" TabIndex="0" />
<Button Content="Second" TabIndex="1" />
<Button Content="Third" TabIndex="2" />`,
        csharp: `// Use AccessKey and KeyboardAccelerator for shortcuts.
// Do not remove the focus visual; it is essential for keyboard users.`,
        html: `<button class="win-button">First</button>`
      },
      {
        title: "Focus visuals",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:560px">
            <div class="win-body-strong">Focus rectangles</div>
            <p class="win-caption win-text-secondary" style="margin-bottom:12px">Use Tab to move focus. The 2px focus rectangle follows the theme.</p>
            <div class="win-demo-row"><button class="win-button" autofocus>Focused button</button><label class="win-checkbox"><input type="checkbox"><span class="win-checkbox__box"></span><span class="win-checkbox__label">CheckBox</span></label><button class="win-icon-button" aria-label="Settings"><span class="win-icon">&#xE713;</span></button></div>
          </div>`,
        xaml: `<Button Content="Focused button"
        UseSystemFocusVisuals="True" />`,
        csharp: `// Focus visuals are drawn by the system and respect high contrast.`,
        html: `<button class="win-button">Press Tab</button>`
      }
    ]
  },

  AccessibilityScreenReader: {
    examples: [
      {
        title: "Accessible names and roles",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:600px">
            <div class="win-body-strong">A well-labeled form</div>
            <div class="win-text-field" style="margin-top:12px">
              <label class="win-text-field__header" for="a11yEmail">Email address</label>
              <div class="win-textbox-wrap"><input class="win-textbox" id="a11yEmail" type="email" placeholder="name@example.com" aria-describedby="a11yHint"></div>
              <span class="win-text-field__description" id="a11yHint">We'll use this to send your receipt.</span>
            </div>
            <button class="win-button win-button--accent" style="margin-top:12px" aria-label="Submit email address">Submit</button>
          </div>`,
        xaml: `<TextBox Header="Email address"
                 AutomationProperties.Name="Email address"
                 AutomationProperties.HelpText="We'll use this to send your receipt." />
<Button Content="Submit" AutomationProperties.Name="Submit email address" />`,
        csharp: `// AutomationProperties.Name overrides the default accessible name.
// Prefer visible labels; use HelpText for additional context.`,
        html: `<label for="email">Email address</label>
<input id="email" aria-describedby="hint">
<span id="hint">We'll use this to send your receipt.</span>`
      },
      {
        title: "Live regions",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:600px">
            <div class="win-body-strong">Announcements</div>
            <p class="win-caption win-text-secondary">Status changes should be announced without moving focus.</p>
            <div class="win-info-bar win-info-bar--success" role="status" aria-live="polite" style="margin-top:12px"><span class="win-info-bar__icon">&#xE73E;</span><div class="win-info-bar__content"><div class="win-info-bar__message">Your changes were saved.</div></div></div>
            <button class="win-button" style="margin-top:12px" data-gallery-toast data-toast-title="Saved" data-toast-message="Changes were saved successfully.">Save changes</button>
          </div>`,
        xaml: `<InfoBar IsOpen="True" Severity="Success"
         AutomationProperties.LiveSetting="Polite"
         Message="Your changes were saved." />`,
        csharp: `// LiveSetting tells screen readers to announce the change.`,
        html: `<div role="status" aria-live="polite">Your changes were saved.</div>`
      }
    ]
  }
});
