import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  isEventOnElement,
  overlayGapFixCorners,
  removeAriaComboBoxAttributes,
  SbbOverlayState,
  setAriaComboBoxAttributes,
  setOverlayPosition,
} from '../../global/overlay';
import {
  getDocumentWritingMode,
  isSafari,
  isValidAttribute,
  toggleDatasetEntry,
} from '../../global/dom';
import { assignId, getNextElementIndex } from '../../global/a11y';

let nextId = 0;

/**
 * @slot unnamed - Use this slot to project options.
 */
@Component({
  shadow: true,
  styleUrl: 'sbb-autocomplete.scss',
  tag: 'sbb-autocomplete',
})
export class SbbAutocomplete implements ComponentInterface {
  /**
   * The element where the autocomplete will attach; accepts both an element's id or an HTMLElement.
   * If not set, will search for the first 'sbb-form-field' ancestor.
   */
  @Prop() public origin: string | HTMLElement;

  /**
   * The input element that will trigger the autocomplete opening; accepts both an element's id or an HTMLElement.
   * By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element.
   * If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor.
   */
  @Prop() public trigger: string | HTMLInputElement;

  /** Whether the animation is disabled. */
  @Prop({ reflect: true }) public disableAnimation = false;

  /** Whether the icon space is preserved when no icon is set. */
  @Prop({ reflect: true }) public preserveIconSpace: boolean;

  /** The state of the autocomplete. */
  @State() private _state: SbbOverlayState = 'closed';

  /** Emits whenever the autocomplete starts the opening transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-open',
  })
  public willOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete is opened. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-open',
  })
  public didOpen: EventEmitter<void>;

  /** Emits whenever the autocomplete begins the closing transition. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'will-close',
  })
  public willClose: EventEmitter<void>;

  /** Emits whenever the autocomplete is closed. */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'did-close',
  })
  public didClose: EventEmitter<void>;

  @Element() private _element!: HTMLElement;

  private _overlay: HTMLElement;
  private _optionContainer: HTMLElement;
  private _originElement: HTMLElement;
  private _triggerElement: HTMLInputElement;
  private _triggerEventsController: AbortController;
  private _openPanelEventsController: AbortController;
  private _overlayId = `sbb-autocomplete-${++nextId}`;
  private _activeItemIndex = -1;
  private _didLoad = false;
  private _isPointerDownEventOnMenu: boolean;

  /**
   * On Safari, the aria role 'listbox' must be on the host element, or else VoiceOver won't work at all.
   * On the other hand, JAWS and NVDA need the role to be "closer" to the options, or else optgroups won't work.
   */
  private _ariaRoleOnHost = isSafari();

  /** The autocomplete should inherit 'readonly' state from the trigger. */
  private get _readonly(): boolean {
    return this._triggerElement && isValidAttribute(this._triggerElement, 'readonly');
  }

  private get _options(): HTMLSbbOptionElement[] {
    return Array.from(this._element.querySelectorAll('sbb-option')) as HTMLSbbOptionElement[];
  }

  /** Opens the autocomplete. */
  @Method()
  public async open(): Promise<void> {
    if (
      this._state !== 'closed' ||
      !this._overlay ||
      this._options.length === 0 ||
      this._readonly
    ) {
      return;
    }

    this._state = 'opening';
    this.willOpen.emit();
    this._setOverlayPosition();
  }

  /** Closes the autocomplete. */
  @Method()
  public async close(): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    this._state = 'closing';
    this.willClose.emit();
    this._openPanelEventsController.abort();
  }

  /** Removes trigger click listener on trigger change. */
  @Watch('origin')
  public resetOriginClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): void {
    if (newValue !== oldValue) {
      this._componentSetup();
    }
  }

  /** Removes trigger click listener on trigger change. */
  @Watch('trigger')
  public resetTriggerClickListener(
    newValue: string | HTMLElement,
    oldValue: string | HTMLElement,
  ): void {
    if (newValue !== oldValue) {
      this._componentSetup();
    }
  }

  /** When an option is selected, update the input value and close the autocomplete. */
  @Listen('option-selection-change')
  public async onOptionSelected(event: CustomEvent): Promise<void> {
    const target: HTMLSbbOptionElement = event.target as HTMLSbbOptionElement;
    if (!target.selected) {
      return;
    }

    // Deselect the previous options
    this._options
      .filter((option) => option.id !== target.id && option.selected)
      .forEach((option) => (option.selected = false));

    // Set the option value
    this._triggerElement.value = target.value;

    // Manually trigger the change events
    this._triggerElement.dispatchEvent(new window.Event('change', { bubbles: true }));
    this._triggerElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    await this.close();
  }

  @Listen('click')
  public async onOptionClick(event): Promise<void> {
    if (event.target?.tagName !== 'SBB-OPTION' || event.target.disabled) {
      return;
    }
    await this.close();
  }

  public componentDidLoad(): void {
    this._componentSetup();
    this._didLoad = true;
  }

  public connectedCallback(): void {
    if (this._didLoad) {
      this._componentSetup();
    }
  }

  public disconnectedCallback(): void {
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();
  }

  private _componentSetup(): void {
    this._triggerEventsController?.abort();
    this._openPanelEventsController?.abort();

    this._attachTo(this._getOriginElement());
    this._bindTo(this._getTriggerElement());
  }

  /**
   * Retrieve the element where the autocomplete will be attached.
   * @returns 'origin' or the first 'sbb-form-field' ancestor.
   */
  private _getOriginElement(): HTMLElement {
    let result: HTMLElement;

    if (!this.origin) {
      result = this._element.closest('sbb-form-field')?.shadowRoot.querySelector('#overlay-anchor');
    } else {
      result = typeof this.origin === 'string' ? document.getElementById(this.origin) : this.origin;
    }

    if (!result) {
      throw new Error(
        'Cannot find the origin element. Please specify a valid element or read the "origin" prop documentation',
      );
    }

    return result;
  }

  /**
   * Retrieve the element that will trigger the autocomplete opening.
   * @returns 'trigger' or the first 'input' inside the origin element.
   */
  private _getTriggerElement(): HTMLInputElement {
    if (!this.trigger) {
      return this._element.closest('sbb-form-field')?.querySelector('input') as HTMLInputElement;
    }

    const result =
      typeof this.trigger === 'string'
        ? (document.getElementById(this.trigger) as HTMLInputElement)
        : this.trigger;

    if (!result) {
      throw new Error(
        'Cannot find the trigger element. Please specify a valid element or read the "trigger" prop documentation',
      );
    }

    return result;
  }

  private _attachTo(anchorElem: HTMLElement): void {
    if (!anchorElem) {
      return;
    }

    this._originElement = anchorElem;

    toggleDatasetEntry(
      this._element,
      'optionPanelOriginBorderless',
      this._element.closest('sbb-form-field')?.hasAttribute('borderless'),
    );
  }

  private _bindTo(triggerElem: HTMLInputElement): void {
    if (!triggerElem) {
      return;
    }

    // Reset attributes to the old trigger and add them to the new one
    this._removeTriggerAttributes(this._triggerElement);
    this._setTriggerAttributes(triggerElem);

    this._triggerElement = triggerElem;

    this._setupTriggerEvents();
  }

  private _setupTriggerEvents(): void {
    this._triggerEventsController = new AbortController();

    // Open the overlay on focus, click, input and `ArrowDown` event
    this._triggerElement.addEventListener('focus', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this._triggerElement.addEventListener('click', () => this.open(), {
      signal: this._triggerEventsController.signal,
    });
    this._triggerElement.addEventListener(
      'input',
      async (event) => {
        await this.open();
        this._highlightOptions((event.target as HTMLInputElement).value);
      },
      { signal: this._triggerEventsController.signal },
    );
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._closedPanelKeyboardInteraction(event),
      { signal: this._triggerEventsController.signal },
    );
  }

  // Set overlay position, width and max height
  private _setOverlayPosition(): void {
    setOverlayPosition(this._overlay, this._originElement, this._optionContainer, this._element);
  }

  /** On open/close animation end.
   *  In rare cases it can be that the animationEnd event is triggered twice.
   *  To avoid entering a corrupt state, exit when state is not expected.
   */
  private _onAnimationEnd(event: AnimationEvent): void {
    if (event.animationName === 'open' && this._state === 'opening') {
      this._onOpenAnimationEnd();
    } else if (event.animationName === 'close' && this._state === 'closing') {
      this._onCloseAnimationEnd();
    }
  }

  private _onOpenAnimationEnd(): void {
    this._state = 'opened';
    this._attachOpenPanelEvents();
    this._triggerElement?.setAttribute('aria-expanded', 'true');
    this.didOpen.emit();
  }

  private _onCloseAnimationEnd(): void {
    this._state = 'closed';
    this._triggerElement?.setAttribute('aria-expanded', 'false');
    this._resetActiveElement();
    this._optionContainer.scrollTop = 0;
    this.didClose.emit();
  }

  private _attachOpenPanelEvents(): void {
    this._openPanelEventsController = new AbortController();

    // Recalculate the overlay position on scroll and window resize
    document.addEventListener('scroll', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('resize', () => this._setOverlayPosition(), {
      passive: true,
      signal: this._openPanelEventsController.signal,
    });

    // Close autocomplete on backdrop click
    window.addEventListener('pointerdown', (ev) => this._pointerDownListener(ev), {
      signal: this._openPanelEventsController.signal,
    });
    window.addEventListener('pointerup', (ev) => this._closeOnBackdropClick(ev), {
      signal: this._openPanelEventsController.signal,
    });

    // Keyboard interactions
    this._triggerElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._openedPanelKeyboardInteraction(event),
      {
        signal: this._openPanelEventsController.signal,
      },
    );
  }

  // Check if the pointerdown event target is triggered on the menu.
  private _pointerDownListener = (event: PointerEvent): void => {
    this._isPointerDownEventOnMenu = isEventOnElement(this._overlay, event);
  };

  // If the click is outside the autocomplete, closes the panel.
  private _closeOnBackdropClick = async (event: PointerEvent): Promise<void> => {
    if (
      !this._isPointerDownEventOnMenu &&
      !isEventOnElement(this._overlay, event) &&
      !isEventOnElement(this._originElement, event)
    ) {
      await this.close();
    }
  };

  private async _closedPanelKeyboardInteraction(event: KeyboardEvent): Promise<void> {
    if (this._state !== 'closed') {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case 'ArrowDown':
      case 'ArrowUp':
        await this.open();
        break;
    }
  }

  private async _openedPanelKeyboardInteraction(event: KeyboardEvent): Promise<void> {
    if (this._state !== 'opened') {
      return;
    }

    switch (event.key) {
      case 'Escape':
      case 'Tab':
        await this.close();
        break;

      case 'Enter':
        await this._selectByKeyboard();
        break;

      case 'ArrowDown':
      case 'ArrowUp':
        this._setNextActiveOption(event);
        break;
    }
  }

  private async _selectByKeyboard(): Promise<void> {
    const activeOption = this._options[this._activeItemIndex];

    if (activeOption) {
      await activeOption.setSelectedViaUserInteraction(true);
    }
  }

  private _setNextActiveOption(event: KeyboardEvent): void {
    const filteredOptions = this._options.filter(
      (opt) => !isValidAttribute(opt, 'disabled') && !isValidAttribute(opt, 'data-group-disabled'),
    );

    // Get and activate the next active option
    const next = getNextElementIndex(event, this._activeItemIndex, filteredOptions.length);
    const nextActiveOption = filteredOptions[next];
    nextActiveOption.active = true;
    this._triggerElement.setAttribute('aria-activedescendant', nextActiveOption.id);
    nextActiveOption.scrollIntoView({ block: 'nearest' });

    // Reset the previous active option
    const lastActiveOption = filteredOptions[this._activeItemIndex];
    if (lastActiveOption) {
      lastActiveOption.active = false;
    }

    this._activeItemIndex = next;
  }

  private _resetActiveElement(): void {
    const activeElement = this._options[this._activeItemIndex];

    if (activeElement) {
      activeElement.active = false;
    }
    this._activeItemIndex = -1;
    this._triggerElement.removeAttribute('aria-activedescendant');
  }

  /** Highlight the searched text on the options. */
  private _highlightOptions(searchTerm: string): void {
    this._options.forEach((option) => option.highlight(searchTerm));
  }

  private _setTriggerAttributes(element: HTMLInputElement): void {
    setAriaComboBoxAttributes(element, this._element.id || this._overlayId, false);
  }

  private _removeTriggerAttributes(element: HTMLInputElement): void {
    removeAriaComboBoxAttributes(element);
  }

  public render(): JSX.Element {
    return (
      <Host
        data-state={this._state}
        role={this._ariaRoleOnHost ? 'listbox' : null}
        ref={this._ariaRoleOnHost && assignId(() => this._overlayId)}
        dir={getDocumentWritingMode()}
      >
        <div class="sbb-autocomplete__gap-fix"></div>
        <div class="sbb-autocomplete__container">
          <div class="sbb-autocomplete__gap-fix">{overlayGapFixCorners()}</div>
          <div
            onAnimationEnd={(event: AnimationEvent) => this._onAnimationEnd(event)}
            class="sbb-autocomplete__panel"
            data-open={this._state === 'opened' || this._state === 'opening'}
            ref={(overlayRef) => (this._overlay = overlayRef)}
          >
            <div class="sbb-autocomplete__wrapper">
              <div
                class="sbb-autocomplete__options"
                ref={(containerRef) => (this._optionContainer = containerRef)}
                role={!this._ariaRoleOnHost ? 'listbox' : null}
                id={!this._ariaRoleOnHost ? this._overlayId : null}
              >
                <slot />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
