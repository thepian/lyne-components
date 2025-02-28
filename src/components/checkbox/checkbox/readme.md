The `sbb-checkbox` component provides the same functionality as a native `<input type="checkbox"/>` enhanced with the SBB Design.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon` using
the `iconName` property or via custom SVG using the `icon` slot.
The icon can be placed before or after the label based on the value of the `iconPlacement` property (default: `end`).

```html
<sbb-checkbox value="checkbox">Example</sbb-checkbox>

<sbb-checkbox value="icon" icon-name="tickets-class-small">Icon</sbb-checkbox>

<sbb-checkbox value="start-icon" icon-name="tickets-class-small" icon-placement="start"
  >Icon at start</sbb-checkbox
>
```

## States

The component could be checked or not depending on the value of the `checked` attribute.

```html
<sbb-checkbox value="checked-checkbox" checked>Checked state</sbb-checkbox>
```

It has a third state too, which is set if the `indeterminate` property is true.
This is useful when multiple dependent checkboxes are used
(e.g., a parent which is checked only if all the children are checked, otherwise is in indeterminate state).
Clicking on a `sbb-checkbox` in this state sets `checked` to `true` and `indeterminate` to false.

```html
<sbb-checkbox value="indeterminate-checkbox" indeterminate="true">Indeterminate state</sbb-checkbox>
```

The component can be displayed in `disabled` or `required` state by using the self-named properties.

```html
<sbb-checkbox value="required-checkbox" required="true">Required</sbb-checkbox>

<sbb-checkbox value="disabled-checkbox" disabled="true">Disabled</sbb-checkbox>
```

## Style

The component has two `size`, named `s` (default) and `m`.

```html
<sbb-checkbox value="size" size="m">Size</sbb-checkbox>
```

## Events

Consumers can listen to the native `change` event on the `sbb-checkbox` component to intercept the input's change;
the current state can be read from `event.target.checked`, while the value from `event.target.value`.

## Accessibility

The component uses an internal `<input type="checkbox"/>` element to provide an accessible experience.

This internal checkbox receives focus and is automatically labeled by the text content of the `sbb-checkbox` element.
Avoid adding other interactive controls into the content of `sbb-checkbox`, as this degrades the experience for users of assistive technology.

Always provide an accessible label via `aria-label` for checkboxes without descriptive text content.
If you don't want the label to appear next to the checkbox, you can use `aria-label` to specify an appropriate label.

```html
<sbb-checkbox aria-label="Subscribed to email message"></sbb-checkbox>
```

<!-- Auto Generated Below -->

## Properties

| Name            | Attribute        | Privacy | Type                              | Default | Description                                                                                                                            |
| --------------- | ---------------- | ------- | --------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `value`         | `value`          | public  | `string \| undefined`             |         | Value of checkbox.                                                                                                                     |
| `disabled`      | `disabled`       | public  | `boolean`                         | `false` | Whether the checkbox is disabled.                                                                                                      |
| `required`      | `required`       | public  | `boolean`                         | `false` | Whether the checkbox is required.                                                                                                      |
| `group`         | -                | public  | `SbbCheckboxGroupElement \| null` |         | Reference to the connected checkbox group.                                                                                             |
| `indeterminate` | `indeterminate`  | public  | `boolean`                         | `false` | Whether the checkbox is indeterminate.                                                                                                 |
| `iconName`      | `icon-name`      | public  | `string \| undefined`             |         | The icon name we want to use, choose from the small icon variants from the ui-icons category from https://icons.app.sbb.ch (optional). |
| `iconPlacement` | `icon-placement` | public  | `SbbIconPlacement`                | `'end'` | The label position relative to the labelIcon. Defaults to end                                                                          |
| `checked`       | `checked`        | public  | `boolean`                         | `false` | Whether the checkbox is checked.                                                                                                       |
| `size`          | `size`           | public  | `SbbCheckboxSize`                 | `'m'`   | Label size variant, either m or s.                                                                                                     |

## Events

| Name        | Type                | Description                                                                      | Inherited From |
| ----------- | ------------------- | -------------------------------------------------------------------------------- | -------------- |
| `didChange` | `CustomEvent<void>` | Deprecated. used for React. Will probably be removed once React 19 is available. |                |

## Slots

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to add content to the `sbb-checkbox`.                                      |
| `icon`    | Slot used to render the checkbox icon (disabled inside a selection panel).                      |
| `subtext` | Slot used to render a subtext under the label (only visible within a selection panel).          |
| `suffix`  | Slot used to render additional content after the label (only visible within a selection panel). |
