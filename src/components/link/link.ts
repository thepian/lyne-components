import { spread } from '@open-wc/lit-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { LanguageController, NamedSlotStateController } from '../core/common-behaviors';
import { hostContext, ACTION_ELEMENTS, setAttributes } from '../core/dom';
import { HandlerRepository, actionElementHandlerAspect } from '../core/eventing';
import { i18nTargetOpensInNewWindow } from '../core/i18n';
import type {
  ButtonType,
  IsStaticProperty,
  LinkButtonProperties,
  LinkButtonRenderVariables,
  LinkTargetType,
  SbbIconPlacement,
} from '../core/interfaces';
import { resolveRenderVariables, targetsNewWindow } from '../core/interfaces';
import '../icon';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

/**
 * It displays a link enhanced with the SBB Design.
 *
 * @slot - Use the unnamed slot to add content to the `sbb-link`.
 * @slot icon - Slot used to display the icon, if one is set.
 */
@customElement('sbb-link')
export class SbbLinkElement extends LitElement implements LinkButtonProperties, IsStaticProperty {
  public static override styles: CSSResultGroup = style;

  /** Variant of the link (block or inline). */
  @property({ reflect: true }) public variant: 'block' | 'inline' = 'block';

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative = false;

  /**
   * Text size, the link should get in the non-button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @property({ reflect: true }) public size: SbbLinkSize = 's';

  /**
   * Set this property to true if you want only a visual representation of a
   * link, but no interaction (a span instead of a link/button will be rendered).
   */
  @property({ attribute: 'is-static', reflect: true, type: Boolean }) public isStatic = false;

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   * Inline variant doesn't support icons.
   */
  @property({ attribute: 'icon-name', reflect: true }) public iconName?: string;

  /** Moves the icon to the end of the component if set to true. */
  @property({ attribute: 'icon-placement' })
  public iconPlacement?: SbbIconPlacement = 'start';

  /** The href value you want to link to (if it is not present link becomes a button). */
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

  public constructor() {
    super();
    new NamedSlotStateController(this);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Check if the current element is nested in an action element.
    this.isStatic = this.isStatic || !!hostContext(ACTION_ELEMENTS, this);
    this._handlerRepository.connect();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    const {
      tagName: TAG_NAME,
      attributes,
      hostAttributes,
    }: LinkButtonRenderVariables = resolveRenderVariables(this);

    // ## Migr: Host attributes ##
    setAttributes(this, hostAttributes);
    // ####

    /* eslint-disable lit/binding-positions */
    return html`
      <${unsafeStatic(TAG_NAME)} class="sbb-link" ${spread(attributes)}>
        ${
          this.variant !== 'inline'
            ? html`<span class="sbb-link__icon">
                <slot name="icon">
                  ${this.iconName ? html`<sbb-icon name=${this.iconName}></sbb-icon>` : nothing}
                </slot>
              </span>`
            : nothing
        }
        <slot></slot>
        ${
          targetsNewWindow(this)
            ? html`<span class="sbb-link__opens-in-new-window">
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
    'sbb-link': SbbLinkElement;
  }
}
