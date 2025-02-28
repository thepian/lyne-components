import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { LanguageController } from '../../core/common-behaviors';
import { EventEmitter } from '../../core/eventing';
import { i18nCloseAlert, i18nFindOutMore } from '../../core/i18n';
import type { LinkProperties, LinkTargetType } from '../../core/interfaces';
import type { TitleLevel } from '../../title';

import style from './alert.scss?lit&inline';

import '../../button';
import '../../divider';
import '../../link';
import '../../title';

/**
 * It displays messages which require user's attention.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-alert`.
 * @slot icon - Should be a `sbb-icon` which is displayed next to the title. Styling is optimized for icons of type HIM-CUS.
 * @slot title - Title content.
 * @event {CustomEvent<void>} willPresent - Emits when the fade in animation starts.
 * @event {CustomEvent<void>} didPresent - Emits when the fade in animation ends and the button is displayed.
 * @event {CustomEvent<void>} dismissalRequested - Emits when dismissal of an alert was requested.
 */
@customElement('sbb-alert')
export class SbbAlertElement extends LitElement implements LinkProperties {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    willPresent: 'willPresent',
    didPresent: 'didPresent',
    dismissalRequested: 'dismissalRequested',
  } as const;

  /**
   * Whether the alert is readonly.
   * In readonly mode, there is no dismiss button offered to the user.
   */
  @property({ reflect: true, type: Boolean }) public readonly = false;

  /** You can choose between `m` or `l` size. */
  @property({ reflect: true }) public size: 'm' | 'l' = 'm';

  /** Whether the fade in animation should be disabled. */
  @property({ attribute: 'disable-animation', type: Boolean }) public disableAnimation = false;

  /**
   * Name of the icon which will be forward to the nested `sbb-icon`.
   * Choose the icons from https://icons.app.sbb.ch.
   * Styling is optimized for icons of type HIM-CUS.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string;

  /** Content of title. */
  @property({ attribute: 'title-content' }) public titleContent?: string;

  /** Level of title, will be rendered as heading tag (e.g. h3). Defaults to level 3. */
  @property({ attribute: 'title-level' }) public titleLevel: TitleLevel = '3';

  /** Content of the link. */
  @property({ attribute: 'link-content' }) public linkContent?: string;

  /** The href value you want to link to. */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel: string | undefined;

  /** This will be forwarded as aria-label to the relevant nested element. */
  @property({ attribute: 'accessibility-label' }) public accessibilityLabel: string | undefined;

  /** Emits when the fade in animation starts. */
  private _willPresent: EventEmitter<void> = new EventEmitter(
    this,
    SbbAlertElement.events.willPresent,
  );

  /** Emits when the fade in animation ends and the button is displayed. */
  private _didPresent: EventEmitter<void> = new EventEmitter(
    this,
    SbbAlertElement.events.didPresent,
  );

  /** Emits when dismissal of an alert was requested. */
  private _dismissalRequested: EventEmitter<void> = new EventEmitter(
    this,
    SbbAlertElement.events.dismissalRequested,
  );

  private _transitionWrapperElement!: HTMLElement;
  private _alertElement!: HTMLElement;

  private _firstRenderingDone = false;

  private _language = new LanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    // Skip very first render where the animation elements are not yet ready.
    // Presentation is postponed.
    if (this._transitionWrapperElement) {
      this._initFadeInTransitionStyles();
      this._present();
    }
  }

  protected override updated(): void {
    // During the very first rendering, the animation elements are only present in updated.
    // So we need to fire the fade in animation later than at connectedCallback().
    if (!this._firstRenderingDone) {
      this._present();
    }
    this._firstRenderingDone = true;
  }

  /** Requests dismissal of the alert. */
  public requestDismissal(): void {
    this._dismissalRequested.emit();
  }

  /** Present the alert. */
  private _present(): Promise<void> {
    this._willPresent.emit();

    if (this.disableAnimation) {
      this._onHeightTransitionEnd();
      return;
    }

    this._transitionWrapperElement.addEventListener(
      'transitionend',
      () => this._onHeightTransitionEnd(),
      {
        once: true,
      },
    );
    this._transitionWrapperElement.style.height = `${this._alertElement.offsetHeight}px`;
  }

  private _initFadeInTransitionStyles(): void {
    if (this.disableAnimation) {
      return;
    }
    this._transitionWrapperElement.style.height = '0';
    this._alertElement.style.opacity = '0';
  }

  private _onHeightTransitionEnd(): void {
    this._transitionWrapperElement.style.removeProperty('height');
    this._alertElement.style.removeProperty('opacity');

    if (this.disableAnimation) {
      this._onOpacityTransitionEnd();
      return;
    }

    this._alertElement.addEventListener('transitionend', () => this._onOpacityTransitionEnd(), {
      once: true,
    });
  }

  private _onOpacityTransitionEnd(): void {
    this._didPresent.emit();
  }

  private _linkProperties(): Record<string, string> {
    return {
      ['aria-label']: this.accessibilityLabel,
      href: this.href,
      rel: this.rel,
      target: this.target,
    };
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="sbb-alert__transition-wrapper"
        ${ref((el: HTMLElement): void => {
          this._transitionWrapperElement = el;
        })}
      >
        <div
          class="sbb-alert"
          ${ref((el: HTMLElement): void => {
            const isFirstInitialization = !this._alertElement;

            this._alertElement = el;
            if (isFirstInitialization) {
              this._initFadeInTransitionStyles();
            }
          })}
        >
          <span class="sbb-alert__icon">
            <slot name="icon">
              <sbb-icon name=${this.iconName || 'info'}></sbb-icon>
            </slot>
          </span>
          <span class="sbb-alert__content">
            <sbb-title
              class="sbb-alert__title"
              level=${this.titleLevel}
              visual-level=${this.size === 'l' ? '3' : '5'}
              negative
            >
              <slot name="title">${this.titleContent}</slot>
            </sbb-title>
            <p class="sbb-alert__content-slot">
              <slot></slot>
            </p>
            ${this.href
              ? html` <sbb-link ${spread(this._linkProperties())} variant="inline" negative>
                  ${this.linkContent ? this.linkContent : i18nFindOutMore[this._language.current]}
                </sbb-link>`
              : nothing}
          </span>
          ${!this.readonly
            ? html`<span class="sbb-alert__close-button-wrapper">
                <sbb-divider
                  orientation="vertical"
                  negative
                  class="sbb-alert__close-button-divider"
                ></sbb-divider>
                <sbb-button
                  variant="transparent"
                  negative
                  size="m"
                  icon-name="cross-small"
                  @click=${() => this.requestDismissal()}
                  aria-label=${i18nCloseAlert[this._language.current]}
                  class="sbb-alert__close-button"
                ></sbb-button>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-alert': SbbAlertElement;
  }
}
