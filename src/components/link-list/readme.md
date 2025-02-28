The `sbb-link-list` is a component that can be used to collect and display more [sbb-link](/docs/components-sbb-link--docs)s.

```html
<sbb-link-list>
  <sbb-link href="https://www.sbb.ch/en/help-and-contact/refunds-compensation/ticket-refunds.html"
    >Refunds</sbb-link
  >
  <sbb-link href="https://www.sbb.ch/en/help-and-contact/lost-found-office/submit-loss-report.html"
    >Loss Report</sbb-link
  >
  ...
</sbb-link-list>
```

## Slots

The component can display an optional title,
which is visually shown as a level-5 [sbb-title](/docs/components-sbb-title--docs)
and is used as the `aria-labelledby` attribute of the `ul` element.

The title can be set using the `titleContent` property or, alternatively, can be projected using the `title` slot.

```html
<sbb-link-list title-content="Help &amp; Contact"> ... </sbb-link-list>
```

## Style

The component will automatically set variant `block` on nested `sbb-link` instances,
and it will sync its `size` and `negative` property with the inner links.

```html
<sbb-link-list size="s" negative>
  <sbb-link href="https://www.sbb.ch/en/help-and-contact/refunds-compensation/ticket-refunds.html"
    >Refunds</sbb-link
  >
  <sbb-link href="https://www.sbb.ch/en/help-and-contact/lost-found-office/submit-loss-report.html"
    >Loss Report</sbb-link
  >
  ...
</sbb-link-list>
```

### Orientation

The `orientation` property is used to set links' orientation; possible values are `horizontal` and `vertical` (default).
The optional property `horizontalFrom` can be used in combination with `orientation='vertical'`
to indicate the minimum breakpoint from which the orientation changes to `horizontal`.
The title will not be displayed in the horizontal orientation.

```html
<sbb-link-list horizontal-from="medium">
  <sbb-link href="https://www.sbb.ch/en/help-and-contact/refunds-compensation/ticket-refunds.html"
    >Refunds</sbb-link
  >
  <sbb-link href="https://www.sbb.ch/en/help-and-contact/lost-found-office/submit-loss-report.html"
    >Loss Report</sbb-link
  >
  ...
</sbb-link-list>
```

<!-- Auto Generated Below -->

## Properties

| Name             | Attribute         | Privacy | Type                             | Default      | Description                                                                                                                                         |
| ---------------- | ----------------- | ------- | -------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titleContent`   | `title-content`   | public  | `string \| undefined`            |              | The title text we want to show before the list.                                                                                                     |
| `titleLevel`     | `title-level`     | public  | `TitleLevel \| undefined`        | `'2'`        | The semantic level of the title, e.g. 2 = h2.                                                                                                       |
| `size`           | `size`            | public  | `SbbLinkSize`                    | `'s'`        | Text size of the nested sbb-link instances. This will overwrite the size attribute of nested sbb-link instances.                                    |
| `negative`       | `negative`        | public  | `boolean`                        |              | Whether to render the link list and nested sbb-link instances as negative. This will overwrite the negative attribute of nested sbb-link instances. |
| `horizontalFrom` | `horizontal-from` | public  | `SbbHorizontalFrom \| undefined` |              | Selected breakpoint from which the list is rendered horizontally.                                                                                   |
| `orientation`    | `orientation`     | public  | `SbbOrientation`                 | `'vertical'` | The orientation in which the list will be shown vertical or horizontal.                                                                             |

## Slots

| Name    | Description                                         |
| ------- | --------------------------------------------------- |
|         | Use the unnamed slot to add one or more `sbb-link`. |
| `title` | Use this slot to provide a title.                   |
