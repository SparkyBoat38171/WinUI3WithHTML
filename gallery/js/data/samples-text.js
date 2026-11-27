/* WinUI Gallery samples — Text */
window.GALLERY_SAMPLES = window.GALLERY_SAMPLES || {};

Object.assign(window.GALLERY_SAMPLES, {
  AutoSuggestBox: {
    examples: [
      {
        title: "A simple AutoSuggestBox",
        center: true,
        preview: `
          <div class="win-auto-suggest" style="width:320px">
            <div class="win-textbox-wrap"><span class="win-icon win-textbox-wrap__icon">&#xE721;</span><input class="win-textbox" placeholder="Type a color…" data-suggestions="Blue|Crimson|Emerald|Gold|Orange|Violet|Teal" aria-label="Type a color"></div>
          </div>
          <div class="win-caption win-text-secondary" id="suggestOut">Start typing to see suggestions.</div>`,
        xaml: `<AutoSuggestBox x:Name="ColorBox"
                 PlaceholderText="Type a color…"
                 QueryIcon="Find"
                 TextChanged="ColorBox_TextChanged"
                 SuggestionChosen="ColorBox_SuggestionChosen"
                 QuerySubmitted="ColorBox_QuerySubmitted" />`,
        csharp: `private void ColorBox_TextChanged(AutoSuggestBox sender, AutoSuggestBoxTextChangedEventArgs args)
{
    if (args.Reason == AutoSuggestionBoxTextChangeReason.UserInput)
    {
        sender.ItemsSource = Colors.Where(c => c.StartsWith(sender.Text));
    }
}`,
        html: `<div class="win-auto-suggest">
  <input class="win-textbox" data-suggestions="Blue|Crimson|Emerald">
</div>`
      },
      {
        title: "AutoSuggestBox with a query icon",
        center: true,
        preview: `
          <div class="win-auto-suggest" style="width:360px">
            <div class="win-textbox-wrap">
              <input class="win-textbox" placeholder="Search controls…" data-suggestions="Button|CheckBox|ComboBox|ContentDialog|ListView|NavigationView|TabView" aria-label="Search controls">
              <button class="win-textbox-wrap__action" aria-label="Search"><span class="win-icon">&#xE721;</span></button>
            </div>
          </div>`,
        xaml: `<AutoSuggestBox QueryIcon="Find" PlaceholderText="Search controls…" />`,
        csharp: `// QueryIcon adds a search glyph and invokes QuerySubmitted.`,
        html: `<button class="win-textbox-wrap__action">&#xE721;</button>`
      }
    ]
  },

  NumberBox: {
    examples: [
      {
        title: "A simple NumberBox",
        center: true,
        preview: `
          <div class="win-number-box" style="width:200px" data-step="1" data-min="0" data-max="100">
            <input class="win-number-box__input" value="10" aria-label="Number">
            <div class="win-number-box__spin"><button data-number-up aria-label="Increase"><span class="win-icon">&#xE70E;</span></button><button data-number-down aria-label="Decrease"><span class="win-icon">&#xE70D;</span></button></div>
          </div>`,
        xaml: `<NumberBox Value="10" Minimum="0" Maximum="100"
           SpinButtonPlacementMode="Inline" />`,
        csharp: `private void NumberBox_ValueChanged(NumberBox sender, NumberBoxValueChangedEventArgs args)
{
    Output.Text = $"Value: {args.NewValue}";
}`,
        html: `<div class="win-number-box" data-step="1" data-min="0" data-max="100">
  <input class="win-number-box__input" value="10">
  <div class="win-number-box__spin">…</div>
</div>`
      },
      {
        title: "NumberBox with an expression",
        center: true,
        preview: `
          <div style="display:flex;align-items:center;gap:12px">
            <div class="win-number-box" style="width:240px">
              <input class="win-number-box__input" value="(12 + 8) * 3" aria-label="Expression">
              <div class="win-number-box__spin"><button data-number-up aria-label="Increase"><span class="win-icon">&#xE70E;</span></button><button data-number-down aria-label="Decrease"><span class="win-icon">&#xE70D;</span></button></div>
            </div>
            <span class="win-caption win-text-secondary">Press Enter to evaluate.</span>
          </div>`,
        xaml: `<NumberBox AcceptsExpression="True" Value="60" />`,
        csharp: `// With AcceptsExpression enabled, users can type algebraic expressions
// such as "2 * (3 + 4)" and NumberBox evaluates them.`,
        html: `<input class="win-number-box__input" value="(12 + 8) * 3">`
      },
      {
        title: "Formatted NumberBox",
        center: true,
        preview: `
          <div class="win-number-box" style="width:220px" data-step="0.01" data-wrap="true">
            <input class="win-number-box__input" value="3.14" aria-label="Decimal number">
            <div class="win-number-box__spin"><button data-number-up aria-label="Increase"><span class="win-icon">&#xE70E;</span></button><button data-number-down aria-label="Decrease"><span class="win-icon">&#xE70D;</span></button></div>
          </div>
          <span class="win-caption win-text-secondary">Decimal step, wrapping at the bounds</span>`,
        xaml: `<NumberBox Value="3.14" SmallChange="0.01" NumberFormatter="{StaticResource DecimalFormatter}" />`,
        csharp: `// Use NumberFormatter for currency, percentages, and fixed decimals.`,
        html: `<div class="win-number-box" data-step="0.01">…</div>`
      }
    ]
  },

  PasswordBox: {
    examples: [
      {
        title: "A PasswordBox",
        center: true,
        preview: `
          <div class="win-text-field" style="width:280px">
            <label class="win-text-field__header" for="pwSimple">Password</label>
            <div class="win-password-box"><input class="win-password-box__input" id="pwSimple" type="password" value="Fluent123!" aria-label="Password"><button class="win-password-box__reveal" aria-label="Show password"><span class="win-icon">&#xE7B3;</span></button></div>
            <span class="win-text-field__description">Use the eye button to reveal the password.</span>
          </div>`,
        xaml: `<PasswordBox Header="Password"
                    Password="Fluent123!"
                    PasswordRevealMode="Peek" />`,
        csharp: `private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
{
    // Validate the password and update helper text.
}`,
        html: `<div class="win-password-box">
  <input class="win-password-box__input" type="password">
  <button class="win-password-box__reveal">&#xE7B3;</button>
</div>`
      },
      {
        title: "PasswordBox with validation",
        center: true,
        preview: `
          <div class="win-text-field win-text-field--error" style="width:300px">
            <label class="win-text-field__header" for="pwInvalid">Create a password</label>
            <div class="win-password-box"><input class="win-password-box__input" id="pwInvalid" type="password" value="1234" aria-label="Password"><button class="win-password-box__reveal" aria-label="Show password"><span class="win-icon">&#xE7B3;</span></button></div>
            <span class="win-text-field__description">Password must be at least 8 characters.</span>
          </div>`,
        xaml: `<PasswordBox Header="Create a password"
                    PasswordRevealMode="Hidden" />`,
        csharp: `// Use a validation state and helper text
// to describe why the password is not accepted.`,
        html: `<div class="win-text-field win-text-field--error">
  <div class="win-password-box">…</div>
</div>`
      }
    ]
  },

  RichEditBox: {
    examples: [
      {
        title: "A simple rich text editor",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-rich-edit-box" style="width:100%;max-width:720px">
            <div class="win-rich-edit-box__toolbar">
              <button class="win-rich-edit-box__tool win-rich-edit-box__tool--bold" data-rich-command="bold" aria-label="Bold">B</button>
              <button class="win-rich-edit-box__tool win-rich-edit-box__tool--italic" data-rich-command="italic" aria-label="Italic">I</button>
              <button class="win-rich-edit-box__tool win-rich-edit-box__tool--underline" data-rich-command="underline" aria-label="Underline">U</button>
              <div class="appbar-separator" style="height:20px;margin:0 4px;border-left:1px solid var(--win-divider-stroke)"></div>
              <button class="win-rich-edit-box__tool" data-rich-command="justifyLeft" aria-label="Align left"><span class="win-icon">&#xE8E4;</span></button>
              <button class="win-rich-edit-box__tool" data-rich-command="justifyCenter" aria-label="Align center"><span class="win-icon">&#xE8E3;</span></button>
              <button class="win-rich-edit-box__tool" data-rich-command="insertUnorderedList" aria-label="Bulleted list"><span class="win-icon">&#xE8FD;</span></button>
            </div>
            <div class="win-rich-edit-box__content" contenteditable="true" data-placeholder="Start typing…">
              <p><strong>WinUI 3</strong> rich text supports <em>formatting</em>, links, and more.</p>
              <p>Select text and use the toolbar to change its style.</p>
            </div>
            <div class="win-rich-edit-box__footer"><span>RichEditBox</span><span>1,024 characters</span></div>
          </div>`,
        xaml: `<RichEditBox x:Name="Editor" Header="Rich text" IsSpellCheckEnabled="True">
    <RichEditBox.Document>
        <Run Text="Start typing…" />
    </RichEditBox.Document>
</RichEditBox>`,
        csharp: `private void Bold_Click(object sender, RoutedEventArgs e)
{
    Editor.Document.Selection.CharacterFormat.Bold =
        FormatEffect.Toggle;
}`,
        html: `<div class="win-rich-edit-box">
  <div class="win-rich-edit-box__toolbar">…</div>
  <div class="win-rich-edit-box__content" contenteditable="true">…</div>
</div>`
      },
      {
        title: "RichEditBox with a formula",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-rich-edit-box" style="width:100%;max-width:720px">
            <div class="win-rich-edit-box__toolbar"><span class="win-caption win-text-secondary" style="padding:0 8px">Equation</span></div>
            <div class="win-rich-edit-box__content" style="font-size:18px;line-height:30px">
              <p style="font-family:Cambria Math,serif">E = mc<sup>2</sup></p>
              <p style="font-family:Cambria Math,serif">a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></p>
            </div>
            <div class="win-rich-edit-box__footer"><span>MathML and Office Math can be inserted</span></div>
          </div>`,
        xaml: `<RichEditBox IsMathEnabled="True" />`,
        csharp: `// RichEditBox supports math mode for equation editing.`,
        html: `<div class="win-rich-edit-box__content">E = mc<sup>2</sup></div>`
      }
    ]
  },

  RichTextBlock: {
    examples: [
      {
        title: "A simple RichTextBlock",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-rich-text-block" style="width:100%;max-width:760px">
            <p>WinUI provides a <strong>rich text</strong> experience with <em>inline formatting</em>, hyperlinks, and <a href="#item/TextBlock" data-route="item/TextBlock">navigable references</a>.</p>
            <p>You can use <code>Run</code>, <code>Bold</code>, <code>Italic</code>, <code>Hyperlink</code> and <code>InlineUIContainer</code> elements inside a <code>RichTextBlock</code>.</p>
            <blockquote>RichTextBlock is read-only; use RichEditBox when the user needs to edit rich content.</blockquote>
          </div>`,
        xaml: `<RichTextBlock>
    <Paragraph>
        WinUI provides a <Bold>rich text</Bold> experience with
        <Italic>inline formatting</Italic>, hyperlinks, and
        <Hyperlink NavigateUri="https://learn.microsoft.com">references</Hyperlink>.
    </Paragraph>
</RichTextBlock>`,
        csharp: `// RichTextBlock is read-only and optimized for rich presentation.`,
        html: `<div class="win-rich-text-block">
  <p>WinUI provides a <strong>rich text</strong> experience.</p>
</div>`
      },
      {
        title: "Text with overflow",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;max-width:400px;padding:16px;border:1px solid var(--win-card-stroke);border-radius:8px;background:var(--win-card-bg)">
            <div class="win-body-strong">Article preview</div>
            <div class="win-rich-text-block win-rich-text-block__overflow" style="margin-top:6px">
              <p>RichTextBlock can clip its content at a fixed number of lines. This is useful for previews and cards, where the full article continues on another page.</p>
              <p>The overflow indicator can be styled or replaced with a custom element.</p>
            </div>
            <button class="win-button win-button--subtle win-button--small" style="margin-top:8px">Read more</button>
          </div>`,
        xaml: `<RichTextBlock MaxLines="3" TextTrimming="WordEllipsis"
               TextWrapping="Wrap" />`,
        csharp: `// MaxLines and TextTrimming produce a compact text preview.`,
        html: `<div class="win-rich-text-block win-rich-text-block__overflow">…</div>`
      }
    ]
  },

  TextBlock: {
    examples: [
      {
        title: "The type ramp",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;flex-direction:column;gap:10px;width:100%">
            <div class="win-title-large">Title Large</div>
            <div class="win-title">Title</div>
            <div class="win-subtitle">Subtitle</div>
            <div class="win-body-large">Body Large</div>
            <div class="win-body-strong">Body Strong</div>
            <div class="win-body">Body</div>
            <div class="win-caption win-text-secondary">Caption</div>
          </div>`,
        xaml: `<TextBlock Text="Title Large" Style="{StaticResource TitleLargeTextBlockStyle}" />
<TextBlock Text="Title" Style="{StaticResource TitleTextBlockStyle}" />
<TextBlock Text="Subtitle" Style="{StaticResource SubtitleTextBlockStyle}" />
<TextBlock Text="Body" Style="{StaticResource BodyTextBlockStyle}" />
<TextBlock Text="Caption" Style="{StaticResource CaptionTextBlockStyle}" />`,
        csharp: `// Use the built-in type ramp instead of hard-coded font sizes.`,
        html: `<div class="win-title-large">Title Large</div>
<div class="win-subtitle">Subtitle</div>
<div class="win-caption">Caption</div>`
      },
      {
        title: "Inline elements and styling",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="width:100%;max-width:650px;display:flex;flex-direction:column;gap:12px">
            <div class="win-text-block win-body-large">This is <span class="win-text-block__bold">bold</span>, <span class="win-text-block__italic">italic</span>, <span class="win-text-block__underline">underlined</span>, and <span class="win-text-block__strike">struck through</span> text.</div>
            <div class="win-text-block">A <a class="win-text-block__link" href="#item/Typography" data-route="item/Typography">hyperlink</a> can navigate to another page. <span class="win-text-block__highlight">Highlighted text</span> draws attention.</div>
            <div class="win-text-block win-text-block--secondary">Secondary text is used for supporting information.</div>
            <div class="win-text-block win-text-block--tertiary">Tertiary text is used for hints and metadata.</div>
          </div>`,
        xaml: `<TextBlock>
    This is <Bold>bold</Bold>, <Italic>italic</Italic>,
    <Underline>underlined</Underline>, and
    <Run Text="struck through" TextDecorations="Strikethrough" />.
</TextBlock>`,
        csharp: `// Inline elements can be used when a single TextBlock
// needs mixed formatting.`,
        html: `<div class="win-text-block">
  This is <strong>bold</strong> and <em>italic</em>.
</div>`
      },
      {
        title: "Selectable text",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-card" style="width:100%;max-width:600px">
            <div class="win-text-block win-text-block--selectable">
              <p><strong>Selectable text</strong> can be copied by the user. Set <code>IsTextSelectionEnabled="True"</code> on a TextBlock to enable selection.</p>
              <p>This paragraph can be selected with the mouse and copied with Ctrl+C. This is useful for code snippets, serial numbers, and read-only documentation.</p>
            </div>
          </div>`,
        xaml: `<TextBlock IsTextSelectionEnabled="True" TextWrapping="Wrap"
           Text="Selectable text can be copied by the user." />`,
        csharp: `// Selection is disabled by default for TextBlock.`,
        html: `<div class="win-text-block win-text-block--selectable">…</div>`
      }
    ]
  },

  TextBox: {
    examples: [
      {
        title: "A simple TextBox",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-text-field" style="width:100%;max-width:420px">
            <label class="win-text-field__header" for="tbSimple">Name</label>
            <div class="win-textbox-wrap"><input class="win-textbox" id="tbSimple" placeholder="Enter your name" aria-label="Name"></div>
          </div>`,
        xaml: `<TextBox Header="Name" PlaceholderText="Enter your name" />`,
        csharp: `private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
{
    // React to input as the user types.
}`,
        html: `<label class="win-text-field">
  <span class="win-text-field__header">Name</span>
  <input class="win-textbox" placeholder="Enter your name">
</label>`
      },
      {
        title: "TextBox with header and placeholder",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-text-field" style="width:100%;max-width:520px">
            <label class="win-text-field__header" for="tbEmail">Email address</label>
            <div class="win-textbox-wrap"><span class="win-icon win-textbox-wrap__icon">&#xE715;</span><input class="win-textbox" id="tbEmail" type="email" placeholder="name@example.com" aria-label="Email address"></div>
            <span class="win-text-field__description">We'll never share your email.</span>
          </div>`,
        xaml: `<TextBox Header="Email address"
                 PlaceholderText="name@example.com"
                 InputScope="EmailSmtpAddress" />`,
        csharp: `// InputScope can select a touch keyboard layout on supported devices.`,
        html: `<div class="win-textbox-wrap">
  <span class="win-icon win-textbox-wrap__icon">&#xE715;</span>
  <input class="win-textbox" type="email" placeholder="name@example.com">
</div>`
      },
      {
        title: "Multi-line TextBox",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div class="win-text-field" style="width:100%;max-width:640px">
            <label class="win-text-field__header" for="tbMultiline">Description</label>
            <div class="win-textbox-wrap win-textbox-wrap--multiline"><textarea class="win-textbox win-textbox--multiline" id="tbMultiline" placeholder="Write a description…" aria-label="Description"></textarea></div>
            <div class="win-text-field__footer"><span>Accepts return and wraps text.</span><span>0 / 500</span></div>
          </div>`,
        xaml: `<TextBox Header="Description"
                 AcceptsReturn="True"
                 TextWrapping="Wrap"
                 Height="120"
                 MaxLength="500" />`,
        csharp: `// AcceptsReturn enables new lines; TextWrapping wraps long lines.`,
        html: `<textarea class="win-textbox win-textbox--multiline"></textarea>`
      },
      {
        title: "Read-only and disabled TextBox",
        stageClass: "sample__stage--column",
        center: false,
        preview: `
          <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:520px">
            <div class="win-textbox-wrap"><input class="win-textbox" value="Read-only value" readonly aria-label="Read-only"></div>
            <div class="win-textbox-wrap"><input class="win-textbox" value="Disabled value" disabled aria-label="Disabled"></div>
          </div>`,
        xaml: `<TextBox IsReadOnly="True" Text="Read-only value" />
<TextBox IsEnabled="False" Text="Disabled value" />`,
        csharp: `// IsReadOnly allows selection and copying but prevents editing.`,
        html: `<input class="win-textbox" readonly value="Read-only value">
<input class="win-textbox" disabled value="Disabled value">`
      }
    ]
  }
});
