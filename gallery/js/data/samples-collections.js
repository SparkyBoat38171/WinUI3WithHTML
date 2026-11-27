/* WinUI Gallery samples — Collections */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

const galleryPhotos = [
  { title: "Valley", src: "assets/SampleMedia/valley.jpg" },
  { title: "Sunset", src: "assets/SampleMedia/sunset.jpg" },
  { title: "Rainier", src: "assets/SampleMedia/rainier.jpg" },
  { title: "Treetops", src: "assets/SampleMedia/treetops.jpg" }
];

Object.assign(window.GALLERY_SAMPLES, {
  FlipView: {
    examples: [
      {
        title: "A simple FlipView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-flip-view" style="width:100%;max-width:720px" id="flipMain">
            <div class="win-flip-view__viewport"><div class="win-flip-view__track">
              ${galleryPhotos.map((p) => `<div class="win-flip-view__page" style="background-image:url('${p.src}')"><div class="win-flip-view__caption">${p.title}</div></div>`).join("")}
            </div></div>
            <button class="win-flip-view__nav win-flip-view__nav--prev" aria-label="Previous"><span class="win-icon">&#xE76B;</span></button>
            <button class="win-flip-view__nav win-flip-view__nav--next" aria-label="Next"><span class="win-icon">&#xE76C;</span></button>
            <div class="win-flip-view__dots"></div>
          </div>
          <p class="win-caption win-text-secondary">Use the arrows or page dots to flip through the collection.</p>`,
        xaml: `<FlipView x:Name="FlipView1">
    <FlipView.Items>
        <Image Source="/Assets/SampleMedia/valley.jpg" />
        <Image Source="/Assets/SampleMedia/sunset.jpg" />
        <Image Source="/Assets/SampleMedia/rainier.jpg" />
    </FlipView.Items>
</FlipView>`,
        csharp: `private void FlipView_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (sender is FlipView flipView)
    {
        CurrentPage.Text = $"Page {flipView.SelectedIndex + 1} of {flipView.Items.Count}";
    }
}`,
        html: `<div class="win-flip-view" id="flipMain">
  <div class="win-flip-view__viewport">
    <div class="win-flip-view__track">…pages…</div>
  </div>
  <button class="win-flip-view__nav win-flip-view__nav--prev">‹</button>
  <button class="win-flip-view__nav win-flip-view__nav--next">›</button>
  <div class="win-flip-view__dots"></div>
</div>`
      },
      {
        title: "FlipView integrated with PipsPager",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-flip-view" style="width:100%;max-width:640px" id="flipPips">
            <div class="win-flip-view__viewport"><div class="win-flip-view__track">
              <div class="win-flip-view__page" style="background-image:url('assets/SampleMedia/grapes.jpg')"><div class="win-flip-view__caption">Grapes</div></div>
              <div class="win-flip-view__page" style="background-image:url('assets/SampleMedia/cliff.jpg')"><div class="win-flip-view__caption">Cliff</div></div>
              <div class="win-flip-view__page" style="background-image:url('assets/SampleMedia/LandscapeImage1.jpg')"><div class="win-flip-view__caption">Landscape</div></div>
            </div></div>
          </div>
          <div class="win-pips-pager" data-flip-target="flipPips">
            <button class="win-pips-pager__nav" data-dir="prev" aria-label="Previous"><span class="win-icon">&#xE76B;</span></button>
            <div class="win-pips-pager__pips"><button class="win-pip is-selected" data-index="0"></button><button class="win-pip" data-index="1"></button><button class="win-pip" data-index="2"></button></div>
            <button class="win-pips-pager__nav" data-dir="next" aria-label="Next"><span class="win-icon">&#xE76C;</span></button>
          </div>`,
        xaml: `<FlipView x:Name="Gallery" />
<PipsPager x:Name="Pager" NumberOfPages="3" />`,
        csharp: `Pager.SelectedPageIndexChanged += (s, e) =>
{
    Gallery.SelectedIndex = Pager.SelectedPageIndex;
};`,
        html: `<div class="win-pips-pager" data-flip-target="flipPips">…</div>`
      }
    ]
  },

  GridView: {
    examples: [
      {
        title: "A basic GridView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-grid-view" style="width:100%" data-selectable data-no-auto-select>
            ${["Getting started", "Design", "Controls", "Motion", "Typography", "Accessibility"].map((title, index) => `
              <div class="win-grid-item ${index === 0 ? "is-selected" : ""}" role="option" aria-selected="${index === 0}">
                <div class="win-grid-item__visual"><span class="win-icon">${{0:"&#xE8A5;",1:"&#xE790;",2:"&#xE8B3;",3:"&#xE945;",4:"&#xE8D2;",5:"&#xE776;"}[index]}</span></div>
                <div class="win-grid-item__title">${title}</div>
                <div class="win-grid-item__subtitle">Sample collection</div>
              </div>`).join("")}
          </div>`,
        xaml: `<GridView x:Name="GridView1" SelectionMode="Single" IsItemClickEnabled="True">
    <GridView.ItemTemplate>
        <DataTemplate>
            <StackPanel Width="160" Height="120">
                <FontIcon Glyph="&#xE8A5;" FontSize="32" />
                <TextBlock Text="{Binding Title}" />
            </StackPanel>
        </DataTemplate>
    </GridView.ItemTemplate>
</GridView>`,
        csharp: `private void GridView_ItemClick(object sender, ItemClickEventArgs e)
{
    Frame.Navigate(typeof(ItemPage), e.ClickedItem);
}`,
        html: `<div class="win-grid-view">
  <div class="win-grid-item is-selected">
    <div class="win-grid-item__visual">…</div>
    <div class="win-grid-item__title">Getting started</div>
  </div>
</div>`
      },
      {
        title: "GridView with images",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-grid-view" style="width:100%;grid-template-columns:repeat(auto-fill,minmax(130px,1fr))" data-selectable>
            ${["valley", "sunset", "rainier", "treetops"].map((name, index) => `
              <div class="win-grid-item ${index === 0 ? "is-selected" : ""}" aria-selected="${index === 0}" style="padding:6px;gap:4px">
                <img src="assets/SampleMedia/${name}.jpg" alt="${name}" style="width:100%;height:88px;object-fit:cover;border-radius:4px">
                <div class="win-grid-item__title">${name[0].toUpperCase() + name.slice(1)}</div>
              </div>`).join("")}
          </div>`,
        xaml: `<GridView ItemsSource="{x:Bind Photos}" SelectionMode="Multiple">
    <GridView.ItemTemplate>
        <DataTemplate x:DataType="local:Photo">
            <Grid Width="150" Height="110">
                <Image Source="{x:Bind Image}" Stretch="UniformToFill" />
            </Grid>
        </DataTemplate>
    </GridView.ItemTemplate>
</GridView>`,
        csharp: `// Set IsItemClickEnabled for navigation,
// or leave SelectionMode enabled for selection scenarios.`,
        html: `<div class="win-grid-view"><img src="…" alt="…"></div>`
      }
    ]
  },

  ItemsRepeater: {
    examples: [
      {
        title: "A basic ItemsRepeater",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-items-repeater" style="width:100%">
            ${Array.from({ length: 24 }, (_, i) => `<div class="win-items-repeater__item">Item ${i + 1}</div>`).join("")}
          </div>`,
        xaml: `<ItemsRepeater ItemsSource="{x:Bind Items}">
    <ItemsRepeater.Layout>
        <StackLayout Orientation="Vertical" Spacing="4" />
    </ItemsRepeater.Layout>
    <ItemsRepeater.ItemTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding}" />
        </DataTemplate>
    </ItemsRepeater.ItemTemplate>
</ItemsRepeater>`,
        csharp: `// ItemsRepeater is a primitive control for data-driven layouts.
// It has no built-in selection or scrolling.`,
        html: `<div class="win-items-repeater">
  <div class="win-items-repeater__item">Item 1</div>
</div>`
      },
      {
        title: "FlowLayout with virtualization",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-items-repeater" style="width:100%;max-height:280px">
            ${Array.from({ length: 80 }, (_, i) => `<div class="win-items-repeater__item" style="width:${60 + (i % 4) * 18}px">${i + 1}</div>`).join("")}
          </div>
          <p class="win-caption win-text-secondary">FlowLayout wraps items into rows and virtualizes content.</p>`,
        xaml: `<ScrollViewer>
    <ItemsRepeater ItemsSource="{x:Bind Items}">
        <ItemsRepeater.Layout>
            <FlowLayout MinItemWidth="72" MinColumnSpacing="8" MinRowSpacing="8" />
        </ItemsRepeater.Layout>
    </ItemsRepeater>
</ScrollViewer>`,
        csharp: `// FlowLayout is available in the Community Toolkit.
// Use it for wrapping, virtualized collections.`,
        html: `<div class="win-items-repeater">…</div>`
      }
    ]
  },

  ItemsView: {
    examples: [
      {
        title: "A basic ItemsView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-items-view" style="width:100%" data-selectable>
            ${["Design", "Controls", "Motion", "Media", "Data", "Accessibility"].map((label, i) => `
              <div class="win-items-view__item ${i === 0 ? "is-selected" : ""}" aria-selected="${i === 0}">
                <div class="win-items-view__visual"><span class="win-icon">${{0:"&#xE790;",1:"&#xE8B3;",2:"&#xE945;",3:"&#xE714;",4:"&#xE8FD;",5:"&#xE776;"}[i]}</span></div>
                <div class="win-items-view__label">${label}</div>
              </div>`).join("")}
          </div>`,
        xaml: `<ItemsView ItemsSource="{x:Bind Items}" SelectionMode="Single">
    <ItemsView.ItemTemplate>
        <DataTemplate>
            <ItemContainer>
                <StackPanel>
                    <FontIcon Glyph="&#xE8B3;" />
                    <TextBlock Text="{Binding Title}" />
                </StackPanel>
            </ItemContainer>
        </DataTemplate>
    </ItemsView.ItemTemplate>
</ItemsView>`,
        csharp: `private void ItemsView_SelectionChanged(ItemsView sender, ItemsViewSelectionChangedEventArgs args)
{
    SelectedCount.Text = $"Selected {sender.SelectedItems.Count} item(s)";
}`,
        html: `<div class="win-items-view">
  <div class="win-items-view__item is-selected">Design</div>
</div>`
      },
      {
        title: "Swappable layouts",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;gap:8px;align-items:center">
            <span class="win-caption win-text-secondary">Layout</span>
            <div class="win-selector-bar" id="itemsLayoutBar">
              <button class="win-selector-bar__item is-selected" data-items-layout="grid">Grid</button>
              <button class="win-selector-bar__item" data-items-layout="list">List</button>
            </div>
          </div>
          <div class="win-items-view" id="itemsLayoutView" style="width:100%" data-selectable>
            ${["One", "Two", "Three", "Four", "Five", "Six"].map((label, i) => `<div class="win-items-view__item ${i === 0 ? "is-selected" : ""}"><div class="win-items-view__visual"><span class="win-icon">&#xE8B3;</span></div><div class="win-items-view__label">${label}</div></div>`).join("")}
          </div>`,
        xaml: `<ItemsView x:Name="ItemsViewControl" ItemsSource="{x:Bind Items}">
    <ItemsView.Layout>
        <LinedFlowLayout />
    </ItemsView.Layout>
</ItemsView>`,
        csharp: `private void Grid_Click(object sender, RoutedEventArgs e)
{
    ItemsViewControl.Layout = new UniformGridLayout();
}

private void List_Click(object sender, RoutedEventArgs e)
{
    ItemsViewControl.Layout = new StackLayout();
}`,
        html: `<div class="win-items-view" id="itemsLayoutView">…</div>`
      }
    ]
  },

  ListView: {
    examples: [
      {
        title: "A basic ListView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-list-view" style="width:100%;height:300px" data-selectable>
            ${["Getting started", "Design system", "Layouts", "Motion", "Accessibility", "Packaging"].map((title, i) => `
              <div class="win-list-item ${i === 0 ? "is-selected" : ""}" aria-selected="${i === 0}">
                <span class="win-list-item__icon">&#xE8A5;</span>
                <div class="win-list-item__body"><div class="win-list-item__title">${title}</div><div class="win-list-item__subtitle">Sample ${i + 1} · 4 min read</div></div>
                <span class="win-list-item__meta">${i + 2} min</span>
              </div>`).join("")}
          </div>`,
        xaml: `<ListView x:Name="ListView1" SelectionMode="Single" IsItemClickEnabled="True">
    <ListView.ItemTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="12">
                <FontIcon Glyph="&#xE8A5;" />
                <TextBlock Text="{Binding Title}" />
            </StackPanel>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>`,
        csharp: `private void ListView_ItemClick(object sender, ItemClickEventArgs e)
{
    Frame.Navigate(typeof(ItemPage), e.ClickedItem);
}`,
        html: `<div class="win-list-view">
  <div class="win-list-item is-selected">
    <span class="win-list-item__icon">&#xE8A5;</span>
    <div class="win-list-item__body">Getting started</div>
  </div>
</div>`
      },
      {
        title: "Grouped ListView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-list-view" style="width:100%;height:340px" data-selectable>
            <div class="win-list-view__group">Design</div>
            <div class="win-list-item"><span class="win-list-item__icon">&#xE790;</span><div class="win-list-item__body"><div class="win-list-item__title">Color</div></div></div>
            <div class="win-list-item"><span class="win-list-item__icon">&#xE8D2;</span><div class="win-list-item__body"><div class="win-list-item__title">Typography</div></div></div>
            <div class="win-list-view__group">Controls</div>
            <div class="win-list-item"><span class="win-list-item__icon">&#xE8D2;</span><div class="win-list-item__body"><div class="win-list-item__title">Button</div></div></div>
            <div class="win-list-item"><span class="win-list-item__icon">&#xE8FD;</span><div class="win-list-item__body"><div class="win-list-item__title">ListView</div></div></div>
            <div class="win-list-view__group">Motion</div>
            <div class="win-list-item"><span class="win-list-item__icon">&#xE945;</span><div class="win-list-item__body"><div class="win-list-item__title">Connected animation</div></div></div>
          </div>`,
        xaml: `<ListView ItemsSource="{x:Bind GroupedItems}">
    <ListView.GroupStyle>
        <GroupStyle>
            <GroupStyle.HeaderTemplate>
                <DataTemplate><TextBlock Text="{Binding Key}" /></DataTemplate>
            </GroupStyle.HeaderTemplate>
        </GroupStyle>
    </ListView.GroupStyle>
</ListView>`,
        csharp: `// Use a CollectionViewSource with IsSourceGrouped="True"
// to supply grouped ListView data.`,
        html: `<div class="win-list-view">
  <div class="win-list-view__group">Design</div>
  <div class="win-list-item">Color</div>
</div>`
      },
      {
        title: "ListView with images",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-list-view" style="width:100%;height:260px" data-selectable>
            ${["valley", "sunset", "rainier"].map((name, i) => `
              <div class="win-list-item ${i === 0 ? "is-selected" : ""}" style="min-height:64px">
                <img src="assets/SampleMedia/${name}.jpg" alt="${name}" style="width:48px;height:48px;object-fit:cover;border-radius:4px">
                <div class="win-list-item__body"><div class="win-list-item__title">${name[0].toUpperCase() + name.slice(1)}</div><div class="win-list-item__subtitle">Landscape photograph</div></div>
              </div>`).join("")}
          </div>`,
        xaml: `<ListView>
    <ListView.ItemTemplate>
        <DataTemplate>
            <Grid ColumnSpacing="12">
                <Image Width="48" Height="48" Source="{Binding Image}" Stretch="UniformToFill" />
                <TextBlock Grid.Column="1" Text="{Binding Title}" />
            </Grid>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>`,
        csharp: `// Use x:Bind in a strongly typed DataTemplate for best performance.`,
        html: `<div class="win-list-item"><img src="…" alt=""></div>`
      }
    ]
  },

  PullToRefresh: {
    examples: [
      {
        title: "A basic PullToRefresh",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-pull-to-refresh" style="width:100%;max-width:560px">
            <div class="win-pull-to-refresh__indicator"><span class="win-icon">&#xE72C;</span></div>
            <div class="win-pull-to-refresh__content">
              <div class="win-list-view win-list-view--borderless" data-selectable>
                ${["Inbox", "Starred", "Sent", "Drafts", "Archive"].map((t, i) => `<div class="win-list-item ${i === 0 ? "is-selected" : ""}"><span class="win-list-item__icon">&#xE715;</span><div class="win-list-item__body"><div class="win-list-item__title">${t}</div><div class="win-list-item__subtitle">Pull down to refresh</div></div></div>`).join("")}
              </div>
            </div>
          </div>
          <p class="win-caption win-text-secondary">Pull down on the content, or use the button below.</p>
          <button class="win-button" data-refresh><span class="win-icon">&#xE72C;</span>Refresh</button>`,
        xaml: `<RefreshContainer PullRequested="RefreshContainer_PullRequested">
    <ListView ItemsSource="{x:Bind Items}" />
</RefreshContainer>`,
        csharp: `private async void RefreshContainer_PullRequested(
    RefreshContainer sender, RefreshRequestedEventArgs args)
{
    using var deferral = args.GetDeferral();
    await LoadItemsAsync();
    deferral.Complete();
}`,
        html: `<div class="win-pull-to-refresh">
  <div class="win-pull-to-refresh__indicator">↻</div>
  <div class="win-pull-to-refresh__content">…</div>
</div>`
      }
    ]
  },

  TableView: {
    examples: [
      {
        title: "A basic table",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-table-view" style="width:100%">
            <table class="win-table">
              <thead><tr><th data-sort>Control <span class="win-table__sort"></span></th><th data-sort>Group <span class="win-table__sort"></span></th><th data-sort>Introduced <span class="win-table__sort"></span></th><th class="win-table__cell--numeric">Samples <span class="win-table__sort"></span></th></tr></thead>
              <tbody>
                <tr><td>Button</td><td>Basic input</td><td>WinUI 3</td><td class="win-table__cell--numeric">4</td></tr>
                <tr><td>NavigationView</td><td>Navigation</td><td>WinUI 2.0</td><td class="win-table__cell--numeric">2</td></tr>
                <tr><td>TabView</td><td>Navigation</td><td>WinUI 2.8</td><td class="win-table__cell--numeric">3</td></tr>
                <tr><td>InfoBar</td><td>Status</td><td>WinUI 2.5</td><td class="win-table__cell--numeric">2</td></tr>
              </tbody>
            </table>
          </div>
          <p class="win-caption win-text-secondary">Click a column header to sort. Rows support selection.</p>`,
        xaml: `<TableView ItemsSource="{x:Bind Items}">
    <TableView.Columns>
        <TableViewTextColumn Header="Control" Binding="{Binding Title}" />
        <TableViewTextColumn Header="Group" Binding="{Binding Group}" />
    </TableView.Columns>
</TableView>`,
        csharp: `// TableView is a preview control for virtualized tabular data.
// Enable editing with TableViewCell edit templates.`,
        html: `<div class="win-table-view">
  <table class="win-table">…</table>
</div>`
      },
      {
        title: "Editable cells",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-table-view" style="width:100%">
            <table class="win-table">
              <thead><tr><th>Name</th><th>Status</th><th>Owner</th></tr></thead>
              <tbody>
                <tr><td><input class="win-textbox" value="Design review" aria-label="Name"></td><td><span class="win-info-badge win-info-badge--success">Active</span></td><td>Alex</td></tr>
                <tr><td><input class="win-textbox" value="API proposal" aria-label="Name"></td><td><span class="win-info-badge win-info-badge--caution">Draft</span></td><td>Sam</td></tr>
                <tr><td><input class="win-textbox" value="Ship 3.0" aria-label="Name"></td><td><span class="win-info-badge">Queued</span></td><td>Jordan</td></tr>
              </tbody>
            </table>
          </div>`,
        xaml: `<TableView IsEditingEnabled="True">
    <TableView.Columns>
        <TableViewTextColumn Header="Name" Binding="{Binding Name}" />
    </TableView.Columns>
</TableView>`,
        csharp: `// TableView supports inline editing and custom cell templates.`,
        html: `<table class="win-table"><td><input class="win-textbox"></td></table>`
      }
    ]
  },

  TreeView: {
    examples: [
      {
        title: "A simple TreeView",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-tree-view" style="width:100%;max-width:520px">
            <div class="win-tree-item" aria-expanded="true"><button class="win-tree-item__chevron"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE8B7;</span><span class="win-tree-item__label">Documents</span></div>
            <div class="win-tree-children is-open">
              <div class="win-tree-item" style="padding-left:20px"><button class="win-tree-item__chevron" aria-hidden="true"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE8A5;</span><span class="win-tree-item__label">Report.docx</span></div>
              <div class="win-tree-item" style="padding-left:20px"><button class="win-tree-item__chevron" aria-hidden="true"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE8A5;</span><span class="win-tree-item__label">Budget.xlsx</span></div>
            </div>
            <div class="win-tree-item" aria-expanded="true"><button class="win-tree-item__chevron"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE8B7;</span><span class="win-tree-item__label">Pictures</span></div>
            <div class="win-tree-children is-open">
              <div class="win-tree-item" style="padding-left:20px"><button class="win-tree-item__chevron" aria-hidden="true"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE91B;</span><span class="win-tree-item__label">valley.jpg</span></div>
              <div class="win-tree-item" style="padding-left:20px"><button class="win-tree-item__chevron" aria-hidden="true"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE91B;</span><span class="win-tree-item__label">sunset.jpg</span></div>
            </div>
          </div>`,
        xaml: `<TreeView x:Name="TreeView1">
    <TreeView.RootNodes>
        <TreeViewNode Content="Documents" IsExpanded="True">
            <TreeViewNode Content="Report.docx" />
            <TreeViewNode Content="Budget.xlsx" />
        </TreeViewNode>
    </TreeView.RootNodes>
</TreeView>`,
        csharp: `private void TreeView_ItemInvoked(TreeView sender, TreeViewItemInvokedEventArgs args)
{
    var node = args.InvokedItem as TreeViewNode;
    SelectedNode.Text = node?.Content?.ToString();
}`,
        html: `<div class="win-tree-view">
  <div class="win-tree-item" aria-expanded="true">
    <button class="win-tree-item__chevron">›</button>
    <span class="win-tree-item__label">Documents</span>
  </div>
  <div class="win-tree-children is-open">…</div>
</div>`
      },
      {
        title: "TreeView with multiple selection",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-tree-view" style="width:100%;max-width:520px">
            ${["Design", "Controls", "Motion", "Accessibility"].map((label, i) => `<div class="win-tree-item ${i === 1 || i === 2 ? "is-selected" : ""}"><button class="win-tree-item__chevron" aria-hidden="true"><span class="win-icon">&#xE76C;</span></button><span class="win-tree-item__icon">&#xE8B7;</span><span class="win-tree-item__label">${label}</span><span class="win-checkbox" style="margin-left:auto;min-height:0;padding:0"><input type="checkbox" ${i === 1 || i === 2 ? "checked" : ""}><span class="win-checkbox__box"></span></span></div>`).join("")}
          </div>
          <p class="win-caption win-text-secondary">SelectionMode="Multiple" enables check boxes and ranged selection.</p>`,
        xaml: `<TreeView SelectionMode="Multiple" />
<!-- TreeView also supports drag and drop reordering. -->`,
        csharp: `// Set CanReorderItems and AllowDrop for drag-and-drop reordering.`,
        html: `<div class="win-tree-view">…check boxes…</div>`
      }
    ]
  }
});
