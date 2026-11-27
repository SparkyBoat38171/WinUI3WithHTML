/* WinUI Gallery samples — Motion */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  XamlCompInterop: {
    examples: [
      {
        title: "Natural motion with expression animation",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-transition-stage" style="height:260px;display:flex;align-items:center;justify-content:center" id="interopStage">
            <div id="interopBall" style="width:56px;height:56px;border-radius:50%;background:var(--win-accent);box-shadow:0 8px 16px rgba(0,0,0,.25);transition:transform 400ms var(--win-ease-decelerate)"></div>
          </div>
          <div style="display:flex;gap:8px"><button class="win-button" data-interop-move="left">Move left</button><button class="win-button" data-interop-move="right">Move right</button><button class="win-button" data-interop-move="center">Center</button></div>`,
        xaml: `<Border x:Name="Ball" Width="56" Height="56" CornerRadius="28"
        Background="{ThemeResource AccentFillColorDefaultBrush}" />`,
        csharp: `var animation = compositor.CreateVector3KeyFrameAnimation();
animation.InsertKeyFrame(1f, new Vector3(240, 0, 0));
animation.Duration = TimeSpan.FromMilliseconds(400);
Ball.StartAnimation("Offset", animation);`,
        html: `<div id="interopBall" style="transition:transform 400ms cubic-bezier(.1,.9,.2,1)"></div>`
      }
    ]
  },

  ConnectedAnimation: {
    examples: [
      {
        title: "A connected animation",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-connected-stage" style="width:100%">
            ${["valley", "sunset", "rainier"].map((name) => `<div class="win-connected-card" data-connected-image="assets/SampleMedia/${name}.jpg" style="background-image:url('assets/SampleMedia/${name}.jpg')" tabindex="0" role="button" aria-label="Open ${name}"></div>`).join("")}
          </div>
          <p class="win-caption win-text-secondary">Click a thumbnail to open it with a connected animation.</p>`,
        xaml: `<ConnectedAnimationService.GetForCurrentView()
    .PrepareToAnimate("ForwardConnectedAnimation", SourceElement);`,
        csharp: `var animation = ConnectedAnimationService.GetForCurrentView()
    .GetAnimation("ForwardConnectedAnimation");
animation.TryStart(DestinationElement);`,
        html: `// Use the View Transitions API or animate a fixed element's bounds.`
      }
    ]
  },

  EasingFunction: {
    examples: [
      {
        title: "Easing functions",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          ${[
            ["Decelerate", "cubic-bezier(0.1, 0.9, 0.2, 1)", "var(--win-accent)"],
            ["Accelerate", "cubic-bezier(0.7, 0, 1, 0.5)", "#8764b8"],
            ["Standard", "cubic-bezier(0.8, 0, 0.2, 1)", "#c239b3"]
          ].map(([name, easing, color]) => `
            <div class="win-easing-demo" data-easing-demo data-easing="${easing}" style="width:100%;max-width:640px">
              <div style="display:flex;justify-content:space-between;align-items:center"><span class="win-caption">${name}</span><button class="win-button win-button--small" data-run-easing>Play</button></div>
              <div class="win-easing-demo-track"><div class="win-easing-demo-dot" style="background:${color}"></div></div>
            </div>`).join("")}
          <p class="demo-note">Fluent motion uses different curves for entering, moving, and exiting elements.</p>`,
        xaml: `<DoubleAnimation Duration="0:0:0.4" To="1">
    <DoubleAnimation.EasingFunction>
        <ExponentialEase EasingMode="EaseOut" Exponent="4" />
    </DoubleAnimation.EasingFunction>
</DoubleAnimation>`,
        csharp: `// Use EaseOut for entrances, EaseIn for exits,
// and EaseInOut for elements that remain on screen.`,
        html: `<div style="transition:transform 400ms cubic-bezier(.1,.9,.2,1)">…</div>`
      }
    ]
  },

  ImplicitTransition: {
    examples: [
      {
        title: "Implicit show and hide animations",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;gap:8px">
            <button class="win-button" data-implicit-add>Add card</button>
            <button class="win-button" data-implicit-clear>Clear</button>
          </div>
          <div class="win-stagger" data-implicit-stage style="display:flex;flex-wrap:wrap;gap:8px;width:100%">
            <div class="win-card" style="padding:16px 24px">Card 1</div>
            <div class="win-card" style="padding:16px 24px">Card 2</div>
          </div>`,
        xaml: `<Grid>
    <Grid.ChildrenTransitions>
        <TransitionCollection>
            <EntranceThemeTransition FromVerticalOffset="24" />
        </TransitionCollection>
    </Grid.ChildrenTransitions>
</Grid>`,
        csharp: `// Implicit animations run automatically when a property changes.
// EntranceThemeTransition animates newly added children.`,
        html: `<div class="win-stagger">…</div>`
      }
    ]
  },

  PageTransition: {
    examples: [
      {
        title: "Page transitions",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="win-button" data-page-transition="slide">Slide</button>
            <button class="win-button" data-page-transition="fade">Fade</button>
            <button class="win-button" data-page-transition="scale">Scale</button>
          </div>
          <div class="win-transition-stage" style="width:100%;height:220px" id="pageTransitionStage">
            <div class="win-transition-page" data-page-transition-page><span class="win-icon">&#xE8A5;</span><div class="win-subtitle">Page one</div><div class="win-caption win-text-secondary">Choose a transition</div></div>
          </div>`,
        xaml: `<Frame Navigate="Frame_Navigate">
    <Frame.NavigationTransitionInfo>
        <SlideNavigationTransitionInfo Effect="FromRight" />
    </Frame.NavigationTransitionInfo>
</Frame>`,
        csharp: `Frame.Navigate(typeof(SecondPage), null,
    new SlideNavigationTransitionInfo
    {
        Effect = SlideNavigationTransitionEffect.FromRight
    });`,
        html: `<div class="win-transition-page is-entering">…</div>`
      }
    ]
  },

  ThemeTransition: {
    examples: [
      {
        title: "EntranceThemeTransition",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <button class="win-button" data-theme-transition-add><span class="win-icon">&#xE710;</span>Add item</button>
          <div data-theme-transition-stage style="display:flex;flex-wrap:wrap;gap:8px;width:100%">
            <div class="win-card win-transition-item">Item 1</div>
            <div class="win-card win-transition-item">Item 2</div>
          </div>`,
        xaml: `<StackPanel>
    <StackPanel.ChildrenTransitions>
        <TransitionCollection>
            <EntranceThemeTransition />
        </TransitionCollection>
    </StackPanel.ChildrenTransitions>
</StackPanel>`,
        csharp: `// Theme transitions animate content when it enters or leaves the visual tree.`,
        html: `<div class="win-transition-item">…</div>`
      },
      {
        title: "RepositionThemeTransition",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;gap:8px"><button class="win-button" data-reposition>Remove first</button></div>
          <div data-reposition-stage style="display:flex;flex-direction:column;gap:8px;width:100%;max-width:420px">
            ${["One", "Two", "Three", "Four"].map((x) => `<div class="win-card" data-reposition-item>${x}</div>`).join("")}
          </div>`,
        xaml: `<StackPanel>
    <StackPanel.ChildrenTransitions>
        <TransitionCollection>
            <RepositionThemeTransition />
        </TransitionCollection>
    </StackPanel.ChildrenTransitions>
</StackPanel>`,
        csharp: `// RepositionThemeTransition animates remaining items when one is removed.`,
        html: `// Animate FLIP layout changes with the Web Animations API.`
      }
    ]
  },

  ParallaxView: {
    examples: [
      {
        title: "Parallax scrolling",
        stageClass: "sample__stage--stretch",
        center: false,
        preview: `
          <div class="win-parallax" data-parallax style="height:340px">
            <div class="win-parallax__background" style="background-image:url('assets/SampleMedia/rainier.jpg')">
              <div class="win-parallax__layer"><h3>Mount Rainier</h3><p>Scroll to see the background move more slowly.</p></div>
            </div>
            <div class="win-parallax__content">
              ${Array.from({ length: 8 }, (_, i) => `<div class="win-parallax__card"><div class="win-body-strong">Content section ${i + 1}</div><p class="win-caption win-text-secondary" style="margin-top:2px">The foreground scrolls normally while the image drifts.</p></div>`).join("")}
            </div>
          </div>`,
        xaml: `<ParallaxView Source="{x:Bind ScrollViewer}">
    <Image Source="/Assets/SampleMedia/rainier.jpg" Height="220" />
</ParallaxView>`,
        csharp: `// ParallaxView creates depth by moving layers at different rates.
// Set VerticalShift and Source for the scroll container.`,
        html: `<div class="win-parallax">
  <div class="win-parallax__background">…</div>
</div>`
      }
    ]
  }
});
