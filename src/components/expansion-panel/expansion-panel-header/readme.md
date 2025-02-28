The `sbb-expansion-panel-header` is a component which is meant to be used as a header
in the [sbb-expansion-panel](/docs/components-sbb-accordion-sbb-expansion-panel--docs),
acting as a control for an expanding / collapsing content, like a native `<summary>` tag.

```html
<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>
```

## Slots

The component is internally rendered as a button, and it is possible to provide text via an unnamed slot.
On the left side, a toggle icon is displayed; it flips based on the host's `aria-expanded` property.

The component can optionally display a `sbb-icon` at the component start using the `iconName`
property or via custom content using the `icon` slot.
If using the SBB icons, the icon should be a medium size icon.

```html
<sbb-expansion-panel-header icon-name="swisspass-medium">Header</sbb-expansion-panel-header>
```

## States

The component can be displayed in `disabled` state using the self-named property.

```html
<sbb-expansion-panel-header disabled>Header</sbb-expansion-panel-header>
```

## Events

When the element is clicked, the `toggleExpanded` event is emitted.

<!-- Auto Generated Below -->

## Properties

| Name       | Attribute   | Privacy | Type                  | Default | Description                                                                                                                      |
| ---------- | ----------- | ------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `iconName` | `icon-name` | public  | `string \| undefined` |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from here https://icons.app.sbb.ch. |
| `disabled` | `disabled`  | public  | `boolean`             |         | Whether the button is disabled.                                                                                                  |

## Events

| Name             | Type                | Description                                            | Inherited From |
| ---------------- | ------------------- | ------------------------------------------------------ | -------------- |
| `toggleExpanded` | `CustomEvent<void>` | Notifies that the `sbb-expansion-panel` has to expand. |                |

## Slots

| Name   | Description                                                              |
| ------ | ------------------------------------------------------------------------ |
|        | Use the unnamed slot to add content to the `sbb-expansion-panel-header`. |
| `icon` | Slot used to render the `sbb-expansion-panel-header` icon.               |
