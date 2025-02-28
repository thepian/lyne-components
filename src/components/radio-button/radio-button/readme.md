The `sbb-radio-button` component provides the same functionality
as a native `<input type="radio"/>` enhanced with the SBB Design: use multiple `sbb-radio-button` components
inside a [sbb-radio-button-group](/docs/components-sbb-radio-button-sbb-radio-button-group--docs) component
in order to display a radio input within a group.

```html
<sbb-radio-button-group value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>
```

## States

It is possible to display the component in `disabled` or `checked` state by using the self-named properties.

The component has a `required` property, which can be useful
for setting a custom [sbb-form-error](/docs/components-sbb-form-field-sbb-form-error--docs) message
within a [sbb-form-field](/docs/components-sbb-form-field-sbb-form-field--docs).

The `allowEmptySelection` property allows user to deselect the component.

```html
<sbb-radio-button value="One" checked>Option one</sbb-radio-button>

<sbb-radio-button value="Two" disabled>Option two</sbb-radio-button>

<sbb-radio-button value="Three" required>Option three</sbb-radio-button>

<sbb-radio-button value="Four" allowEmptySelection>Option four</sbb-radio-button>
```

## Style

The component has two different sizes, which can be changed using the `size` property (`m`, which is the default, and `s`).

```html
<sbb-radio-button value="small" size="s">Size</sbb-radio-button>
```

<!-- Auto Generated Below -->

## Properties

| Name                  | Attribute               | Privacy | Type                                 | Default | Description                                    |
| --------------------- | ----------------------- | ------- | ------------------------------------ | ------- | ---------------------------------------------- |
| `allowEmptySelection` | `allow-empty-selection` | public  | `boolean`                            | `false` | Whether the radio can be deselected.           |
| `value`               | `value`                 | public  | `string`                             |         | Value of radio button.                         |
| `disabled`            | `disabled`              | public  | `boolean`                            | `false` | Whether the radio button is disabled.          |
| `required`            | `required`              | public  | `boolean`                            | `false` | Whether the radio button is required.          |
| `group`               | -                       | public  | `SbbRadioButtonGroupElement \| null` |         | Reference to the connected radio button group. |
| `checked`             | `checked`               | public  | `boolean`                            | `false` | Whether the radio button is checked.           |
| `size`                | `size`                  | public  | `SbbRadioButtonSize`                 | `'m'`   | Label size variant, either m or s.             |

## Methods

| Name     | Privacy | Description | Parameters | Return | Inherited From |
| -------- | ------- | ----------- | ---------- | ------ | -------------- |
| `select` | public  |             |            | `void` |                |

## Slots

| Name      | Description                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
|           | Use the unnamed slot to add content to the radio label.                                               |
| `subtext` | Slot used to render a subtext under the label (only visible within a `sbb-selection-panel`).          |
| `suffix`  | Slot used to render additional content after the label (only visible within a `sbb-selection-panel`). |
