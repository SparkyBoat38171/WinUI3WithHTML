/* WinUI Gallery samples — Media */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  AnimatedVisualPlayer: {
    examples: [
      {
        title: "An animated visual",
        center: true,
        preview: `
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div class="win-animated-visual-player" id="lottieStage" style="max-width:360px">
              <div class="win-animated-visual-player__stage">
                <svg width="120" height="120" viewBox="0 0 120 120" aria-label="Animated checkmark">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="var(--win-accent)" stroke-width="5" stroke-dasharray="302" stroke-dashoffset="0" id="lottieCircle"/>
                  <path d="M36 61 L53 78 L87 42" fill="none" stroke="var(--win-accent)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" id="lottieCheck"/>
                </svg>
              </div>
              <div class="win-animated-visual-player__controls"><button class="win-animated-visual-player__button win-animated-visual-player__button--play" data-animated-visual-play="#lottieStage" aria-label="Play"><span class="win-icon">&#xE768;</span></button><button class="win-animated-visual-player__button" aria-label="Restart"><span class="win-icon">&#xE72C;</span></button></div>
            </div>
          </div>`,
        xaml: `<AnimatedVisualPlayer x:Name="Player" AutoPlay="False">
    <lottie:LottieVisualSource UriSource="ms-appx:///Assets/check.json" />
</AnimatedVisualPlayer>`,
        csharp: `await Player.PlayAsync(fromProgress: 0, toProgress: 1, looped: false);`,
        html: `<!-- CSS and SVG animations can replace Lottie visuals on the web. -->`
      }
    ]
  },

  Chart: {
    examples: [
      {
        title: "A line chart",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-chart" style="width:100%;max-width:800px">
            <div class="win-chart__header"><div><div class="win-chart__title">Weekly downloads</div><div class="win-chart__subtitle">Last 8 weeks · thousands</div></div><span class="win-info-badge">+18%</span></div>
            <div class="win-chart__canvas">
              <svg viewBox="0 0 760 240" preserveAspectRatio="none" role="img" aria-label="Line chart">
                <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--win-accent)" stop-opacity=".3"/><stop offset="1" stop-color="var(--win-accent)" stop-opacity="0"/></linearGradient></defs>
                <g class="win-chart__grid"><line x1="50" y1="20" x2="740" y2="20"/><line x1="50" y1="70" x2="740" y2="70"/><line x1="50" y1="120" x2="740" y2="120"/><line x1="50" y1="170" x2="740" y2="170"/></g>
                <g class="win-chart__axis-label"><text x="50" y="220">W1</text><text x="145" y="220">W2</text><text x="240" y="220">W3</text><text x="335" y="220">W4</text><text x="430" y="220">W5</text><text x="525" y="220">W6</text><text x="620" y="220">W7</text><text x="715" y="220">W8</text><text x="12" y="24">40</text><text x="12" y="74">30</text><text x="12" y="124">20</text><text x="12" y="174">10</text></g>
                <path d="M50 150 L145 120 L240 138 L335 92 L430 100 L525 58 L620 66 L715 32 L715 200 L50 200 Z" fill="url(#areaFill)"/>
                <path class="win-chart__line" d="M50 150 L145 120 L240 138 L335 92 L430 100 L525 58 L620 66 L715 32"/>
                ${[[50,150],[145,120],[240,138],[335,92],[430,100],[525,58],[620,66],[715,32]].map(([x,y]) => `<circle class="win-chart__point" cx="${x}" cy="${y}" r="4"/>`).join("")}
              </svg>
            </div>
            <div class="win-chart__legend"><span class="win-chart__legend-item"><span class="win-chart__legend-dot"></span>Downloads</span><span class="win-chart__legend-item"><span class="win-chart__legend-dot win-chart__legend-dot--alt"></span>Forecast</span></div>
          </div>`,
        xaml: `<charts:Chart>
    <charts:Chart.Series>
        <charts:LineSeries ItemsSource="{x:Bind Data}" />
    </charts:Chart.Series>
</charts:Chart>`,
        csharp: `// Chart is experimental. Configure axes, series, legends,
// labels, and markers through the Chart API.`,
        html: `<svg viewBox="0 0 760 240">
  <path class="win-chart__line" d="…"/>
</svg>`
      },
      {
        title: "A bar chart",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-chart" style="width:100%;max-width:800px">
            <div class="win-chart__header"><div><div class="win-chart__title">Samples by category</div><div class="win-chart__subtitle">Count of interactive samples</div></div></div>
            <div class="win-chart__canvas">
              <svg viewBox="0 0 760 240" role="img" aria-label="Bar chart">
                ${[["Input",14,120],["Collections",8,152],["Layout",11,128],["Nav",5,176],["Text",7,164],["Media",7,164]].map(([label,value,x], i) => `
                  <rect class="win-chart__bar" x="${55 + i * 115}" y="${190 - value * 8}" width="62" height="${value * 8}" rx="4"/>
                  <text class="win-chart__axis-label" x="${86 + i * 115}" y="212" text-anchor="middle">${label}</text>
                  <text class="win-chart__axis-label" x="${86 + i * 115}" y="${182 - value * 8}" text-anchor="middle">${value}</text>`).join("")}
              </svg>
            </div>
          </div>`,
        xaml: `<charts:BarSeries ItemsSource="{x:Bind Data}" />`,
        csharp: `// BarSeries supports category grouping and custom fills.`,
        html: `<rect class="win-chart__bar" x="…" width="62" height="…" />`
      }
    ]
  },

  Image: {
    examples: [
      {
        title: "An image with Uniform stretch",
        center: true,
        preview: `<img class="win-image" src="assets/SampleMedia/valley.jpg" alt="A green valley" style="width:400px;height:220px;object-fit:cover">`,
        xaml: `<Image Source="/Assets/SampleMedia/valley.jpg"
       Width="400" Height="220" Stretch="UniformToFill" />`,
        csharp: `// Stretch can be None, Fill, Uniform, or UniformToFill.`,
        html: `<img class="win-image" src="assets/SampleMedia/valley.jpg" alt="A green valley">`
      },
      {
        title: "Image gallery",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-image-grid" style="width:100%">
            ${["valley", "sunset", "rainier", "treetops", "grapes", "cliff"].map((name) => `<div class="win-image-tile"><img src="assets/SampleMedia/${name}.jpg" alt="${name}" loading="lazy"></div>`).join("")}
          </div>`,
        xaml: `<GridView ItemsSource="{x:Bind Photos}">
    <GridView.ItemTemplate>
        <DataTemplate>
            <Image Source="{Binding}" Stretch="UniformToFill" />
        </DataTemplate>
    </GridView.ItemTemplate>
</GridView>`,
        csharp: `// Image decoding happens on a background thread;
// set DecodePixelWidth to reduce memory for thumbnails.`,
        html: `<div class="win-image-grid">
  <div class="win-image-tile"><img src="…" alt=""></div>
</div>`
      }
    ]
  },

  InkCanvas: {
    examples: [
      {
        title: "Draw with an InkCanvas",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-ink" data-ink>
            <div class="win-ink-toolbar">
              <button class="win-ink-tool is-selected" data-ink-tool="pen" aria-label="Pen"><span class="win-icon">&#xE70F;</span></button>
              <button class="win-ink-tool" data-ink-tool="pencil" aria-label="Pencil"><span class="win-icon">&#xE76D;</span></button>
              <button class="win-ink-tool" data-ink-tool="highlighter" aria-label="Highlighter"><span class="win-icon">&#xE7E6;</span></button>
              <button class="win-ink-tool" data-ink-tool="eraser" aria-label="Eraser"><span class="win-icon">&#xE75C;</span></button>
              <div class="win-ink-swatches">
                <button class="win-ink-swatch is-selected" data-ink-color="#005fb8" style="--swatch:#005fb8" aria-label="Blue"></button>
                <button class="win-ink-swatch" data-ink-color="#c42b1c" style="--swatch:#c42b1c" aria-label="Red"></button>
                <button class="win-ink-swatch" data-ink-color="#0f7b0f" style="--swatch:#0f7b0f" aria-label="Green"></button>
                <button class="win-ink-swatch" data-ink-color="#c19c00" style="--swatch:#c19c00" aria-label="Gold"></button>
              </div>
              <button class="win-ink-tool" data-ink-undo aria-label="Undo"><span class="win-icon">&#xE7A7;</span></button>
              <button class="win-ink-tool" data-ink-clear aria-label="Clear"><span class="win-icon">&#xE74D;</span></button>
            </div>
            <canvas class="win-ink-canvas"></canvas>
            <div class="win-ink-footer"><span>Draw with a mouse, pen or touch.</span><input class="win-slider win-ink-size" type="range" min="1" max="20" value="3" data-ink-size aria-label="Stroke size"></div>
          </div>`,
        xaml: `<InkCanvas x:Name="InkCanvas1">
    <InkCanvas.InkPresenter>
        <InkPresenter InputDeviceTypes="Pen, Mouse, Touch" />
    </InkCanvas.InkPresenter>
</InkCanvas>`,
        csharp: `private void Clear_Click(object sender, RoutedEventArgs e)
{
    InkCanvas1.InkPresenter.StrokeContainer.Clear();
}`,
        html: `<canvas class="win-ink-canvas"></canvas>`
      },
      {
        title: "Customize an InkToolbar",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-ink" data-ink>
            <div class="win-ink-toolbar" style="gap:8px">
              <span class="win-caption win-text-secondary">InkToolbar</span>
              <button class="win-ink-tool is-selected" data-ink-tool="pen"><span class="win-icon">&#xE70F;</span></button>
              <button class="win-ink-tool" data-ink-tool="highlighter" style="color:#c19c00"><span class="win-icon">&#xE7E6;</span></button>
              <button class="win-ink-tool" data-ink-tool="eraser"><span class="win-icon">&#xE75C;</span></button>
              <button class="win-ink-tool" data-ink-clear><span class="win-icon">&#xE74D;</span></button>
            </div>
            <canvas class="win-ink-canvas" style="height:220px"></canvas>
          </div>`,
        xaml: `<InkToolbar TargetInkCanvas="{x:Bind InkCanvas1}">
    <InkToolbarPenButton />
    <InkToolbarHighlighterButton />
    <InkToolbarEraserButton />
</InkToolbar>`,
        csharp: `// InkToolbar can be bound to an InkCanvas with TargetInkCanvas.
// Choose which built-in tools are available.`,
        html: `<div class="win-ink-toolbar">…</div>`
      }
    ]
  },

  MediaPlayerElement: {
    examples: [
      {
        title: "A media player",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-media-player" data-media-player style="border-radius:0">
            <img class="win-media-player__poster" src="assets/SampleMedia/rainier.jpg" alt="Mountain landscape">
            <div class="win-media-player__overlay"><button class="win-media-player__big-play" aria-label="Play"><span class="win-icon">&#xE768;</span></button></div>
            <div class="win-media-player__controls">
              <button class="win-media-player__button" data-media-play aria-label="Play or pause"><span class="win-icon">&#xE768;</span></button>
              <div class="win-media-player__timeline"><span class="win-media-player__time" data-media-time>0:00 / 2:38</span><div class="win-media-player__progress" style="--progress:0%"><div class="win-media-player__progress-fill"></div></div></div>
              <button class="win-media-player__button" aria-label="Mute"><span class="win-icon">&#xE74F;</span></button>
              <button class="win-media-player__button" aria-label="Full screen"><span class="win-icon">&#xE740;</span></button>
            </div>
          </div>`,
        xaml: `<MediaPlayerElement Source="/Assets/SampleMedia/rainier.mp4"
                  AreTransportControlsEnabled="True"
                  AutoPlay="False" />`,
        csharp: `private void Play_Click(object sender, RoutedEventArgs e)
{
    MediaPlayer.IsPlaying = true;
}`,
        html: `<div class="win-media-player" data-media-player>
  <video src="…" poster="…"></video>
  <div class="win-media-player__controls">…</div>
</div>`
      },
      {
        title: "Autoplay video",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-media-player" data-media-player style="border-radius:0">
            <img class="win-media-player__poster" src="assets/SampleMedia/sunset.jpg" alt="Sunset">
            <div class="win-media-player__overlay"><button class="win-media-player__big-play" aria-label="Play"><span class="win-icon">&#xE768;</span></button></div>
            <div class="win-media-player__controls"><button class="win-media-player__button" data-media-play aria-label="Play or pause"><span class="win-icon">&#xE768;</span></button><span class="win-media-player__time" data-media-time>0:00 / 1:42</span><div class="win-media-player__progress"><div class="win-media-player__progress-fill"></div></div><button class="win-media-player__button" aria-label="Mute"><span class="win-icon">&#xE74F;</span></button></div>
          </div>`,
        xaml: `<MediaPlayerElement AutoPlay="True" AreTransportControlsEnabled="True" />`,
        csharp: `// Browsers require user activation before autoplaying media with sound.
// Muted autoplay is broadly supported.`,
        html: `<video autoplay muted playsinline>…</video>`
      }
    ]
  },

  PersonPicture: {
    examples: [
      {
        title: "A PersonPicture",
        center: true,
        preview: `
          <div style="display:flex;align-items:center;gap:20px">
            <div class="win-person-picture">AM</div>
            <div class="win-person-picture win-person-picture--large">JK<span class="win-person-picture__badge"><span class="win-icon">&#xE73E;</span></span></div>
            <div class="win-person-picture win-person-picture--xlarge">WS<span class="win-person-picture__presence"></span></div>
          </div>`,
        xaml: `<PersonPicture DisplayName="Alex Morgan"
               ProfilePicture="/Assets/avatar.png"
               Initials="AM" />`,
        csharp: `// If no image is available, PersonPicture shows initials,
// then a person glyph.`,
        html: `<div class="win-person-picture">AM</div>`
      },
      {
        title: "PersonPicture sizes",
        center: true,
        preview: `
          <div style="display:flex;align-items:center;gap:16px">
            <div class="win-person-picture win-person-picture--small">S</div>
            <div class="win-person-picture">M</div>
            <div class="win-person-picture win-person-picture--large">L</div>
            <div class="win-person-picture win-person-picture--xlarge">XL</div>
          </div>`,
        xaml: `<PersonPicture Width="32" Height="32" />
<PersonPicture Width="48" Height="48" />
<PersonPicture Width="64" Height="64" />
<PersonPicture Width="96" Height="96" />`,
        csharp: `// Set Width and Height to scale PersonPicture.`,
        html: `<div class="win-person-picture win-person-picture--large">L</div>`
      },
      {
        title: "Avatar group",
        center: true,
        preview: `
          <div style="display:flex;align-items:center;gap:16px">
            <div class="win-person-picture-group">
              <div class="win-person-picture">AM</div>
              <div class="win-person-picture" style="background:linear-gradient(135deg,#0078d4,#00b7c3)">SK</div>
              <div class="win-person-picture" style="background:linear-gradient(135deg,#ca5010,#e3008c)">LM</div>
              <div class="win-person-picture" style="background:var(--win-control-bg-secondary);color:var(--win-text-secondary)">+4</div>
            </div>
            <span class="win-caption win-text-secondary">7 members</span>
          </div>`,
        xaml: `<StackPanel Orientation="Horizontal" Spacing="-8">
    <PersonPicture Width="32" Height="32" />
    <PersonPicture Width="32" Height="32" />
</StackPanel>`,
        csharp: `// Overlap avatars by using negative spacing.`,
        html: `<div class="win-person-picture-group">…</div>`
      }
    ]
  },

  Sound: {
    examples: [
      {
        title: "Play a UI sound",
        center: true,
        preview: `
          <button class="win-button win-button--accent" data-play-sound data-frequency="660"><span class="win-icon">&#xE767;</span>Play sound</button>
          <button class="win-button" data-play-sound data-frequency="880">Notification</button>
          <p class="win-caption win-text-secondary" style="flex-basis:100%;text-align:center;margin-top:8px">A short tone is generated with the Web Audio API.</p>`,
        xaml: `<Button Content="Play sound" Click="PlaySound_Click" />`,
        csharp: `private void PlaySound_Click(object sender, RoutedEventArgs e)
{
    ElementSoundPlayer.Play(ElementSoundKind.Invoke);
}`,
        html: `// Web Audio API
const ctx = new AudioContext();
const osc = ctx.createOscillator();
osc.connect(ctx.destination);
osc.start();`
      }
    ]
  }
});
