/* WinUI Gallery samples — Basic input */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  Button: {
    examples: [
      {
        title: "A simple button",
        preview: `
          <button class="win-button" id="btnSimple" data-gallery-output="#buttonOut" data-output-text="You clicked: Standard XAML button">Standard XAML button</button>
          <button class="win-button win-button--accent" id="btnAccent" data-gallery-output="#buttonOut" data-output-text="You clicked: Accent button">Accent button</button>`,
        options: `
          <label class="win-checkbox"><input type="checkbox" data-disable-target="#btnSimple"><span class="win-checkbox__box"></span><span class="win-checkbox__label">Disable standard button</span></label>
          <label class="win-checkbox"><input type="checkbox" data-hide-target="#btnAccent"><span class="win-checkbox__box"></span><span class="win-checkbox__label">Hide accent button</span></label>`,
        output: `<span id="buttonOut" class="win-caption win-text-secondary">Click a button…</span>`,
        xaml: `<Button Content="Standard XAML button" Click="Button_Click" />
<Button Content="Accent button" Style="{StaticResource AccentButtonStyle}" Click="Button_Click" />`,
        csharp: `private void Button_Click(object sender, RoutedEventArgs e)
{
    if (sender is Button button)
    {
        Control1Output.Text = "You clicked: " + button.Content;
    }
}`,
        html: `<button class="win-button">Standard XAML button</button>
<button class="win-button win-button--accent">Accent button</button>`
      },
      {
        title: "Built-in button styles",
        center: true,
        preview: `
          <button class="win-button">Standard</button>
          <button class="win-button win-button--accent">Accent</button>
          <button class="win-button win-button--subtle">Subtle</button>
          <button class="win-button win-button--danger">Delete</button>
          <button class="win-button win-button--icon-only" aria-label="Settings" data-tooltip="Settings"><span class="win-icon">&#xE713;</span></button>`,
        xaml: `<Button Content="Standard" />
<Button Content="Accent" Style="{StaticResource AccentButtonStyle}" />
<Button Content="Subtle" Style="{StaticResource SubtleButtonStyle}" />
<Button Content="Delete" Style="{StaticResource DeleteButtonStyle}" />`,
        csharp: `// Styles are applied with the Style property.
// Accent and subtle styles ship with WinUI.`,
        html: `<button class="win-button">Standard</button>
<button class="win-button win-button--accent">Accent</button>
<button class="win-button win-button--subtle">Subtle</button>
<button class="win-button win-button--danger">Delete</button>`
      },
      {
        title: "A button with an image",
        center: true,
        preview: `
          <button class="win-button" style="width:80px;height:80px;padding:8px" aria-label="Pie" data-gallery-output="#imageButtonOut" data-output-text="You clicked: Pie">
            <img src="assets/SampleMedia/Slices.png" alt="A slice of pie" style="max-width:48px;max-height:48px">
          </button>`,
        output: `<span id="imageButtonOut" class="win-caption win-text-secondary">Click the image…</span>`,
        xaml: `<Button Width="80" Height="80" AutomationProperties.Name="Pie">
    <Image Source="/Assets/SampleMedia/Slices.png" AutomationProperties.Name="Slice" />
</Button>`,
        csharp: `// Image content is placed in the Button.Content property.
// Provide an accessible name that describes the action.`,
        html: `<button class="win-button" aria-label="Pie">
  <img src="assets/SampleMedia/Slices.png" alt="A slice of pie">
</button>`
      },
      {
        title: "Long content and wrapping",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-text-block win-text-secondary" style="max-width:640px">
            <p>Buttons can grow around longer labels, or their text can wrap when the available width is constrained.</p>
          </div>
          <button class="win-button" style="width:100%;max-width:520px">This is some text that is too long and will get cut off</button>
          <button class="win-button" style="max-width:260px;height:auto;padding:8px 12px;white-space:normal;text-align:left">This is another text that would result in being cut off without wrapping</button>`,
        xaml: `<Button HorizontalAlignment="Stretch">
    This is some text that is too long and will get cut off
</Button>
<Button MaxWidth="240" HorizontalContentAlignment="Left">
    <TextBlock TextWrapping="WrapWholeWords"
               Text="This is another text that would result in being cut off without wrapping" />
</Button>`,
        csharp: `// Prefer a wrapping TextBlock inside Button.Content
// when the label length is not predictable.`,
        html: `<button class="win-button" style="white-space:normal;text-align:left">
  Long labels can wrap with normal white-space.
</button>`
      }
    ]
  },

  DropDownButton: {
    examples: [
      {
        title: "A drop-down button with a flyout",
        center: true,
        preview: `
          <button class="win-drop-down-button" data-flyout="ddSimpleFlyout">DropDownButton <span class="win-icon">&#xE70D;</span></button>
          <template id="ddSimpleFlyout">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE710;</span></span><span class="win-menu-item__label">New</span></button>
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE8A5;</span></span><span class="win-menu-item__label">Open</span></button>
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE74E;</span></span><span class="win-menu-item__label">Save</span></button>
            </div>
          </template>`,
        xaml: `<DropDownButton Content="DropDownButton">
    <DropDownButton.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuFlyoutItem Text="New" Icon="Add" />
            <MenuFlyoutItem Text="Open" Icon="OpenFile" />
            <MenuFlyoutItem Text="Save" Icon="Save" />
        </MenuFlyout>
    </DropDownButton.Flyout>
</DropDownButton>`,
        csharp: `// DropDownButton shows its flyout when the button is invoked.
// The flyout can contain any content, not only a MenuFlyout.`,
        html: `<button class="win-drop-down-button" data-flyout="ddSimpleFlyout">
  DropDownButton
  <span class="win-icon">&#xE70D;</span>
</button>`
      },
      {
        title: "A drop-down button with an icon",
        center: true,
        preview: `
          <button class="win-drop-down-button" data-flyout="ddIconFlyout">
            <span class="win-icon">&#xE8B7;</span>
            <span>Folder options</span>
            <span class="win-icon">&#xE70D;</span>
          </button>
          <template id="ddIconFlyout">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Pin to Quick access</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Compress to ZIP file</span></button>
              <div class="win-menu-separator"></div>
              <button class="win-menu-item"><span class="win-menu-item__label">Properties</span></button>
            </div>
          </template>`,
        xaml: `<DropDownButton>
    <StackPanel Orientation="Horizontal" Spacing="8">
        <FontIcon Glyph="&#xE8B7;" />
        <TextBlock Text="Folder options" />
    </StackPanel>
    <DropDownButton.Flyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Pin to Quick access" />
            <MenuFlyoutItem Text="Compress to ZIP file" />
            <MenuFlyoutSeparator />
            <MenuFlyoutItem Text="Properties" />
        </MenuFlyout>
    </DropDownButton.Flyout>
</DropDownButton>`,
        csharp: `// Content can be any UIElement, including a horizontal StackPanel.`,
        html: `<button class="win-drop-down-button" data-flyout="ddIconFlyout">
  <span class="win-icon">&#xE8B7;</span> Folder options
  <span class="win-icon">&#xE70D;</span>
</button>`
      }
    ]
  },

  HyperlinkButton: {
    examples: [
      {
        title: "A hyperlink button",
        center: true,
        preview: `
          <a class="win-hyperlink-button" href="https://learn.microsoft.com/windows/apps/design/" target="_blank" rel="noopener">Go to the Windows design site <span class="win-icon">&#xE8A7;</span></a>`,
        xaml: `<HyperlinkButton Content="Go to the Windows design site"
                 NavigateUri="https://learn.microsoft.com/windows/apps/design/" />`,
        csharp: `// NavigateUri launches the system browser.
// Handle Click when navigation should be controlled in code.`,
        html: `<a class="win-hyperlink-button" href="https://learn.microsoft.com/windows/apps/design/">
  Go to the Windows design site
</a>`
      },
      {
        title: "Hyperlink button with an icon",
        center: true,
        preview: `
          <a class="win-hyperlink-button" href="#item/Button"><span class="win-icon">&#xE71B;</span>Open the Button sample</a>
          <a class="win-hyperlink-button" href="#item/Typography"><span class="win-icon">&#xE8D2;</span>Typography guidelines</a>
          <button class="win-hyperlink-button" disabled>Disabled link</button>`,
        xaml: `<HyperlinkButton>
    <StackPanel Orientation="Horizontal" Spacing="6">
        <FontIcon Glyph="&#xE71B;" FontSize="14" />
        <TextBlock Text="Open the Button sample" />
    </StackPanel>
</HyperlinkButton>`,
        csharp: `// HyperlinkButton can host arbitrary content and still behave as a link.`,
        html: `<a class="win-hyperlink-button" href="#item/Button">
  <span class="win-icon">&#xE71B;</span> Open the Button sample
</a>`
      }
    ]
  },

  RepeatButton: {
    examples: [
      {
        title: "A repeat button",
        center: true,
        preview: `
          <button class="win-repeat-button" id="repeatButton" data-repeat-output="#repeatOut">Press and hold</button>
          <div class="win-caption win-text-secondary" id="repeatOut">Press and hold the button…</div>`,
        xaml: `<RepeatButton Content="Press and hold" Click="RepeatButton_Click" />`,
        csharp: `private int _count;
private void RepeatButton_Click(object sender, RoutedEventArgs e)
{
    _count++;
    RepeatOutput.Text = $"Click count: {_count}";
}`,
        html: `<button class="win-repeat-button">Press and hold</button>`
      },
      {
        title: "A repeat button with a delay",
        center: true,
        preview: `
          <div class="win-number-box" style="width:160px">
            <button class="win-repeat-button win-button--icon-only" style="border-radius:4px 0 0 4px;height:32px;width:40px" data-repeat-output="#delayOut"><span class="win-icon">&#xE70D;</span></button>
            <input class="win-number-box__input" value="8" aria-label="Value">
            <button class="win-repeat-button win-button--icon-only" style="border-radius:0 4px 4px 0;height:32px;width:40px" data-repeat-output="#delayOut"><span class="win-icon">&#xE70E;</span></button>
          </div>
          <div class="win-caption win-text-secondary" id="delayOut">Delay and interval can be configured.</div>`,
        xaml: `<RepeatButton Content="&#xE70E;"
             Delay="500"
             Interval="100"
             Click="Increment_Click" />`,
        csharp: `// Delay is the initial pause before repeating.
// Interval is the time between subsequent clicks.`,
        html: `<button class="win-repeat-button" aria-label="Increase">+</button>`
      }
    ]
  },

  ToggleButton: {
    examples: [
      {
        title: "A toggle button",
        center: true,
        preview: `
          <button class="win-toggle-button" aria-pressed="false" data-toggle-output="#toggleOut" data-gallery-output="#toggleOut">
            <span class="win-icon">&#xE734;</span>ToggleButton
          </button>
          <div class="win-caption win-text-secondary" id="toggleOut">Toggle by clicking.</div>`,
        xaml: `<ToggleButton Content="ToggleButton" Checked="ToggleButton_Checked"
             Unchecked="ToggleButton_Unchecked" />`,
        csharp: `private void ToggleButton_Checked(object sender, RoutedEventArgs e)
{
    Output.Text = "ToggleButton is checked.";
}

private void ToggleButton_Unchecked(object sender, RoutedEventArgs e)
{
    Output.Text = "ToggleButton is unchecked.";
}`,
        html: `<button class="win-toggle-button" aria-pressed="false">
  <span class="win-icon">&#xE734;</span> ToggleButton
</button>`
      },
      {
        title: "A toggle button with a custom state",
        center: true,
        preview: `
          <button class="win-toggle-button" aria-pressed="true" data-gallery-output="#toggleOut2">
            <span class="win-icon">&#xE769;</span>Playing
          </button>
          <button class="win-toggle-button win-toggle-button--subtle" aria-pressed="false" data-gallery-output="#toggleOut2">
            <span class="win-icon">&#xE734;</span>Favorite
          </button>
          <div class="win-caption win-text-secondary" id="toggleOut2">Accent fill marks the checked state.</div>`,
        xaml: `<ToggleButton IsChecked="True">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <FontIcon Glyph="&#xE769;" />
        <TextBlock Text="Playing" />
    </StackPanel>
</ToggleButton>`,
        csharp: `// IsChecked can be true, false, or null when IsThreeState is enabled.`,
        html: `<button class="win-toggle-button" aria-pressed="true">
  <span class="win-icon">&#xE769;</span> Playing
</button>`
      }
    ]
  },

  SplitButton: {
    examples: [
      {
        title: "A split button",
        center: true,
        preview: `
          <div class="win-split-button">
            <button class="win-split-button__primary" data-gallery-output="#splitOut" data-output-text="Primary action invoked"><span class="win-icon">&#xE710;</span>Add</button>
            <button class="win-split-button__secondary" data-flyout="splitFlyout" aria-label="More options"><span class="win-icon">&#xE70D;</span></button>
          </div>
          <div class="win-caption win-text-secondary" id="splitOut">Invoke the primary or secondary action.</div>
          <template id="splitFlyout">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Add to new folder</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Add from file</span></button>
              <div class="win-menu-separator"></div>
              <button class="win-menu-item"><span class="win-menu-item__label">Import…</span></button>
            </div>
          </template>`,
        xaml: `<SplitButton Content="Add">
    <SplitButton.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuFlyoutItem Text="Add to new folder" />
            <MenuFlyoutItem Text="Add from file" />
            <MenuFlyoutSeparator />
            <MenuFlyoutItem Text="Import…" />
        </MenuFlyout>
    </SplitButton.Flyout>
</SplitButton>`,
        csharp: `// SplitButton has a primary action and a secondary drop-down action.
// The outer button is not the flyout target; the chevron part is.`,
        html: `<div class="win-split-button">
  <button class="win-split-button__primary">Add</button>
  <button class="win-split-button__secondary" data-flyout="splitFlyout">&#xE70D;</button>
</div>`
      },
      {
        title: "Accent split button",
        center: true,
        preview: `
          <div class="win-split-button win-split-button--accent">
            <button class="win-split-button__primary"><span class="win-icon">&#xE72D;</span>Share</button>
            <button class="win-split-button__secondary" aria-label="Share options"><span class="win-icon">&#xE70D;</span></button>
          </div>`,
        xaml: `<SplitButton Content="Share" Style="{StaticResource AccentSplitButtonStyle}" />`,
        csharp: `// Use the accent style when the primary action is the primary call to action.`,
        html: `<div class="win-split-button win-split-button--accent">…</div>`
      }
    ]
  },

  ToggleSplitButton: {
    examples: [
      {
        title: "A toggle split button",
        center: true,
        preview: `
          <div class="win-toggle-split-button" aria-pressed="false">
            <button class="win-toggle-split-button__primary"><span class="win-icon">&#xE769;</span>Play</button>
            <button class="win-toggle-split-button__secondary" data-flyout="tsbFlyout" aria-label="Playback options"><span class="win-icon">&#xE70D;</span></button>
          </div>
          <div class="win-caption win-text-secondary">The primary part toggles; the chevron opens options.</div>
          <template id="tsbFlyout">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Play once</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Repeat</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Shuffle</span></button>
            </div>
          </template>`,
        xaml: `<ToggleSplitButton Content="Play" IsChecked="False">
    <ToggleSplitButton.Flyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Play once" />
            <MenuFlyoutItem Text="Repeat" />
            <MenuFlyoutItem Text="Shuffle" />
        </MenuFlyout>
    </ToggleSplitButton.Flyout>
</ToggleSplitButton>`,
        csharp: `private void ToggleSplitButton_Click(object sender, RoutedEventArgs e)
{
    if (sender is ToggleSplitButton button)
    {
        PlaybackState.Text = button.IsChecked == true ? "Playing" : "Paused";
    }
}`,
        html: `<div class="win-toggle-split-button" aria-pressed="false">
  <button class="win-toggle-split-button__primary">Play</button>
  <button class="win-toggle-split-button__secondary">&#xE70D;</button>
</div>`
      }
    ]
  },

  CheckBox: {
    examples: [
      {
        title: "A check box",
        center: true,
        preview: `
          <label class="win-checkbox"><input type="checkbox" id="cbSimple" checked><span class="win-checkbox__box"></span><span class="win-checkbox__label">Checked</span></label>
          <label class="win-checkbox"><input type="checkbox"><span class="win-checkbox__box"></span><span class="win-checkbox__label">Unchecked</span></label>
          <label class="win-checkbox"><input type="checkbox" disabled><span class="win-checkbox__box"></span><span class="win-checkbox__label">Disabled</span></label>`,
        xaml: `<CheckBox Content="Checked" IsChecked="True" />
<CheckBox Content="Unchecked" />
<CheckBox Content="Disabled" IsEnabled="False" />`,
        csharp: `// IsChecked is a nullable bool. Use IsThreeState for indeterminate.`,
        html: `<label class="win-checkbox">
  <input type="checkbox" checked>
  <span class="win-checkbox__box"></span>
  <span class="win-checkbox__label">Checked</span>
</label>`
      },
      {
        title: "Three-state check box",
        center: true,
        preview: `
          <label class="win-checkbox"><input type="checkbox" id="cbTri"><span class="win-checkbox__box"></span><span class="win-checkbox__label">Three-state CheckBox</span></label>
          <div class="win-caption win-text-secondary" id="triOut">Indeterminate</div>`,
        options: `<p class="win-caption win-text-secondary">Click to cycle through indeterminate, checked, and unchecked states.</p>`,
        xaml: `<CheckBox Content="Three-state CheckBox" IsThreeState="True" IsChecked="{x:Null}" />`,
        csharp: `// IsThreeState allows the user to cycle through
// indeterminate, checked, and unchecked.`,
        html: `<label class="win-checkbox">
  <input type="checkbox" id="cbTri">
  <span class="win-checkbox__box"></span>
  <span class="win-checkbox__label">Three-state</span>
</label>`
      }
    ]
  },

  ColorPicker: {
    examples: [
      {
        title: "A color picker",
        preview: `
          <div class="win-color-picker" style="max-width:640px">
            <div class="win-color-picker__spectrum"><div class="win-color-picker__cursor"></div></div>
            <div class="win-color-picker__side">
              <div class="win-color-picker__preview"><div class="win-color-picker__swatch"></div><div class="win-color-picker__values"><div class="win-color-picker__label">Hex</div><div class="win-color-picker__hex"><span>#</span><input value="005FB8" aria-label="Hex color"></div><div class="win-color-picker__label win-color-picker__rgb">#005FB8</div></div></div>
              <div class="win-color-picker__sliders"><div class="win-color-picker__slider-label"><span>Hue</span><span>210°</span></div><input class="win-color-picker__hue" type="range" min="0" max="360" value="210" aria-label="Hue"></div>
              <div class="win-color-picker__swatches">
                <button class="win-color-picker__swatch-button" data-color="#0078d4" aria-label="Blue"></button>
                <button class="win-color-picker__swatch-button" data-color="#00b7c3" aria-label="Teal"></button>
                <button class="win-color-picker__swatch-button" data-color="#00cc6a" aria-label="Green"></button>
                <button class="win-color-picker__swatch-button" data-color="#c19c00" aria-label="Gold"></button>
                <button class="win-color-picker__swatch-button" data-color="#ca5010" aria-label="Orange"></button>
                <button class="win-color-picker__swatch-button" data-color="#e3008c" aria-label="Pink"></button>
                <button class="win-color-picker__swatch-button" data-color="#8764b8" aria-label="Violet"></button>
                <button class="win-color-picker__swatch-button" data-color="#4f6bed" aria-label="Iris"></button>
              </div>
            </div>
          </div>`,
        xaml: `<ColorPicker x:Name="ColorPicker1"
            IsAlphaEnabled="True"
            IsColorChannelTextInputVisible="True"
            IsHexInputVisible="True" />`,
        csharp: `private void ColorPicker_ColorChanged(ColorPicker sender, ColorChangedEventArgs args)
{
    SelectedColor.Background = new SolidColorBrush(args.NewColor);
}`,
        html: `<div class="win-color-picker">…</div>`
      },
      {
        title: "Compact color picker",
        center: true,
        preview: `
          <div class="win-color-picker win-color-picker--compact" style="width:300px">
            <div class="win-color-picker__spectrum"><div class="win-color-picker__cursor"></div></div>
            <div class="win-color-picker__preview"><div class="win-color-picker__swatch"></div><div class="win-color-picker__values"><div class="win-color-picker__hex"><span>#</span><input value="8764B8" aria-label="Hex color"></div><div class="win-color-picker__label win-color-picker__rgb">#8764B8</div></div></div>
            <input class="win-color-picker__hue" type="range" min="0" max="360" value="270" aria-label="Hue">
          </div>`,
        xaml: `<ColorPicker IsColorSliderVisible="False"
            IsColorChannelTextInputVisible="False"
            IsHexInputVisible="True" />`,
        csharp: `// Turn off parts of the picker when space is constrained.
// The spectrum remains interactive.`,
        html: `<div class="win-color-picker win-color-picker--compact">…</div>`
      }
    ]
  },

  ComboBox: {
    examples: [
      {
        title: "A combo box",
        center: true,
        preview: `
          <div class="win-combo-box" style="width:240px" data-value="Blue">
            <button class="win-combo-box__button" aria-haspopup="listbox" aria-expanded="false"><span class="win-combo-box__value">Blue</span><span class="win-icon">&#xE70D;</span></button>
            <div class="win-combo-box__popup" hidden role="listbox">
              <div class="win-combo-box__option" role="option" aria-selected="true" data-value="Blue">Blue <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
              <div class="win-combo-box__option" role="option" aria-selected="false" data-value="Crimson">Crimson <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
              <div class="win-combo-box__option" role="option" aria-selected="false" data-value="Emerald">Emerald <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
              <div class="win-combo-box__option" role="option" aria-selected="false" data-value="Violet">Violet <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
            </div>
          </div>`,
        xaml: `<ComboBox SelectedIndex="0" Header="Color">
    <ComboBoxItem Content="Blue" />
    <ComboBoxItem Content="Crimson" />
    <ComboBoxItem Content="Emerald" />
    <ComboBoxItem Content="Violet" />
</ComboBox>`,
        csharp: `private void ComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (sender is ComboBox combo)
    {
        Output.Text = $"Selected: {combo.SelectedItem}";
    }
}`,
        html: `<div class="win-combo-box">
  <button class="win-combo-box__button">Blue</button>
  <div class="win-combo-box__popup">…</div>
</div>`
      },
      {
        title: "Combo box with headers and groups",
        center: true,
        preview: `
          <div class="win-combo-box" style="width:260px" data-value="Control">
            <button class="win-combo-box__button" aria-expanded="false"><span class="win-combo-box__value">Control</span><span class="win-icon">&#xE70D;</span></button>
            <div class="win-combo-box__popup" hidden role="listbox">
              <div class="win-combo-box__group">Components</div>
              <div class="win-combo-box__option" role="option" aria-selected="true" data-value="Control">Control <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
              <div class="win-combo-box__option" role="option" aria-selected="false" data-value="Panel">Panel <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
              <div class="win-combo-box__group">Data</div>
              <div class="win-combo-box__option" role="option" aria-selected="false" data-value="Item">Item <span class="win-icon win-combo-box__check">&#xE73E;</span></div>
            </div>
          </div>`,
        xaml: `<ComboBox Header="Element type">
    <ComboBoxItem Content="Control" />
    <ComboBoxItem Content="Panel" />
</ComboBox>`,
        csharp: `// Use grouped CollectionViewSource data for headers,
// or add disabled items that act as group labels.`,
        html: `<div class="win-combo-box">
  <div class="win-combo-box__group">Components</div>
  <div class="win-combo-box__option">Control</div>
</div>`
      }
    ]
  },

  RadioButton: {
    examples: [
      {
        title: "Radio buttons",
        center: true,
        preview: `
          <div class="win-stack" style="gap:0">
            <label class="win-radio"><input type="radio" name="radioSample" checked><span class="win-radio__dot"></span><span>Option 1</span></label>
            <label class="win-radio"><input type="radio" name="radioSample"><span class="win-radio__dot"></span><span>Option 2</span></label>
            <label class="win-radio"><input type="radio" name="radioSample"><span class="win-radio__dot"></span><span>Option 3</span></label>
          </div>`,
        xaml: `<RadioButton Content="Option 1" GroupName="Options" IsChecked="True" />
<RadioButton Content="Option 2" GroupName="Options" />
<RadioButton Content="Option 3" GroupName="Options" />`,
        csharp: `// RadioButton uses GroupName to form mutually exclusive groups.
// Without GroupName, radio buttons in the same parent form a group.`,
        html: `<label class="win-radio">
  <input type="radio" name="options" checked>
  <span class="win-radio__dot"></span><span>Option 1</span>
</label>`
      },
      {
        title: "Radio buttons with descriptions",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:420px">
            <label class="win-radio" style="align-items:flex-start"><input type="radio" name="plan" checked><span class="win-radio__dot"></span><span><span class="win-body-strong">Recommended</span><span class="win-caption win-text-secondary" style="display:block;margin-top:2px">Balanced performance and battery life.</span></span></label>
            <label class="win-radio" style="align-items:flex-start"><input type="radio" name="plan"><span class="win-radio__dot"></span><span><span class="win-body-strong">Best performance</span><span class="win-caption win-text-secondary" style="display:block;margin-top:2px">Uses more power for maximum responsiveness.</span></span></label>
            <label class="win-radio" style="align-items:flex-start"><input type="radio" name="plan"><span class="win-radio__dot"></span><span><span class="win-body-strong">Best battery life</span><span class="win-caption win-text-secondary" style="display:block;margin-top:2px">Limits background activity.</span></span></label>
          </div>`,
        xaml: `<RadioButton GroupName="Power">
    <StackPanel>
        <TextBlock Text="Recommended" FontWeight="SemiBold" />
        <TextBlock Text="Balanced performance and battery life."
                   Foreground="{ThemeResource TextFillColorSecondaryBrush}" />
    </StackPanel>
</RadioButton>`,
        csharp: `// Rich content makes radio buttons easier to scan
// when each option needs an explanation.`,
        html: `<label class="win-radio">
  <input type="radio" name="plan">
  <span class="win-radio__dot"></span>
  <span>Option with description</span>
</label>`
      }
    ]
  },

  RatingControl: {
    examples: [
      {
        title: "A rating control",
        center: true,
        preview: `<div class="win-rating" data-value="3" data-max="5" role="slider" aria-label="Rating"></div>`,
        output: `<span class="win-caption win-text-secondary" id="ratingOut">3 / 5</span>`,
        xaml: `<RatingControl Value="3" MaxRating="5" />`,
        csharp: `private void Rating_ValueChanged(RatingControl sender, object args)
{
    Output.Text = $"Rating: {sender.Value} / {sender.MaxRating}";
}`,
        html: `<div class="win-rating" data-value="3" data-max="5"></div>`
      },
      {
        title: "Rating with placeholder and clear",
        center: true,
        preview: `
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <div class="win-rating win-rating--large" data-value="0" data-max="5" role="slider" aria-label="Rating"></div>
            <button class="win-button win-button--subtle win-button--small" id="clearRating"><span class="win-icon">&#xE74D;</span>Clear rating</button>
          </div>`,
        xaml: `<RatingControl x:Name="Rating"
              PlaceholderValue="0"
              Caption="Rate this sample"
              IsClearEnabled="True" />`,
        csharp: `private void Clear_Click(object sender, RoutedEventArgs e)
{
    Rating.Value = 0;
}`,
        html: `<div class="win-rating" data-value="0" data-max="5"></div>`
      }
    ]
  },

  Slider: {
    examples: [
      {
        title: "A slider",
        center: false,
        preview: `
          <div style="display:flex;align-items:center;gap:16px;width:100%;max-width:560px">
            <span class="demo-label">Simple slider</span>
            <input class="win-slider" type="range" min="0" max="100" value="40" aria-label="Simple slider">
            <span class="win-caption win-text-secondary" data-slider-value>40</span>
          </div>`,
        xaml: `<Slider Header="Simple slider" Minimum="0" Maximum="100" Value="40"
        ValueChanged="Slider_ValueChanged" />`,
        csharp: `private void Slider_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
{
    Output.Text = $"Value: {e.NewValue:0}";
}`,
        html: `<input class="win-slider" type="range" min="0" max="100" value="40">`
      },
      {
        title: "Slider with tick marks",
        center: false,
        preview: `
          <div style="width:100%;max-width:560px">
            <div style="display:flex;align-items:center;gap:16px">
              <span class="demo-label">Ticks</span>
              <input class="win-slider" type="range" min="0" max="10" step="1" value="5" aria-label="Ticks" style="--win-slider-ticks:11">
              <span class="win-caption win-text-secondary" data-slider-value>5</span>
            </div>
            <div class="win-slider-ticks"><span>0</span><span>5</span><span>10</span></div>
          </div>`,
        xaml: `<Slider Header="Ticks" Minimum="0" Maximum="10"
        TickFrequency="1" TickPlacement="Outside" StepFrequency="1" />`,
        csharp: `// TickFrequency controls the spacing of ticks.
// StepFrequency controls the granularity of value changes.`,
        html: `<input class="win-slider" type="range" min="0" max="10" step="1" value="5">`
      },
      {
        title: "Vertical slider",
        center: true,
        preview: `
          <div style="display:flex;align-items:center;gap:32px;height:200px">
            <input class="win-slider win-slider--vertical" type="range" min="0" max="100" value="65" aria-label="Vertical slider">
            <div class="win-caption win-text-secondary">Vertical orientation</div>
          </div>`,
        xaml: `<Slider Orientation="Vertical" Height="160" Minimum="0" Maximum="100" Value="65" />`,
        csharp: `// Vertical sliders are useful for volume and zoom controls.`,
        html: `<input class="win-slider win-slider--vertical" type="range" value="65">`
      }
    ]
  },

  ToggleSwitch: {
    examples: [
      {
        title: "A toggle switch",
        center: true,
        preview: `
          <label class="win-toggle-switch"><input type="checkbox" checked><span class="win-toggle-switch__track"><span class="win-toggle-switch__knob"></span></span><span class="win-toggle-switch__state">On</span></label>
          <label class="win-toggle-switch"><input type="checkbox"><span class="win-toggle-switch__track"><span class="win-toggle-switch__knob"></span></span><span class="win-toggle-switch__state">Off</span></label>`,
        xaml: `<ToggleSwitch Header="Toggle switch" OnContent="On" OffContent="Off" IsOn="True" />`,
        csharp: `private void ToggleSwitch_Toggled(object sender, RoutedEventArgs e)
{
    if (sender is ToggleSwitch toggle)
    {
        Status.Text = toggle.IsOn ? "On" : "Off";
    }
}`,
        html: `<label class="win-toggle-switch">
  <input type="checkbox" checked>
  <span class="win-toggle-switch__track"><span class="win-toggle-switch__knob"></span></span>
  <span class="win-toggle-switch__state">On</span>
</label>`
      },
      {
        title: "Toggle switch with a header",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-text-field" style="max-width:320px">
            <div class="win-text-field__header">Wi-Fi</div>
            <label class="win-toggle-switch"><input type="checkbox" checked><span class="win-toggle-switch__track"><span class="win-toggle-switch__knob"></span></span><span class="win-toggle-switch__state">On</span></label>
            <span class="win-text-field__description">Connect automatically to known networks.</span>
          </div>`,
        xaml: `<ToggleSwitch Header="Wi-Fi"
              OnContent="On" OffContent="Off"
              IsOn="True" />`,
        csharp: `// The Header property is announced by screen readers.
// Use OnContent and OffContent to describe the state.`,
        html: `<div class="win-text-field">
  <div class="win-text-field__header">Wi-Fi</div>
  <label class="win-toggle-switch">…</label>
</div>`
      }
    ]
  }
});
