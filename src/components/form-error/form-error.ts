import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { assignId } from '../core/a11y';
import { isValidAttribute } from '../core/dom';

import style from './form-error.scss?lit&inline';

let nextId = 0;

/**
 * It displays an error message in the `sbb-form-field`.
 *
 * @slot - Use this slot to display the error message.
 * @slot icon - Use this slot to override the default error icon.
 */
@customElement('sbb-form-error')
export class SbbFormErrorElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  public override connectedCallback(): void {
    super.connectedCallback();
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = isValidAttribute(formField, 'negative');
    }
  }

  protected override render(): TemplateResult {
    assignId(() => `sbb-form-error-${++nextId}`)(this);

    return html`
      <span class="form-error__icon">
        <slot name="icon">
          <svg
            class="form-error__icon-svg"
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="3" x2="7" y2="8.5" />
            <line x1="7" y1="10" x2="7" y2="11" />
            <circle cx="7" cy="7" r="6.5" />
          </svg>
        </slot>
      </span>
      <span class="form-error-content">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-form-error': SbbFormErrorElement;
  }
}
