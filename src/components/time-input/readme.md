The `sbb-time-input` is a component that displays the typed value as a formatted time (HH:mm).

The component allows the insertion of up to 4 numbers, possibly with a separator char like `.`, `:`, `,` or `-`,
then automatically formats the value as time and displays it (see ["Format example"](#format-example)).

The component and the native `input` can be connected using the `input` property,
which accepts the id of the native input, or directly its reference.

```html
<input value="13:30" id="input-id" /> <sbb-time-input input="input-id"></sbb-time-input>
```

## In `sbb-form-field`

If the `sbb-time-input` is used within a `sbb-form-field` with a native input, they are automatically linked.

```html
<sbb-form-field width="collapse">
  <input value="13:30" />
  <sbb-time-input></sbb-time-input>
</sbb-form-field>
```

The initial value can be set using the `value` property (string) of the `input`or the `setValueAsDate()` method of the `sbb-time-input`.

When the input changes, if it is valid, the component updates the `value` of the `input`.

To get the value as a `Date` object, the `getValueAsDate()` method of the `sbb-time-input` can be called.
The date is constructed like following: the start date is set to 01.01.1970, 00:00:00 UTC, then the typed hours and minuted are added,
e.g.: with a value of `12:34`, the `getValueAsDate()` will be 01.01.1970, 12:34:00 UTC.

If the value is invalid because not real (e.g. 12:61 or 25:30), the component does not format the `value`,
and will return `null` if `getValueAsDate()` was called.

## Format example

See the table below for some formatting examples:

| Input | Output |
| ----- | ------ |
| 12:34 | 12:34  |
| 1     | 01:00  |
| 12    | 12:00  |
| 123   | 01:23  |
| 1234  | 12:34  |
| 1.    | 01:00  |
| 1.2   | 01:02  |
| 1.23  | 01:23  |
| 12:   | 12:00  |
| 12.3  | 12:03  |
| 12,34 | 12:34  |
| 12-34 | 12:34  |

## Events

Whenever the validation state changes (e.g., a valid value becomes invalid or vice-versa), the `validationChange` event is emitted.

<!-- Auto Generated Below -->

## Properties

| Name    | Attribute | Privacy | Type                    | Default | Description                                                |
| ------- | --------- | ------- | ----------------------- | ------- | ---------------------------------------------------------- |
| `input` | `input`   | public  | `string \| HTMLElement` |         | Reference of the native input connected to the datepicker. |

## Methods

| Name             | Privacy | Description                                           | Parameters          | Return         | Inherited From |
| ---------------- | ------- | ----------------------------------------------------- | ------------------- | -------------- | -------------- |
| `getValueAsDate` | public  | Gets the input value with the correct date format.    |                     | `Date \| null` |                |
| `setValueAsDate` | public  | Set the input value to the correctly formatted value. | `date: SbbDateLike` | `void`         |                |

## Events

| Name               | Type                                 | Description                                                                      | Inherited From |
| ------------------ | ------------------------------------ | -------------------------------------------------------------------------------- | -------------- |
| `didChange`        | `CustomEvent<void>`                  | Deprecated. used for React. Will probably be removed once React 19 is available. |                |
| `validationChange` | `CustomEvent<ValidationChangeEvent>` | Emits whenever the internal validation state changes.                            |                |
