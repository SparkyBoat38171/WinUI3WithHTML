/* WinUI Gallery samples — Navigation */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  BreadcrumbBar: {
    examples: [
      {
        title: "A simple BreadcrumbBar",
        center: true,
        preview: `
          <div class="win-breadcrumb-bar" style="width:100%;max-width:700px">
            <button class="win-breadcrumb-bar__item">Home</button>
            <span class="win-breadcrumb-bar__chevron">&#xE76C;</span>
            <button class="win-breadcrumb-bar__item">Library</button>
            <span class="win-breadcrumb-bar__chevron">&#xE76C;</span>
            <button class="win-breadcrumb-bar__item">Controls</button>
            <span class="win-breadcrumb-bar__chevron">&#xE76C;</span>
            <span class="win-breadcrumb-bar__item is-current">NavigationView</span>
          </div>`,
        xaml: `<BreadcrumbBar x:Name="Breadcrumb" ItemsSource="{x:Bind Path}" />`,
        csharp: `private ObservableCollection<string> Path { get; } =
    new() { "Home", "Library", "Controls", "NavigationView" };

private void Breadcrumb_ItemClicked(BreadcrumbBar sender, BreadcrumbBarItemClickedEventArgs args)
{
    // Navigate to args.Item
}`,
        html: `<div class="win-breadcrumb-bar">
  <button class="win-breadcrumb-bar__item">Home</button>
  <span class="win-breadcrumb-bar__chevron">›</span>
  <span class="win-breadcrumb-bar__item is-current">NavigationView</span>
</div>`
      },
      {
        title: "BreadcrumbBar in a page header",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;padding:20px;border:1px solid var(--win-card-stroke);border-radius:8px;background:var(--win-card-bg)">
            <div class="win-breadcrumb-bar" style="margin-bottom:12px">
              <button class="win-breadcrumb-bar__item">Home</button><span class="win-breadcrumb-bar__chevron">&#xE76C;</span>
              <button class="win-breadcrumb-bar__item">Settings</button><span class="win-breadcrumb-bar__chevron">&#xE76C;</span>
              <span class="win-breadcrumb-bar__item is-current">Privacy</span>
            </div>
            <h3 class="win-title">Privacy</h3>
            <p class="win-text-secondary" style="margin-top:4px">Control how your app uses information.</p>
          </div>`,
        xaml: `<StackPanel Spacing="12">
    <BreadcrumbBar ItemsSource="{x:Bind Path}" />
    <TextBlock Text="Privacy" Style="{StaticResource TitleTextBlockStyle}" />
</StackPanel>`,
        csharp: `// Place a BreadcrumbBar above the page title for hierarchical navigation.`,
        html: `<div class="win-breadcrumb-bar">…</div>`
      }
    ]
  },

  NavigationView: {
    examples: [
      {
        title: "A NavigationView",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-nav-view" style="height:460px;--nav-pane-width:240px" id="navSample">
            <aside class="win-nav-view__pane">
              <div class="win-nav-view__header">
                <button class="win-nav-view__toggle" aria-label="Toggle pane"><span class="win-icon">&#xE700;</span></button>
                <div class="win-nav-view__brand"><img src="assets/GalleryIcon.png" alt=""><span class="win-nav-view__brand-text">App name</span></div>
              </div>
              <nav class="win-nav-view__items">
                <button class="win-nav-item is-selected"><span class="win-nav-item__icon">&#xE80F;</span><span class="win-nav-item__label">Home</span></button>
                <button class="win-nav-item"><span class="win-nav-item__icon">&#xE8A5;</span><span class="win-nav-item__label">Documents</span></button>
                <button class="win-nav-item" data-nav-parent aria-expanded="false"><span class="win-nav-item__icon">&#xE8F1;</span><span class="win-nav-item__label">Library</span><span class="win-nav-item__chevron">&#xE76C;</span></button>
                <div class="win-nav-submenu"><div>
                  <button class="win-nav-item win-nav-item--indent"><span class="win-nav-item__label">Controls</span></button>
                  <button class="win-nav-item win-nav-item--indent"><span class="win-nav-item__label">Styles</span></button>
                </div></div>
                <div class="win-nav-item win-nav-item--header">More</div>
                <button class="win-nav-item"><span class="win-nav-item__icon">&#xE713;</span><span class="win-nav-item__label">Settings</span></button>
              </nav>
              <div class="win-nav-view__footer"><button class="win-nav-item"><span class="win-nav-item__icon">&#xE77B;</span><span class="win-nav-item__label">Account</span></button></div>
            </aside>
            <div class="win-nav-view__scrim"></div>
            <div class="win-nav-view__content">
              <div style="padding:28px">
                <h2 class="win-title">Home</h2>
                <p class="win-text-secondary" style="margin-top:8px">The pane can be expanded, compact, or hidden. Click the hamburger to collapse it.</p>
                <div class="win-grid win-grid--2" style="margin-top:20px">
                  <div class="win-card"><div class="win-body-strong">NavigationView</div><p class="win-caption win-text-secondary">A collapsible navigation menu.</p></div>
                  <div class="win-card"><div class="win-body-strong">Responsive</div><p class="win-caption win-text-secondary">The pane overlays content on narrow windows.</p></div>
                </div>
              </div>
            </div>
          </div>`,
        xaml: `<NavigationView x:Name="NavView" PaneDisplayMode="Auto"
                IsBackButtonVisible="Collapsed">
    <NavigationView.MenuItems>
        <NavigationViewItem Content="Home" Icon="Home" />
        <NavigationViewItem Content="Documents" Icon="Document" />
        <NavigationViewItem Content="Library" Icon="Library">
            <NavigationViewItem.MenuItems>
                <NavigationViewItem Content="Controls" />
                <NavigationViewItem Content="Styles" />
            </NavigationViewItem.MenuItems>
        </NavigationViewItem>
    </NavigationView.MenuItems>
    <Frame x:Name="ContentFrame" />
</NavigationView>`,
        csharp: `private void NavView_SelectionChanged(NavigationView sender, NavigationViewSelectionChangedEventArgs args)
{
    if (args.SelectedItem is NavigationViewItem item)
    {
        ContentFrame.Navigate(PageForTag(item.Tag));
    }
}`,
        html: `<div class="win-nav-view">
  <aside class="win-nav-view__pane">…</aside>
  <div class="win-nav-view__content">…</div>
</div>`
      },
      {
        title: "NavigationView with a top pane",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-nav-view win-nav-view--top" style="height:320px;border:1px solid var(--win-card-stroke);border-radius:8px;overflow:hidden">
            <aside class="win-nav-view__pane">
              <div class="win-nav-view__header" style="min-height:40px">
                <div class="win-nav-view__brand" style="padding-left:8px"><img src="assets/GalleryIcon.png" alt=""><span class="win-nav-view__brand-text">App</span></div>
              </div>
              <nav class="win-nav-view__items">
                <button class="win-nav-item is-selected"><span class="win-nav-item__icon">&#xE80F;</span><span class="win-nav-item__label">Home</span></button>
                <button class="win-nav-item"><span class="win-nav-item__icon">&#xE8A5;</span><span class="win-nav-item__label">Library</span></button>
                <button class="win-nav-item"><span class="win-nav-item__icon">&#xE713;</span><span class="win-nav-item__label">Settings</span></button>
              </nav>
            </aside>
            <div class="win-nav-view__content"><div style="padding:24px"><h3 class="win-subtitle">Top navigation</h3><p class="win-text-secondary" style="margin-top:4px">Use PaneDisplayMode="Top" for wide, shallow navigation.</p></div></div>
          </div>`,
        xaml: `<NavigationView PaneDisplayMode="Top">
    <NavigationView.MenuItems>
        <NavigationViewItem Content="Home" Icon="Home" />
        <NavigationViewItem Content="Library" Icon="Library" />
    </NavigationView.MenuItems>
</NavigationView>`,
        csharp: `// Top mode is useful for media, games, and small sets of destinations.`,
        html: `<div class="win-nav-view win-nav-view--top">…</div>`
      }
    ]
  },

  Pivot: {
    examples: [
      {
        title: "A basic Pivot",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-pivot" style="height:320px;padding:0 20px">
            <div class="win-pivot__headers">
              <button class="win-pivot__header is-selected" data-pivot="one">Recent</button>
              <button class="win-pivot__header" data-pivot="two">Shared</button>
              <button class="win-pivot__header" data-pivot="three">Favorites</button>
            </div>
            <div class="win-pivot__content">
              <div class="win-pivot__panel" data-pivot-panel="one"><h3 class="win-subtitle">Recent</h3><p class="win-text-secondary" style="margin-top:6px">Your recently opened files appear here.</p></div>
              <div class="win-pivot__panel" data-pivot-panel="two" hidden><h3 class="win-subtitle">Shared</h3><p class="win-text-secondary" style="margin-top:6px">Files shared with you appear here.</p></div>
              <div class="win-pivot__panel" data-pivot-panel="three" hidden><h3 class="win-subtitle">Favorites</h3><p class="win-text-secondary" style="margin-top:6px">Files you marked as favorites appear here.</p></div>
            </div>
          </div>`,
        xaml: `<Pivot>
    <PivotItem Header="Recent">
        <TextBlock Text="Your recently opened files appear here." />
    </PivotItem>
    <PivotItem Header="Shared">
        <TextBlock Text="Files shared with you appear here." />
    </PivotItem>
    <PivotItem Header="Favorites">
        <TextBlock Text="Files you marked as favorites appear here." />
    </PivotItem>
</Pivot>`,
        csharp: `private void Pivot_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    // React to the selected pivot item.
}`,
        html: `<div class="win-pivot">
  <div class="win-pivot__headers">
    <button class="win-pivot__header is-selected">Recent</button>
  </div>
</div>`
      }
    ]
  },

  SelectorBar: {
    examples: [
      {
        title: "A basic SelectorBar",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-selector-bar">
            <button class="win-selector-bar__item is-selected" data-selector="all"><span class="win-icon">&#xE71D;</span>All</button>
            <button class="win-selector-bar__item" data-selector="recent"><span class="win-icon">&#xE823;</span>Recent</button>
            <button class="win-selector-bar__item" data-selector="favorites"><span class="win-icon">&#xE734;</span>Favorites</button>
          </div>
          <div style="width:100%">
            <div data-selector-panel="all"><div class="win-card">All items are shown in this panel.</div></div>
            <div data-selector-panel="recent" hidden><div class="win-card">Recently used items appear here.</div></div>
            <div data-selector-panel="favorites" hidden><div class="win-card">Your favorite items appear here.</div></div>
          </div>`,
        xaml: `<SelectorBar>
    <SelectorBarItem Text="All" IsSelected="True" />
    <SelectorBarItem Text="Recent" />
    <SelectorBarItem Text="Favorites" />
</SelectorBar>`,
        csharp: `private void SelectorBar_SelectionChanged(SelectorBar sender, SelectorBarSelectionChangedEventArgs args)
{
    var item = sender.SelectedItem as SelectorBarItem;
    // Switch content based on item.Tag
}`,
        html: `<div class="win-selector-bar">
  <button class="win-selector-bar__item is-selected">All</button>
</div>`
      },
      {
        title: "SelectorBar with Frame transitions",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-selector-bar">
            <button class="win-selector-bar__item is-selected">First</button>
            <button class="win-selector-bar__item">Second</button>
            <button class="win-selector-bar__item">Third</button>
          </div>
          <div class="win-transition-stage" style="height:170px;width:100%">
            <div class="win-transition-page" style="position:relative"><span class="win-icon">&#xE8A5;</span><div class="win-subtitle">First page</div></div>
          </div>`,
        xaml: `<SelectorBar SelectionChanged="SelectorBar_SelectionChanged" />
<!-- Pair with a Frame and SlideNavigationTransitionInfo. -->`,
        csharp: `ContentFrame.Navigate(
    pageType,
    null,
    new SlideNavigationTransitionInfo
    {
        Effect = SlideNavigationTransitionEffect.FromRight
    });`,
        html: `<div class="win-selector-bar">…</div>`
      }
    ]
  },

  TabView: {
    examples: [
      {
        title: "A TabView",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-tab-view" style="height:380px">
            <div class="win-tab-view__strip">
              <button class="win-tab-view__tab is-selected" data-tab="doc1"><span class="win-tab-view__tab-icon win-icon">&#xE8A5;</span><span class="win-tab-view__tab-title">Document 1</span><span class="win-tab-view__tab-close" role="button" aria-label="Close"><span class="win-icon">&#xE711;</span></span></button>
              <button class="win-tab-view__tab" data-tab="doc2"><span class="win-tab-view__tab-icon win-icon">&#xE8A5;</span><span class="win-tab-view__tab-title">Document 2</span><span class="win-tab-view__tab-close" role="button" aria-label="Close"><span class="win-icon">&#xE711;</span></span></button>
              <button class="win-tab-view__add" aria-label="New tab"><span class="win-icon">&#xE710;</span></button>
            </div>
            <div class="win-tab-view__content">
              <div class="win-tab-view__panel is-active" data-tab-panel="doc1"><h3 class="win-subtitle">Document 1</h3><p class="win-text-secondary" style="margin-top:8px">TabView presents a collection of tabs for documents or views.</p></div>
              <div class="win-tab-view__panel" data-tab-panel="doc2" hidden><h3 class="win-subtitle">Document 2</h3><p class="win-text-secondary" style="margin-top:8px">Click + to add a tab, or × to close one.</p></div>
            </div>
          </div>`,
        xaml: `<TabView x:Name="Tabs" AddTabButtonClick="Tabs_AddTabButtonClick"
         TabCloseRequested="Tabs_TabCloseRequested">
    <TabView.TabItems>
        <TabViewItem Header="Document 1" IsClosable="True">
            <TextBlock Text="Document 1 content" />
        </TabViewItem>
    </TabView.TabItems>
</TabView>`,
        csharp: `private void Tabs_AddTabButtonClick(TabView sender, object args)
{
    sender.TabItems.Add(new TabViewItem
    {
        Header = "New document",
        IsClosable = true
    });
}`,
        html: `<div class="win-tab-view">
  <div class="win-tab-view__strip">
    <button class="win-tab-view__tab is-selected">Document 1</button>
  </div>
  <div class="win-tab-view__content">…</div>
</div>`
      },
      {
        title: "TabView with colored icons",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-tab-view" style="height:300px">
            <div class="win-tab-view__strip">
              <button class="win-tab-view__tab is-selected" data-tab="red"><span class="win-tab-view__tab-icon win-icon" style="color:#c42b1c">&#xE8A5;</span><span class="win-tab-view__tab-title">Red team</span><span class="win-tab-view__tab-close"><span class="win-icon">&#xE711;</span></span></button>
              <button class="win-tab-view__tab" data-tab="blue"><span class="win-tab-view__tab-icon win-icon" style="color:#005fb8">&#xE8A5;</span><span class="win-tab-view__tab-title">Blue team</span><span class="win-tab-view__tab-close"><span class="win-icon">&#xE711;</span></span></button>
              <button class="win-tab-view__tab" data-tab="green"><span class="win-tab-view__tab-icon win-icon" style="color:#0f7b0f">&#xE8A5;</span><span class="win-tab-view__tab-title">Green team</span><span class="win-tab-view__tab-close"><span class="win-icon">&#xE711;</span></span></button>
              <button class="win-tab-view__add" aria-label="New tab"><span class="win-icon">&#xE710;</span></button>
            </div>
            <div class="win-tab-view__content">
              <div class="win-tab-view__panel" data-tab-panel="red"><h3 class="win-subtitle" style="color:#c42b1c">Red team</h3></div>
              <div class="win-tab-view__panel" data-tab-panel="blue" hidden><h3 class="win-subtitle" style="color:#005fb8">Blue team</h3></div>
              <div class="win-tab-view__panel" data-tab-panel="green" hidden><h3 class="win-subtitle" style="color:#0f7b0f">Green team</h3></div>
            </div>
          </div>`,
        xaml: `<TabViewItem Header="Red team">
    <TabViewItem.IconSource>
        <FontIconSource Glyph="&#xE8A5;" Foreground="Red" />
    </TabViewItem.IconSource>
</TabViewItem>`,
        csharp: `// Set TabViewItem.IconSource to a colored FontIconSource.`,
        html: `<span class="win-tab-view__tab-icon" style="color:#c42b1c">…</span>`
      }
    ]
  }
});
