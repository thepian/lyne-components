import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';

import { SbbToastElement } from './toast';

import '../link';

describe('sbb-toast', () => {
  let element: SbbToastElement;

  beforeEach(async () => {
    element = await fixture(html` <sbb-toast></sbb-toast> `);
  });

  it('renders and sets the correct attributes', async () => {
    assert.instanceOf(element, SbbToastElement);
    expect(element).not.to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-icon');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('opens and closes after timeout', async () => {
    const willOpenEventSpy = new EventSpy(SbbToastElement.events.willOpen);
    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose);

    element.setAttribute('timeout', '50');
    await waitForLitRender(element);
    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('opened');

    // Will wait for timeout and then close itself

    await waitForLitRender(element);
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });

  it('closes by dismiss button click', async () => {
    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose);

    element.setAttribute('dismissible', '');
    await waitForLitRender(element);
    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    const dismissBtn = element.shadowRoot.querySelector('sbb-button') as HTMLElement;
    dismissBtn.click();

    await waitForLitRender(element);
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });

  it('closes by marked action element', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-button slot="action" sbb-toast-close></sbb-button>
      </sbb-toast>
    `);
    const actionBtn = element.querySelector('sbb-button') as HTMLElement;

    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose);

    element.open();
    await waitForLitRender(element);
    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    actionBtn.click();

    await waitForLitRender(element);
    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });

  it('forces state on button actions', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-button slot="action"></sbb-button>
      </sbb-toast>
    `);

    const actionBtn = element.querySelector('sbb-button');

    expect(actionBtn).to.have.attribute('variant', 'transparent');
    expect(actionBtn).to.have.attribute('size', 'm');
    expect(actionBtn).to.have.attribute('negative');
  });

  it('forces state on link actions', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-link slot="action"></sbb-link>
      </sbb-toast>
    `);
    const actionLink = element.querySelector('sbb-link');

    expect(actionLink).to.have.attribute('variant', 'inline');
    expect(actionLink).to.have.attribute('negative');
  });

  it('closes other toasts on open', async () => {
    await fixture(html`
      <sbb-toast id="toast1" disable-animation></sbb-toast>
      <sbb-toast id="toast2" disable-animation></sbb-toast>
    `);

    const toast1: SbbToastElement = document.querySelector('#toast1');
    const toast2: SbbToastElement = document.querySelector('#toast2');

    // Open the first toast
    toast1.open();
    await waitForLitRender(element);

    await waitForCondition(() => toast1.getAttribute('data-state') === 'opened');
    expect(toast1).to.have.attribute('data-state', 'opened');

    // Open the second toast and expect the first to be closed
    toast2.open();
    await waitForLitRender(element);

    await waitForCondition(() => toast1.getAttribute('data-state') === 'closed');
    expect(toast1).to.have.attribute('data-state', 'closed');
    expect(toast2).to.have.attribute('data-state', 'opened');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbToastElement.events.willOpen);

    element.addEventListener(SbbToastElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose);

    element.open();
    await waitForCondition(() => didOpenEventSpy.events.length === 1);
    await waitForLitRender(element);

    element.addEventListener(SbbToastElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });
});
