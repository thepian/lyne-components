/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-file-selector renders default"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <sbb-button
        data-slot-names="unnamed"
        dir="ltr"
        icon-name="folder-open-small"
        is-static=""
        size="m"
        variant="secondary"
      >
        Choose a file
      </sbb-button>
      <input
        class="sbb-file-selector__visually-hidden"
        type="file"
      >
    </label>
  </div>
  <p
    class="sbb-file-selector__visually-hidden"
    role="status"
  >
  </p>
  <div class="sbb-file-selector__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-file-selector renders default */

snapshots["sbb-file-selector renders with dropzone area"] = 
`<div class="sbb-file-selector">
  <div class="sbb-file-selector__input-container">
    <label>
      <span class="sbb-file-selector__dropzone-area">
        <span class="sbb-file-selector__dropzone-area--icon">
          <sbb-icon
            aria-hidden="true"
            data-namespace="default"
            name="folder-open-medium"
            role="img"
          >
          </sbb-icon>
        </span>
        <span class="sbb-file-selector__dropzone-area--title">
        </span>
        <span class="sbb-file-selector__dropzone-area--subtitle">
          Drag & Drop your files here
        </span>
        <span class="sbb-file-selector__dropzone-area--button">
          <sbb-button
            data-slot-names="unnamed"
            dir="ltr"
            is-static=""
            size="m"
            variant="secondary"
          >
            Choose a file
          </sbb-button>
        </span>
      </span>
      <input
        class="sbb-file-selector__visually-hidden"
        type="file"
      >
    </label>
  </div>
  <p
    class="sbb-file-selector__visually-hidden"
    role="status"
  >
  </p>
  <div class="sbb-file-selector__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-file-selector renders with dropzone area */

