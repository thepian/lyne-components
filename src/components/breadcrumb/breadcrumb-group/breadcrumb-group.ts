import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { getNextElementIndex, isArrowKeyPressed, sbbInputModalityDetector } from '../../core/a11y';
import { LanguageController, SlotChildObserver } from '../../core/common-behaviors';
import { setAttribute } from '../../core/dom';
import { ConnectedAbortController } from '../../core/eventing';
import { i18nBreadcrumbEllipsisButtonLabel } from '../../core/i18n';
import { AgnosticResizeObserver } from '../../core/observers';
import type { SbbBreadcrumbElement } from '../breadcrumb';

import style from './breadcrumb-group.scss?lit&inline';

import '../../icon';

/**
 * It can be used as a container for one or more `sbb-breadcrumb` component.
 *
 * @slot - Use the unnamed slot to add `sbb-breadcrumb` elements.
 */
@customElement('sbb-breadcrumb-group')
export class SbbBreadcrumbGroupElement extends SlotChildObserver(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Local instance of slotted sbb-breadcrumb elements */
  @state() private _breadcrumbs: SbbBreadcrumbElement[] = [];

  @state() private _state?: 'collapsed' | 'manually-expanded';

  private _resizeObserver = new AgnosticResizeObserver(() => this._evaluateCollapsedState());
  private _abort = new ConnectedAbortController(this);
  private _language = new LanguageController(this);
  private _markForFocus = false;

  private _handleKeyDown(evt: KeyboardEvent): void {
    if (
      !this._breadcrumbs ||
      // don't trap nested handling
      ((evt.target as HTMLElement) !== this && (evt.target as HTMLElement).parentElement !== this)
    ) {
      return;
    }

    if (isArrowKeyPressed(evt)) {
      if (this._state === 'collapsed') {
        return this._focusNextCollapsed(evt);
      }
      this._focusNext(evt);
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal });
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this._resizeObserver.observe(this);
    this.toggleAttribute('data-loaded', true);
  }

  protected override updated(): void {
    if (this._markForFocus && sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      this._breadcrumbs[1]?.focus();

      // Reset mark for focus
      this._markForFocus = false;
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver.disconnect();
  }

  /** Creates and sets an array with only the sbb-breadcrumb children. */
  protected override checkChildren(): void {
    this._evaluateCollapsedState();

    const breadcrumbs = Array.from(this.children ?? []).filter(
      (e): e is SbbBreadcrumbElement => e.tagName === 'SBB-BREADCRUMB',
    );
    // If the slotted sbb-breadcrumb instances have not changed,
    // we can skip syncing and updating the breadcrumb reference list.
    if (
      this._breadcrumbs &&
      breadcrumbs.length === this._breadcrumbs.length &&
      this._breadcrumbs.every((e, i) => breadcrumbs[i] === e)
    ) {
      return;
    }
    this._breadcrumbs = breadcrumbs;
    this._syncBreadcrumbs();
  }

  /** Apply the aria-current attribute to the last sbb-breadcrumb element. */
  private _syncBreadcrumbs(): void {
    this._breadcrumbs.forEach((breadcrumb, index) => {
      breadcrumb.removeAttribute('aria-current');
      if (!breadcrumb.id) {
        breadcrumb.id = `sbb-breadcrumb-${index}`;
      }
    });
    this._breadcrumbs[this._breadcrumbs.length - 1]?.setAttribute('aria-current', 'page');

    // If it is not expandable, reset state
    if (this._breadcrumbs.length < 3) {
      this._state = undefined;
    }
  }

  /**
   * Sets the focus on the correct element when the ellipsis breadcrumb is displayed and the user is navigating with keyboard's arrows.
   */
  private _focusNextCollapsed(evt: KeyboardEvent): void {
    const arrayCollapsed: SbbBreadcrumbElement[] = [
      this._breadcrumbs[0],
      this.shadowRoot.querySelector('#sbb-breadcrumb-ellipsis') as SbbBreadcrumbElement,
      this._breadcrumbs[this._breadcrumbs.length - 1],
    ];
    this._focusNext(evt, arrayCollapsed);
  }

  private _focusNext(
    evt: KeyboardEvent,
    breadcrumbs: SbbBreadcrumbElement[] = this._breadcrumbs,
  ): void {
    const current: number = breadcrumbs.findIndex(
      (e) => e === document.activeElement || e === this.shadowRoot.activeElement,
    );
    const nextIndex: number = getNextElementIndex(evt, current, breadcrumbs.length);
    breadcrumbs[nextIndex]?.focus();
    evt.preventDefault();
  }

  /**
   * Note: due to @State annotation on _state, this method triggers a new render; as a consequence, the focus is moved
   * to the `body`, so if the ellipsis element has focus, it's asynchronously forced to the first element.
   */
  private _expandBreadcrumbs(): void {
    this._state = 'manually-expanded';
    this._markForFocus = true;
  }

  /** Evaluate if the expanded breadcrumb element fits in page width, otherwise it needs ellipsis */
  private _evaluateCollapsedState(): void {
    if (!this._state && this.scrollWidth > this.offsetWidth) {
      this._state = 'collapsed';
      this._resizeObserver.disconnect();
    }
  }

  private _renderCollapsed(): TemplateResult {
    for (let i = 0; i < this._breadcrumbs.length; i++) {
      if (i === 0 || i === this._breadcrumbs.length - 1) {
        this._breadcrumbs[i].setAttribute('slot', `breadcrumb-${i}`);
      } else {
        this._breadcrumbs[i].removeAttribute('slot');
      }
    }

    return html`
      <li class="sbb-breadcrumb-group__item">
        <slot name="breadcrumb-0"></slot>
      </li>
      <li class="sbb-breadcrumb-group__item" id="sbb-breadcrumb-group-ellipsis">
        <sbb-icon
          name="chevron-small-right-small"
          class="sbb-breadcrumb-group__divider-icon"
        ></sbb-icon>
        <button
          type="button"
          id="sbb-breadcrumb-ellipsis"
          aria-label=${i18nBreadcrumbEllipsisButtonLabel[this._language.current]}
          aria-expanded="false"
          @click=${() => this._expandBreadcrumbs()}
        >
          ...
        </button>
      </li>
      <li class="sbb-breadcrumb-group__item">
        <sbb-icon
          name="chevron-small-right-small"
          class="sbb-breadcrumb-group__divider-icon"
        ></sbb-icon>
        <slot name=${`breadcrumb-${this._breadcrumbs.length - 1}`}></slot>
      </li>
    `;
  }

  private _renderExpanded(): TemplateResult[] {
    const slotName = (index: number): string => `breadcrumb-${index}`;

    return this._breadcrumbs.map((element: SbbBreadcrumbElement, index: number) => {
      element.setAttribute('slot', slotName(index));

      return html`
        <li class="sbb-breadcrumb-group__item">
          <slot name="${slotName(index)}"></slot>
          ${index !== this._breadcrumbs.length - 1
            ? html`<sbb-icon
                name="chevron-small-right-small"
                class="sbb-breadcrumb-group__divider-icon"
              ></sbb-icon>`
            : nothing}
        </li>
      `;
    });
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'role', 'navigation');
    setAttribute(this, 'data-state', this._state);

    return html`
      <ol class="sbb-breadcrumb-group">
        ${this._state === 'collapsed' ? this._renderCollapsed() : this._renderExpanded()}
      </ol>
      <span hidden>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-breadcrumb-group': SbbBreadcrumbGroupElement;
  }
}
