import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController } from '../../core/common-behaviors';
import { setAttributes } from '../../core/dom';
import { HandlerRepository, actionElementHandlerAspect } from '../../core/eventing';
import { i18nTargetOpensInNewWindow } from '../../core/i18n';
import type {
  ButtonType,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
} from '../../core/interfaces';
import { resolveRenderVariables, targetsNewWindow } from '../../core/interfaces';
import '../../icon';

import style from './menu-action.scss?lit&inline';

/**
 * It displays an action element that can be used in the `sbb-menu` component.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-menu-action`.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a `sbb-icon` will be used.
 */
@customElement('sbb-menu-action')
export class SbbMenuActionElement extends LitElement implements LinkButtonProperties {
  public static override styles: CSSResultGroup = style;

  /**
   * The name of the icon, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @property({ attribute: 'icon-name' }) public iconName?: string | undefined;

  /** Value shown as badge at component end. */
  @property() public amount?: string | undefined;

  /** The href value you want to link to (if it is not present menu action becomes a button). */
  @property() public href: string | undefined;

  /** Where to display the linked URL. */
  @property() public target?: LinkTargetType | string | undefined;

  /** The relationship of the linked URL as space-separated link types. */
  @property() public rel?: string | undefined;

  /** Whether the browser will show the download dialog on click. */
  @property({ type: Boolean }) public download?: boolean;

  /** The type attribute to use for the button. */
  @property() public type: ButtonType | undefined;

  /** Whether the button is disabled. */
  @property({ reflect: true, type: Boolean }) public disabled = false;

  /** The name attribute to use for the button. */
  @property({ reflect: true }) public name: string | undefined;

  /** The value attribute to use for the button. */
  @property() public value?: string;

  /** The <form> element to associate the button with. */
  @property() public form?: string;

  private _language = new LanguageController(this);
  private _handlerRepository = new HandlerRepository(this, actionElementHandlerAspect);

  public override connectedCallback(): void {
    super.connectedCallback();
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      hostAttributes,
      attributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    setAttributes(this, hostAttributes);

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-menu-action" ${spread(attributes)}>
        <span class="sbb-menu-action__content">
          <span class="sbb-menu-action__icon">
            <slot name="icon"
              >${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}</slot
            >
          </span>
          <span class="sbb-menu-action__label">
            <slot></slot>
          </span>
          ${
            this.amount && !this.disabled
              ? html`<span class="sbb-menu-action__amount">${this.amount}</span>`
              : nothing
          }
        </span>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-menu-action__opens-in-new-window">
                . ${i18nTargetOpensInNewWindow[this._language.current]}
              </span>`
            : nothing
        }
      </${unsafeStatic(TAG_NAME)}>
    `;
    /* eslint-disable lit/binding-positions */
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-menu-action': SbbMenuActionElement;
  }
}
