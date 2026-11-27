/* WinUI Gallery samples — Dialogs & flyouts */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  ContentDialog: {
    examples: [
      {
        title: "A simple content dialog",
        center: true,
        preview: `
          <button class="win-button win-button--accent" data-dialog="simpleDialog">Show dialog</button>
          <template id="simpleDialog">
            <div class="win-dialog" role="dialog" aria-modal="true">
              <div class="win-dialog__title">Delete this file?</div>
              <div class="win-dialog__body"><p>This action cannot be undone. The file will be permanently removed from this device.</p></div>
              <div class="win-dialog__commands">
                <button class="win-button" data-dialog-result="secondary">Cancel</button>
                <button class="win-button win-button--accent" data-dialog-result="primary" autofocus>Delete</button>
              </div>
            </div>
          </template>`,
        xaml: `<ContentDialog Title="Delete this file?"
              PrimaryButtonText="Delete"
              CloseButtonText="Cancel"
              DefaultButton="Primary">
    <TextBlock Text="This action cannot be undone." TextWrapping="Wrap" />
</ContentDialog>`,
        csharp: `private async void ShowDialog_Click(object sender, RoutedEventArgs e)
{
    ContentDialog dialog = new ContentDialog
    {
        XamlRoot = this.XamlRoot,
        Title = "Delete this file?",
        Content = "This action cannot be undone.",
        PrimaryButtonText = "Delete",
        CloseButtonText = "Cancel",
        DefaultButton = ContentDialogButton.Primary
    };

    var result = await dialog.ShowAsync();
    if (result == ContentDialogResult.Primary)
    {
        // Delete the file.
    }
}`,
        html: `<button class="win-button" data-dialog="simpleDialog">Show dialog</button>
<template id="simpleDialog">
  <div class="win-dialog">
    <div class="win-dialog__title">Delete this file?</div>
    <div class="win-dialog__body">…</div>
    <div class="win-dialog__commands">…</div>
  </div>
</template>`
      },
      {
        title: "Content dialog with a checkbox",
        center: true,
        preview: `
          <button class="win-button" data-dialog="saveDialog">Show save dialog</button>
          <template id="saveDialog">
            <div class="win-dialog" role="dialog" aria-modal="true">
              <div class="win-dialog__title">Save your changes?</div>
              <div class="win-dialog__body">
                <p>You have unsaved changes in <strong>Document 1</strong>. Do you want to save them before closing?</p>
                <label class="win-checkbox" style="margin-top:12px"><input type="checkbox" id="saveDontAsk"><span class="win-checkbox__box"></span><span class="win-checkbox__label">Don't ask me again</span></label>
              </div>
              <div class="win-dialog__commands">
                <button class="win-button" data-dialog-result="secondary">Don't save</button>
                <button class="win-button" data-dialog-result="close">Cancel</button>
                <button class="win-button win-button--accent" data-dialog-result="primary" autofocus>Save</button>
              </div>
            </div>
          </template>`,
        xaml: `<ContentDialog Title="Save your changes?"
              PrimaryButtonText="Save"
              SecondaryButtonText="Don't save"
              CloseButtonText="Cancel">
    <StackPanel Spacing="12">
        <TextBlock Text="You have unsaved changes." TextWrapping="Wrap" />
        <CheckBox x:Name="DontAskCheckBox" Content="Don't ask me again" />
    </StackPanel>
</ContentDialog>`,
        csharp: `// Read the checkbox before the dialog closes,
// or bind it to a view-model property.`,
        html: `<div class="win-dialog__body">
  <label class="win-checkbox">…</label>
</div>`
      }
    ]
  },

  Flyout: {
    examples: [
      {
        title: "A flyout",
        center: true,
        preview: `
          <button class="win-button" data-flyout="shareFlyout">Show flyout</button>
          <template id="shareFlyout">
            <div class="win-flyout">
              <div class="win-flyout__title">Share this page</div>
              <div class="win-flyout__body">Send a link to this sample to a teammate.</div>
              <div class="win-textbox-wrap" style="margin-top:12px"><input class="win-textbox" value="https://example.com/winui/flyout" readonly></div>
              <div class="win-flyout__actions"><button class="win-button" data-close-flyout>Cancel</button><button class="win-button win-button--accent" data-copy="https://example.com/winui/flyout" data-close-flyout>Copy link</button></div>
            </div>
          </template>`,
        xaml: `<Button Content="Show flyout">
    <Button.Flyout>
        <Flyout Placement="Bottom">
            <StackPanel Width="280" Spacing="12">
                <TextBlock Text="Share this page" FontWeight="SemiBold" />
                <TextBox Text="https://example.com/winui/flyout" IsReadOnly="True" />
            </StackPanel>
        </Flyout>
    </Button.Flyout>
</Button>`,
        csharp: `// Flyout hosts arbitrary content and is dismissed
// when the user clicks outside or presses Escape.`,
        html: `<button class="win-button" data-flyout="shareFlyout">Show flyout</button>
<template id="shareFlyout">
  <div class="win-flyout">…</div>
</template>`
      },
      {
        title: "Flyout placement",
        center: true,
        preview: `
          <button class="win-button" data-flyout="placementFlyout" data-flyout-placement="top">Open above</button>
          <button class="win-button" data-flyout="placementFlyout" data-flyout-placement="bottom">Open below</button>
          <button class="win-button" data-flyout="placementFlyout" data-flyout-placement="left">Open left</button>
          <button class="win-button" data-flyout="placementFlyout" data-flyout-placement="right">Open right</button>
          <template id="placementFlyout">
            <div class="win-flyout"><div class="win-flyout__title">Placement</div><div class="win-flyout__body">The flyout is positioned relative to the invoking control.</div></div>
          </template>`,
        xaml: `<Flyout Placement="Top" />
<Flyout Placement="Bottom" />
<Flyout Placement="Left" />
<Flyout Placement="Right" />`,
        csharp: `// FlyoutPlacementMode selects the preferred side.
// WinUI flips the flyout when there isn't enough room.`,
        html: `<button data-flyout="placementFlyout" data-flyout-placement="top">Open above</button>`
      }
    ]
  },

  Popup: {
    examples: [
      {
        title: "A popup",
        center: true,
        preview: `
          <button class="win-button" data-flyout="popupDemo">Show popup</button>
          <template id="popupDemo">
            <div class="win-popup" style="width:280px">
              <div class="win-body-strong">Popup content</div>
              <p class="win-caption win-text-secondary" style="margin-top:6px">A Popup displays temporary content over the existing interface.</p>
              <div class="win-textbox-wrap" style="margin-top:12px"><input class="win-textbox" placeholder="Type something…"></div>
              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button class="win-button win-button--small" data-close-flyout>Close</button></div>
            </div>
          </template>`,
        xaml: `<Popup x:Name="Popup1" IsLightDismissEnabled="True">
    <Border Background="{ThemeResource AcrylicBackgroundFillColorDefaultBrush}"
            CornerRadius="8" Padding="16">
        <TextBlock Text="Popup content" />
    </Border>
</Popup>`,
        csharp: `Popup1.HorizontalOffset = 100;
Popup1.VerticalOffset = 100;
Popup1.IsOpen = true;`,
        html: `<div class="win-popup">
  <div class="win-body-strong">Popup content</div>
</div>`
      },
      {
        title: "Popup positioning",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-popup-stage" style="width:100%">
            <button class="win-button win-popup-target" data-flyout="positionPopup">Show at offset</button>
            <template id="positionPopup">
              <div class="win-popup" style="width:220px"><div class="win-body-strong">Offset popup</div><p class="win-caption win-text-secondary" style="margin-top:4px">HorizontalOffset and VerticalOffset position a Popup relative to its parent.</p></div>
            </template>
          </div>`,
        xaml: `<Popup HorizontalOffset="40" VerticalOffset="-60"
       IsLightDismissEnabled="True" />`,
        csharp: `// Popup positioning is controlled by HorizontalOffset,
// VerticalOffset, and the placement target.`,
        html: `<div class="win-popup-stage">…</div>`
      }
    ]
  },

  TeachingTip: {
    examples: [
      {
        title: "A targeted teaching tip",
        center: true,
        preview: `
          <button class="win-button win-button--accent" id="tipTarget" data-teaching-tip="simpleTip">Show teaching tip</button>
          <template id="simpleTip">
            <div class="win-teaching-tip">
              <button class="win-teaching-tip__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
              <div class="win-teaching-tip__body">
                <div class="win-teaching-tip__title">Quick tip</div>
                <div class="win-teaching-tip__subtitle">TeachingTip points at the control that triggered it and can include actions.</div>
                <div class="win-teaching-tip__actions"><span class="win-spacer"></span><button class="win-button win-button--small" data-close-teaching-tip>Got it</button></div>
              </div>
            </div>
          </template>`,
        xaml: `<TeachingTip x:Name="Tip"
             Target="{x:Bind TipTarget}"
             Title="Quick tip"
             Subtitle="TeachingTip points at the control that triggered it."
             IsOpen="True" />`,
        csharp: `private void ShowTip_Click(object sender, RoutedEventArgs e)
{
    Tip.IsOpen = true;
}`,
        html: `<button data-teaching-tip="simpleTip">Show teaching tip</button>
<template id="simpleTip"><div class="win-teaching-tip">…</div></template>`
      },
      {
        title: "A teaching tip with a hero image",
        center: true,
        preview: `
          <button class="win-button" data-teaching-tip="heroTip">Show hero tip</button>
          <template id="heroTip">
            <div class="win-teaching-tip" style="width:340px">
              <button class="win-teaching-tip__close" aria-label="Close"><span class="win-icon">&#xE711;</span></button>
              <div class="win-teaching-tip__hero" style="height:130px;padding:0">
                <img src="assets/SampleMedia/valley.jpg" alt="" style="width:100%;height:100%;object-fit:cover">
              </div>
              <div class="win-teaching-tip__body">
                <div class="win-teaching-tip__title">Explore the Gallery</div>
                <div class="win-teaching-tip__subtitle">Browse 115 interactive samples covering controls, design, motion and accessibility.</div>
                <div class="win-teaching-tip__actions"><button class="win-button win-button--subtle win-button--small" data-close-teaching-tip>Dismiss</button><span class="win-spacer"></span><button class="win-button win-button--accent win-button--small" data-close-teaching-tip>Browse</button></div>
              </div>
            </div>
          </template>`,
        xaml: `<TeachingTip Title="Explore the Gallery"
             Subtitle="Browse 115 interactive samples."
             HeroContent="{StaticResource HeroImage}"
             IsOpen="True" />`,
        csharp: `// HeroContent accepts any UIElement, including an Image.`,
        html: `<div class="win-teaching-tip__hero"><img src="…" alt=""></div>`
      }
    ]
  }
});
