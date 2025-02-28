import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';

import { SbbMenuElement } from './menu';
import '../../button';
import '../menu-action';
import '../../link';
import '../../divider';

describe('sbb-menu', () => {
  let element: SbbMenuElement, trigger: HTMLElement;

  beforeEach(async () => {
    await fixture(html`
      <sbb-button id="menu-trigger">Menu trigger</sbb-button>
      <sbb-menu id="menu" trigger="menu-trigger" disable-animation>
        <sbb-link id="menu-link" href="#" size="xs" variant="block">Profile</sbb-link>
        <sbb-menu-action id="menu-action-1" icon="tick-small">View</sbb-menu-action>
        <sbb-menu-action id="menu-action-2" icon="pen-small" amount="1" disabled
          >Edit</sbb-menu-action
        >
        <sbb-menu-action id="menu-action-3" icon="swisspass-small" amount="2"
          >Details</sbb-menu-action
        >
        <sbb-divider id="menu-divider"></sbb-divider>
        <sbb-menu-action id="menu-action-4" icon="cross-small">Cancel</sbb-menu-action>
      </sbb-menu>
    `);
    trigger = document.querySelector('sbb-button');
    element = document.querySelector('sbb-menu');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbMenuElement);
  });

  it('opens on trigger click', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);

    trigger.click();
    await waitForLitRender(element);
    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose);

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Escape' });
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes on menu action click', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose);
    const menuAction = document.querySelector('sbb-menu > sbb-menu-action') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(menuAction).not.to.be.null;

    menuAction.click();
    await waitForLitRender(element);
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes on interactive element click', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose);
    const menuLink = document.querySelector('sbb-menu > sbb-link') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(menuLink).not.to.be.null;

    menuLink.click();
    await waitForLitRender(element);

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('is correctly positioned on desktop', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);
    await setViewport({ width: 1200, height: 800 });
    const menu: HTMLElement = element.shadowRoot.querySelector('.sbb-menu');

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    const buttonHeight = getComputedStyle(document.documentElement).getPropertyValue(
      `--sbb-size-button-l-min-height-large`,
    );
    expect(buttonHeight.trim()).to.be.equal('3.5rem');

    const buttonHeightPx = parseFloat(buttonHeight) * 16;
    expect(trigger.offsetHeight).to.be.equal(buttonHeightPx);
    expect(trigger.offsetTop).to.be.equal(0);
    expect(trigger.offsetLeft).to.be.equal(0);

    // Expect menu offsetTop to be equal to the trigger height + the menu offset (8px)
    expect(menu.offsetTop).to.be.equal(buttonHeightPx + 8);
    expect(menu.offsetLeft).to.be.equal(0);
  });

  it('is correctly positioned on mobile', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);

    await setViewport({ width: 800, height: 600 });
    const menu: HTMLElement = element.shadowRoot.querySelector('.sbb-menu');

    trigger.click();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    const menuOffsetTop = menu.offsetTop;
    const menuHeight = menu.offsetHeight;
    const pageHeight = window.innerHeight;

    expect(menuOffsetTop).to.be.equal(pageHeight - menuHeight);
  });

  it('sets the focus to the first focusable element when the menu is opened by keyboard', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);

    await sendKeys({ down: 'Tab' });
    await waitForLitRender(element);

    await sendKeys({ down: 'Enter' });
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    await waitForLitRender(element);
    expect(document.activeElement.id).to.be.equal('menu-link');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen);

    element.addEventListener(SbbMenuElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose);

    element.open();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    await waitForLitRender(element);

    element.addEventListener(SbbMenuElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });
});
