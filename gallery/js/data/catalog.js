/* Generated from the WinUI Gallery 3.0.4 control catalog. Descriptions are Microsoft sample copy. */
window.GALLERY_CATALOG = [
  {
    "id": "FundamentalsItem",
    "title": "Fundamentals",
    "icon": "\\uE8F1",
    "special": true,
    "items": [
      {
        "id": "XamlResources",
        "title": "Resources",
        "subtitle": "Reusable definitions for shared values to ensure consistency and maintainability.",
        "description": "In WinUI 3, XAML resources are reusable objects like colors, brushes, or strings, defined once and used throughout your app to maintain consistency and simplify updates. These resources are typically stored in a ResourceDictionary for better organization and scalability. Special theme resources adapt automatically to light or dark modes, ensuring a seamless look across themes.",
        "image": "assets/ControlImages/CodeTagIcon.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "ResourceDictionary",
          "StaticResource",
          "ThemeResource",
          "SetThemeResourceBinding",
          "Resources",
          "lightweight styling"
        ],
        "docs": [
          {
            "Title": "ResourceDictionary and XAML resource references",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/xaml-resource-dictionary"
          },
          {
            "Title": "ResourceDictionary - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.resourcedictionary"
          },
          {
            "Title": "XAML theme resources",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/xaml-theme-resources"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "XamlStyles",
        "title": "Style",
        "subtitle": "A XAML style is a Reusable property settings to define consistent UI design elements.",
        "description": "XAML Styles in WinUI 3 are reusable sets of property values that you can apply to multiple controls. They help maintain a consistent look and feel across your app. Instead of setting the same properties on every control, you define a style once and then reuse it wherever needed.",
        "image": "assets/ControlImages/CodeTagIcon.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "Setter",
          "BasedOn",
          "implicit style",
          "default style"
        ],
        "docs": [
          {
            "Title": "Style - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.style"
          },
          {
            "Title": "XAML styles",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/xaml-styles"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml",
        "baseClasses": [
          "Object",
          "DependencyObject"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Binding",
        "title": "Binding",
        "subtitle": "Connecting UI elements to data for automatic synchronization and updates.",
        "description": "Binding in WinUI 3 is a way to connect a property of a control to a source, such as another property, a data object, or a view model. It keeps the data synchronized between the source and the target control, enabling dynamic updates.",
        "image": "assets/ControlImages/CodeTagIcon.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "x:Bind",
          "data binding",
          "INotifyPropertyChanged",
          "ObservableCollection",
          "TwoWay",
          "OneWay",
          "DataContext"
        ],
        "docs": [
          {
            "Title": "Data binding",
            "Uri": "https://learn.microsoft.com/windows/apps/develop/data-binding/"
          },
          {
            "Title": "{x:Bind} markup extension",
            "Uri": "https://learn.microsoft.com/windows/uwp/xaml-platform/x-bind-markup-extension"
          },
          {
            "Title": "{Binding} markup extension",
            "Uri": "https://learn.microsoft.com/windows/uwp/xaml-platform/binding-markup-extension"
          },
          {
            "Title": "Binding - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.data.binding"
          },
          {
            "Title": "IValueConverter Interface - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.data.ivalueconverter"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Templates",
        "title": "Templates",
        "subtitle": "Customize controls' visuals, item layouts, and data presentation in XAML.",
        "description": "A template defines the structure and appearance of a control. Unlike styles, which set properties, templates allow you to completely customize how a control looks by redefining its visual tree (the XAML elements that make up the control). Templates provide the flexibility to change the look of controls while maintaining their functionality.",
        "image": "assets/ControlImages/CodeTagIcon.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "ControlTemplate",
          "DataTemplate",
          "ItemTemplate",
          "DataTemplateSelector",
          "DataTemplateElementFactory"
        ],
        "docs": [
          {
            "Title": "XAML Control Templates",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/xaml-control-templates"
          },
          {
            "Title": "ControlTemplate - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.controltemplate"
          },
          {
            "Title": "DataTemplate - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.datatemplate"
          },
          {
            "Title": "ItemsPanelTemplate - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.itemspaneltemplate"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "FrameworkTemplate"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "CustomUserControls",
        "title": "Custom & User Controls",
        "subtitle": "Create reusable UI components with custom functionality and appearance.",
        "description": "Custom controls and user controls allow to create reusable UI components with unique behavior and styling. A UserControl is a simple way to encapsulate a UI layout, while a custom control provides full styling and templating flexibility. Both approaches help in building modular and maintainable applications.",
        "image": "assets/ControlImages/CustomControls.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "UserControl",
          "custom control",
          "reusable control"
        ],
        "docs": [
          {
            "Title": "Build XAML controls",
            "Uri": "https://learn.microsoft.com/windows/apps/winui/winui3/xaml-templated-controls-csharp-winui-3"
          },
          {
            "Title": "Control - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.control"
          },
          {
            "Title": "UserControl - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.usercontrol"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "FrameworkElement",
          "Control"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "CustomXamlConditionals",
        "title": "XAML Conditions",
        "subtitle": "Define custom XAML conditions evaluated at parse time using IXamlCondition.",
        "description": "XAML conditions let you conditionally include markup based on application-specific state such as feature flags, device capabilities, or configuration. Implement IXamlCondition (Windows App SDK 2.0) and reference your condition from a conditional XAML namespace. Conditions are evaluated by the XAML parser when a page is loaded and the result for each (condition, argument) pair is cached for the lifetime of the process.",
        "image": "assets/ControlImages/CodeTagIcon.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "IXamlCondition",
          "conditional XAML",
          "markup extension"
        ],
        "docs": [
          {
            "Title": "IXamlCondition - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.markup.ixamlcondition"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Markup",
        "baseClasses": [],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ScratchPad",
        "title": "Scratch Pad",
        "subtitle": "Scratch pad for testing simple XAML markup",
        "description": "Provides an edit box where you can type in some markup and load it to see how it looks and behaves.",
        "image": "assets/ControlImages/ScratchPad.png",
        "group": "FundamentalsItem",
        "groupTitle": "Fundamentals",
        "tags": [
          "playground",
          "sandbox",
          "test markup"
        ],
        "docs": [
          {
            "Title": "XamlReader - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.markup.xamlreader"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "DesignItem",
    "title": "Design",
    "icon": "\\uEB3C",
    "special": true,
    "items": [
      {
        "id": "Color",
        "title": "Color",
        "subtitle": "Balanced color design creates clarity and aesthetic harmony.",
        "description": "",
        "image": "assets/ControlImages/ColorPaletteResources.png",
        "group": "DesignItem",
        "groupTitle": "Design",
        "tags": [
          "palette",
          "brush",
          "accent color",
          "theme color"
        ],
        "docs": [
          {
            "Title": "Colors in Windows 11",
            "Uri": "https://learn.microsoft.com/windows/apps/design/signature-experiences/color"
          },
          {
            "Title": "Windows UI Kit (Figma)",
            "Uri": "https://aka.ms/WinUI/3.0-figma-toolkit"
          },
          {
            "Title": "WinUI Theme Resources (GitHub)",
            "Uri": "https://github.com/microsoft/microsoft-ui-xaml/blob/main/controls/dev/CommonStyles/Common_themeresources_any.xaml"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Geometry",
        "title": "Geometry",
        "subtitle": "Clear geometric design ensures visual coherence and structure.",
        "description": "",
        "image": "assets/ControlImages/Shape.png",
        "group": "DesignItem",
        "groupTitle": "Design",
        "tags": [
          "path",
          "vector",
          "figures"
        ],
        "docs": [
          {
            "Title": "Geometry in Windows 11",
            "Uri": "https://learn.microsoft.com/windows/apps/design/signature-experiences/geometry"
          },
          {
            "Title": "WinUI Theme Resources (GitHub)",
            "Uri": "https://github.com/microsoft/microsoft-ui-xaml/blob/main/controls/dev/CommonStyles/Common_themeresources_any.xaml"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Iconography",
        "title": "Iconography",
        "subtitle": "Icons are a visual design language that can be used to communicate information quickly and effectively.",
        "description": "The icons below use Segoe Fluent Icons on Windows 11 and Segoe MDL2 Assets on Windows 10.",
        "image": "assets/ControlImages/IconElement.png",
        "group": "DesignItem",
        "groupTitle": "Design",
        "tags": [
          "icons",
          "glyph",
          "Segoe Fluent Icons",
          "FontIcon",
          "SymbolIcon",
          "icon font"
        ],
        "docs": [
          {
            "Title": "Iconography in Windows",
            "Uri": "https://learn.microsoft.com/windows/apps/design/signature-experiences/iconography#system-icons"
          },
          {
            "Title": "Segoe Fluent Icons font",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/segoe-fluent-icons-font"
          },
          {
            "Title": "Segoe MDL2 Assets font",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/segoe-ui-symbol-font"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Spacing",
        "title": "Spacing",
        "subtitle": "Thoughtful spacing design enhances readability and flow.",
        "description": "",
        "image": "assets/ControlImages/CompactSizing.png",
        "group": "DesignItem",
        "groupTitle": "Design",
        "tags": [
          "margin",
          "padding",
          "layout spacing"
        ],
        "docs": [
          {
            "Title": "Content design basics",
            "Uri": "https://learn.microsoft.com/windows/apps/design/basics/content-basics"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Typography",
        "title": "Typography",
        "subtitle": "Typography design guides attention with intuitive fonts and hierarchy.",
        "description": "",
        "image": "assets/ControlImages/TextBlock.png",
        "group": "DesignItem",
        "groupTitle": "Design",
        "tags": [
          "font",
          "text style",
          "TitleTextBlockStyle",
          "BodyTextBlockStyle",
          "font size"
        ],
        "docs": [
          {
            "Title": "Typography in Windows Apps",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/typography"
          },
          {
            "Title": "XAML theme resources",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/xaml-theme-resources#the-xaml-type-ramp"
          },
          {
            "Title": "Typography in Windows 11",
            "Uri": "https://learn.microsoft.com/windows/apps/design/signature-experiences/typography"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/TextBlock_themeresources.xaml"
      }
    ]
  },
  {
    "id": "AccessibilityItem",
    "title": "Accessibility",
    "icon": "\\uE776",
    "special": true,
    "items": [
      {
        "id": "AccessibilityColorContrast",
        "title": "Color Contrast",
        "subtitle": "High contrast design ensures accessibility for all users.",
        "description": "",
        "image": "assets/ControlImages/Accessibility.png",
        "group": "AccessibilityItem",
        "groupTitle": "Accessibility",
        "tags": [
          "high contrast",
          "WCAG",
          "accessibility"
        ],
        "docs": [
          {
            "Title": "Accessibility",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/accessibility"
          },
          {
            "Title": "Automation Properties - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.automation.automationproperties"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "AccessibilityKeyboard",
        "title": "Keyboard Navigation",
        "subtitle": "Keyboard-friendly design enables seamless interactions.",
        "description": "",
        "image": "assets/ControlImages/Accessibility.png",
        "group": "AccessibilityItem",
        "groupTitle": "Accessibility",
        "tags": [
          "keyboard",
          "tab navigation",
          "access keys",
          "focus",
          "accessibility"
        ],
        "docs": [
          {
            "Title": "Accessibility",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/accessibility"
          },
          {
            "Title": "Accessibility overview",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/accessibility-overview"
          },
          {
            "Title": "Keyboard accessibility",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/keyboard-accessibility"
          },
          {
            "Title": "Keyboard interactions",
            "Uri": "https://learn.microsoft.com/windows/apps/design/input/keyboard-interactions"
          },
          {
            "Title": "Access keys",
            "Uri": "https://learn.microsoft.com/windows/apps/design/input/access-keys"
          },
          {
            "Title": "Keyboard accelerators",
            "Uri": "https://learn.microsoft.com/windows/apps/design/input/keyboard-accelerators"
          },
          {
            "Title": "Focus navigation for keyboard, gamepad, remote control, and accessibility tools",
            "Uri": "https://learn.microsoft.com/windows/apps/design/input/focus-navigation"
          },
          {
            "Title": "Automation Properties - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.automation.automationproperties"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "AccessibilityScreenReader",
        "title": "Screen Reader",
        "subtitle": "Inclusive design ensures meaningful content for assistive technologies.",
        "description": "",
        "image": "assets/ControlImages/Accessibility.png",
        "group": "AccessibilityItem",
        "groupTitle": "Accessibility",
        "tags": [
          "Narrator",
          "AutomationProperties",
          "assistive technology",
          "accessibility"
        ],
        "docs": [
          {
            "Title": "Accessibility",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/accessibility"
          },
          {
            "Title": "Accessibility overview",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/accessibility-overview"
          },
          {
            "Title": "Expose basic accessibility information",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/basic-accessibility-information"
          },
          {
            "Title": "Landmarks and Headings",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/landmarks-and-headings"
          },
          {
            "Title": "Accessible text requirements",
            "Uri": "https://learn.microsoft.com/windows/apps/design/accessibility/accessible-text-requirements"
          },
          {
            "Title": "Complete guide to Narrator",
            "Uri": "https://support.microsoft.com/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "MenusAndToolbars",
    "title": "Menus & toolbars",
    "icon": "\\uE74E",
    "special": false,
    "items": [
      {
        "id": "AppBarButton",
        "title": "AppBarButton",
        "subtitle": "A button that's styled for use in a CommandBar.",
        "description": "AppBarButton differs from standard buttons in several ways: - Their default appearance is a transparent background with a smaller size. - You use the Label and Icon properties to set the content instead of the Content property. The Content property is ignored. - The button's IsCompact property controls its size.",
        "image": "assets/ControlImages/AppBarButton.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "toolbar button",
          "command button"
        ],
        "docs": [
          {
            "Title": "AppBarButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbarbutton"
          },
          {
            "Title": "SymbolIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon"
          },
          {
            "Title": "FontIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon"
          },
          {
            "Title": "BitmapIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon"
          },
          {
            "Title": "PathIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathicon"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/command-bar"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase",
          "Button"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/AppBarButton_themeresources.xaml"
      },
      {
        "id": "AppBarSeparator",
        "title": "AppBarSeparator",
        "subtitle": "A vertical line that's used to visually separate groups of commands in an app bar.",
        "description": "An AppBarSeparator creates a vertical line to visually separate groups of commands in a app bar. It has a compact state with reduced padding to match the compact state of the AppBarButton and AppBarToggleButton controls.",
        "image": "assets/ControlImages/AppBarSeparator.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "divider"
        ],
        "docs": [
          {
            "Title": "AppBarSeparator - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbarseparator"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/command-bar"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/AppBarSeparator_themeresources.xaml"
      },
      {
        "id": "AppBarToggleButton",
        "title": "AppBarToggleButton",
        "subtitle": "A button that can be on, off, or indeterminate like a CheckBox, and is styled for use in an app bar or other specialized UI.",
        "description": "An AppBarToggleButton looks like an AppBarButton, but works like a CheckBox. It typically has two states, checked (on) or unchecked (off), but can be indeterminate if the IsThreeState property is true. You can determine it's state by checking the IsChecked property.",
        "image": "assets/ControlImages/AppBarToggleButton.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "toolbar toggle",
          "command toggle"
        ],
        "docs": [
          {
            "Title": "AppBarToggleButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbartogglebutton"
          },
          {
            "Title": "SymbolIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon"
          },
          {
            "Title": "FontIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon"
          },
          {
            "Title": "BitmapIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon"
          },
          {
            "Title": "PathIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathicon"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/command-bar"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase",
          "ToggleButton"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/AppBarToggleButton_themeresources.xaml"
      },
      {
        "id": "CommandBar",
        "title": "CommandBar",
        "subtitle": "A toolbar for displaying application-specific commands that handles layout and resizing of its contents.",
        "description": "Command bars provide users with easy access to your app's most common tasks. Command bars can provide access to app-level or page-specific commands and can be used with any navigation pattern. By default, the command bar shows a row of icon buttons and an optional \"see more\" button, which is represented by an ellipsis [...].",
        "image": "assets/ControlImages/CommandBar.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "toolbar",
          "commands",
          "app bar"
        ],
        "docs": [
          {
            "Title": "CommandBar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.commandbar"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/command-bar"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "AppBar"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/CommandBar_themeresources.xaml"
      },
      {
        "id": "CommandBarFlyout",
        "title": "CommandBarFlyout",
        "subtitle": "A mini-toolbar displaying proactive commands, and an optional menu of commands.",
        "description": "A mini-toolbar which displays a set of proactive commands, as well as a secondary menu of commands if desired.",
        "image": "assets/ControlImages/CommandBarFlyout.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "context menu",
          "toolbar flyout",
          "commands"
        ],
        "docs": [
          {
            "Title": "CommandBarFlyout - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.commandbarflyout"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/command-bar-flyout"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "FlyoutBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/MenuBar"
      },
      {
        "id": "MenuBar",
        "title": "MenuBar",
        "subtitle": "A classic menu, allowing the display of MenuItems containing MenuFlyoutItems.",
        "description": "The Menubar simplifies the creation of basic applications by providing a set of menus at the top of the app or window.",
        "image": "assets/ControlImages/MenuBar.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "MenuBarItem",
          "application menu"
        ],
        "docs": [
          {
            "Title": "MenuBar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.MenuBar"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/menus"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/MenuBar"
      },
      {
        "id": "MenuFlyout",
        "title": "MenuFlyout",
        "subtitle": "Shows a contextual list of simple commands or options.",
        "description": "A MenuFlyout displays lightweight UI that is light dismissed by clicking or tapping off of it. Use it to let the user choose from a contextual list of simple commands or options.",
        "image": "assets/ControlImages/MenuFlyout.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "context menu",
          "right click menu",
          "MenuFlyoutItem",
          "dropdown menu"
        ],
        "docs": [
          {
            "Title": "MenuFlyout - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.menuflyout"
          },
          {
            "Title": "MenuFlyoutItem - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.menuflyoutitem"
          },
          {
            "Title": "MenuFlyoutSubItem - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.menuflyoutsubitem"
          },
          {
            "Title": "MenuFlyoutSeparator - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.menuflyoutseparator"
          },
          {
            "Title": "ToggleMenuFlyoutItem - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.togglemenuflyoutitem"
          },
          {
            "Title": "RadioMenuFlyoutItem - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.radiomenuflyoutitem"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/menus"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "FlyoutBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/MenuFlyout_themeresources.xaml"
      },
      {
        "id": "SwipeControl",
        "title": "SwipeControl",
        "subtitle": "Touch gesture for quick menu actions on items.",
        "description": "Touch gesture for quick menu actions on items.",
        "image": "assets/ControlImages/SwipeControl.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "SwipeItem",
          "gesture"
        ],
        "docs": [
          {
            "Title": "SwipeControl - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.swipecontrol"
          },
          {
            "Title": "SwipeItems - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.swipeitems"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/swipe"
          },
          {
            "Title": "Gesture Actions",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/collection-commanding"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "StandardUICommand",
        "title": "StandardUICommand",
        "subtitle": "A StandardUICommand is a built-in 'XamlUICommand' which represents a commonly used command, e.g. 'Save'.",
        "description": "StandardUICommands are a set of built-in XamlUICommands represeting commonly used commands. Including the look and feel of a given command, which can be reused across your app, and which is understood natively by the standard XAML controls. E.g. Save, Open, Copy, Paste, etc.",
        "image": "assets/ControlImages/AppBarSeparator.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [
          "standard command"
        ],
        "docs": [
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/commanding#command-experiences-using-the-standarduicommand-class"
          },
          {
            "Title": "StandardUICommand - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.input.standarduicommand"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Input",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "XamlUICommand"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "XamlUICommand",
        "title": "XamlUICommand",
        "subtitle": "An object which is used to define the look and feel of a given command.",
        "description": "An object which is used to define the look and feel of a given command, which can be reused across your app, and which is understood natively by the standard XAML controls.",
        "image": "assets/ControlImages/AppBarSeparator.png",
        "group": "MenusAndToolbars",
        "groupTitle": "Menus & toolbars",
        "tags": [],
        "docs": [
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/commanding#command-experiences-using-the-xamluicommand-class"
          },
          {
            "Title": "XamlUICommand - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.input.xamluicommand"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Input",
        "baseClasses": [
          "Object",
          "DependencyObject"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "Collections",
    "title": "Collections",
    "icon": "\\uE80A",
    "special": false,
    "items": [
      {
        "id": "FlipView",
        "title": "FlipView",
        "subtitle": "Presents a collection of items that the user can flip through, one item at a time.",
        "description": "The FlipView lets you flip through a collection of items, one at a time. It's great for displaying images from a gallery, pages of a magazine, or similar items.",
        "image": "assets/ControlImages/FlipView.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "carousel",
          "slideshow",
          "gallery"
        ],
        "docs": [
          {
            "Title": "FlipView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.flipview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/flipview"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ItemsControl",
          "Selector"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/FlipView_themeresources.xaml"
      },
      {
        "id": "GridView",
        "title": "GridView",
        "subtitle": "A control that presents a collection of items in rows and columns.",
        "description": "The GridView lets you show a collection of items arranged in rows and columns that scroll horizontally.",
        "image": "assets/ControlImages/GridView.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "tiles",
          "collection grid"
        ],
        "docs": [
          {
            "Title": "GridView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.gridview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/lists"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ItemsControl",
          "Selector",
          "ListViewBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/GridViewItem_themeresources.xaml"
      },
      {
        "id": "ItemsRepeater",
        "title": "ItemsRepeater",
        "subtitle": "A flexible, primitive control for data-driven layouts.",
        "description": "The ItemsRepeater is like a markup-based loop that supports virtualization.",
        "image": "assets/ControlImages/ListView.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "data layout",
          "virtualization"
        ],
        "docs": [
          {
            "Title": "ItemsRepeater - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.itemsrepeater"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/items-repeater"
          },
          {
            "Title": "StackLayout - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.stacklayout"
          },
          {
            "Title": "UniformGridLayout - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.uniformgridlayout"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ItemsView",
        "title": "ItemsView",
        "subtitle": "A control that presents a collection of items using various layouts.",
        "description": "The ItemsView lets you show a collection of items using scrollable & swappable layouts.",
        "image": "assets/ControlImages/ItemsView.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "collection",
          "items source",
          "layout"
        ],
        "docs": [
          {
            "Title": "ItemsView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.itemsview"
          },
          {
            "Title": "CollectionViewSource - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Data.CollectionViewSource"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ItemsView"
      },
      {
        "id": "ListView",
        "title": "ListView",
        "subtitle": "A control that presents a collection of items in a vertical list.",
        "description": "The ListView lets you show a collection of items in a list that scrolls vertically.",
        "image": "assets/ControlImages/ListView.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "list",
          "selection",
          "collection list"
        ],
        "docs": [
          {
            "Title": "ListView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.listview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/listview-and-gridview"
          },
          {
            "Title": "Drag and Drop - Full Sample",
            "Uri": "https://github.com/microsoft/Windows-universal-samples/tree/master/Samples/XamlDragAndDrop"
          },
          {
            "Title": "CollectionViewSource - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Data.CollectionViewSource"
          },
          {
            "Title": "Filtering collections and lists through user input",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/listview-filtering"
          },
          {
            "Title": "Inverted Lists",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/inverted-lists"
          },
          {
            "Title": "Inverted Lists - Full Sample",
            "Uri": "https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/XamlBottomUpList"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ItemsControl",
          "Selector",
          "ListViewBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/ListViewItem_themeresources.xaml"
      },
      {
        "id": "PullToRefresh",
        "title": "PullToRefresh",
        "subtitle": "Provides the ability to pull on a collection of items in a list/grid to refresh the contents of the collection.",
        "description": "PullToRefresh lets a user pull down on a list of data using touch in order to retrieve more data. PullToRefresh is widely used on devices with a touch screen.",
        "image": "assets/ControlImages/PullToRefresh.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "pull to refresh",
          "RefreshContainer",
          "RefreshVisualizer"
        ],
        "docs": [
          {
            "Title": "RefreshContainer - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.RefreshContainer"
          },
          {
            "Title": "RefreshVisualizer - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.RefreshVisualizer"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/pull-to-refresh"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/PullToRefresh"
      },
      {
        "id": "TableView",
        "title": "TableView",
        "subtitle": "A preview control for presenting and editing virtualized tabular data.",
        "description": "TableView presents an item collection as virtualized rows and developer-defined columns. It supports sorting, filtering, grouping, column resizing, cell templates, frozen leading columns, single row selection, opt-in cell editing, display density, grid lines, and empty-state content.",
        "image": "assets/ControlImages/DataGrid.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "table",
          "tabular data",
          "data grid",
          "enterprise",
          "editing",
          "sorting",
          "filtering",
          "grouping",
          "virtualization"
        ],
        "docs": [
          {
            "Title": "TableView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.tabular.tableview"
          },
          {
            "Title": "TableView specification",
            "Uri": "https://github.com/microsoft/microsoft-ui-xaml/blob/main/docs/api-specs/TableView/TableView-spec.md"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls.Tabular",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": true,
        "sourcePath": "/TableView"
      },
      {
        "id": "TreeView",
        "title": "TreeView",
        "subtitle": "The  TreeView control is a hierarchical list pattern with expanding and collapsing nodes that contain nested items.",
        "description": "The TreeView control is a hierarchical list pattern with expanding and collapsing nodes that contain nested items.",
        "image": "assets/ControlImages/TreeView.png",
        "group": "Collections",
        "groupTitle": "Collections",
        "tags": [
          "tree",
          "hierarchy",
          "nodes",
          "expandable list"
        ],
        "docs": [
          {
            "Title": "TreeView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.TreeView"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/tree-view"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/TreeView"
      }
    ]
  },
  {
    "id": "DateAndTime",
    "title": "Date & time",
    "icon": "\\uEC92",
    "special": false,
    "items": [
      {
        "id": "CalendarDatePicker",
        "title": "CalendarDatePicker",
        "subtitle": "A control that lets users pick a date value using a calendar.",
        "description": "A control that lets users pick a date value using a calendar.",
        "image": "assets/ControlImages/CalendarDatePicker.png",
        "group": "DateAndTime",
        "groupTitle": "Date & time",
        "tags": [
          "date picker"
        ],
        "docs": [
          {
            "Title": "CalendarDatePicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.calendardatepicker"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/calendar-date-picker"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/CalendarDatePicker_themeresources.xaml"
      },
      {
        "id": "CalendarView",
        "title": "CalendarView",
        "subtitle": "A control that presents a calendar for a user to choose a date from.",
        "description": "CalendarView shows a larger view for showing and selecting dates. DatePicker by contrast has a compact view with inline selection.",
        "image": "assets/ControlImages/CalendarView.png",
        "group": "DateAndTime",
        "groupTitle": "Date & time",
        "tags": [
          "date",
          "month view"
        ],
        "docs": [
          {
            "Title": "CalendarView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.calendarview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/calendar-view"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/CalendarView_themeresources.xaml"
      },
      {
        "id": "DatePicker",
        "title": "DatePicker",
        "subtitle": "A control that lets a user pick a date value.",
        "description": "Use a DatePicker to let users set a date in your app, for example to schedule an appointment. The DatePicker displays three controls for month, date, and year. These controls are easy to use with touch or mouse, and they can be styled and configured in several different ways.",
        "image": "assets/ControlImages/DatePicker.png",
        "group": "DateAndTime",
        "groupTitle": "Date & time",
        "tags": [
          "date selection"
        ],
        "docs": [
          {
            "Title": "DatePicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.datepicker"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/date-picker"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/DatePicker_themeresources.xaml"
      },
      {
        "id": "TimePicker",
        "title": "TimePicker",
        "subtitle": "A configurable control that lets a user pick a time value.",
        "description": "Use a TimePicker to let users set a time in your app, for example to set a reminder. The TimePicker displays three controls for hour, minute, and AM/PM. These controls are easy to use with touch or mouse, and they can be styled and configured in several different ways.",
        "image": "assets/ControlImages/TimePicker.png",
        "group": "DateAndTime",
        "groupTitle": "Date & time",
        "tags": [
          "clock",
          "time selection"
        ],
        "docs": [
          {
            "Title": "TimePicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/time-picker"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/TimePicker_themeresources.xaml"
      }
    ]
  },
  {
    "id": "BasicInput",
    "title": "Basic input",
    "icon": "\\uE73A",
    "special": false,
    "items": [
      {
        "id": "Button",
        "title": "Button",
        "subtitle": "A control that responds to user input and raises a Click event.",
        "description": "The Button control provides a Click event to respond to user input from a touch, mouse, keyboard, stylus, or other input device. You can put different kinds of content in a button, such as text or an image, or you can restyle a button to give it a new look.",
        "image": "assets/ControlImages/Button.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "click",
          "push button",
          "command"
        ],
        "docs": [
          {
            "Title": "Button - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.button"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/buttons"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/Button_themeresources.xaml"
      },
      {
        "id": "DropDownButton",
        "title": "DropDownButton",
        "subtitle": "A button that displays a flyout of choices when clicked.",
        "description": "A control that drops down a flyout of choices from which one can be chosen.",
        "image": "assets/ControlImages/DropDownButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "flyout button",
          "menu button"
        ],
        "docs": [
          {
            "Title": "DropDownButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.dropdownbutton"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/buttons"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase",
          "Button"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/DropDownButton"
      },
      {
        "id": "HyperlinkButton",
        "title": "HyperlinkButton",
        "subtitle": "A button that appears as hyperlink text, and can navigate to a URI or handle a Click event.",
        "description": "A HyperlinkButton appears as a text hyperlink. When a user clicks it, it opens the page you specify in the NavigateUri property in the default browser. Or you can handle its Click event, typically to navigate within your app.",
        "image": "assets/ControlImages/HyperlinkButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "URL",
          "navigate"
        ],
        "docs": [
          {
            "Title": "HyperlinkButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.hyperlinkbutton"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/hyperlinks"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/HyperlinkButton_themeresources.xaml"
      },
      {
        "id": "RepeatButton",
        "title": "RepeatButton",
        "subtitle": "A button that raises its Click event repeatedly from the time it's pressed until it's released.",
        "description": "The RepeatButton control is like a standard Button, except that the Click event occurs continuously while the user presses the RepeatButton.",
        "image": "assets/ControlImages/RepeatButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "hold button"
        ],
        "docs": [
          {
            "Title": "RepeatButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.primitives.repeatbutton"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/buttons"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls.Primitives",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/RepeatButton_themeresources.xaml"
      },
      {
        "id": "ToggleButton",
        "title": "ToggleButton",
        "subtitle": "A button that can be switched between two states like a CheckBox.",
        "description": "A ToggleButton looks like a Button, but works like a CheckBox. It typically has two states, checked (on) or unchecked (off), but can be indeterminate if the IsThreeState property is true. You can determine it's state by checking the IsChecked property.",
        "image": "assets/ControlImages/ToggleButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "on off"
        ],
        "docs": [
          {
            "Title": "ToggleButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.primitives.togglebutton"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/buttons#create-a-toggle-split-button"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls.Primitives",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/ToggleButton_themeresources.xaml"
      },
      {
        "id": "SplitButton",
        "title": "SplitButton",
        "subtitle": "A two-part button that displays a flyout when its secondary part is clicked.",
        "description": "The SplitButton is a dropdown button, but with an addition execution hit target.",
        "image": "assets/ControlImages/SplitButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "split",
          "dropdown button"
        ],
        "docs": [
          {
            "Title": "SplitButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.splitbutton"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/buttons#create-a-split-button"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/SplitButton"
      },
      {
        "id": "ToggleSplitButton",
        "title": "ToggleSplitButton",
        "subtitle": "A version of the SplitButton where the activation target toggles on/off.",
        "description": "A version of the SplitButton where the activation target toggles on/off.",
        "image": "assets/ControlImages/ToggleSplitButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "toggle split",
          "dropdown toggle"
        ],
        "docs": [
          {
            "Title": "ToggleSplitButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.togglesplitbutton"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/buttons"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "SplitButton"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/SplitButton"
      },
      {
        "id": "CheckBox",
        "title": "CheckBox",
        "subtitle": "A control that a user can select or clear.",
        "description": "CheckBox controls let the user select a combination of binary options. In contrast, RadioButton controls allow the user to select from mutually exclusive options. The indeterminate state is used to indicate that an option is set for some, but not all, child options. Don't allow users to set an indeterminate state directly to indicate a third option.",
        "image": "assets/ControlImages/CheckBox.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "tick",
          "three state",
          "checkmark"
        ],
        "docs": [
          {
            "Title": "CheckBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.checkbox"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/checkbox"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase",
          "ToggleButton"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/CheckBox_themeresources.xaml"
      },
      {
        "id": "ColorPicker",
        "title": "ColorPicker",
        "subtitle": "A control that displays a selectable color spectrum.",
        "description": "A selectable color spectrum.",
        "image": "assets/ControlImages/ColorPicker.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "color spectrum",
          "color wheel",
          "RGB",
          "hex"
        ],
        "docs": [
          {
            "Title": "ColorPicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.ColorPicker"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/color-picker"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ColorPicker"
      },
      {
        "id": "ComboBox",
        "title": "ComboBox",
        "subtitle": "A drop-down list of items a user can select from.",
        "description": "Use a ComboBox when you need to conserve on-screen space and when users select only one option at a time. A ComboBox shows only the currently selected item.",
        "image": "assets/ControlImages/ComboBox.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "dropdown",
          "select",
          "picker"
        ],
        "docs": [
          {
            "Title": "ComboBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.combobox"
          },
          {
            "Title": "ComboBoxItem - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.comboboxitem"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/combo-box"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ItemsControl",
          "Selector"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ComboBox"
      },
      {
        "id": "RadioButton",
        "title": "RadioButton",
        "subtitle": "A control that allows a user to select a single option from a group of options.",
        "description": "Use RadioButton controls to let a user choose between mutually exclusive, related options. Generally contained within a RadioButtons group control.",
        "image": "assets/ControlImages/RadioButton.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "RadioButtons",
          "single selection",
          "option"
        ],
        "docs": [
          {
            "Title": "RadioButton - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.radiobutton"
          },
          {
            "Title": "RadioButtons - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.radiobuttons"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/radio-button"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl",
          "ButtonBase",
          "ToggleButton"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/RadioButton_themeresources.xaml"
      },
      {
        "id": "RatingControl",
        "title": "RatingControl",
        "subtitle": "Rate something 1 to 5 stars.",
        "description": "Rate something 1 to 5 stars.",
        "image": "assets/ControlImages/RatingControl.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "stars",
          "review"
        ],
        "docs": [
          {
            "Title": "RatingControl - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.RatingControl"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/rating"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/RatingControl"
      },
      {
        "id": "Slider",
        "title": "Slider",
        "subtitle": "A control that lets the user select from a range of values by moving a Thumb control along a track.",
        "description": "Use a Slider when you want your users to be able to set defined, contiguous values (such as volume or brightness) or a range of discrete values (such as screen resolution settings).",
        "image": "assets/ControlImages/Slider.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "range",
          "track",
          "Thumb"
        ],
        "docs": [
          {
            "Title": "Slider - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.slider"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/slider"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "RangeBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/Slider_themeresources.xaml"
      },
      {
        "id": "ToggleSwitch",
        "title": "ToggleSwitch",
        "subtitle": "A switch that can be toggled between 2 states.",
        "description": "Use ToggleSwitch controls to present users with exactly two mutually exclusive options (like on/off), where choosing an option results in an immediate commit. A toggle switch should have a single label.",
        "image": "assets/ControlImages/ToggleSwitch.png",
        "group": "BasicInput",
        "groupTitle": "Basic input",
        "tags": [
          "on off"
        ],
        "docs": [
          {
            "Title": "ToggleSwitch - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.toggleswitch"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/toggles"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/ToggleSwitch_themeresources.xaml"
      }
    ]
  },
  {
    "id": "StatusAndInfo",
    "title": "Status & info",
    "icon": "\\uE946",
    "special": false,
    "items": [
      {
        "id": "InfoBadge",
        "title": "InfoBadge",
        "subtitle": "An non-intrusive UI to display notifications or bring focus to an area.",
        "description": "Badging is a non-intrusive and intuitive way to display notifications or bring focus to an area within an app - whether that be for notifications, indicating new content, or showing an alert.",
        "image": "assets/ControlImages/InfoBadge.png",
        "group": "StatusAndInfo",
        "groupTitle": "Status & info",
        "tags": [
          "notification dot",
          "count badge"
        ],
        "docs": [
          {
            "Title": "InfoBadge - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.infobadge"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/info-badge"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/InfoBadge"
      },
      {
        "id": "InfoBar",
        "title": "InfoBar",
        "subtitle": "An inline message to display app-wide status change information.",
        "description": "Use an InfoBar control when a user should be informed of, acknowledge, or take action on a changed application state. By default the notification will remain in the content area until closed by the user but will not necessarily break user flow.",
        "image": "assets/ControlImages/InfoBar.png",
        "group": "StatusAndInfo",
        "groupTitle": "Status & info",
        "tags": [
          "notification",
          "status message",
          "alert",
          "banner"
        ],
        "docs": [
          {
            "Title": "InfoBar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.infobar"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/infobar"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/InfoBar"
      },
      {
        "id": "ProgressBar",
        "title": "ProgressBar",
        "subtitle": "Shows the apps progress on a task, or that the app is performing ongoing work that doesn't block user interaction.",
        "description": "The ProgressBar has two different visual representations: Indeterminate - shows that a task is ongoing, but doesn't block user interaction. Determinate - shows how much progress has been made on a known amount of work.",
        "image": "assets/ControlImages/ProgressBar.png",
        "group": "StatusAndInfo",
        "groupTitle": "Status & info",
        "tags": [
          "loading",
          "determinate",
          "indeterminate"
        ],
        "docs": [
          {
            "Title": "ProgressBar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.ProgressBar"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/progress-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "RangeBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ProgressBar"
      },
      {
        "id": "ProgressRing",
        "title": "ProgressRing",
        "subtitle": "Shows the apps progress on a task, or that the app is performing ongoing work that does block user interaction.",
        "description": "The ProgressRing has two different visual representations: Indeterminate - shows that a task is ongoing, but blocks user interaction. Determinate - shows how much progress has been made on a known amount of work.",
        "image": "assets/ControlImages/ProgressRing.png",
        "group": "StatusAndInfo",
        "groupTitle": "Status & info",
        "tags": [
          "loading",
          "spinner",
          "busy"
        ],
        "docs": [
          {
            "Title": "ProgressRing - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.progressring"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/progress-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ProgressRing"
      },
      {
        "id": "ToolTip",
        "title": "ToolTip",
        "subtitle": "Displays information for an element in a pop-up window.",
        "description": "A ToolTip shows more information about a UI element. You might show information about what the element does, or what the user should do. The ToolTip is shown when a user hovers over or presses and holds the UI element.",
        "image": "assets/ControlImages/ToolTip.png",
        "group": "StatusAndInfo",
        "groupTitle": "Status & info",
        "tags": [
          "hint",
          "hover text"
        ],
        "docs": [
          {
            "Title": "ToolTip - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.tooltip"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/tooltips"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/ToolTip_themeresources.xaml"
      }
    ]
  },
  {
    "id": "DialogsAndFlyouts",
    "title": "Dialogs & flyouts",
    "icon": "\\uE15F",
    "special": false,
    "items": [
      {
        "id": "ContentDialog",
        "title": "ContentDialog",
        "subtitle": "A dialog box that can be customized to contain any XAML content.",
        "description": "Use a ContentDialog to show relevant information or to provide a modal dialog experience that can show any XAML content.",
        "image": "assets/ControlImages/ContentDialog.png",
        "group": "DialogsAndFlyouts",
        "groupTitle": "Dialogs & flyouts",
        "tags": [
          "modal",
          "popup dialog",
          "message box"
        ],
        "docs": [
          {
            "Title": "ContentDialog - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.contentdialog"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/dialogs-and-flyouts/dialogs"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/ContentDialog_themeresources.xaml"
      },
      {
        "id": "Flyout",
        "title": "Flyout",
        "subtitle": "Shows contextual information and enables user interaction.",
        "description": "A Flyout displays lightweight UI that is either information, or requires user interaction. Unlike a dialog, a Flyout can be light dismissed by clicking or tapping off of it. Use it to collect input from the user, show more details about an item, or ask the user to confirm an action.",
        "image": "assets/ControlImages/Flyout.png",
        "group": "DialogsAndFlyouts",
        "groupTitle": "Dialogs & flyouts",
        "tags": [
          "popup",
          "contextual"
        ],
        "docs": [
          {
            "Title": "Flyout - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.flyout"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/dialogs-and-flyouts"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "FlyoutBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/FlyoutPresenter_themeresources.xaml"
      },
      {
        "id": "Popup",
        "title": "Popup",
        "subtitle": "A UI element displaying temporary content over existing interface.",
        "description": "The Popup Control allows your app to display temporary content above other UI elements. It can be used for lightweight interactions such as tooltips, notifications, or custom floating panels to enhance user workflows or highlight specific parts of the interface.",
        "image": "assets/ControlImages/Popup.png",
        "group": "DialogsAndFlyouts",
        "groupTitle": "Dialogs & flyouts",
        "tags": [
          "overlay",
          "temporary content"
        ],
        "docs": [
          {
            "Title": "Popup - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.primitives.popup"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls.Primitives",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "TeachingTip",
        "title": "TeachingTip",
        "subtitle": "A content-rich flyout for guiding users and enabling teaching moments.",
        "description": "The XAML TeachingTip Control provides a way for your app to guide and inform users in your application with a non-invasive and content rich notification. TeachingTip can be used for bringing focus to a new or important feature, teaching users how to perform a task, or enhancing the user workflow by providing contextually relevant information to their task at hand.",
        "image": "assets/ControlImages/TeachingTip.png",
        "group": "DialogsAndFlyouts",
        "groupTitle": "Dialogs & flyouts",
        "tags": [
          "callout",
          "coachmark"
        ],
        "docs": [
          {
            "Title": "TeachingTip - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.teachingtip"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/dialogs-and-flyouts/teaching-tip"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/TeachingTip"
      }
    ]
  },
  {
    "id": "Scrolling",
    "title": "Scrolling",
    "icon": "\\uE174",
    "special": false,
    "items": [
      {
        "id": "PipsPager",
        "title": "PipsPager",
        "subtitle": "A control to let the user navigate through a paginated collection when the page numbers do not need to be visually known.",
        "description": "A PipsPager allows the user to navigate through a paginated collection and is independent of the content shown. Use this control when the content in the layout is not explicitly ordered by relevancy or you desire a glyph-based representation of numbered pages. PipsPagers are commonly used in photo viewers, app lists, carousels, and when display space is limited.",
        "image": "assets/ControlImages/PipsPager.png",
        "group": "Scrolling",
        "groupTitle": "Scrolling",
        "tags": [
          "pagination",
          "dots"
        ],
        "docs": [
          {
            "Title": "PipsPager - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pipspager"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/pipspager"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/PipsPager"
      },
      {
        "id": "PagerControl",
        "title": "PagerControl",
        "subtitle": "A control that lets users navigate through a numbered collection of pages.",
        "description": "PagerControl provides numbered page navigation with multiple display modes and configurable navigation buttons.",
        "image": "assets/ControlImages/PagerControl.png",
        "group": "Scrolling",
        "groupTitle": "Scrolling",
        "tags": [
          "pagination",
          "pages",
          "navigation"
        ],
        "docs": [],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": true,
        "sourcePath": "/PagerControl"
      },
      {
        "id": "ScrollView",
        "title": "ScrollView",
        "subtitle": "A container control that lets the user pan and zoom its content.",
        "description": "A ScrollView lets a user scroll, pan, and zoom to see content that's larger than the viewable area. The ItemsView has a ScrollView built into its control template to provide automatic scrolling.",
        "image": "assets/ControlImages/ScrollView.png",
        "group": "Scrolling",
        "groupTitle": "Scrolling",
        "tags": [
          "pan",
          "zoom",
          "scrolling"
        ],
        "docs": [
          {
            "Title": "ScrollView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.scrollview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/scroll-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ScrollView"
      },
      {
        "id": "ScrollViewer",
        "title": "ScrollViewer",
        "subtitle": "A container control that lets the user pan and zoom its content.",
        "description": "A ScrollViewer lets a user scroll, pan, and zoom to see content that's larger than the viewable area. Many content controls, like ListView, have ScrollViewers built into their control templates to provide automatic scrolling.",
        "image": "assets/ControlImages/ScrollViewer.png",
        "group": "Scrolling",
        "groupTitle": "Scrolling",
        "tags": [
          "pan",
          "zoom",
          "scrolling"
        ],
        "docs": [
          {
            "Title": "ScrollViewer - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.scrollviewer"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/scroll-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/ScrollViewer_themeresources.xaml"
      },
      {
        "id": "SemanticZoom",
        "title": "SemanticZoom",
        "subtitle": "Lets the user zoom between two different views of a collection, making it easier to navigate through large collections of items.",
        "description": "The SemanticZoom lets you show grouped data in two different ways, and is useful for quickly navigating through large sets of data.",
        "image": "assets/ControlImages/SemanticZoom.png",
        "group": "Scrolling",
        "groupTitle": "Scrolling",
        "tags": [
          "semantic zoom",
          "grouped view"
        ],
        "docs": [
          {
            "Title": "SemanticZoom - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.semanticzoom"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/semantic-zoom"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "Layout",
    "title": "Layout",
    "icon": "\\uE8A1",
    "special": false,
    "items": [
      {
        "id": "Border",
        "title": "Border",
        "subtitle": "A container control that draws a boundary line, background, or both, around another object.",
        "description": "Use a Border control to draw a boundary line, background, or both, around another object. A Border can contain only one child object.",
        "image": "assets/ControlImages/Border.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "outline",
          "frame",
          "background"
        ],
        "docs": [
          {
            "Title": "Border - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.border"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Canvas",
        "title": "Canvas",
        "subtitle": "A layout panel that supports absolute positioning of child elements relative to the top left corner of the canvas.",
        "description": "The Canvas provides absolute positioning of controls or content. Content is positioned relative to the Canvas using the Canvas.Top and Canvas.Left attached properties.",
        "image": "assets/ControlImages/Canvas.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "absolute position",
          "coordinates"
        ],
        "docs": [
          {
            "Title": "Canvas - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.canvas"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/layout-panels"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Expander",
        "title": "Expander",
        "subtitle": "A container with a header that can be expanded to show a body with more content.",
        "description": "The Expander has a header and can expand to show a body with more content. Use an Expander when some content is only relevant some of the time (for example to read more information or access additional options for an item).",
        "image": "assets/ControlImages/Expander.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "collapse",
          "accordion"
        ],
        "docs": [
          {
            "Title": "Expander - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.expander"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/expander"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/Expander"
      },
      {
        "id": "Grid",
        "title": "Grid",
        "subtitle": "A layout panel that supports arranging child elements in rows and columns. ",
        "description": "The Grid is used to arrange controls and content in rows and columns. Content is positioned in the grid using Grid.Row and Grid.Column attached properties.",
        "image": "assets/ControlImages/Grid.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "rows",
          "columns"
        ],
        "docs": [
          {
            "Title": "Grid - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.grid"
          },
          {
            "Title": "Tutorial",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/grid-tutorial"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/layout-panels#grid"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "LayoutPanel",
        "title": "LayoutPanel",
        "subtitle": "A panel that uses a Layout object to measure and arrange its children.",
        "description": "Use LayoutPanel to apply a reusable Layout, including a custom NonVirtualizingLayout, to ordinary panel children. LayoutPanel also provides border, corner radius, and padding properties.",
        "image": "assets/ControlImages/LayoutPanel.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "layout panel",
          "custom layout",
          "non virtualizing layout",
          "panel"
        ],
        "docs": [
          {
            "Title": "LayoutPanel - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.layoutpanel"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": true,
        "sourcePath": "/LayoutPanel"
      },
      {
        "id": "RelativePanel",
        "title": "RelativePanel",
        "subtitle": "A panel that uses relationships between elements to define layout.",
        "description": "Use a RelativePanel to layout elements by defining the relationships between elements and in relation to the panel.",
        "image": "assets/ControlImages/RelativePanel.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "relative layout",
          "positioning"
        ],
        "docs": [
          {
            "Title": "RelativePanel - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.relativepanel"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/layout-panels"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "SplitView",
        "title": "SplitView",
        "subtitle": "A container that has 2 content areas, with multiple display options for the pane.",
        "description": "Use a SplitView to display content, such as navigation options, in a pane on the side. There are multiple options for displaying the pane, namely CompactOverlay, Compact, Overlay, Inline. If you are looking for a hamburger navigation pattern, check out the NavigationView sample.",
        "image": "assets/ControlImages/SplitView.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "pane",
          "hamburger",
          "navigation pane"
        ],
        "docs": [
          {
            "Title": "SplitView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.splitview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/split-view"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/SplitView"
      },
      {
        "id": "StackPanel",
        "title": "StackPanel",
        "subtitle": "A layout panel that arranges child elements into a single line that can be oriented horizontally or vertically.",
        "description": "A StackPanel is used to arrange items in a line, either horizontally or vertically.",
        "image": "assets/ControlImages/StackPanel.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "stack",
          "vertical layout",
          "horizontal layout"
        ],
        "docs": [
          {
            "Title": "StackPanel - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.stackpanel"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/layout-panels"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "VariableSizedWrapGrid",
        "title": "VariableSizedWrapGrid",
        "subtitle": "A layout panel that supports arranging child elements in rows and columns. Each child element can span multiple rows and columns.",
        "description": "A VariableSizedWrapGrip is used to create grid layouts where content can span multiple rows and columns.",
        "image": "assets/ControlImages/VariableSizedWrapGrid.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "wrap grid",
          "tiles",
          "spanning"
        ],
        "docs": [
          {
            "Title": "VariableSizedWrapGrid - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.variablesizedwrapgrid"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/layout-panels"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "WrapPanel",
        "title": "WrapPanel",
        "subtitle": "A layout panel that arranges child elements in rows or columns and automatically wraps them onto new lines.",
        "description": "Use a WrapPanel to arrange child elements sequentially and move overflowing items to a new row or column. You can configure its orientation, spacing, padding, and whether the final item stretches to fill the remaining space.",
        "image": "assets/ControlImages/WrapPanel.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "wrap",
          "responsive layout",
          "flow layout",
          "spacing"
        ],
        "docs": [],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Panel"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": true,
        "sourcePath": "/WrapPanel"
      },
      {
        "id": "Viewbox",
        "title": "Viewbox",
        "subtitle": "A container control that scales its content to a specified size.",
        "description": "Use a Viewbox control scale content up or down to a specified size.",
        "image": "assets/ControlImages/Viewbox.png",
        "group": "Layout",
        "groupTitle": "Layout",
        "tags": [
          "scale",
          "stretch",
          "zoom content"
        ],
        "docs": [
          {
            "Title": "Viewbox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.Viewbox"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "Navigation",
    "title": "Navigation",
    "icon": "\\uE700",
    "special": false,
    "items": [
      {
        "id": "BreadcrumbBar",
        "title": "BreadcrumbBar",
        "subtitle": "Shows the trail of navigation taken to the current location.",
        "description": "The BreadcrumbBar control provides a common horizontal layout to display the trail of navigation taken to the current location. Resize to see the nodes crumble, starting at the root.",
        "image": "assets/ControlImages/BreadcrumbBar.png",
        "group": "Navigation",
        "groupTitle": "Navigation",
        "tags": [
          "navigation trail",
          "path"
        ],
        "docs": [
          {
            "Title": "BreadcrumbBar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.breadcrumbbar"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/breadcrumbbar"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/Breadcrumb"
      },
      {
        "id": "NavigationView",
        "title": "NavigationView",
        "subtitle": "Common vertical layout for top-level areas of your app via a collapsible navigation menu.",
        "description": "The NavigationView control provides a common vertical layout for top-level areas of your app via a collapsible navigation menu.",
        "image": "assets/ControlImages/NavigationView.png",
        "group": "Navigation",
        "groupTitle": "Navigation",
        "tags": [
          "hamburger menu",
          "side nav",
          "nav pane"
        ],
        "docs": [
          {
            "Title": "NavigationView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.NavigationView"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/navigationview"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/NavigationView"
      },
      {
        "id": "Pivot",
        "title": "Pivot",
        "subtitle": "Presents information from different sources in a tabbed view.",
        "description": "Pivot is not recommended for Windows 11 design patterns. Please use the SelectorBar and SelectorBarItem. A Pivot allows you to show a collection of items from different sources in a tabbed view.",
        "image": "assets/ControlImages/Pivot.png",
        "group": "Navigation",
        "groupTitle": "Navigation",
        "tags": [
          "tabs",
          "tabbed view"
        ],
        "docs": [
          {
            "Title": "Pivot - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pivot"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/pivot"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ItemsControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/Pivot_themeresources.xaml"
      },
      {
        "id": "SelectorBar",
        "title": "SelectorBar",
        "subtitle": "Presents information from a small set of different sources. The user can pick one of them.",
        "description": "SelectorBar is used to modify the content shown by allowing users to select and switch between a small, finite set of data.",
        "image": "assets/ControlImages/Pivot.png",
        "group": "Navigation",
        "groupTitle": "Navigation",
        "tags": [
          "segmented",
          "tabs"
        ],
        "docs": [
          {
            "Title": "SelectorBar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.selectorbar"
          },
          {
            "Title": "SelectorBarItem - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.selectorbaritem"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/SelectorBar/SelectorBar_themeresources.xaml"
      },
      {
        "id": "TabView",
        "title": "TabView",
        "subtitle": "A control that displays a collection of tabs that can be used to display several documents.",
        "description": "TabView provides the user with a collection of tabs that can be used to display several documents.",
        "image": "assets/ControlImages/TabView.png",
        "group": "Navigation",
        "groupTitle": "Navigation",
        "tags": [
          "tabs",
          "tabbed",
          "tab control"
        ],
        "docs": [
          {
            "Title": "TabView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.tabview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/tab-view"
          },
          {
            "Title": "Show multiple views for an app",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/show-multiple-views"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": "/TabView"
      }
    ]
  },
  {
    "id": "Media",
    "title": "Media",
    "icon": "\\uE173",
    "special": false,
    "items": [
      {
        "id": "AnimatedVisualPlayer",
        "title": "AnimatedVisualPlayer",
        "subtitle": "An element to render and control playback of motion graphics.",
        "description": "An element to render and control playback of motion graphics.",
        "image": "assets/ControlImages/AnimatedVisualPlayer.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "Lottie",
          "animation",
          "motion graphics"
        ],
        "docs": [
          {
            "Title": "AnimatedVisualPlayer - API",
            "Uri": "https://learn.microsoft.com/windows/winui/api/microsoft.ui.xaml.controls.animatedvisualplayer"
          },
          {
            "Title": "Full Samples",
            "Uri": "ms-windows-store://pdp/?productid=9N3J5TG8FF7F"
          },
          {
            "Title": "Tutorials",
            "Uri": "https://learn.microsoft.com/windows/communitytoolkit/animations/lottie#tutorials"
          },
          {
            "Title": "Lottie Overview",
            "Uri": "https://learn.microsoft.com/windows/communitytoolkit/animations/lottie"
          },
          {
            "Title": "Lottie Windows - GitHub",
            "Uri": "https://github.com/CommunityToolkit/Lottie-Windows"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/AnimatedVisualPlayer"
      },
      {
        "id": "Chart",
        "title": "Chart",
        "subtitle": "A preview control for visualizing numeric, category, and date-time data.",
        "description": "Chart plots Samples with line, area, and bar series on category, linear, and date-time axes. Configure axis ranges, ticks, and grid lines, legends, series visibility, line and marker styles, data labels, per-point label and marker overrides, and updating series data.",
        "image": "assets/ControlImages/Chart.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "chart",
          "graph",
          "plot",
          "data visualization",
          "line chart",
          "bar chart",
          "area chart",
          "time series",
          "axis",
          "legend",
          "analytics",
          "dashboard",
          "KPI"
        ],
        "docs": [
          {
            "Title": "Chart - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.charts.chart"
          },
          {
            "Title": "Microsoft.UI.Xaml.Controls.Charts namespace",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.charts"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls.Charts",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": true,
        "sourcePath": "/Chart"
      },
      {
        "id": "Image",
        "title": "Image",
        "subtitle": "A control to display image content.",
        "description": "You can use an Image control to show and scale images.",
        "image": "assets/ControlImages/Image.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "picture",
          "BitmapImage",
          "photo"
        ],
        "docs": [
          {
            "Title": "Image - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.image"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/images-imagebrushes"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "InkCanvas",
        "title": "InkCanvas / InkToolbar",
        "subtitle": "Draw with pen, touch, or mouse and choose tools with an InkToolbar.",
        "description": "Use InkCanvas to collect freeform ink with pen, touch, or mouse. Pair it with InkToolbar to choose drawing tools. Explore input settings, customize the available tools, and save and restore strokes.",
        "image": "assets/ControlImages/InkToolbar.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "inking",
          "drawing",
          "InkToolbar",
          "pen",
          "stylus"
        ],
        "docs": [
          {
            "Title": "InkCanvas - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.inkcanvas"
          },
          {
            "Title": "InkToolbar - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.inktoolbar"
          },
          {
            "Title": "Inking controls overview",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/inking-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": true,
        "sourcePath": ""
      },
      {
        "id": "MediaPlayerElement",
        "title": "MediaPlayerElement",
        "subtitle": "A control to display video and image content.",
        "description": "You can use a MediaPlayerElement control to playback videos and show images. You can show transport controls or make the video autoplay.",
        "image": "assets/ControlImages/MediaPlayerElement.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "video",
          "media player",
          "audio",
          "playback"
        ],
        "docs": [
          {
            "Title": "MediaPlayerElement - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.MediaPlayerElement"
          },
          {
            "Title": "Media Playback",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/media-playback"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/MediaTransportControls_themeresources.xaml"
      },
      {
        "id": "PersonPicture",
        "title": "PersonPicture",
        "subtitle": "Displays the picture of a person/contact.",
        "description": "Displays the picture of a person/contact.",
        "image": "assets/ControlImages/PersonPicture.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "avatar",
          "contact photo"
        ],
        "docs": [
          {
            "Title": "PersonPicture - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.PersonPicture"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/person-picture"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/PersonPicture"
      },
      {
        "id": "Sound",
        "title": "Sound",
        "subtitle": "A code-behind only API that enables 2D and 3D UI sounds on all XAML controls.",
        "description": "Sound is enabled by default for UWP apps running on Xbox, but can be set to always play on all devices if desired. Sound may also be put into Spatial Audio mode for a more immersive 10ft experience.",
        "image": "assets/ControlImages/Sound.png",
        "group": "Media",
        "groupTitle": "Media",
        "tags": [
          "audio",
          "UI sound",
          "ElementSoundPlayer"
        ],
        "docs": [
          {
            "Title": "Sound - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.elementsoundplayer"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/sound"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "Styles",
    "title": "Styles",
    "icon": "\\uE2B1",
    "special": false,
    "items": [
      {
        "id": "Acrylic",
        "title": "AcrylicBrush",
        "subtitle": "A translucent material recommended for panel backgrounds.",
        "description": "A translucent material recommended for panel backgrounds.",
        "image": "assets/ControlImages/Acrylic.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "acrylic",
          "material",
          "translucent",
          "blur",
          "AcrylicBrush"
        ],
        "docs": [
          {
            "Title": "AcrylicBrush - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.acrylicbrush"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/acrylic"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Media",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": "/Materials/Acrylic"
      },
      {
        "id": "AnimatedIcon",
        "title": "AnimatedIcon",
        "subtitle": "An element that displays and controls an icon that animates when the user interacts with the control.",
        "description": "An element that displays and controls an icon that animates when the user interacts with the control.",
        "image": "assets/ControlImages/AnimatedIcon.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "animated icon",
          "icon animation",
          "Lottie icon"
        ],
        "docs": [
          {
            "Title": "AnimatedIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatedicon"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/animated-icon"
          },
          {
            "Title": "Lottie Overview",
            "Uri": "https://learn.microsoft.com/windows/communitytoolkit/animations/lottie"
          },
          {
            "Title": "Lottie Windows - GitHub",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.animatedvisualplayer"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "IconElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/AnimatedIcon"
      },
      {
        "id": "CompactSizing",
        "title": "Compact Sizing",
        "subtitle": "How to use a Resource Dictionary to enable compact sizing.",
        "description": "Enables the creation of compact, smaller apps by adding a style resource at the app, page or control level.",
        "image": "assets/ControlImages/CompactSizing.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "density",
          "compact sizing"
        ],
        "docs": [
          {
            "Title": "Spacing",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/spacing"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "IconElement",
        "title": "IconElement",
        "subtitle": "Represents icon controls that use different image types as its content.",
        "description": "Represents icon controls that use different image types as its content.",
        "image": "assets/ControlImages/Image.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "BitmapIcon",
          "FontIcon",
          "PathIcon",
          "SymbolIcon",
          "ImageIcon",
          "AnimatedIcon"
        ],
        "docs": [
          {
            "Title": "BitmapIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.bitmapicon"
          },
          {
            "Title": "FontIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.fonticon"
          },
          {
            "Title": "ImageIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.imageicon"
          },
          {
            "Title": "PathIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.pathicon"
          },
          {
            "Title": "SymbolIcon - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.symbolicon"
          },
          {
            "Title": "Icon Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/style/icons"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ImageIcon"
      },
      {
        "id": "Line",
        "title": "Line",
        "subtitle": "Draws a straight line between two points.",
        "description": "Draws a straight line between two points.",
        "image": "assets/ControlImages/Line.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "stroke",
          "draw line"
        ],
        "docs": [
          {
            "Title": "Lines - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.shapes"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/previous-versions/windows/apps/hh465055(v=win.10)"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Shapes",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Shape"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "Shape",
        "title": "Shape",
        "subtitle": "How to draw shapes, such as ellipses, rectangles, and polygons.",
        "description": "Basic shapes are intended for decorative rendering or for compositing non-interactive parts of controls.",
        "image": "assets/ControlImages/Shape.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "shapes",
          "ellipse",
          "rectangle",
          "polygon",
          "path",
          "circle"
        ],
        "docs": [
          {
            "Title": "Shapes - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.shapes"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/previous-versions/windows/apps/hh465055(v=win.10)"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Shapes",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "RadialGradientBrush",
        "title": "RadialGradientBrush",
        "subtitle": "A brush to show radial gradients.",
        "description": "Paints an area with a radial gradient. A center point defines the beginning of the gradient, and a radius defines the end point of the gradient.",
        "image": "assets/ControlImages/Canvas.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "gradient",
          "radial gradient",
          "brush"
        ],
        "docs": [
          {
            "Title": "RadialGradientBrush - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.RadialGradientBrush"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Media",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "Brush",
          "XamlCompositionBrushBase"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "SystemBackdrops",
        "title": "System Backdrops (Mica/Acrylic)",
        "subtitle": "System backdrops, like Mica and Acrylic, for app windows.",
        "description": "System backdrops apply a material effect to the window background. Mica is opaque and samples the desktop wallpaper; Desktop Acrylic is semi-transparent and shows a blurred view of what is behind the window. Available backdrop kinds: Mica, Mica Alt, Desktop Acrylic Base, and Desktop Acrylic Thin. Use the built-in MicaBackdrop or DesktopAcrylicBackdrop types for simplicity, or use MicaController / DesktopAcrylicController for full customization.",
        "image": "assets/ControlImages/Acrylic.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "Mica",
          "Acrylic",
          "window material"
        ],
        "docs": [
          {
            "Title": "SystemBackdrop - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.systembackdrop"
          },
          {
            "Title": "MicaBackdrop - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.micabackdrop"
          },
          {
            "Title": "DesktopAcrylicBackdrop - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.desktopacrylicbackdrop"
          },
          {
            "Title": "MicaController - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.systembackdrops.micacontroller"
          },
          {
            "Title": "DesktopAcrylicController - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.composition.systembackdrops.desktopacryliccontroller"
          }
        ],
        "apiNamespace": "Microsoft.UI.Composition.SystemBackdrops",
        "baseClasses": [
          "Object",
          "DependencyObject"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/Materials"
      },
      {
        "id": "SystemBackdropElement",
        "title": "SystemBackdropElement",
        "subtitle": "An element to host system backdrop materials.",
        "description": "SystemBackdropElement applies system backdrop materials (Mica and Acrylic) to specific areas inside the UI tree, extending these materials beyond the window background to enable more flexible and immersive designs.",
        "image": "assets/ControlImages/Acrylic.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "Mica",
          "Acrylic",
          "material"
        ],
        "docs": [
          {
            "Title": "SystemBackdropElement - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.systembackdropelement"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ContentControl"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ThemeShadow",
        "title": "ThemeShadow",
        "subtitle": "Adds a depth-aware shadow to UI elements using system lighting.",
        "description": "Adds a realistic shadow effect to UI elements using the system's lighting and depth to enhance visual hierarchy.",
        "image": "assets/ControlImages/ThemeShadow.png",
        "group": "Styles",
        "groupTitle": "Styles",
        "tags": [
          "depth",
          "elevation"
        ],
        "docs": [
          {
            "Title": "Z-depth and shadow design guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/layout/depth-shadow"
          },
          {
            "Title": "ThemeShadow - API",
            "Uri": "https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.themeshadow"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Media",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "Shadow"
        ],
        "isNew": true,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "Text",
    "title": "Text",
    "icon": "\\uE8D2",
    "special": false,
    "items": [
      {
        "id": "AutoSuggestBox",
        "title": "AutoSuggestBox",
        "subtitle": "A control to provide suggestions as a user is typing.",
        "description": "A text control that makes suggestions to users as they type. The app is notified when text has been changed by the user and is responsible for providing relevant suggestions for this control to display.",
        "image": "assets/ControlImages/AutoSuggestBox.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "search box",
          "autocomplete",
          "suggestions",
          "typeahead"
        ],
        "docs": [
          {
            "Title": "AutoSuggestBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.autosuggestbox"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/auto-suggest-box"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control",
          "ItemsControl"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/AutoSuggestBox"
      },
      {
        "id": "NumberBox",
        "title": "NumberBox",
        "subtitle": "A text control used for numeric input and evaluation of algebraic equations.",
        "description": "Use NumberBox to allow users to enter algebraic equations and numeric input in your app.",
        "image": "assets/ControlImages/NumberBox.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "numeric input",
          "spinner",
          "calculator"
        ],
        "docs": [
          {
            "Title": "NumberBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.numberbox"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/number-box"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/NumberBox"
      },
      {
        "id": "PasswordBox",
        "title": "PasswordBox",
        "subtitle": "A control for entering passwords.",
        "description": "A user can enter a single line of non-wrapping text in a PasswordBox control. The text is masked by characters that you can specify by using the PasswordChar property, and you can specify the maximum number of characters that the user can enter by setting the MaxLength property.",
        "image": "assets/ControlImages/PasswordBox.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "secure input",
          "reveal"
        ],
        "docs": [
          {
            "Title": "PasswordBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.passwordbox"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/text-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/PasswordBox_themeresources.xaml"
      },
      {
        "id": "RichEditBox",
        "title": "RichEditBox",
        "subtitle": "A rich text editing control that supports formatted text, hyperlinks, and other rich content.",
        "description": "You can use a RichEditBox control to enter and edit rich text documents that contain formatted text, hyperlinks, and images. By default, the RichEditBox supports spell checking. You can make a RichEditBox read-only by setting its IsReadOnly property to true.",
        "image": "assets/ControlImages/RichEditBox.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "rich text editor",
          "RTF",
          "formatted text",
          "editor"
        ],
        "docs": [
          {
            "Title": "RichEditBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.richeditbox"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/text-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/RichEditBox_themeresources.xaml"
      },
      {
        "id": "RichTextBlock",
        "title": "RichTextBlock",
        "subtitle": "A control that displays formatted text, hyperlinks, inline images, and other rich content.",
        "description": "RichTextBlock provides more advanced formatting features than the TextBlock control. You can apply character and paragraph formatting to the text in the RichTextBlock. For example, you can apply Bold, Italic, and Underline to any portion of the text in the control. You can use linked text containers (a RichTextBlock linked to RichTextBlockOverflow elements) to create advanced page layouts.",
        "image": "assets/ControlImages/RichTextBlock.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "rich text",
          "formatted text",
          "inline content"
        ],
        "docs": [
          {
            "Title": "RichTextBlock - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.richtextblock"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/text-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "TextBlock",
        "title": "TextBlock",
        "subtitle": "A lightweight control for displaying small amounts of text.",
        "description": "TextBlock is the primary control for displaying read-only text in your app. You typically display text by setting the Text property to a simple string. You can also display a series of strings in Run elements and give each different formatting.",
        "image": "assets/ControlImages/TextBlock.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "label",
          "display text"
        ],
        "docs": [
          {
            "Title": "TextBlock - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.textblock"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/text-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/TextBlock_themeresources.xaml"
      },
      {
        "id": "TextBox",
        "title": "TextBox",
        "subtitle": "A single-line or multi-line plain text field.",
        "description": "Use a TextBox to let a user enter simple text input in your app. You can add a header and placeholder text to let the user know what the TextBox is for, and you can customize it in other ways.",
        "image": "assets/ControlImages/TextBox.png",
        "group": "Text",
        "groupTitle": "Text",
        "tags": [
          "text input",
          "input field",
          "text field"
        ],
        "docs": [
          {
            "Title": "TextBox - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.textbox"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/controls/text-controls"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/CommonStyles/TextBox_themeresources.xaml"
      }
    ]
  },
  {
    "id": "Motion",
    "title": "Motion",
    "icon": "\\uE945",
    "special": false,
    "items": [
      {
        "id": "XamlCompInterop",
        "title": "Animation interop",
        "subtitle": "XAML and Composition interop allows you to animate elements using expressions, natural animations, and more.",
        "description": "XAML and Composition interop allows you to animate elements using expressions, natural animations, and more",
        "image": "assets/ControlImages/AnimationInterop.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "composition",
          "Visual layer",
          "expression animation",
          "interop"
        ],
        "docs": [
          {
            "Title": "Quickstart: Motion",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion"
          },
          {
            "Title": "Composition Animation - API",
            "Uri": "https://learn.microsoft.com/windows/apps/windows-app-sdk/composition"
          },
          {
            "Title": "Guidelines - Xaml Property Animations",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/xaml-property-animations"
          }
        ],
        "apiNamespace": "",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ConnectedAnimation",
        "title": "Connected Animation",
        "subtitle": "Connected animations continue elements during page navigation and help the user maintain their context between views.",
        "description": "Connected animations continue elements during page navigation and help the user maintain their context between views.",
        "image": "assets/ControlImages/ConnectedAnimation.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "connected animation",
          "continuity",
          "page transition"
        ],
        "docs": [
          {
            "Title": "ConnectedAnimation - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.animation.connectedanimation"
          },
          {
            "Title": "ConnectedAnimationService - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.animation.connectedanimationservice"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/connected-animation"
          },
          {
            "Title": "Quickstart: Motion",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Media.Animation",
        "baseClasses": [
          "Object"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "EasingFunction",
        "title": "Easing Functions",
        "subtitle": "Easing is a way to manipulate the velocity of an object as it animates.",
        "description": "Easing is a way to manipulate the velocity of an object as it animates.",
        "image": "assets/ControlImages/EasingFunction.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "animation curve",
          "velocity"
        ],
        "docs": [
          {
            "Title": "EasingFunctionBase - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.media.animation.easingfunctionbase"
          },
          {
            "Title": "Timing and Easing",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/timing-and-easing"
          },
          {
            "Title": "Quickstart: Motion",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Media.Animation",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ImplicitTransition",
        "title": "Implicit Transitions",
        "subtitle": "Use Implicit Transitions to automatically animate changes to properties.",
        "description": "Use Implicit Transitions to automatically animate changes to properties.",
        "image": "assets/ControlImages/ImplicitTransition.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "implicit animation",
          "transition",
          "property animation"
        ],
        "docs": [
          {
            "Title": "Transitions - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.transitions#Windows_UI_Xaml_UIElement_Transitions"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/motion-in-practice#implicit-animations"
          },
          {
            "Title": "Quickstart: Motion",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "PageTransition",
        "title": "Page Transitions",
        "subtitle": "Page transitions provide visual feedback about the relationship between pages.",
        "description": "Page transitions provide visual feedback about the relationship between pages.",
        "image": "assets/ControlImages/PageTransition.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "page transition",
          "navigation transition",
          "NavigationTransitionInfo"
        ],
        "docs": [
          {
            "Title": "NavigationThemeTransition - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Media.Animation.NavigationThemeTransition"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/page-transitions"
          },
          {
            "Title": "Quickstart: Motion",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Media.Animation",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ThemeTransition",
        "title": "Theme Transitions",
        "subtitle": "Theme transitions are pre-packaged, easy-to-apply animations.",
        "description": "Theme transitions are pre-packaged, easy-to-apply animations.",
        "image": "assets/ControlImages/ThemeTransition.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "theme transition",
          "entrance animation",
          "EntranceThemeTransition"
        ],
        "docs": [
          {
            "Title": "Transitions - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.transitions#Windows_UI_Xaml_UIElement_Transitions"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/xaml-animation#animations-available-in-the-library"
          },
          {
            "Title": "Quickstart: Motion",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "ParallaxView",
        "title": "ParallaxView",
        "subtitle": "A container control that provides the parallax effect when scrolling.",
        "description": "A container control that provides the parallax effect when scrolling.",
        "image": "assets/ControlImages/ParallaxView.png",
        "group": "Motion",
        "groupTitle": "Motion",
        "tags": [
          "scrolling effect"
        ],
        "docs": [
          {
            "Title": "ParallaxView - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.Controls.Parallaxview"
          },
          {
            "Title": "Guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/motion/parallax"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement"
        ],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": "/ParallaxView"
      }
    ]
  },
  {
    "id": "MultipleWindows",
    "title": "Windowing",
    "icon": "\\uE7C4",
    "special": false,
    "items": [
      {
        "id": "TitleBar",
        "title": "TitleBar",
        "subtitle": "An example showing how to use the default TitleBar control.",
        "description": "The TitleBar control provides a simple way to create a modern titlebar UX with interactive content.",
        "image": "assets/ControlImages/TitleBar.png",
        "group": "MultipleWindows",
        "groupTitle": "Windowing",
        "tags": [
          "title bar",
          "caption bar",
          "custom title bar"
        ],
        "docs": [
          {
            "Title": "Title bar customization",
            "Uri": "https://learn.microsoft.com/windows/apps/develop/title-bar"
          },
          {
            "Title": "Title bar - design guidelines",
            "Uri": "https://learn.microsoft.com/windows/apps/design/basics/titlebar-design"
          }
        ],
        "apiNamespace": "Microsoft.UI.Xaml.Controls",
        "baseClasses": [
          "Object",
          "DependencyObject",
          "UIElement",
          "FrameworkElement",
          "Control"
        ],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  },
  {
    "id": "System",
    "title": "System",
    "icon": "\\uE770",
    "special": false,
    "items": [
      {
        "id": "Clipboard",
        "title": "Clipboard",
        "subtitle": "Copy and paste text, images, and files to and from the system Clipboard.",
        "description": "Use the Clipboard API to copy and paste text, images, and files. Configure clipboard history and roaming options, monitor content changes, and inspect available formats.",
        "image": "assets/ControlImages/Clipboard.png",
        "group": "System",
        "groupTitle": "System",
        "tags": [
          "copy",
          "paste",
          "cut"
        ],
        "docs": [
          {
            "Title": "Clipboard - API",
            "Uri": "https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard"
          },
          {
            "Title": "ClipboardContentOptions - API",
            "Uri": "https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboardcontentoptions"
          },
          {
            "Title": "Copy and paste - Guide",
            "Uri": "https://learn.microsoft.com/windows/apps/develop/communication/copy-and-paste"
          }
        ],
        "apiNamespace": "Windows.ApplicationModel.DataTransfer",
        "baseClasses": [],
        "isNew": false,
        "isUpdated": false,
        "isExperimental": false,
        "sourcePath": ""
      },
      {
        "id": "StoragePickers",
        "title": "Storage pickers",
        "subtitle": "Select files and folders with modern system pickers.",
        "description": "Use the FileOpenPicker, FileSavePicker, and FolderPicker APIs to let users select files and folders in a secure way.",
        "image": "assets/ControlImages/StoragePickers.png",
        "group": "System",
        "groupTitle": "System",
        "tags": [
          "file picker",
          "FileOpenPicker",
          "FileSavePicker",
          "FolderPicker",
          "file dialog"
        ],
        "docs": [
          {
            "Title": "FileOpenPicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.windows.storage.pickers.fileopenpicker"
          },
          {
            "Title": "FileSavePicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.windows.storage.pickers.filesavepicker"
          },
          {
            "Title": "FolderPicker - API",
            "Uri": "https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.windows.storage.pickers.folderpicker"
          }
        ],
        "apiNamespace": "Microsoft.Windows.Storage.Pickers",
        "baseClasses": [
          "Object"
        ],
        "isNew": false,
        "isUpdated": true,
        "isExperimental": false,
        "sourcePath": ""
      }
    ]
  }
];
