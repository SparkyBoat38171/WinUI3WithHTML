/* WinUI Gallery samples — Menus & toolbars, Scrolling, System, TitleBar */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  AppBarButton: {
    examples: [
      {
        title: "An AppBarButton",
        center: true,
        preview: `
          <div class="win-command-bar" style="border:1px solid var(--win-card-stroke);border-radius:8px;display:inline-flex">
            <button class="win-appbar-button" data-gallery-toast data-toast-title="AppBarButton" data-toast-message="Add was invoked."><span class="win-icon">&#xE710;</span><span class="win-appbar-button__label">Add</span></button>
            <button class="win-appbar-button" data-gallery-toast data-toast-title="AppBarButton" data-toast-message="Edit was invoked."><span class="win-icon">&#xE70F;</span><span class="win-appbar-button__label">Edit</span></button>
            <button class="win-appbar-button" data-gallery-toast data-toast-title="AppBarButton" data-toast-message="Delete was invoked."><span class="win-icon">&#xE74D;</span><span class="win-appbar-button__label">Delete</span></button>
          </div>`,
        xaml: `<CommandBar>
    <AppBarButton Icon="Add" Label="Add" Click="Add_Click" />
    <AppBarButton Icon="Edit" Label="Edit" Click="Edit_Click" />
    <AppBarButton Icon="Delete" Label="Delete" Click="Delete_Click" />
</CommandBar>`,
        csharp: `private void Add_Click(object sender, RoutedEventArgs e)
{
    // Handle the command.
}`,
        html: `<button class="win-appbar-button">
  <span class="win-icon">&#xE710;</span>
  <span class="win-appbar-button__label">Add</span>
</button>`
      },
      {
        title: "AppBarButton with a menu",
        center: true,
        preview: `
          <div class="win-command-bar" style="border:1px solid var(--win-card-stroke);border-radius:8px;display:inline-flex">
            <button class="win-appbar-button" data-flyout="appbarMenu"><span class="win-icon">&#xE712;</span><span class="win-appbar-button__label">More</span></button>
          </div>
          <template id="appbarMenu">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE713;</span></span><span class="win-menu-item__label">Settings</span></button>
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE72D;</span></span><span class="win-menu-item__label">Share</span></button>
            </div>
          </template>`,
        xaml: `<AppBarButton Icon="More" Label="More">
    <AppBarButton.Flyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Settings" Icon="Setting" />
            <MenuFlyoutItem Text="Share" Icon="Share" />
        </MenuFlyout>
    </AppBarButton.Flyout>
</AppBarButton>`,
        csharp: `// AppBarButton.Flyout is shown when the button is invoked.`,
        html: `<button class="win-appbar-button" data-flyout="appbarMenu">…</button>`
      }
    ]
  },

  AppBarSeparator: {
    examples: [
      {
        title: "Separating commands",
        center: true,
        preview: `
          <div class="win-command-bar" style="border:1px solid var(--win-card-stroke);border-radius:8px;display:inline-flex">
            <button class="win-appbar-button"><span class="win-icon">&#xE710;</span><span class="win-appbar-button__label">Add</span></button>
            <button class="win-appbar-button"><span class="win-icon">&#xE70F;</span><span class="win-appbar-button__label">Edit</span></button>
            <span class="win-appbar-separator"></span>
            <button class="win-appbar-button"><span class="win-icon">&#xE72D;</span><span class="win-appbar-button__label">Share</span></button>
            <span class="win-appbar-separator"></span>
            <button class="win-appbar-button"><span class="win-icon">&#xE74D;</span><span class="win-appbar-button__label">Delete</span></button>
          </div>`,
        xaml: `<CommandBar>
    <AppBarButton Icon="Add" Label="Add" />
    <AppBarButton Icon="Edit" Label="Edit" />
    <AppBarSeparator />
    <AppBarButton Icon="Share" Label="Share" />
</CommandBar>`,
        csharp: `// AppBarSeparator groups related commands.`,
        html: `<span class="win-appbar-separator"></span>`
      }
    ]
  },

  AppBarToggleButton: {
    examples: [
      {
        title: "An AppBarToggleButton",
        center: true,
        preview: `
          <div class="win-command-bar" style="border:1px solid var(--win-card-stroke);border-radius:8px;display:inline-flex">
            <button class="win-appbar-toggle-button" aria-pressed="true"><span class="win-icon">&#xE8A9;</span><span class="win-appbar-button__label">Grid</span></button>
            <button class="win-appbar-toggle-button" aria-pressed="false"><span class="win-icon">&#xE8FD;</span><span class="win-appbar-button__label">List</span></button>
            <span class="win-appbar-separator"></span>
            <button class="win-appbar-toggle-button" aria-pressed="false"><span class="win-icon">&#xE734;</span><span class="win-appbar-button__label">Favorite</span></button>
          </div>`,
        xaml: `<CommandBar>
    <AppBarToggleButton Icon="ViewAll" Label="Grid" IsChecked="True" />
    <AppBarToggleButton Icon="BulletedList" Label="List" />
    <AppBarSeparator />
    <AppBarToggleButton Icon="Favorite" Label="Favorite" />
</CommandBar>`,
        csharp: `private void GridToggle_Click(object sender, RoutedEventArgs e)
{
    var isChecked = (sender as AppBarToggleButton).IsChecked;
}`,
        html: `<button class="win-appbar-toggle-button" aria-pressed="true">
  <span class="win-icon">&#xE8A9;</span> Grid
</button>`
      }
    ]
  },

  CommandBar: {
    examples: [
      {
        title: "A CommandBar",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-command-bar" style="width:100%">
            <div class="win-command-bar__primary">
              <button class="win-appbar-button"><span class="win-icon">&#xE710;</span><span class="win-appbar-button__label">New</span></button>
              <button class="win-appbar-button"><span class="win-icon">&#xE8A5;</span><span class="win-appbar-button__label">Open</span></button>
              <button class="win-appbar-button"><span class="win-icon">&#xE74E;</span><span class="win-appbar-button__label">Save</span></button>
              <span class="win-appbar-separator"></span>
              <button class="win-appbar-button"><span class="win-icon">&#xE7A7;</span><span class="win-appbar-button__label">Undo</span></button>
              <button class="win-appbar-button" disabled><span class="win-icon">&#xE7A6;</span><span class="win-appbar-button__label">Redo</span></button>
            </div>
            <div class="win-command-bar__secondary">
              <button class="win-appbar-button" data-flyout="commandOverflow"><span class="win-icon">&#xE712;</span><span class="win-appbar-button__label">More</span></button>
            </div>
          </div>
          <template id="commandOverflow">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Print</span><span class="win-menu-item__shortcut">Ctrl+P</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Export</span></button>
            </div>
          </template>`,
        xaml: `<CommandBar DefaultLabelPosition="Bottom">
    <AppBarButton Icon="Add" Label="New" />
    <AppBarButton Icon="OpenFile" Label="Open" />
    <AppBarButton Icon="Save" Label="Save" />
    <AppBarSeparator />
    <AppBarButton Icon="Undo" Label="Undo" />
    <AppBarButton Icon="Redo" Label="Redo" IsEnabled="False" />
    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Print" />
    </CommandBar.SecondaryCommands>
</CommandBar>`,
        csharp: `// Primary commands stay visible; secondary commands move to overflow
// when space runs out.`,
        html: `<div class="win-command-bar">
  <div class="win-command-bar__primary">…</div>
</div>`
      }
    ]
  },

  CommandBarFlyout: {
    examples: [
      {
        title: "A CommandBarFlyout",
        center: true,
        preview: `
          <button class="win-button" data-flyout="commandFlyout">Show CommandBarFlyout</button>
          <template id="commandFlyout">
            <div class="win-flyout win-flyout--toolbar">
              <button class="win-appbar-button win-appbar-button--compact" aria-label="Cut"><span class="win-icon">&#xE8C6;</span></button>
              <button class="win-appbar-button win-appbar-button--compact" aria-label="Copy"><span class="win-icon">&#xE8C8;</span></button>
              <button class="win-appbar-button win-appbar-button--compact" aria-label="Paste"><span class="win-icon">&#xE77F;</span></button>
              <span class="win-appbar-separator"></span>
              <button class="win-appbar-button win-appbar-button--compact" data-flyout="commandMore"><span class="win-icon">&#xE712;</span></button>
            </div>
          </template>
          <template id="commandMore">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Select all</span><span class="win-menu-item__shortcut">Ctrl+A</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Clear formatting</span></button>
            </div>
          </template>`,
        xaml: `<Button Content="Show CommandBarFlyout">
    <Button.Flyout>
        <CommandBarFlyout Placement="Bottom">
            <AppBarButton Icon="Cut" Label="Cut" />
            <AppBarButton Icon="Copy" Label="Copy" />
            <AppBarButton Icon="Paste" Label="Paste" />
        </CommandBarFlyout>
    </Button.Flyout>
</Button>`,
        csharp: `// CommandBarFlyout combines a compact toolbar with an optional menu.`,
        html: `<div class="win-flyout win-flyout--toolbar">…</div>`
      }
    ]
  },

  MenuBar: {
    examples: [
      {
        title: "A MenuBar",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-menu-bar" style="width:100%">
            <button class="win-menu-bar__item" data-flyout="fileMenu">File</button>
            <button class="win-menu-bar__item" data-flyout="editMenu">Edit</button>
            <button class="win-menu-bar__item" data-flyout="viewMenu">View <span class="win-icon">&#xE70D;</span></button>
          </div>
          <template id="fileMenu">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">New</span><span class="win-menu-item__shortcut">Ctrl+N</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Open</span><span class="win-menu-item__shortcut">Ctrl+O</span></button>
              <div class="win-menu-separator"></div>
              <button class="win-menu-item"><span class="win-menu-item__label">Exit</span></button>
            </div>
          </template>
          <template id="editMenu">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Cut</span><span class="win-menu-item__shortcut">Ctrl+X</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Copy</span><span class="win-menu-item__shortcut">Ctrl+C</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">Paste</span><span class="win-menu-item__shortcut">Ctrl+V</span></button>
            </div>
          </template>
          <template id="viewMenu">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item" role="menuitemcheckbox" aria-checked="true"><span class="win-menu-item__icon win-menu-toggle-check"></span><span class="win-menu-item__label">Status bar</span></button>
              <button class="win-menu-item" role="menuitemcheckbox" aria-checked="false"><span class="win-menu-item__icon win-menu-toggle-check"></span><span class="win-menu-item__label">Word wrap</span></button>
            </div>
          </template>`,
        xaml: `<MenuBar>
    <MenuBarItem Title="File">
        <MenuFlyoutItem Text="New" KeyboardAcceleratorTextOverride="Ctrl+N" />
        <MenuFlyoutItem Text="Open" KeyboardAcceleratorTextOverride="Ctrl+O" />
        <MenuFlyoutSeparator />
        <MenuFlyoutItem Text="Exit" />
    </MenuBarItem>
    <MenuBarItem Title="Edit">
        <MenuFlyoutItem Text="Cut" />
        <MenuFlyoutItem Text="Copy" />
        <MenuFlyoutItem Text="Paste" />
    </MenuBarItem>
</MenuBar>`,
        csharp: `// MenuBar provides classic menus for desktop apps.
// Each MenuBarItem displays a MenuFlyout.`,
        html: `<div class="win-menu-bar">
  <button class="win-menu-bar__item" data-flyout="fileMenu">File</button>
</div>`
      }
    ]
  },

  MenuFlyout: {
    examples: [
      {
        title: "A MenuFlyout",
        center: true,
        preview: `
          <button class="win-button" data-flyout="menuDemo1">Show MenuFlyout</button>
          <template id="menuDemo1">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE8A5;</span></span><span class="win-menu-item__label">Open</span><span class="win-menu-item__shortcut">Ctrl+O</span></button>
              <button class="win-menu-item"><span class="win-menu-item__icon"><span class="win-icon">&#xE74E;</span></span><span class="win-menu-item__label">Save</span><span class="win-menu-item__shortcut">Ctrl+S</span></button>
              <div class="win-menu-separator"></div>
              <button class="win-menu-item" role="menuitemcheckbox" aria-checked="true"><span class="win-menu-item__icon win-menu-toggle-check"></span><span class="win-menu-item__label">Show grid</span></button>
              <button class="win-menu-item" role="menuitemradio" aria-checked="true"><span class="win-menu-item__icon"><span class="win-menu-radio-dot"></span></span><span class="win-menu-item__label">Small tiles</span></button>
              <button class="win-menu-item" role="menuitemradio" aria-checked="false"><span class="win-menu-item__icon"><span class="win-menu-radio-dot"></span></span><span class="win-menu-item__label">Large tiles</span></button>
              <div class="win-menu-separator"></div>
              <button class="win-menu-item" data-submenu="menuSubDemo"><span class="win-menu-item__icon"><span class="win-icon">&#xE8B3;</span></span><span class="win-menu-item__label">Layout</span><span class="win-menu-item__chevron">&#xE76C;</span></button>
            </div>
          </template>
          <template id="menuSubDemo">
            <div class="win-flyout win-menu-flyout">
              <button class="win-menu-item"><span class="win-menu-item__label">Grid</span></button>
              <button class="win-menu-item"><span class="win-menu-item__label">List</span></button>
            </div>
          </template>`,
        xaml: `<Button Content="Show MenuFlyout">
    <Button.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuFlyoutItem Text="Open" Icon="OpenFile" KeyboardAcceleratorTextOverride="Ctrl+O" />
            <MenuFlyoutItem Text="Save" Icon="Save" KeyboardAcceleratorTextOverride="Ctrl+S" />
            <MenuFlyoutSeparator />
            <ToggleMenuFlyoutItem Text="Show grid" IsChecked="True" />
            <RadioMenuFlyoutItem Text="Small tiles" GroupName="Tiles" IsChecked="True" />
            <RadioMenuFlyoutItem Text="Large tiles" GroupName="Tiles" />
        </MenuFlyout>
    </Button.Flyout>
</Button>`,
        csharp: `// MenuFlyout supports icons, toggles, radio items, separators,
// submenus, and keyboard accelerators.`,
        html: `<div class="win-flyout win-menu-flyout">
  <button class="win-menu-item">Open</button>
</div>`
      }
    ]
  },

  SwipeControl: {
    examples: [
      {
        title: "Swipe to reveal actions",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-swipe-control" style="width:100%;max-width:640px">
            <div class="win-swipe-control__actions">
              <button class="win-swipe-action" data-action="archive"><span class="win-icon">&#xE7B8;</span>Archive</button>
              <button class="win-swipe-action" style="--swipe-bg:#c42b1c" data-action="delete"><span class="win-icon">&#xE74D;</span>Delete</button>
            </div>
            <div class="win-swipe-control__content"><span class="win-list-item__icon">&#xE715;</span><div><div class="win-body-strong">Message from Alex</div><div class="win-caption win-text-secondary">Swipe left to reveal actions</div></div></div>
          </div>
          <p class="win-caption win-text-secondary">Drag the item to the left, then release.</p>`,
        xaml: `<SwipeControl>
    <SwipeControl.RightItems>
        <SwipeItems Mode="Reveal">
            <SwipeItem Text="Archive" IconSource="{StaticResource ArchiveIcon}" />
            <SwipeItem Text="Delete" Background="Red" />
        </SwipeItems>
    </SwipeControl.RightItems>
</SwipeControl>`,
        csharp: `private void Delete_Invoked(SwipeItem sender, SwipeItemInvokedEventArgs args)
{
    // Remove the item.
}`,
        html: `<div class="win-swipe-control">
  <div class="win-swipe-control__actions">…</div>
  <div class="win-swipe-control__content">…</div>
</div>`
      },
      {
        title: "Swipe actions in a list",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;max-width:680px;display:flex;flex-direction:column;gap:6px">
            ${["Design review", "Sprint planning", "Release notes"].map((title) => `
              <div class="win-swipe-control">
                <div class="win-swipe-control__actions"><button class="win-swipe-action" style="--swipe-bg:#0f7b0f"><span class="win-icon">&#xE73E;</span>Done</button><button class="win-swipe-action" style="--swipe-bg:#c42b1c"><span class="win-icon">&#xE74D;</span>Delete</button></div>
                <div class="win-swipe-control__content"><span class="win-list-item__icon">&#xE8A5;</span><div><div class="win-body-strong">${title}</div><div class="win-caption win-text-secondary">Swipe left</div></div></div>
              </div>`).join("")}
          </div>`,
        xaml: `<ListView>
    <ListView.ItemTemplate>
        <DataTemplate>
            <SwipeControl>
                <SwipeControl.RightItems>
                    <SwipeItems><SwipeItem Text="Done" /><SwipeItem Text="Delete" /></SwipeItems>
                </SwipeControl.RightItems>
            </SwipeControl>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>`,
        csharp: `// SwipeControl works with touch and pen.
// Mouse and keyboard users need an alternative command surface.`,
        html: `<div class="win-swipe-control">…</div>`
      }
    ]
  },

  StandardUICommand: {
    examples: [
      {
        title: "Standard commands",
        center: true,
        preview: `
          <div class="win-command-bar" style="border:1px solid var(--win-card-stroke);border-radius:8px;display:inline-flex">
            <button class="win-appbar-button" aria-label="Cut"><span class="win-icon">&#xE8C6;</span><span class="win-appbar-button__label">Cut</span></button>
            <button class="win-appbar-button" aria-label="Copy"><span class="win-icon">&#xE8C8;</span><span class="win-appbar-button__label">Copy</span></button>
            <button class="win-appbar-button" aria-label="Paste"><span class="win-icon">&#xE77F;</span><span class="win-appbar-button__label">Paste</span></button>
            <span class="win-appbar-separator"></span>
            <button class="win-appbar-button" aria-label="Delete"><span class="win-icon">&#xE74D;</span><span class="win-appbar-button__label">Delete</span></button>
            <button class="win-appbar-button" aria-label="Share"><span class="win-icon">&#xE72D;</span><span class="win-appbar-button__label">Share</span></button>
          </div>
          <p class="win-caption win-text-secondary" style="flex-basis:100%;text-align:center">StandardUICommand provides built-in icon, label and shortcut metadata.</p>`,
        xaml: `<CommandBar>
    <AppBarButton Command="{StaticResource CutCommand}" />
    <AppBarButton Command="{StaticResource CopyCommand}" />
    <AppBarButton Command="{StaticResource PasteCommand}" />
</CommandBar>`,
        csharp: `// StandardUICommand supplies the icon, label, and keyboard shortcut
// for common actions such as Cut, Copy, Paste, Delete, and Share.`,
        html: `<button class="win-appbar-button" aria-label="Copy">…</button>`
      }
    ]
  },

  XamlUICommand: {
    examples: [
      {
        title: "A reusable XamlUICommand",
        center: true,
        preview: `
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
            <button class="win-button" data-gallery-toast data-toast-title="Command" data-toast-message="Share command executed."><span class="win-icon">&#xE72D;</span>Share</button>
            <button class="win-icon-button" aria-label="Share" data-gallery-toast data-toast-title="Command" data-toast-message="Share command executed."><span class="win-icon">&#xE72D;</span></button>
            <button class="win-appbar-button" data-gallery-toast data-toast-title="Command" data-toast-message="Share command executed."><span class="win-icon">&#xE72D;</span><span class="win-appbar-button__label">Share</span></button>
          </div>`,
        xaml: `<Page.Resources>
    <XamlUICommand x:Name="ShareCommand"
                   Label="Share"
                   Description="Share this item"
                   IconSource="{StaticResource ShareIcon}"
                   KeyboardAcceleratorTextOverride="Ctrl+S" />
</Page.Resources>

<Button Command="{StaticResource ShareCommand}" />`,
        csharp: `ShareCommand.ExecuteRequested += (s, e) =>
{
    // Share the item.
};`,
        html: `// Use a shared data object to keep labels, icons and handlers together.`
      }
    ]
  },

  PipsPager: {
    examples: [
      {
        title: "A PipsPager",
        center: true,
        preview: `
          <div class="win-pips-pager" id="pipsDemo">
            <button class="win-pips-pager__nav" data-dir="prev" aria-label="Previous"><span class="win-icon">&#xE76B;</span></button>
            <div class="win-pips-pager__pips">
              <button class="win-pip is-selected" data-index="0"></button>
              <button class="win-pip" data-index="1"></button>
              <button class="win-pip" data-index="2"></button>
              <button class="win-pip" data-index="3"></button>
              <button class="win-pip" data-index="4"></button>
            </div>
            <button class="win-pips-pager__nav" data-dir="next" aria-label="Next"><span class="win-icon">&#xE76C;</span></button>
          </div>
          <div class="win-caption win-text-secondary" style="flex-basis:100%;text-align:center">The selected pip expands into a pill.</div>`,
        xaml: `<PipsPager NumberOfPages="5" SelectedPageIndex="0" />`,
        csharp: `private void Pager_SelectedIndexChanged(PipsPager sender,
    PipsPagerSelectedIndexChangedEventArgs args)
{
    ContentFrame.Navigate(Pages[args.NewIndex]);
}`,
        html: `<div class="win-pips-pager">
  <div class="win-pips-pager__pips">
    <button class="win-pip is-selected"></button>
  </div>
</div>`
      },
      {
        title: "Vertical PipsPager",
        center: true,
        preview: `
          <div class="win-pips-pager win-pips-pager--vertical" id="pipsVertical">
            <button class="win-pips-pager__nav" data-dir="prev" aria-label="Previous"><span class="win-icon">&#xE70E;</span></button>
            <div class="win-pips-pager__pips">
              <button class="win-pip is-selected" data-index="0"></button>
              <button class="win-pip" data-index="1"></button>
              <button class="win-pip" data-index="2"></button>
            </div>
            <button class="win-pips-pager__nav" data-dir="next" aria-label="Next"><span class="win-icon">&#xE70D;</span></button>
          </div>`,
        xaml: `<PipsPager Orientation="Vertical" NumberOfPages="3" />`,
        csharp: `// Orientation can be Horizontal or Vertical.`,
        html: `<div class="win-pips-pager win-pips-pager--vertical">…</div>`
      }
    ]
  },

  PagerControl: {
    examples: [
      {
        title: "A basic pager",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-pager" data-page="2" style="width:100%">
            <span class="win-pager__summary">11–20 of 120</span>
            <div class="win-pager__buttons">
              <button class="win-pager__button win-pager__nav" data-page-prev aria-label="Previous"><span class="win-icon">&#xE76B;</span></button>
              <button class="win-pager__button" data-page="1">1</button>
              <button class="win-pager__button is-selected" data-page="2">2</button>
              <button class="win-pager__button" data-page="3">3</button>
              <span class="win-pager__ellipsis">…</span>
              <button class="win-pager__button" data-page="12">12</button>
              <button class="win-pager__button win-pager__nav" data-page-next aria-label="Next"><span class="win-icon">&#xE76C;</span></button>
            </div>
          </div>`,
        xaml: `<PagerControl NumberOfPages="12" SelectedPageIndex="1"
             ButtonPanelDisplayMode="All" />`,
        csharp: `private void Pager_PageChanged(object sender, PagerControlPageChangedEventArgs args)
{
    LoadPage(args.NewPageIndex);
}`,
        html: `<div class="win-pager">
  <button class="win-pager__button">1</button>
  <button class="win-pager__button is-selected">2</button>
</div>`
      },
      {
        title: "Unbounded pager",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-pager" data-page="10" data-unbounded="true" style="width:100%">
            <span class="win-pager__summary">Page 10</span>
            <div class="win-pager__buttons">
              <button class="win-pager__button win-pager__nav" data-page-prev aria-label="Previous"><span class="win-icon">&#xE76B;</span></button>
              <button class="win-pager__button is-selected" data-page="10">10</button>
              <button class="win-pager__button win-pager__nav" data-page-next aria-label="Next"><span class="win-icon">&#xE76C;</span></button>
            </div>
          </div>`,
        xaml: `<PagerControl NumberOfPages="0" />`,
        csharp: `// NumberOfPages = 0 creates an unbounded pager
// where the user can continue forward indefinitely.`,
        html: `<div class="win-pager" data-unbounded="true">…</div>`
      }
    ]
  },

  ScrollView: {
    examples: [
      {
        title: "A horizontal ScrollView",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-scroll-view win-scroll-view--horizontal" style="height:200px;width:100%;border-radius:0">
            <div class="win-scroll-view__content">
              ${["One", "Two", "Three", "Four", "Five", "Six"].map((x) => `<div class="win-scroll-view__card">Card ${x}</div>`).join("")}
            </div>
          </div>`,
        xaml: `<ScrollView HorizontalScrollBarVisibility="Auto"
            HorizontalScrollMode="Enabled"
            VerticalScrollMode="Disabled">
    <StackPanel Orientation="Horizontal" Spacing="12" />
</ScrollView>`,
        csharp: `// ScrollView supports panning, zooming, and scrollbar customization.`,
        html: `<div class="win-scroll-view win-scroll-view--horizontal">
  <div class="win-scroll-view__content">…</div>
</div>`
      },
      {
        title: "ScrollView with zoom",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-scroll-view" style="height:280px;width:100%">
            <div class="win-scroll-view__content win-scroll-view__zoom" style="min-width:0;transform-origin:top left" data-zoom-target>
              <div class="win-card" style="max-width:360px"><div class="win-subtitle">Zoomable content</div><p class="win-body win-text-secondary" style="margin-top:6px">Use the slider to zoom. ScrollView can zoom between MinZoomFactor and MaxZoomFactor.</p><button class="win-button win-button--accent" style="margin-top:12px">Action</button></div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px"><span class="win-caption win-text-secondary">Zoom</span><input class="win-slider" type="range" min="50" max="200" value="100" data-zoom-control="[data-zoom-target]" style="max-width:260px" aria-label="Zoom"></div>`,
        xaml: `<ScrollView ZoomMode="Enabled" MinZoomFactor="0.5" MaxZoomFactor="2" />`,
        csharp: `ScrollView.ZoomTo(1.5f, null, ScrollViewAnimationMode.Immediately);`,
        html: `<div class="win-scroll-view" data-zoom>…</div>`
      }
    ]
  },

  ScrollViewer: {
    examples: [
      {
        title: "A ScrollViewer",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-scroll-view" style="height:280px;width:100%">
            <div class="win-scroll-view__content" style="min-width:0">
              <h3 class="win-subtitle">Scrolling content</h3>
              ${Array.from({ length: 12 }, (_, i) => `<div class="win-card" style="margin-top:8px"><div class="win-body-strong">Item ${i + 1}</div><p class="win-caption win-text-secondary">ScrollViewer hosts content that is larger than the available viewport.</p></div>`).join("")}
            </div>
          </div>`,
        xaml: `<ScrollViewer VerticalScrollBarVisibility="Auto"
              HorizontalScrollBarVisibility="Disabled">
    <StackPanel />
</ScrollViewer>`,
        csharp: `// ScrollViewer is the lightweight scrolling primitive.
// ScrollView adds panning, zooming, and advanced interaction.`,
        html: `<div class="win-scroll-view">
  <div class="win-scroll-view__content">…</div>
</div>`
      }
    ]
  },

  SemanticZoom: {
    examples: [
      {
        title: "SemanticZoom",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-semantic-zoom" data-semantic-zoom style="width:100%">
            <div class="win-semantic-zoom__toolbar"><span class="win-body-strong">Collections</span><button class="win-button win-button--small" data-semantic-toggle><span class="win-icon">&#xE8A9;</span>Toggle zoom</button></div>
            <div class="win-semantic-zoom__stage">
              <div class="win-semantic-zoom__groups">
                ${[["Design", "&#xE790;"], ["Controls", "&#xE8B3;"], ["Motion", "&#xE945;"]].map(([name, icon]) => `<button class="win-semantic-zoom__group" data-semantic-group="${name}"><span class="win-icon">${icon}</span><span class="win-body-strong">${name}</span></button>`).join("")}
              </div>
              <div class="win-semantic-zoom__items">
                ${["Color", "Typography", "Spacing", "Geometry", "Button", "ListView", "NavigationView", "TabView", "Easing", "Transitions"].map((x) => `<div class="win-semantic-zoom__item">${x}</div>`).join("")}
              </div>
            </div>
          </div>`,
        xaml: `<SemanticZoom>
    <SemanticZoom.ZoomedInView>
        <ListView />
    </SemanticZoom.ZoomedInView>
    <SemanticZoom.ZoomedOutView>
        <GridView />
    </SemanticZoom.ZoomedOutView>
</SemanticZoom>`,
        csharp: `// SemanticZoom switches between a detailed view and a zoomed-out overview.
// Use it for large, grouped collections.`,
        html: `<div class="win-semantic-zoom">
  <div class="win-semantic-zoom__groups">…</div>
  <div class="win-semantic-zoom__items">…</div>
</div>`
      }
    ]
  },

  Clipboard: {
    examples: [
      {
        title: "Copy and paste text",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-textbox-wrap" style="width:100%;max-width:560px"><input class="win-textbox" id="clipboardText" value="WinUI Gallery" aria-label="Text"></div>
          <div style="display:flex;gap:8px"><button class="win-button" data-clipboard-copy="#clipboardText"><span class="win-icon">&#xE8C8;</span>Copy</button><button class="win-button" data-clipboard-paste="#clipboardText"><span class="win-icon">&#xE77F;</span>Paste</button></div>
          <span class="win-caption win-text-secondary" id="clipboardOut">Uses the browser Clipboard API.</span>`,
        xaml: `<Button Content="Copy" Click="Copy_Click" />
<Button Content="Paste" Click="Paste_Click" />`,
        csharp: `private void Copy_Click(object sender, RoutedEventArgs e)
{
    var package = new DataPackage();
    package.SetText(ClipboardInput.Text);
    Clipboard.SetContent(package);
}`,
        html: `await navigator.clipboard.writeText(text);
const text = await navigator.clipboard.readText();`
      },
      {
        title: "Clipboard content options",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:560px">
            <div class="win-body-strong">Clipboard history</div>
            <p class="win-caption win-text-secondary" style="margin-bottom:12px">Copy content with history and roaming options.</p>
            <label class="win-checkbox"><input type="checkbox" checked><span class="win-checkbox__box"></span><span class="win-checkbox__label">Include in clipboard history</span></label>
            <label class="win-checkbox"><input type="checkbox"><span class="win-checkbox__box"></span><span class="win-checkbox__label">Roam to other devices</span></label>
            <button class="win-button win-button--accent" style="margin-top:8px" data-clipboard-copy="WinUI shared clipboard"><span class="win-icon">&#xE8C8;</span>Copy sample text</button>
          </div>`,
        xaml: `<ClipboardContentOptions options = new()
{
    IsAllowedInHistory = true,
    IsRoamable = false
};`,
        csharp: `// ClipboardContentOptions controls history and roaming behavior
// for sensitive content.`,
        html: `// Use the Async Clipboard API with permissions.`
      }
    ]
  },

  StoragePickers: {
    examples: [
      {
        title: "Pick a file",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:560px">
            <div class="win-body-strong">FileOpenPicker</div>
            <p class="win-caption win-text-secondary">Choose a file from your device. The browser file picker is used.</p>
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
              <label class="win-button win-button--accent"><span class="win-icon">&#xE8E5;</span>Browse files<input type="file" id="filePicker" hidden accept="image/*,.txt,.json,.pdf" data-file-picker></label>
              <button class="win-button" data-gallery-toast data-toast-title="StoragePickers" data-toast-message="Folder picking is available through the File System Access API in Chromium browsers."><span class="win-icon">&#xE8B7;</span>Pick folder</button>
            </div>
            <div class="win-caption win-text-secondary" id="filePickerOut" style="margin-top:12px">No file selected.</div>
          </div>`,
        xaml: `<FileOpenPicker picker = new(this.AppWindow.Id);
picker.FileTypeFilter.Add(".jpg");
picker.FileTypeFilter.Add(".png");
var file = await picker.PickSingleFileAsync();`,
        csharp: `// WinUI 3 storage pickers are initialized with the window id
// so the dialog appears in the correct window.`,
        html: `<input type="file" id="filePicker">`
      }
    ]
  },

  TitleBar: {
    examples: [
      {
        title: "A custom TitleBar",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;border:1px solid var(--win-card-stroke);border-radius:8px;overflow:hidden;background:var(--win-mica-bg)">
            <div class="win-title-bar" style="height:48px">
              <div class="win-title-bar__left">
                <button class="win-title-bar__back" aria-label="Back"><span class="win-icon">&#xE72B;</span></button>
                <img class="win-title-bar__icon" src="assets/GalleryIcon.png" alt="">
                <span class="win-title-bar__title">WinUI Gallery</span>
              </div>
              <div class="win-title-bar__content"><div class="win-textbox-wrap" style="width:280px;height:28px"><span class="win-icon win-textbox-wrap__icon">&#xE721;</span><input class="win-textbox" placeholder="Search" aria-label="Search"></div></div>
              <div class="win-title-bar__right"><button class="win-icon-button" aria-label="Settings"><span class="win-icon">&#xE713;</span></button><div class="win-title-bar__caption"><button class="win-caption-button" aria-label="Minimize"><span class="win-icon">&#xE921;</span></button><button class="win-caption-button" aria-label="Maximize"><span class="win-icon">&#xE922;</span></button><button class="win-caption-button win-caption-button--close" aria-label="Close"><span class="win-icon">&#xE8BB;</span></button></div></div>
            </div>
            <div style="padding:28px;background:var(--win-mica-bg);min-height:160px"><h3 class="win-subtitle">App content</h3><p class="win-text-secondary" style="margin-top:4px">The TitleBar control provides a modern title bar with interactive content.</p></div>
          </div>`,
        xaml: `<TitleBar Title="WinUI Gallery"
          IsBackButtonVisible="True"
          IsPaneToggleButtonVisible="True">
    <TitleBar.Content>
        <AutoSuggestBox PlaceholderText="Search controls…" />
    </TitleBar.Content>
</TitleBar>`,
        csharp: `// The TitleBar control integrates with AppWindowTitleBar
// and supports drag regions and interactive content.`,
        html: `<div class="win-title-bar">
  <span class="win-title-bar__title">WinUI Gallery</span>
  <div class="win-title-bar__caption">…</div>
</div>`
      }
    ]
  }
});
